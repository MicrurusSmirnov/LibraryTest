import React, { SyntheticEvent, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { variables } from '../Variables';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch(variables.API_URL + 'register',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

        if (response.status == 200) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to="/login" />
    }


    return (
        <form onSubmit={submit}>
            <main className="form-signin">
                <h1 className="h3 mb-3 fw-normal">Регистрация</h1>

                <div className="form-floating">
                    <input className="form-control" placeholder="Email" required
                        onChange={e => setEmail(e.target.value)}
                    />

                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" placeholder="Password" required
                        onChange={e => setPassword(e.target.value)}
                    />

                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit">Сохранить</button>
            </main>
        </form>
    );
};

export default Register;