import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useState, useEffect } from "react";
import axios from "axios";

export const Dashboard = () => {
    const [balance, setBalance] = useState(0); // State for balance
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get("https://paytmclone-7rof.onrender.com/api/v1/account/balance", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                  });                  
                setBalance(response.data.balance);
                console.log("Fetched balance: ", response.data.balance);
            } catch (err) {
                console.error("Error fetching balance:", err);
                setError("Failed to fetch balance. Please try again later.");
            }
        };
        fetchBalance();
    }, []);

    return (
        <div>
            <Appbar />
            <div className="m-8">
                {error ? (
                    <div className="text-red-500">Error: {error}</div> // Display error message
                ) : (
                    <Balance value={balance} /> // Render balance if no error
                )}
                <Users />
            </div>
        </div>
    );
};
