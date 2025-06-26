import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const form = document.querySelector('.feedback-form');

const localStorageKey = 'feedback-form-state';
const savedState = localStorage.getItem(localStorageKey);

if (savedState) {
  try {
    const { email, message } = JSON.parse(savedState);
    form.elements.email.value = email || '';
    form.elements.message.value = message || '';
  } catch (error) {
    console.error('Veri ayrıştırılırken hata oluştu.', error);
    localStorage.removeItem(localStorageKey);
  }
}

form.addEventListener('input', event => {
  if (event.target.name === 'email' || event.target.name === 'message') {
    const formData = {
      email: form.elements.email.value.trim(),
      message: form.elements.message.value.trim(),
    };
    localStorage.setItem(localStorageKey, JSON.stringify(formData));
  }
});

form.addEventListener('submit', evt => {
  evt.preventDefault();

  const emailValue = form.elements.email.value.trim();
  const messageValue = form.elements.message.value.trim();

  if (!emailValue || !messageValue) {
    alert('Lütfen tüm alanları doldurunuz!');
    return;
  }

  console.log({
    email: emailValue,
    message: messageValue,
  });

  localStorage.removeItem(localStorageKey);
  form.reset();
});
