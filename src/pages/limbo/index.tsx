import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { getBalance, updateBalance } from "@/firebase";
import { useAuthState } from "@/hooks/auth";
import { getLimboResult } from "@/scripts/getLimboResult";
import useBalanceStore from '@/store/balance';

const Limbo = () => {
  const { user, loading } = useAuthState();
  const router = useRouter();
  const { balance, setBalance } = useBalanceStore();
  const [betAmount, setBetAmount] = useState("");
  const [targetMultiplier, setTargetMultiplier] = useState("2");
  const [result, setResult] = useState(0);
  const color = result > Number(targetMultiplier) ? "green" : "red";

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
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
    await updateBalance(newBalance, "limbo");
    setBalance(newBalance);
  };

  if (loading) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  const handleBetAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBetAmount(event.target.value);
  };

  const handleMultiplierChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTargetMultiplier(event.target.value);
  };

  const isBetValid = Number(betAmount) >= 0 && Number(betAmount) <= balance;

  return (
    <>
      <Typography
        variant="h2"
        align="center"
        sx={{ mb: 4 }}
      >{`Balance: ${balance}`}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, bgcolor: "rgb(33, 55, 67)" }}>
            <Stack spacing={3}>
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
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              bgcolor: "rgb(19,33,45)",
            }}
          >
            <Typography
              color={color}
              sx={{ fontWeight: "700", fontSize: "64px" }}
            >
              {result}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

    </>
  );
};

export default Limbo;
