function openSelectMenu() {
    const cursor = document.querySelector('#cursor');
    const selector = document.querySelector('#selectlist');
    selector.classList.toggle('active');
    cursor.classList.toggle('rotate');
}


function selectFilter() {
    const list = document.querySelectorAll('#selectlist p');
    const cursorI = '<i id="cursor" class="fas fa-angle-down"></i>';
    let sortElement = '';
    list.forEach((el, index) => {
        if (index === 0) {
            el.classList.remove('border');
            el.innerHTML += cursorI;
        } else {
            el.classList.add('border');
        }
        el.onkeydown = function (e) {
            const { target } = e;
            asingSort(target.textContent)
        }

        el.onclick = async function (e) {
            const { target } = e;
            const elements = document.querySelector('#selectlist').children;
            if (target !== elements[0]) {
                const defaultName = elements[0].textContent;
                elements[0].textContent = elements[index].textContent;
                elements[0].innerHTML += cursorI;
                elements[0].firstElementChild.classList.toggle('rotate');
                elements[index].textContent = defaultName;
                asingSort(elements[0].textContent)
            }
        };
    });
}


async function asingSort(element){
    const data = []
    for(let i of await getMedia()) data.push(i);

    // console.log('sort: asignSort(element)',data);

    switch (element){
        case "Popularité":{
            return data.sort((a, b) => b.likes - a.likes)
        }
        case "Date":{
            return data.sort((a, b) => b.date - a.date)
        }

        case "Titre":{
             return data.sort((a, b) => {
                if (b.title > a.title) {
                    return -1
                }
                if (a.title > b.title) {
                    return 1
                }
                return 0
            })
        }
        default:{
            return data.sort((a, b) => b.likes - a.likes)
        }
    }
}

selectFilter();
