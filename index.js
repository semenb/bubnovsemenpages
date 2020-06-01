import elements from './gallery-items.js';

const list = document.querySelector('ul.gallery');

elements.forEach((item, index) => {
  const li = document.createElement('li');
  li.classList.add('gallery__item');

  const ref = document.createElement('a');
  ref.classList.add('gallery__link');
  ref.setAttribute('href', item.original);

  const img = document.createElement('img');
  img.classList.add('gallery__image');
  img.setAttribute('src', item.preview);
  img.setAttribute('data-source', item.original);
  img.setAttribute('data-index', index);
  img.setAttribute('alt', item.description);
  ref.appendChild(img);
  li.append(ref);
  list.appendChild(li);
});

const modal = document.querySelector('div.js-lightbox');
const modalImg = document.querySelector('img.lightbox__image');

list.addEventListener('click', e => {
  if (e.targe === e.currentTarget) return;

  e.preventDefault();
  modal.classList.add('is-open');
  modalImg.setAttribute('src', e.target.getAttribute('data-source'));
  modalImg.setAttribute('alt', e.target.getAttribute('alt'));
  modalImg.setAttribute('data-index2', e.target.getAttribute('data-index'));
});

const closeButton = document.querySelector('.lightbox__button');

const closeHandler = () => {
  modal.classList.remove('is-open');
  modalImg.setAttribute('src', '');
};

closeButton.addEventListener('click', closeHandler);
modal.addEventListener('click', closeHandler);

const arrowLeft = () => {
  const index = parseInt(modalImg.getAttribute('data-index2'));
  if (index === 0) return;

  const currImg = document.querySelector(`img[data-index2="${index}"]`);
  const prevImg = document.querySelector(`img[data-index="${index - 1}"]`);
  currImg.setAttribute('data-index2', index - 1);
  currImg.setAttribute('src', prevImg.getAttribute('data-source'));
};

const arrowRight = () => {
  const index = parseInt(modalImg.getAttribute('data-index2'));
  if (index === 8) return;

  const currImg = document.querySelector(`img[data-index2="${index}"]`);
  const prevImg = document.querySelector(`img[data-index="${index + 1}"]`);
  currImg.setAttribute('data-index2', index + 1);
  currImg.setAttribute('src', prevImg.getAttribute('data-source'));
};

list.addEventListener('keydown', e => {
  switch (e.key) {
    case 'Escape':
      closeHandler();
      break;
    case 'ArrowLeft':
      arrowLeft();
      break;
    case 'ArrowRight':
      arrowRight();
      break;
    default:
      break;
  }
});
