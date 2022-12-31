/**
 * fonction fetch
 * @returns {Promise<any>}
 */

async function fetchData() {
  try {
    const res = await fetch('../../data/photographers.json');
    return await res.json();
  } catch (e) {
    return e;
  }
}

/**
 * fonction qui permet la recuperation et la verification de l'ID dans URL
 * dans le cas d'une erreur retour ver la page principale
 * @returns {string}
 */
function getId() {
  const link = new URL(window.location.href);
  const searchParams = new URLSearchParams(link.search);
  const IdList = ['82', '195', '243', '527', '925', '930'].includes(searchParams.get('id'));
  // eslint-disable-next-line
  if (!searchParams.has('id') || !IdList) return location.href = 'index.html';
  return searchParams.get('id');
}

/**
 * fonction qui trie les donnée retourner par la fonction fetch en fonction de ID du photographe
 * pour les media
 * @returns {Promise<*>}
 */
async function getMedia() {
  const mediaData = await fetchData();
  return mediaData.media.filter((el) => el.photographerId.toString() === getId());
}

/**
 * retourn et trie les donnée en fonction de l'id du photographe pour le header
 * @returns {Promise<*>}
 */
async function getPhotographers() {
  const data = await fetchData();
  return data.photographers.filter((el) => el.id.toString() === getId());
}

/**
 * fonction qui permet l'envoie des données depuis le fetch
 * @param photographers
 * @param media
 * @returns {Promise<void>}
 */
async function displayData(photographers, media) {
  const photographersSection = document.querySelector('.photograph-header');
  const mediaSection = document.querySelector('#Media-Content');
  const lightBoxSection = document.querySelector('#lightBox');
  //boucle qui sert a retourner les data des photographe
  photographers.forEach((photographer) => {
    const photographerModel = photographerMediaFactory(photographer);
    photographersSection.innerHTML = photographerModel.getUserCardDOM();
  });
  /**
   * retourne les elements et l'index de ceux ci
   */
  // eslint-disable-next-line
  media.forEach((media, index) => {
    // eslint-disable-next-line
    const mediaModel = MediaFactory(media, index);
    mediaSection.appendChild(mediaModel.getMediaCardDOM());
  });
}
//initialise la fonction display Data qui affiche des donnée dans le Dom
async function init() {
  await displayData(await getPhotographers(), await asingSort());
}

/**
 * Permet l'affichage des donner dans la barre en bas a droites
 *
 */
async function fillSubBar() {
  const domLikes = document.querySelector('#numberLikes');
  const domPhotographerPrice = document.querySelector('#price');
  const photographersPrice = await getPhotographers();
  const numberOfLikes = await getMedia();
  let totalLikes = 0;
  //recupere les likes de tous les element,et les additionnes
  // eslint-disable-next-line
  for (const data of numberOfLikes) totalLikes += data.likes;
  domLikes.textContent = totalLikes.toLocaleString();
  //affiche le prix du photographe
  domPhotographerPrice.textContent = `${photographersPrice[0].price}€ / jour`;
}

/**
 * Fonction qui permer la gestion des likes depuis un onclick(''); dans la factory
 * @param el (attribuer depuis le Dom)
 */
function likes(el) {
  const likesElements = el.lastElementChild;

  const isLiked = likesElements.getAttribute('data-isLike');
  const domLikes = document.querySelector('#numberLikes');
  //convertie les valeurs String en Int
  let likes = parseInt(likesElements.textContent);
  let totalLikes = parseInt(domLikes.textContent);

  /**
   * metode permet de realiser de calculs  des likes
   * @param CalcLikes
   * @param CalcTotalLike
   * @param iconsHeart
   */
  function likeUtils(CalcLikes, CalcTotalLike, iconsHeart) {
    likes = parseInt(CalcLikes);
    domLikes.textContent = parseInt(CalcTotalLike).toLocaleString();
    likesElements.innerHTML = `${likes} ${iconsHeart}`;
  }

  /**
   * methode qui verifie si le media est liker on non
   */
  function like() {
    if (isLiked === 'true') {
      likesElements.setAttribute('data-isLike', false);
      likeUtils(
        likes - 1,
        totalLikes -= 1,
        '<em class="fal fa-heart" aria-pressed="false">',
      );
    }

    if (isLiked === 'false') {
      likesElements.setAttribute('data-isLike', true);
      likeUtils(likes + 1, totalLikes += 1, '<em class="fas fa-heart" aria-pressed="true">');
    }
  }

  return like();
}

/**
 * fonction qui permet la creation de la lightBox
 * @param data
 * @returns {Promise<void>}
 */

async function fillLightBox(data) {
  const mediaSection = document.querySelector('#Media-Content');
  const lightboxSection = document.querySelector('#MediaLightbox');
  const exit = document.querySelector('#exit-lightbox');
  const lightbox = document.querySelector('#lightBox');
  const leftArrow = document.querySelector('#left');
  const rightArrow = document.querySelector('#right');
  const mediaTitle = document.querySelector('#LightBoxTitle');
  //permet l'utilisation de enter sur le media pour ouvrir la lightbox
  mediaSection.addEventListener('keydown', async (e) => {
    if (e.target.parentElement === null) return;
    if (e.target.classList.contains('lightboxSection')) if (e.key === 'Enter') FillSection(e, 'enter');
  });
  //^permet le click sur le media pour ouvrir la lightbox
  mediaSection.addEventListener('click', async (e) => {
    if (e.target.parentElement === null) return;
    if (e.target.parentElement.classList.contains('lightboxSection')) FillSection(e, 'click');
  });

  /**
   * permet de crée la lightBox
   * @param e
   * @param type
   * @constructor
   */
  function FillSection(e, type) {
    //ouvre la lightBox
    open();

    let index;
    // verifie le type d interaction
    if (type === 'enter') {
      index = parseInt(e.target.children[0].parentElement.parentElement.getAttribute('data-index'));
    } else if (type === 'click') {
      index = parseInt(e.target.parentElement.parentElement.getAttribute('data-index'));
    }

    const media = data;

    function FillLightBox(index) {
      //block les fleches quand le media est au premier ou au dernier
      if (index === 0) {
        leftArrow.classList.add('dis');
      } else { leftArrow.classList.remove('dis'); }

      if (index === (media.length - 1)) {
        rightArrow.classList.add('dis');
      } else { rightArrow.classList.remove('dis'); }
      //permet la liaison avec le media factory
      const mediaModel = MediaFactory(media[index]);

      mediaTitle.innerHTML = '';
      mediaTitle.innerHTML = media[index].title;
      lightboxSection.innerHTML = '';
      lightboxSection.innerHTML = (mediaModel.getMediaLightBoxCardDOM());
      lightboxSection.focus();
      //attribue le controle si le media est une video est permet
      // les interaction avec le lecteur de video
      if (lightboxSection.children[0].getAttribute('type') === 'video') {
        lightboxSection.children[0].setAttribute('controls', '');
        lightboxSection.children[0].setAttribute('tabindex', '0');
      }
    }
    //methode qui active le remplissage de la ligtbox
    FillLightBox(index);
    // toutes les fonction si dessous gere les interaction dans la lightbox
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
  // toutes les fonctions en dessous , ferme la lightbox
  exit.onclick = (e) => {
    e.preventDefault();
    closeLightBox();
  };

  function closeLightBox() {
    lightbox.classList.remove('active');
    setAriaHidden(document.querySelector('main'), false);
    setAriaHidden(lightbox, true);
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
  //ouvre la light box
  function open() {
    lightbox.classList.add('active');
    setAriaHidden(document.querySelector('main'), true);
    setAriaHidden(lightbox, false);
  }
}

/**
 * permet la gestion de l'attribue aria Hidden
 * @param element {HTMLElement}
 * @param boolean
 */
function setAriaHidden(element, boolean) {
  return element.setAttribute('aria-hidden', boolean);
}

fillSubBar();
init();
