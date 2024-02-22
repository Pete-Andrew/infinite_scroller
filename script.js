// Unsplash API 

// template string ---> Template literals are literals delimited with backtick (`) characters, allowing for multi-line strings, string interpolation with embedded expressions, and special constructs called tagged templates.
const count = 10;

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`;

// get photos from unsplash API
async function getPhotos () {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data); 
    } catch (error) {
        // catch error here 
    }
}

// on load
getPhotos(); 