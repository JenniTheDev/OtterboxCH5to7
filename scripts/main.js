var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var ESC_KEY = 27;

var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var TINY_EFFECT_CLASS = 'is-tiny';

function setDetails(imageUrl, titleText, imageOrder) {
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);
  detailImage.setAttribute('data-image-order', imageOrder);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

function orderFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-order');
}

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail), orderFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  'use strict';
  thumb.addEventListener('click', function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
    console.log(thumb);
    showDetails();
  });
}

// gets images from the DOM - returns an array
function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function hideDetails() {
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

// adds an event listener for the ESC key to the body 
function addKeyPressHandler() {
  'use strict';
  document.body.addEventListener('keyup', function (event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === ESC_KEY) {
      hideDetails();
    }
  });
}

// gets all images into an array, calls addThumbClickHandlers to all of them
function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();

  // initialize events for buttons instead of adding onclick events 
  var nextButton = document.querySelector('a.button.next');
  var previousButton = document.querySelector('a.button.previous');

  nextButton.addEventListener('click', function (e) {
    e.preventDefault();
    next(getCurrentImagePosition());
  });

  previousButton.addEventListener('click', function (e) {
    e.preventDefault();
    prev(getCurrentImagePosition());
  });
}

function showDetails() {
  'use strict';
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function () {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

function next(position) {
  if (Number(position) <= 4) {
    setNewImage(Number(position) + 1);
  }
}

function prev(position) {
  if (Number(position) >= 2) {
    setNewImage(Number(position) - 1);
  }
}

function getCurrentImagePosition() {
  var currentImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  var currentPosition = currentImage.getAttribute('data-image-order');

  return currentPosition;
}

// create function that will set the correct image based on parameters
function setNewImage(position) {
  // get DOM element that contains the image url
  var newImage = document.querySelector('a[data-image-order="' + position + '"]');
  // update the target image with correct data
  setDetails(imageFromThumb(newImage), titleFromThumb(newImage), orderFromThumb(newImage));
}

/* This has to stay at the end */
initializeEvents();