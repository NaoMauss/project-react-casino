import { signInWithGoogle } from "@/firebase";
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "@/styles/Login.module.css";

const redirectTo = () => {
    window.location.href = "/";
};




const Login = () => {

    return (
        <div className={styles.page}>
            <h1>Connect with Google</h1>
            <button onClick={signInWithGoogle} className={styles.googleButton}> <FontAwesomeIcon icon={faArrowRightToBracket}/> <FontAwesomeIcon icon={faGoogle}/> </button>

        </div>
    );
};

export default Login;