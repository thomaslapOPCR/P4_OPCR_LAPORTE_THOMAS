
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
    try {
        let res = await fetch("../../data/photographers.json");
        return await res.json();
    } catch (e) {
        return console.error(e);
    }
}

function getId(){
        let link = new URL(window.location.href);
        let search_params = new URLSearchParams(link.search);
        if(!search_params.has('id'))  return console.error('Aucun parametre ID');

    return search_params.get('id');
}

async function getMedia() {

    let mediaData = await fetchData()

    return mediaData.media.filter(function (el) {
        let id =  el.photographerId;
         return id.toString() === getId();
     });
}

async function getPhotographers() {
    const data = await fetchData();
    return data.photographers.filter(function (el) {
        return el.id.toString() === getId();
    });
}

async function displayData(photographers, media) {
    const photographersSection = document.querySelector(".photograph-header");
    const mediaSection = document.querySelector("#Media-Content");
    const mediaSectionCard = document.querySelector(".Media-card");

    photographers.forEach((photographer) => {
        const photographerModel = photographerMediaFactory(photographer);
        photographersSection.innerHTML = photographerModel.getUserCardDOM();
    });

    media.forEach((media) => {
        const mediaModel = MediaFactory(media);
        mediaSection.appendChild(mediaModel.getMediaCardDOM());
    });
}

async function init() {
    await displayData(await getPhotographers(), await getMedia());
}

async function fillSubBar() {
    const domLikes = document.querySelector("#numberLikes");
    const domPhotographerPrice = document.querySelector('#price');
    const mediaContent = document.querySelectorAll('#Media-Content');
    const photographersPrice = await getPhotographers();
    const numberOfLikes = await getMedia();

    let totalLikes = 0;

    for(let data of numberOfLikes) totalLikes += data.likes;
    domLikes.textContent = totalLikes.toLocaleString();
    domPhotographerPrice.textContent = photographersPrice[0].price + "€ / jour";

    for(let i of mediaContent[0].children) {
      const likesElements = i.children[1].lastElementChild;
      let isLiked = false;

      i.addEventListener('click',(e)=>{
          if(e.target.className === "media-likes") return;
          openLightBox();
      })

      likesElements.addEventListener('click',
          ()=>{
              console.log(likesElements)
          let likes = parseInt(likesElements.textContent);
          // isLiked  ? likes= parseInt(likes-1) : likes= parseInt(likes+1);
          if(isLiked=== false){
              likes= parseInt(likes+1)
              isLiked = true;
              domLikes.textContent =parseInt(  totalLikes = totalLikes+1).toLocaleString();
          } else if(isLiked===true) {
              likes= parseInt(likes-1)
              isLiked = false;
              domLikes.textContent =parseInt(  totalLikes = totalLikes-1).toLocaleString();
          }
              likesElements.innerHTML = likes +`<i class="fas fa-heart">`;
      })
    }
}


//lightBox
function openLightBox(){
}

init();
fillSubBar();
selectFilter();
