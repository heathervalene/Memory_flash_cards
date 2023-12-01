


/*----- constants -----*/

const memoryCards = [
    'images/freddy.png',
    'images/ghost.png',
    'images/hannibal.png',
    'images/norman.png',
    'images/patrick.png',
    'images/Vestat.png',
    'images/freddy.png',
    'images/ghost.png',
    'images/hannibal.png',
    'images/norman.png',
    'images/patrick.png',
    'images/Vestat.png'
];

/*----- state variables -----*/

let currentIndex = 0;



/*----- cached elements -----*/

const imageSlider = document.getElementById("slider");



/*----- functions -----*/

// used a mix of stack overflow, ChatGPT and w3schools to build and troubleshoot this code//

function startSlide() {
    memoryCards.forEach((imageUrl) => {
      const imageElement = document.createElement('img');
      imageElement.src = imageUrl;
      imageElement.classList.add('image');
      imageSlider.appendChild(imageElement);
    });

showImage(currentIndex);

function showImage(index) {
    imageSlider.style.transform = `translateX(${-index * 100}%)`;
  }
  

  function nextImage() {
    currentIndex = (currentIndex + 1) % memoryCards.length;
    showImage(currentIndex);
  }
  
 
  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }


    setInterval(nextImage, 2000);
  }
  

  window.onload = startSlide;