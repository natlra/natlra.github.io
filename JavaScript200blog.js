// Scroll to specific section smoothly
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add fade effect and overlay fade-out on scroll
document.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY; // Current scroll position
    const body = document.body;

    // Fade out header overlay after scrolling
    if (scrollPosition > 50) {
        body.classList.add('scrolled');
    } else {
        body.classList.remove('scrolled');
    }

    // Fade elements dynamically as they enter/leave the viewport
    const fadeElements = document.querySelectorAll('.fade-on-scroll');
    fadeElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            element.classList.remove('fade'); // Bring into full view
        } else {
            element.classList.add('fade'); // Dim when out of view
        }
    });
});
