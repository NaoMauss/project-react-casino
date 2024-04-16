// import styles from "@/styles/Limbo.module.css";
import { useAuthState } from "@/hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Limbo = () => {
    const { user, loading } = useAuthState();
    const [userInfo, setUserInfo] = useState(null);
    const router = useRouter();

    useEffect (() => {
        if (!user && !loading) {
            console.log(user)
        }
        setUserInfo(user);
    }, [loading, user]);

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }
    
    
    return (
        <>
            <h1>Limbo </h1>
            <p>{JSON.stringify(userInfo)} CouCou</p>
        </>
    );
};

export default Limbo;