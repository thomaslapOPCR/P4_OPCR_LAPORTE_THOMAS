function photographerFactory(data) {
  const {
    name, portrait, id, city, country, tagline, price,
  } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    article.setAttribute('id', id);

    article.innerHTML = `
                    <a href="photographer.html?id=${id}" aria-label="lien vers la page du photographe : ${name}">
                        <img src="assets/photographers/${portrait}" alt="${name}">
                        <h2>${name}</h2>
                    </a>
                    <h3 tabindex="0">${city} , ${country}</h3>
                    <p class="tag" tabindex="0" aria-label="${tagline}">${tagline}</p>
                    <p class="price" tabindex="0" aria-label="${price}€/jour">${price}€/jour</p>
                `;
    return (article);
  }
  return { getUserCardDOM };
}
