selectFilter();
function openSelectMenu() {
    const cursor = document.querySelector('#cursor');
    const selector = document.querySelector('#selectlist');
    selector.classList.toggle('active')
    cursor.classList.toggle('rotate')
}

function selectFilter() {
    const list = document.querySelectorAll('#selectlist p');
    const cursorI = '<i id="cursor" class="fas fa-angle-down"></i>'
    
    list.forEach((el,index)=>{
        if(index === 0) {
            el.classList.remove('border')
            el.innerHTML += cursorI;
        }else {
            el.classList.add('border')
        }
        
        el.onclick = function (e){
            let target = e.target;
            let elements = document.querySelector(`#selectlist`).children;
            if(target !== elements[0]) {
                let defaultName =  elements[0].textContent;
                elements[0].textContent = elements[index].textContent;
                elements[0].innerHTML += cursorI;
                elements[0].firstElementChild.classList.toggle('rotate');
                elements[index].textContent = defaultName
            }
        }
    })
}

async function fetchData() {
    let res = await fetch("../../data/photographers.json")
    return await res.json();
}

function getId(){
        let link = new URL(window.location.href);
        let search_params = new URLSearchParams(link.search);
        if(!search_params.has('id'))  return console.error('Aucun parametre ID');

    return search_params.get('id');
}

async function getMedia() {
    let mediaData = await fetchData().then(async (e)=> e.media);

    const mediaFilter = mediaData.filter(function (el) {
        return el.photographerId.toString() === getId();
    });

    const media =
        [{
            "photographerId" : mediaFilter.photographerId,
            "id": mediaFilter.id,
            "date" : mediaFilter.date,
            "image" : mediaFilter.image,
            "video" : mediaFilter.video,
            "likes" : mediaFilter.likes,
            "price" : mediaFilter.price,
            "title" : mediaFilter.title,
        }]


    return ({media: [...mediaFilter]})
}

async function getPhotographers() {
    let data = await fetchData().then(async (e)=> e.photographers, getId());

    const PhotographersData = data.filter(function (el) {
        return el.id.toString() === getId();
    });

    const photographers=
        [ {
            "name":  PhotographersData.name,
            "id":  PhotographersData.id,
            "city": PhotographersData.city,
            "country": PhotographersData.country,
            "tagline": PhotographersData.tagline,
            "price": PhotographersData.price,
            "portrait":  PhotographersData.portrait,
        }]
    return ({photographers: [...PhotographersData]})
}


async function displayData(photographers, media) {
    const photographersSection = document.querySelector(".photograph-header");
    const mediaSection = document.querySelector("#Media-Content");
    const mediaSectionCard = document.querySelector(".Media-card");
    // const result = (mediaSection.childElementCount % 2  == 0) ? "even" : "odd";
    photographers.forEach((photographer) => {
        const photographerModel = photographerMediaFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.innerHTML += userCardDOM;
    });

    media.forEach((media) => {
        const mediaModel = MediaFactory(media);
        const userCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.innerHTML += userCardDOM;
    });
};

async function init() {
    const { photographers } = await getPhotographers();
    const { media } = await getMedia();
    displayData(photographers,media);
};

init();