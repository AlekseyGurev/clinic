export const getRecord = async (page, limit, searchText, token) =>
	await fetch(
		`http://localhost:3000/records?page=${page}&limit=${limit}&searchText=${searchText}&token=${token}`,
	);
