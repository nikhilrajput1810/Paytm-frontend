import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "Unknown User"; // Fallback value
  const name = searchParams.get("name") || "Unknown"; // Fallback value
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleTransfer = async () => {
    // Clear previous messages
    setError("");
    setSuccess("");

    // Validate input
    if (!amount || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token is missing. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        "https://paytmclone-7rof.onrender.com/api/v1/account/transfer",
        { to: id, amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );if(response.data.message==="Transfer successful"){
        setSuccess("Transfer initiated successfully!");
        navigate('/dashboard');
      }else{
        setError("Transfer failed. Please try again later.");
      }
    } catch (err) {
      console.error("Error during transfer:", err);
      setError(err.response?.data?.message || "An error occurred during the transfer.");
    }
  };

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">{name[0]?.toUpperCase()}</span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="amount">
                  Amount (in Rs)
                </label>
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  value={amount}
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                />
              </div>
              <button
                onClick={handleTransfer}
                className="rounded-md text-sm font-medium h-10 px-4 py-2 w-full bg-green-500 text-white"
              >
                Initiate Transfer
              </button>
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
            {success && <div className="text-green-500 mt-2">{success}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
