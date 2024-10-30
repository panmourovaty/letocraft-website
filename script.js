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
        const response = await fetch('https://api.mcsrvstat.us/3/77.240.188.146');
        if (!response.ok) return; // Exit if the response is not successful

        const { players } = await response.json();

        // Exit if players or list does not exist
        if (!players?.list?.length) return;

        // Create player list and display it
        const playerListContainer = document.getElementById('playerlist');
        const ul = document.createElement('ul');
        ul.classList.add("playerlist");

        // Create a list of player names
        players.list.forEach(({ name }) => {
            const li = document.createElement('li');
            li.classList.add("playerlistitem");

            // Wrap player name in a clickable link to NameMC profile
            const link = document.createElement('a');
            link.href = `https://cs.namemc.com/profile/${name}`;
            link.textContent = name;
            link.target = '_blank'; // Open link in a new tab
            link.rel = 'noopener noreferrer';
            link.style.textDecoration = "none";

            // Append the link to the list item
            li.appendChild(link);
            ul.appendChild(li);
        });

        // Append the unordered list to the player list container
        playerListContainer.appendChild(ul);
        playerListContainer.style.display = 'block'; // Show the div on success

        // Now load player avatars asynchronously
        loadPlayerAvatars(players.list);

    } catch (error) {
        // Silently fail if any error occurs (optional: log to analytics or monitor)
    }
}

function loadPlayerAvatars(players) {
    // Find all list items under playerListContainer
    const listItems = document.querySelectorAll('#playerlist ul li');

    players.forEach((player, index) => {
        const img = document.createElement('img');
        img.src = `https://mc-heads.net/avatar/${player.name}`;
        img.alt = `${player.name}'s avatar`;
        img.style.width = '30px'; // Set a fixed width for the avatar
        img.style.height = '30px'; // Set a fixed height for the avatar
        img.style.marginRight = '8px'; // Add some space between the image and the name

        // Insert the image at the beginning of the list item
        listItems[index].insertBefore(img, listItems[index].firstChild);
    });
}

// Ensure the function runs after the page loads
window.addEventListener('DOMContentLoaded', fetchPlayers);
