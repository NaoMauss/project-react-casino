import React, { useEffect, useState } from 'react';
import { getHistory } from '@/firebase';
import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tab } from '@mui/material';

interface IHistoryItem {
  amount: number;
  currentDateWithHours: string;
  game: string;
  balance: number;
}

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<IHistoryItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const historyData = await getHistory();
      if (historyData) {
        const reversedHistory = historyData.reverse();
        setHistory(reversedHistory);
      }
    };

    fetchHistory();
  }, []);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Betting History
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Game</TableCell>
                <TableCell align="right">Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((item, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {item.currentDateWithHours}
                  </TableCell>
                  <TableCell align="right" >{item.amount}</TableCell>
                  <TableCell align="right">{item.game}</TableCell>
                  <TableCell align="right">{item.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default HistoryPage;
