import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
  CssBaseline,
  Slider,
} from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  styled,
  Theme,
} from "@mui/material/styles";
import useBalanceStore from "@/store/balance";
import { updateBalance } from "@/firebase";
import { useAuthState } from "@/hooks/auth";
import { useRouter } from "next/router";

interface CustomSliderProps {
  winRange: number;
  theme: Theme;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#490648",
    },
    secondary: {
      main: "#d32f2f",
    },
    success: {
      main: "#4caf50",
    },
  },
  typography: {
    h4: {
      fontWeight: "bold",
    },
    h6: {
      marginTop: "20px",
      fontStyle: "italic",
    },
  },
});

const CustomSlider = styled(Slider)(
  ({ theme, winRange }: CustomSliderProps) => ({
    color: "transparent",
    height: 8,
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: theme.palette.primary.main,
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active": {
        boxShadow: "inherit",
      },
    },
    "& .MuiSlider-rail": {
      background: `linear-gradient(to right, green ${winRange}%, red ${winRange}%)`,
      opacity: 1,
      height: 8,
    },
  })
);

const DiceSVG: React.FC = () => (
  <svg
    fill="#000000"
    height="32px"
    width="32px"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 455 455"
    xmlSpace="preserve"
  >
    <path
      d="M0,0v455h455V0H0z M103.75,386.25c-19.33,0-35-15.67-35-35s15.67-35,35-35s35,15.67,35,35S123.08,386.25,103.75,386.25z
             M103.75,262.5c-19.33,0-35-15.67-35-35s15.67-35,35-35s35,15.67,35,35S123.08,262.5,103.75,262.5z M103.75,138.75
             c-19.33,0-35-15.67-35-35s15.67-35,35-35s35,15.67,35,35S123.08,138.75,103.75,138.75z M351.25,386.25c-19.33,0-35-15.67-35-35
             s15.67-35,35-35s35,15.67,35,35S370.58,386.25,351.25,386.25z M351.25,262.5c-19.33,0-35-15.67-35-35s15.67-35,35-35s35,15.67,35,35
             S370.58,262.5,351.25,262.5z M351.25,138.75c-19.33,0-35-15.67-35-35s15.67-35,35-35s35,15.67,35,35S370.58,138.75,351.25,138.75z"
    />
  </svg>
);

const DiceIndicator = styled(Box)<{ indicatorPosition: number }>(
  ({ indicatorPosition }) => ({
    position: "absolute",
    top: "-28px", // Adjusted to position closer to the slider
    left: `${indicatorPosition}%`, // Position it based on the slider value
    transform: "translateX(-50%)",
  })
);

const DiceGame: React.FC = () => {
  const { user, loading } = useAuthState();
  const router = useRouter();
  const [betAmount, setBetAmount] = useState<string>("");
  const [winRange, setWinRange] = useState<number>(50);
  const [result, setResult] = useState<string>("");
  const [diceRoll, setDiceRoll] = useState<number | null>(null);
  const { balance, setBalance } = useBalanceStore();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading]);

  if (loading) {
    return;
  }



  const rollDice = async () => {
    const roll = Math.floor(Math.random() * 100) + 1;
    const payout = 100/ winRange;
    setDiceRoll(roll);
    if (balance < Number(betAmount)) {
      setResult("Solde insuffisant");
      return;
    }
    if (winRange === 100) {
      setResult("Gagné! Le dé a roulé: 100");
      const newBalance = balance;
      setBalance(newBalance);
      await updateBalance(newBalance, "dice");
      return;
    }
    if (roll <= (winRange - 1)) {
      setResult(`Gagné! Le dé a roulé: ${roll}`);
      const newBalance = balance + Number(betAmount) * (payout - 1);
      setBalance(newBalance);
      await updateBalance(newBalance, "dice");
    } else {
      setResult(`Perdu! Le dé a roulé: ${roll}`);
      const newBalance = balance - Number(betAmount);
      setBalance(newBalance);
      await updateBalance(newBalance, "dice");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper
          elevation={3}
          sx={{ p: 4, borderRadius: 2, position: "relative" }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Jeu de Dice
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Montant du pari"
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                variant="outlined"
                margin="normal"
                InputProps={{ style: { borderRadius: 8 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom align="center">
                Intervalle de victoire: {winRange}%
              </Typography>
              <Box position="relative" width="100%" sx={{ mt: 6 }}>
                <CustomSlider
                  value={winRange}
                  onChange={(e, newValue) => setWinRange(newValue as number)}
                  aria-labelledby="continuous-slider"
                  min={1}
                  max={100}
                  valueLabelDisplay="auto"
                  winRange={winRange}
                  theme={theme}
                />
                {diceRoll !== null && (
                  <DiceIndicator indicatorPosition={(diceRoll / 100) * 100}>
                    <DiceSVG />
                  </DiceIndicator>
                )}
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                color="primary"
                onClick={rollDice}
                sx={{
                  borderRadius: 8,
                  padding: "10px 20px",
                  textTransform: "none",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#360436",
                  },
                }}
              >
                Lancer le dé
              </Button>
            </Grid>
          </Grid>
          {result && (
            <Typography
              variant="h6"
              component="div"
              align="center"
              sx={{
                mt: 3,
                color: result.includes("Gagné")
                  ? theme.palette.success.main
                  : theme.palette.secondary.main,
              }}
            >
              {result}
            </Typography>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default DiceGame;
