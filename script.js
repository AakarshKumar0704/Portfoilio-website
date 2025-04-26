// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    menuBtn.addEventListener('click', function() {
        mobileNav.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-nav a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');

    function highlightNavLink() {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('.header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Call once on page load
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Create mailto link with form data
            const mailtoLink = `mailto:aakarshkumar7@gmail.com?subject=Portfolio Contact from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0A%0D%0AMessage:%0D%0A${message}`;
            
            // Show success message
            formStatus.textContent = 'Thank you for your message! Opening your email client...';
            formStatus.classList.remove('hidden', 'error');
            formStatus.classList.add('success');
            
            // Reset form
            contactForm.reset();
            
            // Open mailto link
            setTimeout(() => {
                window.location.href = mailtoLink;
            }, 1000);
            
            // Alternative: You can use a service like FormSubmit for serverless form handling
            // Uncomment the following code and replace the above code if you want to use FormSubmit
            
            /*
            // Send form data to FormSubmit
            fetch('https://formsubmit.co/aakarshkumar7@gmail.com', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
                    formStatus.classList.remove('hidden', 'error');
                    formStatus.classList.add('success');
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                formStatus.textContent = 'Oops! There was a problem submitting your form. Please try again.';
                formStatus.classList.remove('hidden', 'success');
                formStatus.classList.add('error');
                console.error('Error:', error);
            });
            */
        });
    }
});