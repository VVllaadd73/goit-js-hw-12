import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
	captionsData: 'alt',
	captionDelay: 250,
});

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

export function createGallery(images) {
	const galleryHTML = images
		.map(image => `
			<li class="cart">
				<a class="photo_link" href="${image.largeImageURL}">
					<img class="photo_image" src="${image.webformatURL}" alt="${image.tags}" />
				</a>
				<div class="photo_info">
					<p><b>Likes:</b> ${image.likes}</p>
					<p><b>Views:</b> ${image.views}</p>
					<p><b>Comments:</b> ${image.comments}</p>
					<p><b>Downloads:</b> ${image.downloads}</p>
				</div>
			</li>`)
		.join('');

	gallery.insertAdjacentHTML('beforeend', galleryHTML);
	lightbox.refresh();
}

export function clearGallery() {
	gallery.innerHTML = '';
}

export function showLoader() {
	if (loader) {
		loader.classList.remove('hidden');
	}
}

export function hideLoader() {
	if (loader) {
		loader.classList.add('hidden');
	}
}