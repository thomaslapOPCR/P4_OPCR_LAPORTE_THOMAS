function photographerFactory(data) {
    const { name, portrait, id,city,country,tagline,price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.setAttribute('id', id);
        
        article.innerHTML = `
                    <a href="photographer.html?id=${id}">
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

    switch (photographerId) {
        case 243:{
            name = "Mimi";
            break;
        }

        case 930:{
            name = "Ellie-Rose";
            break;
        }

        case 82:{
            name = "Tracy";
            break;
        }

        case 527:{
            name = "Nabeel";
            break;
        }

        case 925:{
            name = "Rhode";
            break;
        }

        case 195:{
            name = "Marcel";
            break;
        }
        default:{
            break;
        }
    }


    const picture = `assets/photos/${name}/${image}`;
    const videoSrc = `assets/photos/${name}/${video}`;
    let mediaSupport;

    if(data.video !== undefined) {
        mediaSupport = `<video controls src="${videoSrc}" type="video/mp4"></video>`
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


