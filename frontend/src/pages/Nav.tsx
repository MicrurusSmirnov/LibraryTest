import { Link } from 'react-router-dom';
import { variables } from '../Variables';

const Nav = (props: { name: string, setName: (name: string) => void }) => {
    const logout = async () => {
        await fetch(variables.API_URL + 'logout',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                credentials: 'include',                
            });

        props.setName('');
    }

    let menu;

    if (props.name == '') {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <Link to="/login" className="nav-link active" aria-current="page">Вход</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Регистрация</Link>
                </li>

            </ul>
        )
    } else {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <Link to="/library" className="nav-link active" aria-current="page">Библиотека</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link" onClick={logout}>Выход</Link>
                </li>

            </ul>
        )
    }


    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Главная</Link>

                <div>
                    {menu}
                </div>
            </div>
        </nav>
    );
};

export default Nav;