
/*
@author:vinayKhedekar
 This JavaScript performs two functions
 1. Display thumbnail and respective text into the detail
 area when clicked on any thumbnails.
 2.Cycle through all the thumbnails backword and forward
 using next and previous buttons.
*/
var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]'
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

// function to set thumbnails details into the Detail area
function setDetails(imageUrl, titleText) {
  'use strict'
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);
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

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}
//Event Handler to take action when any thumbnails is clicked
function addThumbClickHandler(thumb) {
  'use strict'
  thumb.addEventListener('click', function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}
// Get all available array elements
function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var ThumbnailArray = [].slice.call(thumbnails);
  return ThumbnailArray;
}

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
}
//Start the program execution
initializeEvents();

/*2. Logic to traverse through all details thumbnails
  using next and previous buttons
*/
//Get all required thumbnails data to set next and previous images
function getThumbnailsData() {
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  var currentDetailImage = detailImage.getAttribute('src');
  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  var currentImageTitle = detailTitle.textContent;
  var thumbnailsArray = getThumbnailsArray();
  var currentImageIndex;
  for (var i = 0; i < thumbnailsArray.length; i++) {
    if (thumbnailsArray[i].getAttribute('data-image-url') == currentDetailImage) {
      currentImageIndex = i;
    }
  }
  return [currentImageIndex, thumbnailsArray];
}

/*Event Handler for previous button.
  Get current thumbnail index and details of previous image
  Call setDetails() to set the values to Detail Image
*/
previous_button.addEventListener('click', function() {
  var thumbnailsdata = getThumbnailsData();
  var currentImageIndex = thumbnailsdata[0];
  var thumbnailsArray = thumbnailsdata[1];
  if (currentImageIndex > 0) {
    var previousImage = thumbnailsArray[currentImageIndex - 1].getAttribute('data-image-url');
    var previousImgTitle = thumbnailsArray[currentImageIndex - 1].getAttribute('data-image-title');
    setDetails(previousImage, previousImgTitle);
  }
});

/*Event Handler for next button.
  Get current thumbnail index and details of next image
  Call setDetails() to set the values to Detail Image
*/
next_button.addEventListener('click', function() {
  var thumbnailsdata = getThumbnailsData();
  var currentImageIndex = thumbnailsdata[0];
  var thumbnailsArray = thumbnailsdata[1];
  if (currentImageIndex < thumbnailsArray.length - 1) {
    var nextImage = thumbnailsArray[currentImageIndex + 1].getAttribute('data-image-url');
    var nextImgTitle = thumbnailsArray[currentImageIndex + 1].getAttribute('data-image-title');
    setDetails(nextImage, nextImgTitle);
  }
});
