const sectionOne = document.querySelector('.section1');

const options = {};

const observer = new IntersectionObserver(
    function(entries, observer) {

    },
    options,
);

// 100px tesla translate up, opacity transparent
// padding 16px
// spacer 74px

// transition
// transform 
// var(--tds-animate-transition_duration--long) 1500ms
// var(--tds-animate-transition-function--mktg) cubic-bezier(0.165,0.84,0.44,1),
// opacity
// var(--tds-animate-transition_duration--long)
// var(--tds-animate-transition-function--mktg),
// -webkit-transform
// var(--tds-animate-transition_duration--long)
// var(--tds-animate-transition-function--mktg);
// rootMargin bottom must be -100px

// document.addEventListener('scroll', function(e) {
//     console.log(window.scrollY);

// });
