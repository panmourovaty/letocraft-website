// Background gallery
const images = [
    'assets/gallery/gallery1.avif',
    'assets/gallery/gallery2.avif',
    'assets/gallery/gallery3.avif',
    'assets/gallery/gallery4.avif',
    'assets/gallery/gallery5.avif',
    'assets/gallery/gallery6.avif',
    'assets/gallery/gallery7.avif',
    'assets/gallery/gallery8.avif',
    'assets/gallery/gallery9.avif',
    'assets/gallery/gallery10.avif'
];

let currentIndex = 0;
const preloadedImages = [];

function preloadImages() {
    for (let i = 0; i < images.length; i++) {
        const img = new Image();
        img.src = images[i];
        preloadedImages.push(img);
    }
}

function changeBackgroundImage() {
    document.body.style.backgroundImage = `url(${images[currentIndex]})`;
    currentIndex = (currentIndex + 1) % images.length;
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Preload images
    preloadImages();

    // Initial background image setup
    changeBackgroundImage();

    // Start background image rotation
    setInterval(changeBackgroundImage, 7000);
});

async function fetchPlayers() {
    try {
        const response = await fetch('https://api.mcsrvstat.us/3/play.letocraft.cz');
        if (!response.ok) return;  // Exit if the response is not successful

        const { players } = await response.json();

        // Exit if players or list does not exist
        if (!players?.list?.length) return;

        // Create player list and display it
        const playerListContainer = document.getElementById('playerlist');
        const ul = document.createElement('ul');
        players.list.forEach(({ name }) => {
            const li = document.createElement('li');
            li.textContent = name; 
            ul.appendChild(li);
        });

        playerListContainer.appendChild(ul);
        playerListContainer.style.display = 'block';  // Show the div on success

    } catch (error) {
        // Silently fail if any error occurs (optional: log to analytics or monitor)
    }
}

// Ensure the function runs after the page loads
window.addEventListener('DOMContentLoaded', fetchPlayers);
