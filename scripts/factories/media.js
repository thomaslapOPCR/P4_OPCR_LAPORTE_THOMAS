// eslint-disable-next-line
function photographerMediaFactory(data) {
    const {
        name, portrait, id, city, country, tagline, price,
    } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const photographerHeader = `
         <section class="text-content">
             <h1>${name}</h1>
             <h2>${city} , ${country}</h2>
             <p> ${tagline}</p>
        </section>
        <button class="contact_button" onclick="displayModal()" aria-label="Contact Me ${name}">Contactez-moi</button>
        <section class="image">
            <img src="../../assets/photographers/${portrait}" alt="${name}">
        </section> `;
        return (photographerHeader);
    }
    return { getUserCardDOM };
}
// eslint-disable-next-line
function MediaFactory(data) {
    const name = '';
    const {
        date, id, photographerId, image, video, likes, title, price,
    } = data;

    const picture = `assets/photos/${photographerId}/${image}`;
    const videoSrc = `assets/photos/${photographerId}/${video}`;
    let mediaSupport;

    // console.log(title,image)
    // if(video === undefined || image === undefined ){
    //     console.log('test')
    //     mediaSupport = `<img src="asset/images/InvalidImage.png" alt="Image invalide ${title}">`;
    // }
    //


    if (data.video !== undefined) {
        mediaSupport = `<video src="${videoSrc}" type="video/mp4" aria-label="video ${title}"></video>`;
    } else if (data.image !== undefined) {
        mediaSupport = `<img src="${picture}" alt="${title}">`;
    }


    function getMediaCardDOM() {
        const Media = document.createElement('a');
        Media.setAttribute('id', id);
        Media.setAttribute('data-date', date);
        Media.setAttribute('href', "#");
        Media.setAttribute('class', 'Media-card');
        Media.setAttribute('aria-label',  title+"closeup view");
        Media.setAttribute('tabindex', 0);

        Media.innerHTML = `
                <div class="media" >
                    ${mediaSupport}
                </div>
                <div class="titleAndLikes">
                    <h3 class="media-title">${title}</h3>
                    <p class="media-likes" aria-label="likes" tabindex="0" role="button" enterkeyhint="enter">${likes}<i class="fal fa-heart"></i></i></p>
                </div>
           `;
        return (Media);
    }

    return { getMediaCardDOM };
}
