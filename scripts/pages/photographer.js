async function fetchData() {
  try {
    const res = await fetch('../../data/photographers.json');
    return await res.json();
  } catch (e) {
    return e;
  }
}

function getId() {
  const link = new URL(window.location.href);
  const searchParams = new URLSearchParams(link.search);
  const IdList = ['82', '195', '243', '527', '925', '930'].includes(searchParams.get('id'));
  // eslint-disable-next-line
  if (!searchParams.has('id') || !IdList) return location.href = 'index.html';
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
  const lightBoxSection = document.querySelector('#lightBox');

  photographers.forEach((photographer) => {
    const photographerModel = photographerMediaFactory(photographer);
    photographersSection.innerHTML = photographerModel.getUserCardDOM();
  });
  // eslint-disable-next-line
  media.forEach((media, index) => {
    // eslint-disable-next-line
    const mediaModel = MediaFactory(media, index);
    mediaSection.appendChild(mediaModel.getMediaCardDOM());
  });
}

async function init() {
  await displayData(await getPhotographers(), await asingSort());
}

async function fillSubBar() {
  const domLikes = document.querySelector('#numberLikes');
  const domPhotographerPrice = document.querySelector('#price');
  const photographersPrice = await getPhotographers();
  const numberOfLikes = await getMedia();
  let totalLikes = 0;
  // eslint-disable-next-line
  for (const data of numberOfLikes) totalLikes += data.likes;
  domLikes.textContent = totalLikes.toLocaleString();
  domPhotographerPrice.textContent = `${photographersPrice[0].price}€ / jour`;
}

function likes(el) {
  const likesElements = el.lastElementChild;

  const isLiked = likesElements.getAttribute('data-isLike');
  const domLikes = document.querySelector('#numberLikes');

  let likes = parseInt(likesElements.textContent);
  let totalLikes = parseInt(domLikes.textContent);

  function likeUtils(CalcLikes, CalcTotalLike, iconsHeart) {
    likes = parseInt(CalcLikes);
    domLikes.textContent = parseInt(CalcTotalLike).toLocaleString();
    likesElements.innerHTML = `${likes} ${iconsHeart}`;
  }

  function like() {
    if (isLiked === 'true') {
      likesElements.setAttribute('data-isLike', false);
      likeUtils(
        likes - 1,
        totalLikes -= 1,
        '<em class="fal fa-heart">',
      );
    }

    if (isLiked === 'false') {
      likesElements.setAttribute('data-isLike', true);
      likeUtils(likes + 1, totalLikes += 1, '<em class="fas fa-heart">');
    }
  }

  return like();
}

async function fillLightBox(data) {
  const mediaSection = document.querySelector('#Media-Content');
  const lightboxSection = document.querySelector('#MediaLightbox');
  const exit = document.querySelector('#exit-lightbox');
  const lightbox = document.querySelector('#lightBox');
  const leftArrow = document.querySelector('#left');
  const rightArrow = document.querySelector('#right');
  const mediaTitle = document.querySelector('#LightBoxTitle');

  mediaSection.addEventListener('keydown', async (e) => {
    if (e.target.parentElement === null) return;
    if (e.target.classList.contains('lightboxSection')) {
      if (e.key === 'Enter') FillSection(e, 'enter');
    }
  });

  mediaSection.addEventListener('click', async (e) => {
    if (e.target.parentElement === null) return;

    if (e.target.parentElement.classList.contains('lightboxSection')) FillSection(e, 'click');
  });

  function FillSection(e, type) {
    open();
    let index;
    // console.log(e, type);
    if (type === 'enter') {
      index = parseInt(e.target.children[0].parentElement.parentElement.getAttribute('data-index'));
    } else if (type === 'click') {
      index = parseInt(e.target.parentElement.parentElement.getAttribute('data-index'));
    }

    const media = data;

    function FillLightBox(index) {
      if (index === 0) {
        leftArrow.classList.add('dis');
      } else { leftArrow.classList.remove('dis'); }

      if (index === (media.length - 1)) {
        rightArrow.classList.add('dis');
      } else { rightArrow.classList.remove('dis'); }

      const mediaModel = MediaFactory(media[index]);

      mediaTitle.innerHTML = '';
      mediaTitle.innerHTML = media[index].title;
      lightboxSection.innerHTML = '';
      lightboxSection.innerHTML = (mediaModel.getMediaLightBoxCardDOM());

      if (lightboxSection.children[0].getAttribute('type') === 'video') lightboxSection.children[0].setAttribute('controls', '');
    }

    FillLightBox(index);

    if (document.querySelector('#lightBox').classList.contains('active')) {
      leftArrow.addEventListener('click', (e) => {
        e.preventDefault();
        index--;
        FillLightBox(index);
      });

      rightArrow.addEventListener('click', (e) => {
        e.preventDefault();
        index++;
        FillLightBox(index);
      });

      leftArrow.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          index--;
          FillLightBox(index);
        }
      });

      rightArrow.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          index++;
          FillLightBox(index);
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          if (index === 0) return;
          e.preventDefault();
          index--;
          FillLightBox(index);
        }

        if (e.key === 'ArrowRight') {
          if (index === (media.length - 1)) return;
          e.preventDefault();
          index++;
          FillLightBox(index);
        }
      });
    }
  }

  exit.onclick = (e) => {
    e.preventDefault();
    closeLightBox();
  };
  function closeLightBox() {
    lightbox.classList.remove('active');
    setAriaHidden(document.querySelector('main'), true);
    setAriaHidden(lightbox, false);
  }

  exit.onkeydown = (e) => {
    e.preventDefault();
    if (e.key === 'Enter') closeLightBox();
  };

  document.onkeydown = (e) => {
    if (e.key === 'Escape'
            && document.querySelector('#lightBox').classList.contains('active')) {
      e.preventDefault();
      closeLightBox();
    }
  };

  function open() {
    lightbox.classList.add('active');
    lightbox.firstElementChild.focus();
    setAriaHidden(document.querySelector('main'), false);
    setAriaHidden(lightbox, true);
  }
}

/**
 *
 * @param element {HTMLElement}
 * @param boolean
 */
function setAriaHidden(element, boolean) {
  return element.setAttribute('aria-hidden', boolean);
}

fillSubBar();
init();
