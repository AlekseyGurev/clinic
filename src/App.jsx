import './App.css';
import { Header } from './components';
import { Login, RecordForm, RecordList } from './pages';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<RecordForm />} />
				<Route path="/records/" element={<RecordList />} />
				<Route path="/login" element={<Login />} />
				<Route path="*" element={<div>Страница не найдена</div>} />
			</Routes>
		</>
	);
}

export default App;
