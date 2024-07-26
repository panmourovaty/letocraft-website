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