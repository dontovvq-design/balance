const navLinks = document.querySelector('#navLinks');
const menuToggle = document.querySelector('#menuToggle');
const bookingModal = document.querySelector('#bookingModal');
const closeBooking = document.querySelector('#closeBooking');
const bookingForm = document.querySelector('#bookingForm');
const bookingSuccess = document.querySelector('#bookingSuccess');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const closeLightbox = document.querySelector('#closeLightbox');

function openBooking() {
  bookingModal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  window.setTimeout(() => document.querySelector('#bookingName')?.focus(), 50);
}
function closeBookingModal() {
  bookingModal.classList.remove('is-open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.js-book').forEach((button) => button.addEventListener('click', openBooking));
closeBooking.addEventListener('click', closeBookingModal);
bookingModal.addEventListener('click', (event) => {
  if (event.target === bookingModal) closeBookingModal();
});
bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  bookingSuccess.classList.add('is-visible');
  bookingForm.reset();
});

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.filter-btn').forEach((button) => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  document.querySelectorAll('.filter-btn').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelectorAll('.service-row').forEach((card) => {
    card.hidden = filter !== 'all' && card.dataset.category !== filter;
  });
}));

document.querySelectorAll('.gallery-item').forEach((item) => item.addEventListener('click', () => {
  const image = item.dataset.image;
  lightboxImage.src = image;
  lightboxImage.alt = item.querySelector('img').alt;
  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}));
function closeLightboxModal() {
  lightbox.classList.remove('is-open');
  document.body.style.overflow = '';
  lightboxImage.src = '';
}
closeLightbox.addEventListener('click', closeLightboxModal);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightboxModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeBookingModal();
    closeLightboxModal();
  }
});

