import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '52802727-e127d4f3f7eb26b70bb46f136';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
	const params = new URLSearchParams({
		key: API_KEY,
		q: query,
		orientation: 'horizontal',
		image_type: 'photo',
		safesearch: 'true',
		per_page: PER_PAGE,
		page,
	});

	const response = await axios.get(`${BASE_URL}?${params.toString()}`);
	return response.data;
}
