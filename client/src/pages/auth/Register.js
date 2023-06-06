import React, { useState } from 'react';
import styles from "./auth.module.scss";
import registerImg from "../../assets/register.png";
import Card from '../../components/card/Card';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import Loader from '../../components/loader/Loader';
import { post } from '../../utils/axiosUtil';



const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [age, setAge] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");




    const navigate = useNavigate()

    const registerUser = (e) => {
        e.preventDefault();
        setIsLoading(true)
        if (password !== cPassword) {
            toast.error("Passwords do not match")
            setIsLoading(false)
            return;
        }
        const data = {
            email,
            password,
            age,
            firstname,
            lastname,
            city,
            address
        }

        post("/register", data)
            .then((res) => {
                setIsLoading(false)
                toast.success("Registration Success")
                navigate("/login")
            })

    };

    return (
        <>
            <ToastContainer />
            {isLoading && <Loader />}
            <section className={`containter ${styles.auth}`}>
                <Card>
                    <div className={styles.form}>
                        <h2>Login</h2>

                        <form onSubmit={registerUser}>
                            <input type="text" placeholder="Firstname" required value={firstname} onChange={(e) => setFirstname(e.target.value)}></input>
                            <input type="text" placeholder="Lastname" required value={lastname} onChange={(e) => setLastname(e.target.value)}></input>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}>
                                <label htmlFor="birthday" style={{
                                    fontSize: "1.2rem",
                                }}>Birthday</label>
                                <input type="date" id="birthday" required value={age} onChange={(e) => setAge(e.target.value)}></input>
                            </div>
                            <input type="text" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}></input>
                            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}></input>
                            <input type="password" placeholder="Confirm Password" required value={cPassword} onChange={(e) => setCPassword(e.target.value)}></input>
                            <input type="text" placeholder="City" required value={city} onChange={(e) => setCity(e.target.value)}></input>
                            <input type="text" placeholder="Address" required value={address} onChange={(e) => setAddress(e.target.value)}></input>
                            <button type='submit' className="--btn --btn-primary --btn-block">Register</button>


                        </form>

                        <span className={styles.register}>
                            <p>Already have an account?</p>
                            <Link to="/login"> Login</Link>
                        </span>
                    </div>
                </Card>
                <div className={styles.img}>
                    <img src={registerImg} alt="Register" width="400" />
                </div>
            </section>
        </>

    )
};

export default Register;