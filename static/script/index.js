// Loader and content display
window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');

    setTimeout(() => {
        loader.classList.add('slide-up');
    }, 2500);

    setTimeout(() => {
        loader.style.display = 'none';
        document.body.classList.add('show-content');
    }, 3000);
});

// Navigation and responsive menu
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    const mobileBookBtn = document.querySelector('.mobile-book');
    let dropdownTimeout;

    // Toggle mobile menu
    menuIcon.addEventListener('click', function() {
        navLinks.classList.toggle('show');
        mobileBookBtn.classList.toggle('hide');
    });

    // Dropdown functionality for mobile
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        dropbtn.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.classList.toggle('active');
                dropdownContent.style.display = 
                    dropdownContent.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.matches('.dropbtn')) {
            dropdowns.forEach(dropdown => {
                const dropdownContent = dropdown.querySelector('.dropdown-content');
                if (dropdownContent.style.display === 'block') {
                    dropdownContent.style.display = 'none';
                    dropdown.querySelector('.dropbtn').classList.remove('active');
                }
            });
        }
    });

    // Responsive behavior on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('show');
            mobileBookBtn.classList.remove('hide');
            dropdowns.forEach(dropdown => {
                const dropdownContent = dropdown.querySelector('.dropdown-content');
                dropdownContent.style.display = '';
                dropdown.querySelector('.dropbtn').classList.remove('active');
            });
        }
    });

    dropdowns.forEach(dropdown => {
        let dropdownContent = dropdown.querySelector('.dropdown-content');

        if (window.innerWidth > 768) {
            dropdown.addEventListener('mouseover', function() {
                clearTimeout(dropdownTimeout);
                dropdownContent.style.display = 'block'; 
            });

            dropdown.addEventListener('mouseleave', function() {
                dropdownTimeout = setTimeout(function() {
                    dropdownContent.style.display = 'none'; 
                }, 100);
            });

            dropdownContent.addEventListener('mouseenter', function() {
                clearTimeout(dropdownTimeout); 
            });

            dropdownContent.addEventListener('mouseleave', function() {
                dropdownTimeout = setTimeout(function() {
                    dropdownContent.style.display = 'none'; 
                }, 100); 
            });
        }
    });

    console.log("Navigation script loaded successfully.");
});

// Request Call Popup functionality
document.addEventListener('DOMContentLoaded', function() {
    const requestCallButton = document.querySelector('.requesttocall-button');
    const popup = document.getElementById('callRequestPopup');
    const closePopup = document.querySelector('.close-popup');
    const callRequestForm = document.getElementById('callRequestForm');
    const phoneInput = document.getElementById('phone');

    // Initialize intl-tel-input
    const iti = window.intlTelInput(phoneInput, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        separateDialCode: true,
        initialCountry: "auto",
        geoIpLookup: function(callback) {
            fetch("https://ipapi.co/json")
                .then(res => res.json())
                .then(data => callback(data.country_code))
                .catch(() => callback("us"));
        },
    });

    // Open popup
    requestCallButton.addEventListener('click', () => {
        popup.style.display = 'block';
    });

    // Close popup
    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Close popup when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });

    // Form submission
    callRequestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const phoneNumber = iti.getNumber();

        // AJAX request
        fetch('/send_call_request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `name=${encodeURIComponent(name)}&countryCode=${encodeURIComponent(iti.getSelectedCountryData().dialCode)}&phone=${encodeURIComponent(phoneNumber.slice(1))}`,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Your request has been submitted successfully!');
            } else {
                alert('There was an error submitting your request. Please try again.');
            }
            popup.style.display = 'none';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting your request. Please try again.');
        });
    });
});

// jQuery for modal (if using Bootstrap)
$(document).ready(function() {
    $('#requestCallButton').on('click', function() {
        $('#requestCallModal').modal('show');
    });
});