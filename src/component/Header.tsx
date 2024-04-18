import Link from 'next/link';
import styles from '@/styles/Header.module.css';
import { useAuthState } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { signOut, addDataToDb, db } from '@/firebase'

export default function Header() {

    const { user, loading } = useAuthState();
    const [userInfo, setUserInfo] = useState(null);

    useEffect (() => {
        if (!user && !loading) {
            console.log(user)
        }
        setUserInfo(user);
        addDataToDb()
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