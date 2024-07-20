// Get all the slider items
let items = document.querySelectorAll('.slider .list .item');
// Get the next and previous buttons
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config parameters
let countItem = items.length;
let itemActive = 0;
// Event listener for the next button click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}
// Event listener for the previous button click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}
// Auto-run the slider every 7 seconds
let refreshInterval = setInterval(() => {
    next.click();
}, 7000)

// Function to update the slider display
function showSlider(){
    // Remove the 'active' class from the old active slider item and thumbnail
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

     // Add the 'active' class to the new active slider item and thumbnail
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    // Clear the previous auto-run interval and start a new one
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}

// Event listener for thumbnail clicks
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})