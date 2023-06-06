'use strict';

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
    var flex = document.createElement("div");
    flex.style.display = "flex";
    flex.style.flexDirection = "column";
    flex.style.rowGap = "1px";

    flex.appendChild(document.createElement("div"));
    flex.appendChild(document.createElement("div"));

    document.body.appendChild(flex);
    var isSupported = flex.scrollHeight === 1;
    flex.parentNode.removeChild(flex);
    // console.log(isSupported);

    if (!isSupported) document.body.classList.add("no-flexbox-gap");
}

checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/* Add class in the Last Menu item */
const mainNavLinks = document.querySelectorAll('.main-nav-link')
const lastLinkItem = mainNavLinks.length - 1

mainNavLinks[lastLinkItem].classList.add('nav-cta')

/* Add copyright year */
const yearEl = document.querySelector('.year')
const currentYear = new Date().getFullYear()
yearEl.textContent = currentYear

/* Make mobile navigation work */
const btnNav = document.querySelector('.btn-mobile-nav')
const headerEl = document.querySelector('header')

btnNav.addEventListener('click', function () {
    headerEl.classList.toggle('nav-open')
})

/* Smooth scrolling */
const allLinks = document.querySelectorAll('a:link')
allLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault()
        const href = link.getAttribute('href')
        // scroll back to top
        if (href === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
        // scroll to co-responding section
        if (href !== '#' && href.startsWith('#')) {
            const sectionEL = document.querySelector(href)
            sectionEL.scrollIntoView({
                behavior: 'smooth'
            })
        }
        // go to URL
        if (href !== '#' && !href.startsWith('#')) {
            window.open(href, '_self')
        }

        // close mobile nav
        if (link.classList.contains('main-nav-link')) {
            headerEl.classList.remove('nav-open')
        }
    })
})

/* Sticky navigation */
const sectionHeroEl = document.querySelector('.section-hero')
const bodyEL = document.body;


const obs = new IntersectionObserver(function (entries) {
        const ent = entries[0]
        if (!ent.isIntersecting) {
            bodyEL.classList.add('sticky')
        }
        if (ent.isIntersecting) {
            bodyEL.classList.remove('sticky')
        }
    },
    {
        // In the viewport
        root: null,
        // Hero section out of the viewport
        threshold: 0,
        rootMargin: '-70px',
    })

obs.observe(sectionHeroEl);