// check if there's local storage color option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
    
    document.documentElement.style.setProperty('--main-color', mainColors)
    
    document.querySelectorAll(".colors-list li").forEach(el => {
        el.classList.remove("active");
        if (el.dataset.color === mainColors) {
            el.classList.add("active")
        }
    })
}

let backgroundOption = false;
let backgroundInterval;

let backgLocalItem = localStorage.getItem("background-option");
if (backgLocalItem !== null) {
    if (backgLocalItem === "true") {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
    
    document.querySelectorAll(".random-backgrounds span").forEach(el => {
        el.classList.remove("active");
    });
    if (backgLocalItem === "true") {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    }else {
        document.querySelector(".random-backgrounds .no").classList.add("active");
        document.querySelector(".landing").style.backgroundImage = 'url("imgs/backg/03.jpg")';
    }
}
// toggle gear
let toggleSetting = document.querySelector(".toggle-settings");
let settngCont = document.querySelector(".settings-box");

document.querySelector(".toggle-settings .fa-gear").onclick = function () {

    this.classList.toggle("fa-spin");

    settngCont.classList.toggle("open")
};
// switch color
const colorsli = document.querySelectorAll(".colors-list li");

colorsli.forEach(li => {

    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color)
        localStorage.setItem("color_option", e.target.dataset.color)
        handleActive(e);
    })

})


// switch random backgrounds
let randomBackEl = document.querySelectorAll(".random-backgrounds span");
randomBackEl.forEach(span => {

    span.addEventListener("click", (e) => {
        handleActive(e);
        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randmizeImgs()
            localStorage.setItem("background-option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval)
            localStorage.setItem("background-option", false)
            document.querySelector(".landing").style.backgroundImage = 'url("imgs/backg/03.jpg")';
        }
    })

})
// landing page element
let imgs = ["01.jpg", "02.png", "03.jpg", "04.png"];


function randmizeImgs() {
    if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
    let changeImgs = imgs[Math.floor(Math.random() * imgs.length)];
    document.querySelector(".landing").style.backgroundImage = 'url("imgs/backg/' + changeImgs + '")';
        }, 1000)
    }
}
randmizeImgs();
// end landing imgs 
// start specs selector
let ourSpecifications = document.querySelector(".specifications");

window.onscroll = function () {
    
let specificationsOffsetTop = ourSpecifications.offsetTop;

let specificationsOuterHeight = ourSpecifications.offsetHeight;

let windowHeight = this.innerHeight;

let windowScrollTop = this.pageYOffset;


if (windowScrollTop + 700 > (specificationsOffsetTop + specificationsOuterHeight - windowHeight)) {
    let allSpecifications = document.querySelectorAll(".specifications-box .spec-progress span");
    
    allSpecifications.forEach(spec => {
    
        
        spec.style.width = spec.dataset.progress;
    
    })
}
    
}

// create pup up 

ourmodels = document.querySelectorAll(".models img")

ourmodels.forEach(img => {
    img.addEventListener('click', (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    imgHeading = document.createElement("h3");
    imgdescription = document.createElement("p");
    imgTextH = document.createTextNode(img.alt);
    imgTextP= document.createTextNode(img.dataset.descreption);
    imgHeading.appendChild(imgTextH) 
    imgdescription.appendChild(imgTextP)
    popupBox.appendChild(imgHeading);
    let popupImage = document.createElement("img")
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);
    popupBox.appendChild(imgdescription);
    let closeButton = document.createElement("span");
    let closeButtonText = document.createTextNode("x");
    closeButton.className = "close-button"
    closeButton.appendChild(closeButtonText);
    popupBox.appendChild(closeButton);
    })
})
document.addEventListener("click", function(e) {
    if (e.target.className == "close-button" || e.target.className == "popup-overlay") {
    document.querySelector(".popup-box").remove();
    document.querySelector(".popup-overlay").remove();
    }
})
// start bullets nav 
let allBullilets = document.querySelectorAll(".nav-bullets .bullet");

// select all links

let allLinks = document.querySelectorAll(".links a");

function scrollToSection(element) {
    element.forEach(el => {
        el.addEventListener("click",(e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
};

scrollToSection(allBullilets);
scrollToSection(allLinks);

// handle active state 
function handleActive(ele) {

    ele.target.parentElement.querySelectorAll(".active").forEach(ele => {
        ele.classList.remove("active");
    })

    ele.target.classList.add("active")
};


let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsLocalStorage = localStorage.getItem("bullets-option");

if (bulletsLocalStorage !== null) {
    bulletsLocalStorage; 
    bulletsSpan.forEach(span => {
        span.classList.remove("active"); 
    })

    if(bulletsLocalStorage === "block") {
        document.querySelector(".bullets-option .yes").classList.add("active")
        bulletsContainer.dataset.display = "block"
    }else {
        document.querySelector(".bullets-option .no").classList.add("active")
        bulletsContainer.dataset.display = "none"
    }
}
bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === "block") {
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullets-option", "block")
        } else {
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets-option", "none")
        }
        handleActive(e)
    })
});
// reset button 

document.querySelector(".reset-options").onclick = function () {

    localStorage.removeItem("bullets-option");
    localStorage.removeItem("background-option");
    localStorage.removeItem("color_option");

    window.location.reload();
}

// toggle menu 

let toggleBtn = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

    e.stopPropagation();
    tlinks.classList.toggle("open")
}

document.addEventListener("click", (e) => {

    if (e.target !== toggleBtn && e.target !== tlinks) {
    
        if (tlinks.classList.contains("open")){
        
            tlinks.classList.toggle("open")
        }
    }

    if (e.target !== toggleSetting && e.target !== settngCont) {
    
        if (settngCont.classList.contains("open")){
        
            settngCont.classList.toggle("open")
        }
    }
})

tlinks.onclick = function(e) {
    e.stopPropagation();
}
settngCont.onclick = function(e) {
    e.stopPropagation();
}
