// import styles from "@/styles/Limbo.module.css";
import { useAuthState } from "@/hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/component/Header";
import { getInfoFromDb, getBalance, updateBalance } from "@/firebase";
import { Button, Grid, Stack, TextField } from "@mui/material";
import Chatbot from "@/component/Chatbot";
import ChatInterface from "@/component/ChatInterface";

const Limbo = () => {
    const { user, loading } = useAuthState();
    const [userInfo, setUserInfo] = useState<string>("");
    const [dbInfo, setDbInfo] = useState<string>("");
    const [balance, setBalance] = useState<number>(0);
    const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      console.log(user);
      router.push("/login");
    }

    getInfoFromDb().then((data) => {
      console.log(data);
      //@ts-ignore
      setDbInfo(JSON.stringify(data));
    });

    getBalance().then((data) => {
      console.log(data);
      setBalance(data);
    });

    setUserInfo(user);
  }, [loading, user, balance]);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  const handleBalance = async () => {
    const formattedBalance = balance + 100;
    await updateBalance(formattedBalance);
    setBalance(formattedBalance);
  };

  return (
    <>
      <Header />
      <Grid container>
        <Grid item xs={6} sx={{backgroundColor:"rgb(33, 55, 67)"}}>
          <Stack spacing={2} sx={{padding:"10px"}}>
            <TextField
              placeholder="Bet amount"
              sx={{ backgroundColor: "white", color: "white" }}
            />
            <TextField
              placeholder="Profit on win"
              disabled
              sx={{ backgroundColor: "white", color: "white" }}
            />
            <Button>Bet</Button>
          </Stack>
          <Grid item xs={6} sx={{backgroundColor:"white"}}>
            <Stack>
              
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <ChatInterface />
    </>
  );
};

export default Limbo;
