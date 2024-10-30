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

// fetchPlayers.js
async function fetchPlayers() {
    try {
        const response = await fetch('https://api.mcsrvstat.us/3/77.240.188.146');
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        // Check if the players list exists and has players
        if (data.players && Array.isArray(data.players.list) && data.players.list.length > 0) {
            const ul = document.createElement('ul');

            data.players.list.forEach(player => {
                const li = document.createElement('li');
                li.textContent = player.name; // Display the player's name only
                ul.appendChild(li);
            });

            const playerListContainer = document.getElementById('playerlist');
            playerListContainer.appendChild(ul);
            playerListContainer.style.display = 'block'; // Show the div if players are present
        }
    } catch (error) {
        console.error('Failed to fetch player list:', error);
    }
}

// Fetch players after the page has loaded
window.addEventListener('load', fetchPlayers);
