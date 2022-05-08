import React, { SyntheticEvent, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { variables } from '../Variables';

const Login = (props: { setName: (name: string) => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch(variables.API_URL + 'login',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    password
                })
            });

        if (response.status == 200) {
            const content = await response.json;

            setRedirect(true);

            props.setName(content.name);
        } else {
            props.setName('');
        }
    }

    if (redirect) {
        return <Navigate to="/library" />
    }

    return (
        <form onSubmit={submit}>
            <main className="form-signin">
                <h1 className="h3 mb-3 fw-normal">Авторизация</h1>

                <div className="form-floating">
                    <input className="form-control" placeholder="Email"
                        onChange={e => setEmail(e.target.value)}
                    />

                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />

                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit">Вход</button>
            </main>
        </form>
    );
};

export default Login;
