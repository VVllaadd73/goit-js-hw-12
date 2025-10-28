import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loadMoreButton = document.querySelector('.load_more');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

let lightbox;

export function createGallery(images) {
	const galleryHTML = images
		.map(
			image => `
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
      </li>`
		)
		.join('');

	gallery.insertAdjacentHTML('beforeend', galleryHTML);

	// 🟢 Якщо lightbox вже існує — оновлюємо
	if (lightbox) {
		lightbox.refresh();
	} else {
		// 🆕 Ініціалізуємо вперше
		lightbox = new SimpleLightbox('.gallery a', {
			captionsData: 'alt',
			captionDelay: 250,
		});
	}

	// 🟢 Додаємо обробники кожного разу (бо refresh може їх "зламати")
	lightbox.on('show.simplelightbox', () => {
		document.body.style.overflow = 'hidden';
	});

	lightbox.on('close.simplelightbox', () => {
		document.body.style.overflow = '';
	});
}

export function clearGallery() {
	gallery.innerHTML = '';
}

export function showLoader() {
	if (loader) loader.classList.remove('hidden');
}

export function hideLoader() {
	if (loader) loader.classList.add('hidden');
}

export function showLoadMoreButton() {
	loadMoreButton.classList.remove('hidden');
}

export function hideLoadMoreButton() {
	loadMoreButton.classList.add('hidden');
}
