async function fillName() {
  const name = await window.getPhotographers();
  name.forEach((el) => {
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
  const exit = document.querySelector('#exit-modal');

  exit.onclick = function () {
    modal.style.display = 'none';
  }
  document.onkeydown = function (event) {
    if (event.key === "Escape") {
      event.preventDefault();
      modal.style.display = 'none';
    }
  }
}

function submitForm(){
  const form = document.querySelector('#form')
  const firstname = document.querySelector('#firstname');
  const lastname = document.querySelector('#lastname');
  const email = document.querySelector('#email');
  const message = document.querySelector('#message');
  const regEmail = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
  const regGen = new RegExp(/^.{2,}$/);

  change(firstname,regGen,'Veuillez entrer 2 caractères ou plus pour le champ du prénom');
  change(lastname,regGen,'Veuillez entrer 2 caractères ou plus pour le champ du nom');
  change(email,regEmail,'Veuillez entrer un email valide pour ce champ.');
  change(message,regGen,'Veuillez entrer 2 caractères ou plus pour le champ du prénom');

  if(checkValidity(firstname.parentElement) === "true" &&
      checkValidity(lastname.parentElement) === "true"  &&
      checkValidity(email.parentElement) === "true"  &&
      checkValidity(message.parentElement) === "true")
  {
    console.log('Valide')
    form.reset();
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none';
    asginErrorOrValidity(firstname.parentElement, false, '', false, false);
    asginErrorOrValidity(lastname.parentElement, false, '', false, false);
    asginErrorOrValidity(email.parentElement, false, '', false, false);
    asginErrorOrValidity(message.parentElement, false, '', false, false);
  }else {
    console.log('erreur')
    return false
  }
}

function change(elements,regex,msg){
  const form = document.querySelector('#form')
  elements.oninput = (e) => {
    e.preventDefault();
    InputValidate(elements, regex, msg);
  };
  form.addEventListener('submit', (e)=>{
    console.log("test3")
    e.preventDefault();
    InputValidate(elements, regex, msg);
  })

}

function checkValidity(elements) {
  return elements.getAttribute('data-valid');
}

function asginErrorOrValidity(Elements, dataValid, message, errVisible, validVisible) {
  Elements.setAttribute('data-error-visible', errVisible);
  Elements.setAttribute('data-valid-visible', validVisible);
  Elements.setAttribute('data-error', message);
  Elements.setAttribute('data-valid', dataValid);
}

function InputValidate(elements, regex, message) {
  const checkValidValue = regex.test(elements.value);
  if (regex === null) return;

  if (checkValidValue) {
    asginErrorOrValidity(elements.parentElement, true, '', false, true);
  } else {
    asginErrorOrValidity(elements.parentElement, false, message, true, false);
  }
}


function validate() {
  const submit = document.querySelector('#submit');
  const form = document.querySelector('#form')
  submit.onkeydown = function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      submitForm();

    }
  }
  form.onsubmit = function (e) {
    e.preventDefault();
    submitForm();
  }
}

submitForm();
validate();
closeModal();