import styles from './modal.module.css';

export const Modal = ({ isOpen, isSend, onClick }) => {
	if (!isOpen) {
		return null;
	}
	return (
		<div className={styles.container}>
			<div className={styles.overlay}>
				<div className={styles.modal}>
					<h3>
						{isSend
							? 'Запись отправлена в клинику'
							: 'Что-то пошло не так попробуте позже'}
					</h3>
					<div className={styles.buttons}>
						<button onClick={onClick}>закрыть</button>
					</div>
				</div>
			</div>
		</div>
	);
};
