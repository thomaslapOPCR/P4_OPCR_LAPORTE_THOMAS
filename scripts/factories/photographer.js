function photographerFactory(data) {
    const { name, portrait, id,city,country,tagline,price } = data;

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
    return  {getUserCardDOM }
}


function photographerMediaFactory(data) {
    const { name, portrait, id,city,country,tagline,price } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const photographerHeader = `
         <section class="text-content">
             <h1>${name}</h1>
             <h2>${city} , ${country}</h2>
             <p> ${tagline}</p>
        </section>
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        <section class="image">
            <img src="../../assets/photographers/${portrait}" alt="${name}">
        </section> `
        return (photographerHeader);
    }
    return {getUserCardDOM}
}


function MediaFactory(data) {
    let name = "";
    const {date, id, photographerId, image,video, likes, title, price} = data;

    const picture = `assets/photos/${photographerId}/${image}`;
    const videoSrc = `assets/photos/${photographerId}/${video}`;
    let mediaSupport;

    if(data.video !== undefined) {
        mediaSupport = `<video controls src="${videoSrc}" type="video/mp4" aria-label="video ${title}"></video>`
    }else if(data.image !== undefined){
        mediaSupport = `<img src="${picture}" alt="${title}">`;
    }

    function getMediaCardDOM() {
        const Media = document.createElement('article');
        Media.setAttribute('id', id);
        Media.setAttribute('data-date', date);
        Media.setAttribute('class', "Media-card");

        Media.innerHTML = `
                <div class="media">
                    ${mediaSupport}
                </div>
                <div class="titleAndLikes">
                    <h3 class="media-title">${title}</h3>
                    <p class="media-likes">${likes}<i class="fas fa-heart"></i></p>
                </div>
           `
        return (Media);
    }

    return {getMediaCardDOM}
}


//