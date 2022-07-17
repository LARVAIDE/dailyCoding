import jsobj from "../img/jsobj.jpg";

function createImg() {
    const container = document.createElement('div')
    const myImg = document.createElement('img')
    myImg.src = jsobj
    myImg.className = 'my-img'
    container.appendChild(myImg)
    return container
}

document.body.appendChild(createImg())