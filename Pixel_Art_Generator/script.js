let container = document.querySelector(".container")
let gridButton = document.getElementById("submit-grid")
let clearGridButton = document.getElementById("clear-grid")
let gridWidth = document.getElementById("width-range")
let gridHeight = document.getElementById("height-range")
let colorButton = document.getElementById("color-input")
let eraseBtn = document.getElementById("erase-btn")
let paintBtn = document.getElementById("paint-btn")
let widthValue = document.getElementById("width-value")
let heightValue = document.getElementById("height-value")

let events = {
    mouse: { 
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchstart",
        mobe: "touchmove",
        up: "touchend",
    },
}

let deviceType = ""
let draw = false
let erase = false

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent")
        deviceType = "touch"
        return true
    } catch (e){
        deviceType = "mouse"
        return false
    }
}

isTouchDevice()

gridButton.addEventListener("click", () => {
    container.innerHTML = ""
    let count = 0
    // grid row
    for (let i = 0; i < gridHeight.value; i++){
        count +=2
        let div = document.createElement ("div") // create a <div>
        div.classList.add("gridRow") // add class in <div>

    // grid column
    for(let j = 0; j < gridWidth.value; j++){
        count += 2
        let col = document.createElement("div") // create a <div>
        col.classList.add("gridCol") // add class in <div>
        col.setAttribute("id", `gridCol${count}`) // 'col (grid cell)'
        col.addEventListener(events[deviceType].down, () => {
            // down of the 'mousedown' or 'touchstart'
            draw = true
            if (erase){
                col.style.backgroundColor = "transparent"
            } else {
                col.style.backgroundColor = colorButton.value // value that user selected
            }
        })

        col.addEventListener(events[deviceType].move, (e) => {
            let elementId = document.elementFromPoint(
                // elementFromPoint -> the current HTML element that is under selected pointer
                // current coordinate [0] (axis-x)
                !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                // current coordinate [0] (axis-y)
                !isTouchDevice() ? e.clientY : e.touches[0].clientY,
            ).id
            checker(elementId) // coordinates
        })

        col.addEventListener(events[deviceType].up, () => {
            draw = false // 'up' event -> when the user drop the btn or touch 
        })

        div.appendChild(col)
        // add a last child to the parent element
    }

    container.appendChild(div)

    }
})

function checker(elementId){
    let gridColumns = document.querySelectorAll(".gridCol") // all columns
    gridColumns.forEach((element) => {
        if (elementId == element.id) { // if coordinates == correct id's (x, y)
            if(draw && !erase){ // if the user is drawing
                element.style.backgroundColor = colorButton.value // fill each cell
            } else if (draw && erase) { 
                element.style.backgroundColor = "transparent" // false && false
            }
        }
    })
}

clearGridButton.addEventListener("click", () => {
    container.innerHTML = "" // cleaning the grid
})

eraseBtn.addEventListener("click", () => {
    erase = true
})

paintBtn.addEventListener("click", () => {
    erase = false // prevent the user from deleting while the Paint button is active
})

// width range
gridWidth.addEventListener("input", () => {
    // widthValue = label
    widthValue.innerHTML = gridWidth.value < 10 ? `0${gridWidth.value}` : gridWidth.value
})

// height range
gridHeight.addEventListener("input", () => {
    // heightValue = label
    heightValue.innerHTML = gridHeight.value < 10 ? `0${gridHeight.value}` : gridHeight.value
})

// refresh page
window.onload = () => {
    gridHeight.value = 0
    gridWidth.value = 0
}

// responsive grid
function setMaxWidth() {
    let widthRange = document.getElementById("width-range");
    let heightRange = document.getElementById("height-range")
    // @media (max-width: 768px)
    if (window.innerWidth <= 768) {
        widthRange.setAttribute("max", "16")
        heightRange.setAttribute("max", "16")
    } else {
        widthRange.setAttribute("max", "36") // default value (screen < 768px)
        heightRange.setAttribute("max", "36") // default value (screen < 768px)
    }
}

window.addEventListener("DOMContentLoaded", setMaxWidth);
window.addEventListener("resize", setMaxWidth);
