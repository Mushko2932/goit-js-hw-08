import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

// отримуємо посилання
const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
  inputEmail: document.querySelector('input[name = "email"]'),
  textareaValue: document.querySelector('textarea[name = "message"]'),
};

const formData = {};

fillTextarea();

// додаємо слухача подій та throttle
refs.feedbackForm.addEventListener('submit', onFeedbackFormSubmit);
refs.feedbackForm.addEventListener('input', throttle(onFeedbackFormInput, 500));

// відстежуємо на формі подію input, і щоразу записуємо у локальне сховище об'єкт
function onFeedbackFormInput(e) {
    formData[e.target.name] = e.target.value;
    // console.log(formData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

// під час завантаження сторінки перевіряємо стан сховища, якщо там є збережені дані, заповнюємо ними поля форми
function fillTextarea() {
  let storedValue = localStorage.getItem(STORAGE_KEY);
    if (storedValue) {
        storedValue = JSON.parse(storedValue);
        Object.entries(storedValue).forEach(([name, value]) => {
            formData[name] = value;
            refs.feedbackForm.elements[name].value = value;
        });
    };
};

// під час сабміту форми очищуємо сховище і поля форми, виводимо у консоль об'єкт
function onFeedbackFormSubmit(e) {
  e.preventDefault();
  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
};




