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

async function displayData(photographers, media) {
  const photographersSection = document.querySelector('.photograph-header');
  const mediaSection = document.querySelector('#Media-Content');
  const lightbox = document.querySelector('#lightBox')
  photographers.forEach((photographer) => {
    const photographerModel = photographerMediaFactory(photographer);
    photographersSection.innerHTML = photographerModel.getUserCardDOM();
  });

  media.forEach((media) => {
    likes()
    const mediaModel = MediaFactory(media);
    mediaSection.appendChild(mediaModel.getMediaCardDOM());
  });
}

async function init() {

  await displayData(await getPhotographers(), await asingSort());
}

async function fillSubBar() {
  //bug
  const domLikes = document.querySelector('#numberLikes');
  const domPhotographerPrice = document.querySelector('#price');
  const mediaContent = document.querySelectorAll('#Media-Content');
  const photographersPrice = await getPhotographers();
  const numberOfLikes = await getMedia();
  let totalLikes = 0;

  for (const data of numberOfLikes) totalLikes += data.likes;
  domLikes.textContent = totalLikes.toLocaleString();
  domPhotographerPrice.textContent = `${photographersPrice[0].price}€ / jour`;

}

function likes(){

  const mediaContent = document.querySelectorAll('#Media-Content');
  const domLikes = document.querySelector('#numberLikes');
  for (const i of mediaContent[0].children) {

    const likesElements = i.children[1].lastElementChild;
    let isLiked = false;
    let likes = parseInt(likesElements.textContent);
    let totalLikes = parseInt(domLikes.textContent);

    function likeUtils (CalcLikes,CalcTotalLike,islike,iconsHeart) {
      likes = parseInt(CalcLikes)
      isLiked = islike
      domLikes.textContent = parseInt(CalcTotalLike).toLocaleString()
      likesElements.innerHTML = `${likes} ` + iconsHeart;
    }

    function like() {
      return isLiked ? likeUtils(likes - 1, totalLikes -= 1, false, '<i class="fal fa-heart">') : likeUtils(likes + 1, totalLikes += 1, true, '<i class="fas fa-heart">')
    }

    likesElements.addEventListener('click', (e)=>{
      e.preventDefault()
      console.log('test')
      like()
    });

    likesElements.onkeydown = function (e) {
      e.preventDefault()
      if(e.key ==='Enter') like()
    }
  }
}


function fillLightBox() {

  const AllImage = document.querySelectorAll("#Media-Content .Media-card .media")
  const lightbox = document.querySelector('#lightBox')
  const exit = document.querySelector('#exit-lightbox')
  const media = document.querySelector('#MediaLightbox')
  const leftArrow = document.querySelector('#left')
  const rightArrow = document.querySelector('#right')
  let counter = 0;
  const ClonedAllImage = AllImage[counter].cloneNode();
  ClonedAllImage.controls = true;

  lightbox.classList.add('active');
  lightbox.focus();
  media.appendChild(ClonedAllImage)
  ClonedAllImage.classList.add('active')


  function closeLightBox() {
    remove();
    lightbox.classList.remove('active');
    counter = 0;
    if(AllImage[counter].classList.contains('video')) AllImage[counter].controls = false;
  }

  exit.onclick = function (e) {
    e.preventDefault()
    closeLightBox();
  }

  exit.onkeydown = function (e) {
    e.preventDefault()
    if(e.key === "Enter") closeLightBox();
  }

  document.onkeydown = function (e) {
    if (e.key === "Escape") closeLightBox();
    if(e.key === "ArrowLeft") left();
    if(e.key === "ArrowRight") right()
  }
  leftArrow.onkeydown = function (e) {
    e.preventDefault()
    if(e.key === "Enter") left();
  }

  rightArrow.onkeydown = function (e) {
    e.preventDefault()
    if(e.key === "Enter") left();
  }

  leftArrow.addEventListener('click',(e)=>{
    e.preventDefault();
    left();
  })

  rightArrow.addEventListener('click',(e)=>{
    e.preventDefault();
    right()
  })




  function left(){
    AllImage[counter].classList.remove('active')
    media.innerHTML = ''
    counter--
    if (counter < 0) {
      counter = AllImage.length-1;
    }

    AllImage[counter].classList.add('active')
    if(AllImage[counter].classList.contains('video')) AllImage[counter].controls = true;
    media.appendChild(AllImage[counter].cloneNode())
  }

  function right(){

    AllImage[counter].classList.remove('active')
    media.innerHTML = ''
    counter++
    if (counter >= AllImage.length-1) {
      counter = 0;
    }
    AllImage[counter].classList.add('active')
    if(AllImage[counter].classList.contains('video')) AllImage[counter].controls = true;
    media.appendChild(AllImage[counter].cloneNode())
  }

  function remove(){
    while( media.firstChild) media.removeChild( media.firstChild)
  }

}

fillSubBar();
init();




