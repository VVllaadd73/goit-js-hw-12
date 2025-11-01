import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
	createGallery,
	clearGallery,
	showLoader,
	hideLoader,
	showLoadMoreButton,
	hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const input = form.elements['search-text'];
const loadMoreButton = document.querySelector('.load_more');

const paramErr = {
	title: 'No results',
	message: 'Sorry, there are no images matching your search query. Please try again!',
	position: 'center',
	timeout: 3000,
};

const paramInfo = {
	title: 'End of results',
	message: "We're sorry, but you've reached the end of search results.",
	position: 'center',
	timeout: 4000,
};

const paramErrS = {
	title: 'Error',
	message: 'Something went wrong. Please try again later.',
	position: 'center',
	timeout: 3000,
};

let page = 1;
let totalPages = 0;
let search = '';

const clickSearch = async (event) => {
	event.preventDefault();

	hideLoadMoreButton();

	const query = input.value.trim();

	if (!query) {
		iziToast.warning({
			title: 'Warning',
			message: 'Please enter a search query.',
			position: 'center',
			timeout: 3000,
		});
		return;
	}

	search = query;
	page = 1;
	clearGallery();
	showLoader();

	try {
		const data = await getImagesByQuery(search, page);
		hideLoader();

		if (data.hits.length === 0) {
			iziToast.error(paramErr);
			return;
		}

		createGallery(data.hits);
		totalPages = Math.ceil(data.totalHits / 15);
		input.value = '';

		if (page < totalPages) {
			showLoadMoreButton();
		} else {
			iziToast.info(paramInfo);
			hideLoadMoreButton();
		}
	} catch (error) {
		hideLoader();
		iziToast.error(paramErrS);
	}
}

form.addEventListener('submit', clickSearch);
loadMoreButton.addEventListener('click', nextPage);

async function nextPage() {
	if (page >= totalPages) {
		hideLoadMoreButton();
		iziToast.info(paramInfo);
		return;
	}

	page += 1;
	showLoader();

	try {
		const data = await getImagesByQuery(search, page);
		hideLoader();

		if (data.hits.length === 0) {
			iziToast.error(paramErr);
			return;
		}

		createGallery(data.hits);

		const firstCard = document.querySelector('.gallery .cart');
		if (firstCard) {
			const cardHeight = firstCard.getBoundingClientRect().height;
			window.scrollBy({
				top: cardHeight * 2,
				behavior: 'smooth',
			});
		}

		if (page >= totalPages) {
			hideLoadMoreButton();
			iziToast.info(paramInfo);
		}
	} catch (error) {
		hideLoader();
		iziToast.error(paramErrS);
	}
}
