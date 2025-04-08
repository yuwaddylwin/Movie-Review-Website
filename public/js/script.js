// AOS library
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Form validation
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            const reviewerName = document.getElementById('reviewerName').value.trim();
            const comment = document.getElementById('comment').value.trim();
            const rating = document.querySelector('input[name="rating"]:checked');
            
            if (!reviewerName || !comment || !rating) {
                e.preventDefault();
                alert('Please fill out all fields before submitting your review.');
            }
        });
    }

    // Smooth scrolling for links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    
    const currentPage = location.pathname.split('/')[1] || 'index';
    document.querySelectorAll('nav a').forEach(link => {
        const linkPage = link.getAttribute('href').split('/')[1] || 'index';
        if (currentPage === linkPage) {
            link.classList.add('active');
        }
    });
});

// Star rating 
document.querySelectorAll('.rating label').forEach(star => {
    star.addEventListener('click', function() {
        const ratingContainer = this.parentElement;
        const stars = ratingContainer.querySelectorAll('label');
        const clickedIndex = Array.from(stars).indexOf(this);
        
        stars.forEach((s, index) => {
            if (index <= clickedIndex) {
                s.style.color = '#f5b301';
            } else {
                s.style.color = '#ddd';
            }
        });
    });
});