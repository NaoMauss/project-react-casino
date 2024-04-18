// import styles from "@/styles/Limbo.module.css";
import { useAuthState } from "@/hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/component/Header";
import { getInfoFromDb, getBalance, updateBalance } from "@/firebase";


const Limbo = () => {
    const { user, loading } = useAuthState();
    const [userInfo, setUserInfo] = useState<string>("");
    const [dbInfo, setDbInfo] = useState<string>("");
    const [balance, setBalance] = useState<number>(0);
    const router = useRouter();

    useEffect (() => {
        if (!user && !loading) {
            console.log(user)
            router.push("/login");
        }

        getInfoFromDb().then((data) => {
            console.log(data);
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
    }
    
    
    return (
        <>
            <Header />
            <h1>Limbo </h1>
            <p>{dbInfo}</p>
            <p>{balance}</p>
            <button onClick={() => handleBalance()}>Add balance</button>
        </>
    );
};

export default Limbo;