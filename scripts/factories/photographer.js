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
                    <h3>${city} , ${country}</h3>
                    <p class="tag">${tagline}</p>
                    <p class="price">${price}€/jour</p>
                `;
    return (article);
  }
  return { getUserCardDOM };
}
