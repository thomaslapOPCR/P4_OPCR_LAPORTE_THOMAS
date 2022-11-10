    
async function fetchData() {
   let res = await fetch("../../data/photographers.json")
    return await res.json();
}

async function getPhotographers() {
        
   let data = await fetchData().then(async (e)=> e.photographers);

       const photographers=
           [ {
               "name":  data.name,
               "id":  data.id,
               "city": data.city,
               "country": data.country,
               "tagline": data.tagline,
               "price": data.price,
               "portrait":  data.portrait,
           }]
    return ({photographers: [...data]})
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.innerHTML += userCardDOM;
        });
    };

    async function init() {
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    