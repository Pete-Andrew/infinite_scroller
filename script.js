const imageContainer = document.getElementById('image-containerID');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API 

// template string ---> Template literals are literals delimited with backtick (`) characters, allowing for multi-line strings, string interpolation with embedded expressions, and special constructs called tagged templates.
const count = 3;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`;

//  Helper function to set attributes on DOM elements

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for links & photos, add to DOM
function displayPhotos() {
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

// 

// on load
getPhotos();

