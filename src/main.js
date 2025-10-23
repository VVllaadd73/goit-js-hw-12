import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';

const form = document.querySelector('.form');
const input = form.elements['search-text'];

form.addEventListener("submit", clickSearch);

function clickSearch(event) {
	event.preventDefault();

	const query = input.value.trim();

	if (!query) {
		iziToast.warning({
			title: 'Warning',
			message: 'Please enter a search query.',
		});
		return;
	}

	showLoader();
	clearGallery();

	getImagesByQuery(query)
		.then(data => {
			hideLoader();

			if (data.hits.length === 0) {
				iziToast.error({
					title: 'No results',
					message: 'Sorry, there are no images matching your search query. Please try again!',
					position: 'center',
					timeout: 3000,
				});
				return;
			}

			createGallery(data.hits);
			input.value = '';
		})
		.catch(error => {
			hideLoader();
			iziToast.error({
				title: 'Error',
				message: 'Something went wrong. Please try again later.',
			});
			console.error(error);
		});
}
