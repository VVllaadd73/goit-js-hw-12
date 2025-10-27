import axios from 'axios';

export async function getImagesByQuery(query, page = 1) {
	return await axios
		.get('https://pixabay.com/api/' +
			'?key=' + '52802727-e127d4f3f7eb26b70bb46f136' +
			'&q=' + query +
			'&orientation=horizontal' +
			'&image_type=photo' +
			'&safesearch=true' +
			`&per_page=15` +
			'&page=' + page)
		.then(response => response.data);
};
