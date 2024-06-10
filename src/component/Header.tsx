import Link from 'next/link';
import { useAuthState } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { signOut, addDataToDb, db, updateBalance, getBalance } from '@/firebase';
import { AppBar, Toolbar, Button, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#490648',
        },
    },
});

export default function Header() {
    const { user, loading } = useAuthState();
    const [userInfo, setUserInfo] = useState(null);
    const [balance, setBalance] = useState(100);

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
                            <Button color="inherit" onClick={() => updateBalance(balance + 10000)}>
                                Add Balance
                            </Button>
                        </Typography>
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
