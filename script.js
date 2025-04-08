document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelector('.slides');
    const dotsContainer = document.querySelector('.dots-container');
    const slideElements = document.querySelectorAll('.slide');
    const totalSlides = slideElements.length;
    let currentSlide = 0;
    let slideInterval;
    
    // Create dots based on number of slides
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
        
        // Add click event to each dot
        dot.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            goToSlide(index);
            resetInterval();
        });
    }
    
    // Function to go to a specific slide
    function goToSlide(index) {
        currentSlide = index;
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    }
    
    // Update the active dot
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Function to go to the next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }
    
    // Start the automatic slider
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    // Reset the interval timer (used when manually changing slides)
    function resetInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // Initialize the slider
    startSlideInterval();
    
    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    slides.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    slides.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next slide
            nextSlide();
            resetInterval();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous slide
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            goToSlide(currentSlide);
            resetInterval();
        }
    }
});