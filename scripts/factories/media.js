// eslint-disable-next-line
function photographerMediaFactory(data) {
    const {
        name, portrait, id, city, country, tagline, price,
    } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const photographerHeader = `
         <section class="text-content" tabindex="0">
             <h1>${name}</h1>
             <h2>${city} , ${country}</h2>
             <p> ${tagline}</p>
        </section>
        <button class="contact_button" alt="Boutton de contact ${name}" onclick="displayModal()" aria-label="Contact Me ${name}">Contactez-moi</button>
        <section class="image">
            <img src="../../assets/photographers/${portrait}" alt="${name}">
        </section> `;
        return (photographerHeader);
    }
    return { getUserCardDOM };
}

// eslint-disable-next-line
function MediaFactory(data,index) {

    const {
        date, id, photographerId, image, video, likes, title, price,
    } = data;
    const Invalid = `<img className="media img" src="assets/images/InvalidImage.png" aria-label="Image invalide ${title}">`




    let picture = `assets/photos/${photographerId}/${image}`;
    let videoSrc = `assets/photos/${photographerId}/${video}`;
    let mediaSupport;

    if (data.video !== undefined) {
        datatype = 'video';
        mediaSupport = `<video id="M${id}" class="media ${datatype}" src="${videoSrc}" type="video" aria-label="video ${title}"></video>`;
    }


    if (data.image !== undefined) {
        datatype = 'img'
        mediaSupport = `<img id="M${id}" class="media ${datatype}" src="${picture}" alt="${title}">`;
    }





    function getMediaCardDOM() {

        const Media = document.createElement('article');
        Media.setAttribute('id', `A${id}`);
        Media.setAttribute('data-date', date);
        Media.setAttribute('data-index', index);
        Media.setAttribute('class', 'Media-card');
        Media.setAttribute('tabindex', '0');
        //href="javascript:fillLightBox()"
        Media.innerHTML = `
                <a href="javascript:void(0)" class="lightboxSection" role="button" aria-label="${title + "closeup view"}" tabindex="-1">
                    ${mediaSupport}
                </a>
                <div class="titleAndLikes" onclick="likes(this)" onkeydown="this.onkeydown =  (e) => {if(e.key ==='Enter') likes(this)}">
                    <h3 class="media-title">${title}</h3>
                    <p class="media-likes" aria-label="likes"  tabindex="0" role="button" data-isLike="false">${likes}<i class="fal fa-heart"></i></i></p>
                </div>
           `;
        return (Media);
    }

    function getMediaLightBoxCardDOM() {

        return (mediaSupport);
    }

    return { getMediaCardDOM , getMediaLightBoxCardDOM};
}




