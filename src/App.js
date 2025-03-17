import "./styles.css";
import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("https://test.ezworks.ai/api", {
        email,
      });
      setMessage("Success: " + response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage("Error: " + error.response.data.message);
      } else if (error.request) {
        setMessage("Error: No response received from the server.");
      } else {
        setMessage("Error: " + error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Form;
