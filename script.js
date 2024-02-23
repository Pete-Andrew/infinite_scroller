const imageContainer = document.getElementById('image-containerID');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API 

// template string ---> Template literals are literals delimited with backtick (`) characters, allowing for multi-line strings, string interpolation with embedded expressions, and special constructs called tagged templates.
const count = 3;

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`;

// Create Elements for links & photos, add to DOM
function displayPhotos() {
    // run function for each object in the photos array
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('Title', photo.alt_description);
        // Put <img> inside <a>, then put both inside the imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// get photos from unsplash API
async function getPhotos () {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        console.log(photosArray); 

    } catch (error) {
        // catch error here 
        console.log("There has been an error with the API request!")
        console.log(photosArray);
    }
}

// on load
getPhotos();

