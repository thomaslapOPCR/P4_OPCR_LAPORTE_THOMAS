async function fillName() {
  const test = await window.getPhotographers();
  test.forEach((el) => {
    const photographerName = document.querySelector('#Photographer-name');
    photographerName.innerHTML = el.name;
  });
}

// eslint-disable-next-line
function displayModal() {
  const modal = document.getElementById('contact_modal');
  fillName();
  modal.style.display = 'block';
}
// eslint-disable-next-line
function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
}

function submit() {
  const form = document.querySelector('#submit');
  const regEmail = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
  const regGen = new RegExp(/^.{2,}$/);

  form.onsubmit = function (e) {
    e.preventDefault();
  };
}

function checkValidity(elements) {
  if (elements.getAttribute('data-valid') === null) return false;
  return elements.getAttribute('data-valid');
}

function asginErrorOrValidity(Elements, dataValid, message, errVisible, validVisible) {
  Elements.setAttribute('data-error-visible', errVisible);
  Elements.setAttribute('data-valid-visible', validVisible);
  Elements.setAttribute('data-error', message);
  Elements.setAttribute('data-valid', dataValid);
}

function InputValidate(elements, regex, message) {
  const checkValidValue = regex.test(elements.value); // test de confirmitée des regex
  // verifie si le champ est vide Ou non
  if (elements.value.length <= 0) {
    asginErrorOrValidity(elements.parentElement, false, message, true, false);
    return false;
  }
  if (regex === null) return;
  // realise le test est assigne un message d'erreur ou de validation
  if (checkValidValue) {
    asginErrorOrValidity(elements.parentElement, true, '', false, true);
  } else {
    asginErrorOrValidity(elements.parentElement, false, message, true, false);
  }
}

submit();
