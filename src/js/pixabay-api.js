import axios from 'axios';

export function getImagesByQuery(query) {
	return axios
		.get('https://pixabay.com/api/' +
			'?key=' + '52802727-e127d4f3f7eb26b70bb46f136' +
			'&q=' + encodeURIComponent(query) +
			'&orientation=horizontal' +
			'&image_type=photo' +
			'&safesearch=true')
		.then(response => response.data)
		.catch(error => {
			console.log(error);
		});
}