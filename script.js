/*
 **--------- Project13: Slide In on scroll ---------**
 */

//  This debounce function is available in lodash and many JS frameworks. But since its a non-framework project, author grabbed similar function on internet

//What debounce function does? => Its called everytime we scroll on a page but it exection depends on the delay(for ex: 20) that we're going to provide. So that your performance is not messed up.
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

//getting all the images
const sliderImages = document.querySelectorAll(".slide-in");

function checkSlide(e) {
  // console.count(e);
  sliderImages.forEach((sliderImage) => {
    //------- Halfway throught the image --------//

    // console.log(window.scrollY);//scrollY only gives us top of the scroll
    // const slideInAt = window.scrollY + window.innerHeight; //by combining we get bottom of page
    const slideInAt =
      window.scrollY + window.innerHeight - sliderImage.height / 2; //and then subtracting the img height which our slider slide down at the center of the image(sliderImage.height gives bottom of image and by dividing it to 2 we get half of image)
    console.log(slideInAt);

    //------- Bottom of the image --------//
    const imageBottom = sliderImage.offsetTop + sliderImage.height;

    //------- Adding image into view when scroll based on some conditions that should be met ------//
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add("active");
    } else {
      sliderImage.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", debounce(checkSlide, 500));

//Things I Learned:
//1) How to use debounce function to fix performance issue
//2) How the viewports scroll, imageHeight and offset properties work together to create a scroll effect/animations
