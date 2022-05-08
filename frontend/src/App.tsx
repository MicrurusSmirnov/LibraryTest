import React, { useEffect, useState } from 'react';
import './App.css';
import Login from "./pages/Login"
import Nav from "./pages/Nav"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import { Book } from './components/Book';
import { variables } from './Variables';

function App() {
    const [email, setEmail] = useState('');

    useEffect(() => {
        (
            async () => {
                const response = await fetch(variables.API_URL + 'user',
                    {
                        headers: {
                            'Accept': 'application/json, text/plain',
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                        credentials: 'include'
                    });

                if (response.status == 200) {
                    const content = await response.json;
                    setEmail(content.name);
                } else {
                    setEmail('');
                }
            }
        )();
    });

   

    return (
        <div className="App">

            <BrowserRouter>
                <Nav name={email} setName={setEmail} />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login setName={setEmail} />} />
                        <Route path="/register" element={<Register />} />                        
                        <Route path="/library" element={<Book />} />
                    </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
