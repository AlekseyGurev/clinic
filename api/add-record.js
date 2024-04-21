export const addRecord = (data) =>
	fetch(`http://localhost:3000/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify(data),
	});
