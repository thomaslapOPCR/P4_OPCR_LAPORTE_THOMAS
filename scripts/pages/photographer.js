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

  photographers.forEach((photographer) => {
    const photographerModel = photographerMediaFactory(photographer);
    photographersSection.innerHTML = photographerModel.getUserCardDOM();
  });

  media.forEach((media) => {
    // console.log(media)
    const mediaModel = MediaFactory(media);
    mediaSection.appendChild(mediaModel.getMediaCardDOM());
  });
}

async function init() {

  await displayData(await getPhotographers(), await asingSort());
}

async function fillSubBar() {
  const domLikes = document.querySelector('#numberLikes');
  const domPhotographerPrice = document.querySelector('#price');
  const mediaContent = document.querySelectorAll('#Media-Content');
  const photographersPrice = await getPhotographers();
  const numberOfLikes = await getMedia();
  let totalLikes = 0;

  for (const data of numberOfLikes) totalLikes += data.likes;
  domLikes.textContent = totalLikes.toLocaleString();
  domPhotographerPrice.textContent = `${photographersPrice[0].price}€ / jour`;

  for (const i of mediaContent[0].children) {
    const likesElements = i.children[1].lastElementChild;
    let isLiked = false;
    let likes = parseInt(likesElements.textContent);


    i.addEventListener('click', (e) => {
      if (e.target.className === 'media-likes') return;
      // openLightBox();
    });

    function likeUtils (CalcLikes,CalcTotalLike,islike,iconsHeart) {
      likes = parseInt(CalcLikes)
      isLiked = islike
      domLikes.textContent = parseInt(CalcTotalLike).toLocaleString()
      likesElements.innerHTML = `${likes} ` + iconsHeart;
    }

     function like() {
       return isLiked ? likeUtils(likes - 1, totalLikes -= 1, false, '<i class="fal fa-heart">') : likeUtils(likes + 1, totalLikes += 1, true, '<i class="fas fa-heart">')
     }

    likesElements.addEventListener('click', ()=>{
      like()
    });

    likesElements.onkeydown = function (e) {
      if(e.keyCode ='Enter') like()
    }
  }
}

// function accessibility() {
//
// }
// lightBox



init();
fillSubBar();

