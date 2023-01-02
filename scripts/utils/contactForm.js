// permet d'ajoutée le nom du photographe dans la modal de contacy
async function fillName() {
  const name = await getPhotographers();
  name.forEach((el) => {
    const photographerName = document.querySelector('#Photographer-name');
    photographerName.innerHTML = el.name;
  });
}
//permet l'affichage de la modal
function displayModal() {
  const modal = document.getElementById('contact_modal');
  fillName();
  setAriaHidden(document.querySelector('main'), true);
  setAriaHidden(modal, false);
  modal.style.display = 'block';
  document.querySelector('#firstname').focus();
  document.querySelector('body').style.overflowY = 'hidden';
}
//ferme la modal en realisant un reset
function closeModal() {
  const modal = document.getElementById('contact_modal');
  const exit = document.querySelector('#exit-modal');
  const form = document.querySelector('#form');

  const firstname = document.querySelector('#firstname');
  const lastname = document.querySelector('#lastname');
  const email = document.querySelector('#email');
  const message = document.querySelector('#message');

  function close() {
    modal.style.display = 'none';
    resetForm([firstname, lastname, email, message]);
    form.reset();
    document.querySelector('body').style.overflowY = 'scroll';
    setAriaHidden(document.querySelector('main'), false);
    setAriaHidden(modal, true);
  }

  this.onkeydown = (event) => {
    if (modal.style.display === 'block') {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
    }
  };

  exit.onclick = () => {
    close();
  };

  exit.onkeydown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      close();
    }
  };
}

/**
 * Permet la soumission du formulaire
 */
function submitForm() {
  const form = document.querySelector('#form');
  const firstname = document.querySelector('#firstname');
  const lastname = document.querySelector('#lastname');
  const email = document.querySelector('#email');
  const message = document.querySelector('#message');
  //regex qui test la compatibilité des inforamtion envoyer
  // eslint-disable-next-line
  const regEmail = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
  // eslint-disable-next-line
  const regGen = new RegExp('^[a-zA-Z-]{5,2000}(\\s[a-zA-Z]{1,})*$');
  //permet de faire la varification des chamsp
  change(firstname, regGen, 'Veuillez entrer 5 caractères ou plus pour le champ du prénom');
  change(lastname, regGen, 'Veuillez entrer 5 caractères ou plus pour le champ du nom');
  change(email, regEmail, 'Veuillez entrer un email valide pour ce champ.');
  change(message, undefined, '');
// verifie si les champs sont valide pour la soumission
  if (checkValidity(firstname.parentElement) === 'true'
      && checkValidity(lastname.parentElement) === 'true'
      && checkValidity(email.parentElement) === 'true'
      && checkValidity(message.parentElement) === 'true') {
    const dataContact = {
      firstname : firstname.value,
      lastname : lastname.value,
      email : email.value,
      message : message.value,
    }
    console.log(dataContact);

    form.reset();
    const modal = document.getElementById('contact_modal');
    //ferme la modal et reset les champs
    modal.style.display = 'none';
    asginErrorOrValidity(firstname.parentElement, false, '', false, false);
    asginErrorOrValidity(lastname.parentElement, false, '', false, false);
    asginErrorOrValidity(email.parentElement, false, '', false, false);
    asginErrorOrValidity(message.parentElement, false, '', false, false);


  }
}
//permet la verifaction des champs en fonction des event input et change
// attribut une erreur ou une validation
function change(elements, regex, msg) {
  const form = document.querySelector('#form');

  function MessageVerify() {
    if (elements.id === 'message') {
      if (elements.value.trim().length < 10) {
        asginErrorOrValidity(elements.parentElement, false, 'Vous devez avoir 10 caractères minimum ', true, false);
      } else {
        asginErrorOrValidity(elements.parentElement, true, '', false, true);
      }
    }
  }
  elements.oninput = (e) => {
    e.preventDefault();
    MessageVerify();
    InputValidate(elements, regex, msg);
  };
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    MessageVerify();
    InputValidate(elements, regex, msg);
  });
}
//retourne la valeur de Data-Valid
function checkValidity(elements) {
  return elements.getAttribute('data-valid');
}
//permet l'assignement des message d'erreur ou de validation
// eslint-disable-next-line
function asginErrorOrValidity(Elements, dataValid, message, errVisible, validVisible) {
  Elements.setAttribute('data-error-visible', errVisible);
  Elements.setAttribute('data-valid-visible', validVisible);
  Elements.setAttribute('data-error', message);
  Elements.setAttribute('data-valid', dataValid);
}
//methode qui verifie si les element sont conforme au regex est envois
// des message d'erreur ou de validation
function InputValidate(elements, regex, message) {
  // eslint-disable-next-line
  if (regex === null) return;
  // eslint-disable-next-line
  if (regex === undefined) return 'le test ne doit pas être effectuer';
  const checkValidValue = regex.test(elements.value);

  if (checkValidValue) {
    asginErrorOrValidity(elements.parentElement, true, '', false, true);
  } else {
    asginErrorOrValidity(elements.parentElement, false, message, true, false);
  }
}
// permet la validation avec l'event Onsubmit
function validate() {
  const submit = document.querySelector('#submit');
  const form = document.querySelector('#form');

  form.onsubmit = (e) => {
    e.preventDefault();
    submitForm();
  };
}
// permet le reset des champs
function resetForm(Elements) {
  // eslint-disable-next-line
  for (const i of Elements) asginErrorOrValidity(i.parentElement, true, '', false, false);
}

submitForm();
validate();
closeModal();
