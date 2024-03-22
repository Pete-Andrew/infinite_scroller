const imageContainer = document.getElementById('image-containerID');
const loader = document.getElementById('loader');

let localRadioButton = null;
let enteredAPI = "";
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let runningTotalImages = 0;
let photosArray = [];
let searchTerm = 'nature';
let usingAPI = false;
let count = 30;
let localPhotos = 0;

function APIsubmitBtnClick () {
    // enteredAPI updates the global variable, previously I was creating a new one which was unnecessary. 
    enteredAPI = document.getElementById("user_API_KEY_id").value;
    console.log("API that has been input = " + enteredAPI);
    let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${enteredAPI}&count=${count}&query=${searchTerm}`;
    // using API set to true is references in the if statement when the page is scrolled to the bottom
    usingAPI = true;
    getPhotos(apiUrl);
}

function localRadio () {
    console.log("Local Radio");
    if (document.getElementById("localRadio").checked) {
        localRadioButton = true;
        console.log(localRadioButton);
    }
}

function APIRadio () {
    console.log("API Radio")
    if (document.getElementById("APIRadio").checked) {
        localRadioButton = false;
        console.log(localRadioButton);
    }
}

function isTicked () {
    var checkBoxLocal = document.getElementById("useLocal");
    var checkBoxAPI = document.getElementById("useAPI");
    if (checkBoxLocal.checked == true) { 
        console.log("use local is checked");

    }
    if (checkBoxAPI.checked == true) {
        console.log("use API is checked")
    }
}

async function getPhotos(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        console.log("Photos Array = " + photosArray);
        console.log("The API request has been successful");
        usingAPI = true;
    } catch (error) {
        console.log("There has been an error with the API request!");
        console.log("Local photos will be displayed instead ---> ");
        photosArray = localPhotosArray;
        usingAPI = false;
        displayLocalPhotos();
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    runningTotalImages += imagesLoaded;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    console.log("running total images = ", runningTotalImages);
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            Title: photo.alt_description,
        });

        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

function displayLocalPhotos() {
    console.log("The display local photos function has been run");
    ready = true;
    for (let i = 0; i < localPhotosArray.length; i++) {
        const img = document.createElement('img');
        setAttributes(img, {
            src: localPhotosArray[i],
        });

        img.addEventListener('load', imageLoaded);

        const item = document.createElement('a');
        item.appendChild(img);
        imageContainer.appendChild(item);
    }
    loader.hidden = true;
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
        console.log('ready =', ready);
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        if (usingAPI == true) {
            //let apiUrl is declared again here as it pulls it's API key from the global variable and then passes it into the getPhotos function.
            let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${enteredAPI}&count=${count}&query=${searchTerm}`;
            getPhotos(apiUrl);
            console.log("displaying API photos");
            
        } else {
            displayLocalPhotos();
            console.log("display local photos");
            
        }
        console.log(runningTotalImages);
    }
});

getPhotos();
