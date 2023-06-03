import { useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
// import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
import { post, setAuthToken } from "../../utils/axiosUtil";
// import {
//   GoogleAuthProvider,
//   signInWithEmailAndPassword,
//   signInWithPopup,
// } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      email,
      password,
    }
    post("/login", data)
      .then((res) => {
        setIsLoading(false);
        setAuthToken(res.data.token);
        toast.success("Login Success");
        navigate("/dashboard");
      })
  };

  //login with google

  return (
    <>
      {isLoading && <Loader />}
      <section className={`containter ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>

            <form onSubmit={loginUser}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <button className="--btn --btn-primary --btn-block">Login</button>
            </form>
            <span className={styles.register}>
              <p>D'ont have an account</p>
              <p>
                <Link to="/register">Register</Link>
              </p>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
