import Link from "next/link";
import { useAuthState } from "@/hooks/auth";
import { useEffect, useState } from "react";
import {
  signOut,
  addDataToDb,
  db,
  updateBalance,
  getBalance,
} from "@/firebase";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useBalanceStore from "@/store/balance";

const theme = createTheme({
  palette: {
    primary: {
      main: "#490648",
    },
  },
});

export default function Header() {
  const { user, loading } = useAuthState();
  const [userInfo, setUserInfo] = useState(null);
  const { balance, setBalance } = useBalanceStore();

  useEffect(() => {
    if (!user && !loading) {
      console.log(user);
    }
    setUserInfo(user);
    addDataToDb();
    getBalance().then(setBalance);
  }, [loading, user]);

  if (loading) {
    return (
      <div>
        <Typography variant="h1">Loading...</Typography>
      </div>
    );
  }

  const handleBalance = async () => {
    await updateBalance(balance + 10000, "manual");
    setBalance(balance + 10000);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Container>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link href="/" passHref>
                <Button color="inherit">Home</Button>
              </Link>
              <Link href="/limbo" passHref>
                <Button color="inherit">Limbo</Button>
              </Link>
              <Link href="/dice" passHref>
                <Button color="inherit">Dice</Button>
              </Link>
              <Link href="/history" passHref>
                <Button color="inherit">History</Button>
              </Link>
              <Button color="inherit" onClick={handleBalance}>
                Add Balance
              </Button>
            </Typography>
            <Box sx={{background: 'white', padding:'8px', borderRadius:'8px'}}>
              <Typography color="black">Balance: {parseInt(`${balance}`)}</Typography>
            </Box>
            {userInfo ? (
              <Button color="inherit" onClick={signOut}>
                Sign Out
              </Button>
            ) : (
              <Link href="/login" passHref>
                <Button color="inherit">Login</Button>
              </Link>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
