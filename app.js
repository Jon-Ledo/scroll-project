// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById('date')
date.innerHTML = new Date().getFullYear()

// ********** close links ************
const navToggle = document.querySelector('.nav-toggle')
const linksContainer = document.querySelector('.links-container')
const links = document.querySelector('.links')
const navbar = document.getElementById('nav')
const topLink = document.querySelector('.top-link')
const scrollLinks = document.querySelectorAll('.scroll-link')

navToggle.addEventListener('click', () => {
  // this method works fine with hardcoded or unchanging navbars
  // linksContainer.classList.toggle('show-links') 

  // for dynamic navbars, we can use this instead
  const containerHeight = linksContainer.getBoundingClientRect().height
  const linksHeight = links.getBoundingClientRect().height
  
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`
  } else {
    linksContainer.style.height = 0
  }
}) 

// ********** fixed navbar ************
window.addEventListener('scroll', () => {
  const scrollHeight = window.pageYOffset
  const navHeight = navbar.getBoundingClientRect().height

  // Apply fixed navbar on scroll
  if (scrollHeight > navHeight) {
    navbar.classList.add('fixed-nav')
  } else {
    navbar.classList.remove('fixed-nav')
  }

  // Show back-to-top button 
  if (scrollHeight > 500) { // arbitrary number
    topLink.classList.add('show-link')
  } else {
    topLink.classList.remove('show-link')
  }
})
// ********** smooth scroll ************
// select links
scrollLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault()

    //navigate to specific spot
    const id = e.currentTarget.getAttribute('href').slice(1)
    // console.log(id); // #about --> about 
    const element = document.getElementById(id)

    // Calculate the heights
    const navHeight = navbar.getBoundingClientRect().height
    const containerHeight = linksContainer.getBoundingClientRect().height
    const fixedNav = navbar.classList.contains('fixed-nav')

    let position = element.offsetTop - navHeight
    // console.log(position);

    if (!fixedNav) {
      position = position - navHeight
    }
    // for smaller screens
    if (navHeight > 82) { // height of the nav
      position = position + containerHeight
    }

    window.scrollTo({
      left: 0,
      top: position,
    })
    linksContainer.style.height = 0
  })
})
