import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-4 h-max">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox
                        placeholder="Email"
                        label={"Email"}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <InputBox
                        placeholder="Password"
                        label={"Password"}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="pt-4">
                        <Button
                            label={loading ? "Signing in..." : "Sign in"}
                            onClick={async () => {
                                if (loading) return; // Prevent multiple clicks
                                if (!username || !password) {
                                    alert("Both email and password are required!");
                                    return;
                                }
                                setLoading(true);
                                try {
                                    const response = await axios.post(`https://paytmclone-7rof.onrender.com/api/v1/user/signin`, {
                                        username,
                                        password,
                                    });
                                    localStorage.setItem("token", response.data.token);
                                    navigate("/dashboard");
                                } catch (error) {
                                    console.error("Signin failed:", error);
                                    alert(error.response?.data?.message || "An error occurred during signin.");
                                } finally {
                                    setLoading(false);
                                }
                            }}
                        />
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    );
};
