/**
 * Fonction fetch qui retourne le JSon
 * @returns {Promise<any>}
 */
async function fetchData() {
  try {
    const res = await fetch('../../data/photographers.json');
    return await res.json();
  } catch (e) {
    return e;
  }
}

/**
 * fonction qui applique les resultats de la factory
 * @param photographers
 * @returns {Promise<void>}
 */
async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');
  //boucle forEach qui applique chaque resultat en fonction du resultat de la factory
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}
//initialise la fonction display data avec le retour du fetch
async function init() {
  const { photographers } = await fetchData();
  displayData(photographers);
}

init();
