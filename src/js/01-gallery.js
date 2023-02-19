// Add imports above this line
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
// Change code below this line

console.log(galleryItems);

const createGalleryImgMarkup = galleryImg => {
  const galleryMarkup = galleryImg
    .map(
      ({ original, preview, description }) =>
        `
<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" title="${description}" />
</a>
`
    )
    .join('');
  return galleryMarkup;
};

const insertGalleryImgMarkup = string => {
  const gallery = document.querySelector('.gallery');
  gallery.insertAdjacentHTML('beforeend', string);
};

console.log(createGalleryImgMarkup(galleryItems));

insertGalleryImgMarkup(createGalleryImgMarkup(galleryItems));

const galleryImgBox = document.querySelector('.gallery');

galleryImgBox.addEventListener('click', onGalleryImgClick);

let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'title',
});

function onGalleryImgClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
}
