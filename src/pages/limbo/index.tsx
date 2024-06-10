// Importation des modules nécessaires
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";

// Importation des composants et des hooks personnalisés
import Header from "@/component/Header";
import { getInfoFromDb, getBalance, updateBalance } from "@/firebase";
import ChatInterface from "@/component/ChatInterface";
import { useAuthState } from "@/hooks/auth";
import { getLimboResult } from "@/scripts/getLimboResult";

const Limbo = () => {
  const { user, loading } = useAuthState();
  const router = useRouter();
  const [balance, setBalance] = useState(100); // Initialiser la balance
  const [betAmount, setBetAmount] = useState(""); // Montant du pari initial comme chaîne
  const [targetMultiplier, setTargetMultiplier] = useState("2"); // Multiplicateur cible initial comme chaîne
  const [result, setResult] = useState(0);
  const color = (result > Number(targetMultiplier)) ? "green" : "red"
  
  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }

    getBalance().then(setBalance);
  }, [user, loading]);

  const handleBetResult = async () => {
    const gameResult = getLimboResult();
    setResult(gameResult);
    const numericBetAmount = Number(betAmount) || 0;
    const numericMultiplier = Number(targetMultiplier) || 1;
    const newBalance =
      gameResult < numericMultiplier
        ? balance - numericBetAmount
        : balance + numericBetAmount * numericMultiplier;
    setBalance(newBalance);
    await updateBalance(newBalance);
  };

  if (loading) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  const handleBetAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBetAmount(event.target.value);
  };

  const handleMultiplierChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetMultiplier(event.target.value);
  };

  const isBetValid = Number(betAmount) >= 0 && Number(betAmount) <= balance;

  return (
    <>
      <Header />
      <Typography variant="h1">{`Balance: ${balance}`}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ height: "100%" }}>
          <Stack
            spacing={2}
            sx={{
              padding: "10px",
              backgroundColor: "rgb(33, 55, 67)",
              height: "100%",
            }}
          >
            <TextField
              label="Bet Amount"
              type="number"
              value={betAmount}
              onChange={handleBetAmountChange}
              error={!isBetValid && betAmount !== ""}
              helperText={
                !isBetValid && betAmount !== ""
                  ? "Bet amount exceeds balance or is zero"
                  : ""
              }
              fullWidth
              InputLabelProps={{
                style: { color: "white" },
              }}
              InputProps={{
                style: { color: "white" },
              }}
              sx={{
                backgroundColor: "rgb(19,33,45)",
                borderColor: "white",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
              }}
            />
            <TextField
              label="Target Multiplier"
              type="number"
              value={targetMultiplier}
              onChange={handleMultiplierChange}
              fullWidth
              InputProps={{
                style: { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              sx={{
                backgroundColor: "rgb(19,33,45)",
                borderColor: "white",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
              }}
            />
            <Button
              variant="contained"
              disabled={!isBetValid}
              onClick={handleBetResult}
            >
              Bet
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={6} sx={{ backgroundColor: "rgb(19,33,45)", padding:"0px" }}>
          <Stack
            alignItems="center"
            justifyContent="center"
            height="100%"
            bgcolor="rgb(19,33,45)"
          >
            <Typography
              color={color}
              sx={{ fontWeight: "700", fontSize: "64px" }}
            >
              {result}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <ChatInterface />
    </>
  );
};

export default Limbo;
