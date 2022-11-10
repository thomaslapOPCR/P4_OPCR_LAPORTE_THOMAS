    
    async function fetchData() {
        let res = await fetch("../../data/photographers.json")
        return await res.json();
    }

    async function getPhotographers() {
        return await fetchData();
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM)
        });
    };

    async function init() {
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    