const imageContainer = document.getElementById('image-containerID');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
// how many images have been loaded in total
let runningTotalImages = 0;
//this array is wither populated by the API or by the local array (depending on if the API call is successful) 
let photosArray = [];
//sets a search term for the unsplash API
let searchTerm = 'nature';

// a boolean that records if the API is being used
let usingAPI = false; 
// Unsplash API 
// template string ---> Template literals are literals delimited with backtick (`) characters, allowing for multi-line strings, string interpolation with embedded expressions, and special constructs called tagged templates.
let count = 30;

let localPhotos = 0;




// The Chrome plugin Ghostery will interfere or stop the API call!! 
//quote this line out if you want to use the local array. 
// let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}&query=${searchTerm}`;

// random photos API call:
// const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`;

// Check to see if all images were loaded
function imageLoaded() {

    imagesLoaded++;
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
        console.log('ready =', ready)
    }
}

//  Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for links & photos, add to DOM
function displayPhotos() {
    //re-sets the images loaded function to 0 each time the function is called. 
    imagesLoaded = 0;
    // creates a value for all the 
    runningTotalImages += imagesLoaded;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    // code that does nothing... 
    console.log("running total images = ", runningTotalImages);
    // run function for each object in the photos array
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // create <img> for photo
        const img = document.createElement('img');

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            Title: photo.alt_description,
        });

        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside the imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// checks to see if boxes are ticked
function isTicked () {
    var checkBoxLocal = document.getElementById("useLocal");
    var checkBoxAPI = document.getElementById("useAPI");
    if (checkBoxLocal.checked == true) { 
        console.log("use local is checked");
    }
}


// get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        console.log("Photos Array = " + photosArray);
        console.log("The API request has been successful")
        usingAPI = true;
        }
    catch (error) {
        // catch error here 
        console.log("There has been an error with the API request!");
        console.log("Local photos will be displayed instead ---> ");
        photosArray = localPhotosArray;
        usingAPI = false;
        displayLocalPhotos();
    }
}

// Get photos from local array if the API call fails

function displayLocalPhotos() {
    console.log("The display local photos function has been run");
    // ready tells the eventlistener if the page is ready to re-run the function. Ready is set to false once the event listener function is run. 
    ready = true;
    //while i is less than localPhotosArray.Length loop the following part of the function, this creates img elements for all the images in the localPhotosArray
    for (let i = 0; i < localPhotosArray.length; i++) {

        const img = document.createElement('img');
        setAttributes(img, {
            src: localPhotosArray[i],
        });

        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // Create <a> element, this needs to be done separately in this function as using when using the API the <a> is created in the API call function 
        const item = document.createElement('a');
        // Put <img> inside <a>, then put both inside the imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    }
    loader.hidden = true;
}


// check to see if scrolling when you're near the bottom of the page
window.addEventListener('scroll', () => {
    // console.log('scrolled');
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        
        if (usingAPI == true) {
            getPhotos();
        } 
        else {
            displayLocalPhotos();
            console.log("display local photos test");
        }
        console.log(runningTotalImages)
    }
});

// put in a function that takes the input of the search term box and refreshes the whole page


// on load
getPhotos();
