import Link from 'next/link';
import styles from '@/styles/Header.module.css';
import { useAuthState } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { signOut, addDataToDb, db, updateBalance, getBalance } from '@/firebase'

export default function Header() {

    const { user, loading } = useAuthState();
    const [userInfo, setUserInfo] = useState(null);
    const [balance, setBalance] = useState(100);

    useEffect (() => {
        if (!user && !loading) {
            console.log(user)
        }
        setUserInfo(user);
        addDataToDb()
        getBalance().then(setBalance)
    }, [loading, user]);

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <header className={styles.header}>
            <nav>
                <ul>
                    <li>
                        <Link href="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/limbo">
                            Limbo
                        </Link>
                    </li>
                    <li>
                        <Link href="/dice">
                            Dice
                        </Link>
                    </li>
                    <button onClick={() => updateBalance(balance + 10000)}>
                        add Balance
                    </button>
                    {userInfo ? (
                    <li>
                        <button onClick={signOut}>
                            Sign Out
                        </button>
                    </li>
                    ) : (
                    <li>
                        <Link href="/login">
                            Login
                        </Link>
                    </li>
                )}
                </ul>
            </nav>
        </header>
    );
}