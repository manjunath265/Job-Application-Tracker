import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function RegisterPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("📤 Sending form:", form);
console.log("🧪 Password being sent:", `"${form.password}"`, typeof form.password);


const cleanedForm = {
  name: form.name.trim(),
  email: form.email.trim().toLowerCase(),
  password: form.password.trim()
};

            const response = await axios.post("http://localhost:5000/api/auth/register", cleanedForm);
            console.log(response.data);
               setTimeout(() => {
      navigate('/login');
    }, 1000);
        } 
        catch (error) {
             if (error.response) {
    console.error("❌ Backend error message:", error.response.data.message); // 👈 THIS is the key
  } else {
    console.error("❌ Error:", error.message);
  }
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegisterPage;