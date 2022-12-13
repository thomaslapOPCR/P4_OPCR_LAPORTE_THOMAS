async function fetchData() {
  try {
    const res = await fetch('../../data/photographers.json');
    return await res.json();
  } catch (e) {
    return console.error(e);
  }
}

function getId() {
  const link = new URL(window.location.href);
  const searchParams = new URLSearchParams(link.search);
  let IdList = ["82","195","243","527","925","930"].includes(searchParams.get('id'));
  if (!searchParams.has('id') || !IdList) {
    console.error('parameter ID not found');
    return location.href = "index.html"
  }
  return searchParams.get('id');
}

async function getMedia() {
  const mediaData = await fetchData();
  return mediaData.media.filter((el) => el.photographerId.toString() === getId());
}

async function getPhotographers() {
  const data = await fetchData();
  return data.photographers.filter((el) => el.id.toString() === getId());
}

async function displayData(photographers, media, lightbox) {
  const photographersSection = document.querySelector('.photograph-header');
  const mediaSection = document.querySelector('#Media-Content');
  const lightBoxSection = document.querySelector('#lightBox');

  photographers.forEach((photographer) => {
    const photographerModel = photographerMediaFactory(photographer);
    photographersSection.innerHTML = photographerModel.getUserCardDOM();
  });

  media.forEach((media) => {
    const mediaModel = MediaFactory(media);
    mediaSection.appendChild(mediaModel.getMediaCardDOM());
  });

  lightbox.forEach((lightbox) => {

    const lightboxModel = MediaFactory(lightbox);
    lightBoxSection.appendChild(lightboxModel.getMediaLightBoxCardDOM())
  });
}

async function init() {
  await displayData(await getPhotographers(), await asingSort(),await asingSort());
}

async function fillSubBar() {
  const domLikes = document.querySelector('#numberLikes');
  const domPhotographerPrice = document.querySelector('#price');
  const photographersPrice = await getPhotographers();
  const numberOfLikes = await getMedia();
  let totalLikes = 0;

  for (const data of numberOfLikes) totalLikes += data.likes;
  domLikes.textContent = totalLikes.toLocaleString();
  domPhotographerPrice.textContent = `${photographersPrice[0].price}€ / jour`;

}

function likes(el){

  const likesElements = el.lastElementChild

  let isLiked = likesElements.getAttribute('data-isLike')
  const domLikes = document.querySelector('#numberLikes');

    let likes = parseInt(likesElements.textContent);
    let totalLikes = parseInt(domLikes.textContent);

    function likeUtils (CalcLikes,CalcTotalLike,iconsHeart) {
      likes = parseInt(CalcLikes)
      domLikes.textContent = parseInt(CalcTotalLike).toLocaleString()
      likesElements.innerHTML = `${likes} ` + iconsHeart;
    }

     function like() {

      if(isLiked === "true") {
        likesElements.setAttribute(`data-isLike`, false)
        likeUtils(likes - 1,
            totalLikes -= 1,
            '<i class="fal fa-heart">')
      }

      if(isLiked === "false") {
        likesElements.setAttribute(`data-isLike`,true)
        likeUtils(likes + 1, totalLikes += 1,  '<i class="fas fa-heart">')
    }
  }

  return like();
}



async function fillLightBox(Element) {
  const items = Element.parentNode;
  const lightbox = document.querySelector('#lightBox')
  const target = document.querySelector(`.${items.id}`)


  const exit = target.firstElementChild;


  const g = lightbox.children;

  target.classList.add('active');


  t();
  function t(){
    for (let i = 0; i < g.length; i++) {

      const leftArrow = g[i].children[1].children[0];
      const rightArrow = g[i].children[1].children[2];
      const exit = g[i].firstElementChild;

      exit.onclick = function (e) {
        e.preventDefault()
        closeLightBox(g[i]);
      }

      exit.onkeydown = function (e) {
        e.preventDefault()
        if(e.key === "Enter") closeLightBox(g[i]);
      }

      document.onkeydown = function (e) {
        if (e.key === "Escape") closeLightBox(g[i]);
        // if(e.key === "ArrowLeft") left(i,g[i],g.length);
        // if(e.key === "ArrowRight") right(i,g[i],g.length)
      }
      // leftArrow.onkeydown = function (e) {
      //   e.preventDefault()
      //   if(e.key === "Enter") left(i,g[i],g.length);
      // }
      //
      // rightArrow.onkeydown = function (e) {
      //   e.preventDefault()
      //   if(e.key === "Enter") right(i,g[i],g.length);
      // }



        leftArrow.addEventListener('click',(e)=>{

          e.preventDefault();

          g[i].classList.remove('active')
          i--;
          g[i].classList.add('active');
          if(g[i]<=0) i=1;

        })

        rightArrow.addEventListener('click',(e)=>{

          e.preventDefault();
          g[i].classList.remove('active')
          i++;
          g[i].classList.add('active');
          if(g[i]>= g.length) i=1;

        })

    }


  }
  open();

  setAriaHidden(document.querySelector('main'),false);
  setAriaHidden(lightbox,true);

  function open(){
    lightbox.classList.add('active');
    lightbox.focus();
  }

  function closeLightBox(i) {
    lightbox.classList.remove('active');
    i.classList.remove('active');
    setAriaHidden(document.querySelector('main'),true);
    setAriaHidden(lightbox,false);
  }

}

/**
 *
 * @param element {HTMLElement}
 * @param boolean
 */
function setAriaHidden(element,boolean){
  return element.setAttribute('aria-hidden',boolean);
}



fillSubBar();
init();


