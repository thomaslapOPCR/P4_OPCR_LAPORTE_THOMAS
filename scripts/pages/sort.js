OpenFilters();
selectFilter();


function OpenFilters() {
    const cursor = document.querySelector('#cursor');
    const selector = document.querySelector('#selectlist');

    function open(){
        selector.classList.toggle('active');
        cursor.classList.toggle('rotate');
        if(selector.getAttribute('class') !== 'active'){
            selector.children[1].setAttribute('tabindex', '');
            selector.children[2].setAttribute('tabindex', '');
            selector.children[3].setAttribute('tabindex', '');
        }
        if(selector.getAttribute('class') === 'active'){
            selector.children[1].setAttribute('tabindex', '0');
            selector.children[2].setAttribute('tabindex', '0');
            selector.children[3].setAttribute('tabindex', '0');
        }
    }

    function close() {
        if(selector.classList.contains('active') && cursor.classList.contains('rotate')) {
            selector.classList.remove('active');
            cursor.classList.remove('rotate');
        }
    }

    selector.onclick = function (){
        open();
    }

    selector.onkeydown = function (e) {
        if(e.key === "Enter") open();
        if(e.key === "Escape") close();
    }
}


function selectFilter() {
    const list = document.querySelectorAll('#selectlist p');

    list.forEach((el, index) => {

        function openSelectMenu() {
            const elements = document.querySelector('#selectlist').children;
            const selected = document.querySelector('#selected')
            selected.textContent = elements[index].textContent;
            return selected.textContent;
        }

        el.onkeydown = function (e) {
            if(e.key === "Enter" ) asingSort(openSelectMenu())
        }

        el.onclick = async function (e) {
            asingSort(openSelectMenu())
        };
    });
}


async function asingSort(element){
    const data = []
    for(let i of await getMedia()) data.push(i);
    const mediaSection = document.querySelector('#Media-Content');

    async function remove(media){
            while( mediaSection.firstChild) mediaSection.removeChild( mediaSection.firstChild)
    }

    switch (element){
        case "Popularité":{
           await remove();
            const media = data.sort((a, b) => b.likes - a.likes)
            displayData(await getPhotographers(),await media);
            break;
        }
        case "Date":{
            await remove();
            const media = data.sort((a, b) => b.date - a.date)
            displayData(await getPhotographers(),await media);
              break;
        }

        case "Titre":{
            await remove();
            const media =  data.sort((a, b) => {
                if (b.title > a.title) {
                    return -1
                }
                if (a.title > b.title) {
                    return 1
                }
                return 0
            })
            displayData(await getPhotographers(),await media);
            break;
        }
        default:{
            return data.sort((a, b) => b.likes - a.likes)
        }
    }
}



