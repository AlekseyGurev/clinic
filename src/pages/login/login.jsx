import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { sendLogin } from '../../../api';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import Cookies from 'js-cookie';

export const Login = () => {
	const navigate = useNavigate();
	const [errorAut, setErrorAuth] = useState(false);
	const { register, handleSubmit, reset } = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
	});

	const sendAuth = async (authData) => {
		const auth = await sendLogin(authData)
			.then((data) => data.json())
			.then((data) => data);

		if (!auth.error) {
			Cookies.set('token', auth.token);
			navigate('/records');
			setErrorAuth(!auth.error);
			reset();
		}
		setErrorAuth(auth.error);
	};

	return (
		<div className={styles.container}>
			<h2>Авторизация</h2>
			<form
				className={styles.containerForm}
				onSubmit={handleSubmit((authData) => sendAuth(authData))}
			>
				<input
					className={styles.field}
					type="text"
					id="login"
					placeholder="Логин..."
					{...register('login')}
				></input>
				<input
					className={styles.field}
					type="password"
					id="password"
					placeholder="Пароль..."
					{...register('password')}
				></input>
				{errorAut && (
					<span className={styles.error}>Неверный логин или пароль</span>
				)}
				<button className={styles.button} type="submit">
					Войти
				</button>
			</form>
		</div>
	);
};
