import { useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { post, setAuthToken } from "../../utils/axiosUtil";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { SET_ACTIVE_USER } from "../../redux/slice/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log('auth', auth);

  const navigate = useNavigate();


  const handleData = (data) => {
    console.log("23", data)
    dispatch(
      SET_ACTIVE_USER({
        id: data.id,
        email: data.email,
        password: data.password,
        role: data.role,
      }) // payload
    )
  }

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
        console.log("res", res);
        handleData(res.data);
        toast.success("Login Success");
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message);
      });
  };

  console.log('auth2', auth);

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
                type="email"
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
