async function fillName() {
  const name = await getPhotographers();
  name.forEach((el) => {
    const photographerName = document.querySelector('#Photographer-name');
    photographerName.innerHTML = el.name;
  });
}

// eslint-disable-next-line
function displayModal() {
  const modal = document.getElementById('contact_modal');
  fillName();
  setAriaHidden(document.querySelector('main'),false);
  setAriaHidden(modal,true);
  modal.style.display = 'block';
  document.querySelector('#firstname').focus()
  document.querySelector('body').style.overflowY = 'hidden';
}
// eslint-disable-next-line
function closeModal() {
  const modal = document.getElementById('contact_modal');
  const exit = document.querySelector('#exit-modal');
  const form = document.querySelector('#form')


  const firstname = document.querySelector('#firstname');
  const lastname = document.querySelector('#lastname');
  const email = document.querySelector('#email');
  const message = document.querySelector('#message');

  function close() {
    modal.style.display = 'none';
    resetForm([firstname,lastname,email,message])
    form.reset();
    document.querySelector('body').style.overflowY = 'scroll';
    setAriaHidden(document.querySelector('main'),true);
    setAriaHidden(modal,false);
  }

  this.onkeydown = function (event) {
    if(modal.style.display === 'block'){
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    }

  }

  exit.onclick = function () {
    close();
  }

  exit.onkeydown = function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      close();
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
  const regGen = new RegExp('^[a-zA-Z-]{10,2000}(\\s[a-zA-Z]{1,})*$')

  change(firstname,regGen,'Veuillez entrer 5 caractères ou plus pour le champ du prénom');
  change(lastname,regGen,'Veuillez entrer 5 caractères ou plus pour le champ du nom');
  change(email,regEmail,'Veuillez entrer un email valide pour ce champ.');
  change(message,undefined,'');

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
    return false
  }
}

function change(elements,regex,msg){
  const form = document.querySelector('#form')

  function MessageVerify(){
    if(elements.id ==='message') {
      if(elements.value.trim().length <10){
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
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    MessageVerify();
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
  if (regex === null) return;
  if (regex === undefined) return 'le test ne doit pas être effectuer'
  const checkValidValue = regex.test(elements.value);

  if (checkValidValue) {
    asginErrorOrValidity(elements.parentElement, true, '', false, true);
  } else {
    asginErrorOrValidity(elements.parentElement, false, message, true, false);
  }
}


function validate() {
  const submit = document.querySelector('#submit');
  const form = document.querySelector('#form')

  form.onsubmit = function (e) {
    e.preventDefault();
    submitForm();
  }
}

function resetForm(Elements) {
  for(let i of Elements) asginErrorOrValidity(i.parentElement, true, '', false, false);
}


submitForm();
validate();
closeModal();