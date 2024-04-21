import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

export const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const exit = () => {
		Cookies.remove('token');
		navigate('/login');
	};
	return (
		<div className={styles.container}>
			{location.pathname != '/' ? (
				<Link className={styles.buttonLogin} to="/">
					Заявка
				</Link>
			) : null}

			{location.pathname != '/login' && location.pathname != '/records' ? (
				<Link className={styles.buttonLogin} to="/login">
					Вход
				</Link>
			) : null}

			{location.pathname != '/' && location.pathname != '/login' ? (
				<button
					className={styles.buttonLogin}
					onClick={() => {
						exit();
					}}
				>
					Выход
				</button>
			) : null}
		</div>
	);
};
