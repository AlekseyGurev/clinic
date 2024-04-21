import { useForm } from 'react-hook-form';
import { addRecord } from '../../../api';
import { Modal } from '../../components/modal/modal';
import { useState } from 'react';
import styles from './record-form.module.css';

export const RecordForm = () => {
	const [isSend, setIsSend] = useState(false);
	const [isModal, setIsModal] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			fio: '',
			tel: '',
			text: '',
		},
	});

	const fioProps = {
		required: {
			value: true,
			message: 'Поле не должно быть пустым',
		},
	};
	const telProps = {
		required: {
			value: true,
			message: 'Поле не должно быть пустым',
		},
		pattern: {
			value: /\+7\d{3}\d{3}\d{2}\d{2}/,
			message: 'Неверный формат телефона +79113334455',
		},
	};

	const fioError = errors.fio?.message;
	const telError = errors.tel?.message;

	const sendData = async (formData) => {
		setIsSend(true);
		const response = await addRecord(formData);
		if (response.ok) {
			setIsSend(false);
			setIsModal(true);
			setIsOpen(true);
		}
		reset();
	};

	return (
		<>
			<Modal
				isOpen={isOpen}
				isSend={isModal}
				onClick={() => {
					setIsOpen(false);
				}}
			/>
			<form
				className={styles.form}
				onSubmit={handleSubmit((formData) => sendData(formData))}
			>
				<fieldset className={styles.border}>
					<legend>
						<span className={styles.title}>Запись к врачу</span>
					</legend>
					<ul className={styles.list}>
						<li className={styles.item}>
							<label className={styles.label} htmlFor="fio">
								ФИО
							</label>
							<input
								className={styles.input}
								type="text"
								id="fio"
								name="fio"
								{...register('fio', fioProps)}
							/>
							<span className={styles.error}>{fioError}</span>
						</li>
						<li className={styles.item}>
							<label className={styles.label} htmlFor="tel">
								Номер телефона
							</label>
							<input
								className={styles.input}
								type="text"
								id="tel"
								name="tel"
								{...register('tel', telProps)}
							/>
							<span className={styles.error}>{telError}</span>
						</li>
						<li className={styles.item}>
							<label className={styles.label} htmlFor="text">
								Опишите вашу проблему
							</label>
							<textarea
								className={styles.text}
								type="text"
								id="text"
								name="text"
								{...register('text')}
							/>
						</li>
					</ul>
				</fieldset>
				<button
					className={styles.button}
					type="submit"
					disabled={Object.keys(errors).length > 0 || isSend}
				>
					Отправить
				</button>
			</form>
		</>
	);
};
