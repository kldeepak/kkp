/**
 * KK Projects - Main JavaScript File
 * Handles all interactive functionality for the website
 */

$(document).ready(function() {
    
    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // ==========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ==========================================
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 100
                }, 1000);
                return false;
            }
        }
    });

    // ==========================================
    // PROJECT FILTERING
    // ==========================================
    $('.project-filters .btn').click(function() {
        var filter = $(this).data('filter');
        
        // Update active state
        $('.project-filters .btn').removeClass('active');
        $(this).addClass('active');
        
        // Filter projects
        if (filter === 'all') {
            $('.project-item').fadeIn(500);
        } else {
            $('.project-item').hide();
            $('.project-item[data-category="' + filter + '"]').fadeIn(500);
        }
    });

    // ==========================================
    // FORM SUBMISSIONS
    // ==========================================
    
    // Enquiry Form
    $('#enquiryForm').submit(function(e) {
        e.preventDefault();
        
        var btn = $(this).find('button[type="submit"]');
        var originalText = btn.text();
        
        // Loading state
        btn.addClass('loading').prop('disabled', true);
        
        // Simulate form submission (replace with actual AJAX call)
        setTimeout(function() {
            btn.removeClass('loading').prop('disabled', false).text('Sent Successfully!');
            $('#enquiryModal').modal('hide');
            
            // Show success message
            showNotification('Thank you for your enquiry! We will get back to you soon.', 'success');
            
            // Reset form
            $('#enquiryForm')[0].reset();
            
            // Reset button text
            setTimeout(function() {
                btn.text(originalText);
            }, 3000);
        }, 2000);
    });
    
    // Site Visit Form
    $('#siteVisitForm').submit(function(e) {
        e.preventDefault();
        
        var btn = $(this).find('button[type="submit"]');
        var originalText = btn.text();
        
        // Loading state
        btn.addClass('loading').prop('disabled', true);
        
        // Simulate form submission
        setTimeout(function() {
            btn.removeClass('loading').prop('disabled', false).text('Visit Scheduled!');
            $('#siteVisitModal').modal('hide');
            
            // Show success message
            showNotification('Site visit scheduled successfully! We will confirm the details via call.', 'success');
            
            // Reset form
            $('#siteVisitForm')[0].reset();
            
            // Reset button text
            setTimeout(function() {
                btn.text(originalText);
            }, 3000);
        }, 2000);
    });
    
    // Brochure Download Form
    $('#brochureForm').submit(function(e) {
        e.preventDefault();
        
        var btn = $(this).find('button[type="submit"]');
        var originalText = btn.text();
        
        // Loading state
        btn.addClass('loading').prop('disabled', true);
        
        // Simulate form submission and download
        setTimeout(function() {
            btn.removeClass('loading').prop('disabled', false).text('Downloaded!');
            $('#brochureModal').modal('hide');
            
            // Show success message
            showNotification('Brochure download started! Check your downloads folder.', 'success');
            
            // Simulate download (in real implementation, trigger actual download)
            triggerDownload();
            
            // Reset form
            $('#brochureForm')[0].reset();
            
            // Reset button text
            setTimeout(function() {
                btn.text(originalText);
            }, 3000);
        }, 2000);
    });

    // ==========================================
    // ANIMATED COUNTERS
    // ==========================================
    function animateCounters() {
        $('.stat-number').each(function() {
            var $this = $(this);
            var countTo = $this.text().replace(/[^0-9]/g, '');
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    var num = Math.floor(this.countNum);
                    if ($this.text().includes('+')) {
                        $this.text(num + '+');
                    } else if ($this.text().includes('%')) {
                        $this.text(num + '%');
                    } else {
                        $this.text(num);
                    }
                },
                complete: function() {
                    $this.text($this.text());
                }
            });
        });
    }

    // Trigger counter animation when stats section is visible
    $(window).scroll(function() {
        var statsOffset = $('.quick-stats').offset();
        if (statsOffset && $(window).scrollTop() + $(window).height() > statsOffset.top + 100) {
            if (!$('.quick-stats').hasClass('animated')) {
                $('.quick-stats').addClass('animated');
                animateCounters();
            }
        }
    });

    // ==========================================
    // NOTIFICATION SYSTEM
    // ==========================================
    function showNotification(message, type = 'info') {
        var notificationClass = 'alert-' + (type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info');
        
        var notification = $(`
            <div class="alert ${notificationClass} alert-dismissible fade show notification-toast" role="alert" style="position: fixed; top: 100px; right: 20px; z-index: 9999; max-width: 400px;">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `);
        
        $('body').append(notification);
        
        // Auto remove after 5 seconds
        setTimeout(function() {
            notification.alert('close');
        }, 5000);
    }

    // ==========================================
    // DOWNLOAD TRIGGER (Simulate)
    // ==========================================
    function triggerDownload() {
        // In a real implementation, this would trigger an actual file download
        // For demo purposes, we'll create a simple text file
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('KK Projects - Premium Land Development Brochure\n\nThank you for your interest in KK Projects!\n\nFor detailed brochures, please contact us at:\nPhone: +91 99999 99999\nEmail: info@kkprojects.com'));
        element.setAttribute('download', 'KK-Projects-Brochure.txt');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    // ==========================================
    // LAZY LOADING FOR IMAGES
    // ==========================================
    function lazyLoadImages() {
        var images = document.querySelectorAll('img[data-src]');
        var imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    // Initialize lazy loading if supported
    if ('IntersectionObserver' in window) {
        lazyLoadImages();
    }

    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================
    function initScrollAnimations() {
        var animatedElements = $('.fade-in, .slide-in-left, .slide-in-right');
        
        $(window).scroll(function() {
            animatedElements.each(function() {
                var elementTop = $(this).offset().top;
                var elementBottom = elementTop + $(this).outerHeight();
                var viewportTop = $(window).scrollTop();
                var viewportBottom = viewportTop + $(window).height();
                
                if (elementBottom > viewportTop && elementTop < viewportBottom) {
                    $(this).addClass('animated');
                }
            });
        });
    }

    // Initialize scroll animations
    initScrollAnimations();

    // ==========================================
    // MOBILE MENU CLOSE ON LINK CLICK
    // ==========================================
    $('.navbar-nav .nav-link').click(function() {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    // ==========================================
    // TOOLTIP INITIALIZATION
    // ==========================================
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // ==========================================
    // PHONE NUMBER FORMATTING
    // ==========================================
    $('input[type="tel"]').on('input', function() {
        var value = $(this).val().replace(/\D/g, '');
        var formattedValue = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        if (value.length <= 10) {
            $(this).val(formattedValue);
        }
    });

    // ==========================================
    // PROJECT SEARCH FUNCTIONALITY
    // ==========================================
    function initProjectSearch() {
        $('#projectSearch').on('input', function() {
            var searchTerm = $(this).val().toLowerCase();
            
            $('.project-item').each(function() {
                var projectTitle = $(this).find('.project-title').text().toLowerCase();
                var projectLocation = $(this).find('.project-location').text().toLowerCase();
                
                if (projectTitle.includes(searchTerm) || projectLocation.includes(searchTerm)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        });
    }

    // Initialize project search if search input exists
    if ($('#projectSearch').length) {
        initProjectSearch();
    }

    // ==========================================
    // PRICE RANGE SLIDER (if exists on projects page)
    // ==========================================
    function initPriceRangeSlider() {
        if ($('#priceRange').length) {
            $('#priceRange').on('input', function() {
                var value = $(this).val();
                $('#priceRangeValue').text('₹' + value + ' Lakhs');
                
                // Filter projects based on price range
                $('.project-item').each(function() {
                    var priceText = $(this).find('.project-features span:contains("₹")').text();
                    var price = parseInt(priceText.replace(/[^\d]/g, ''));
                    
                    if (price <= value * 100000) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            });
        }
    }

    // Initialize price range slider
    initPriceRangeSlider();

    // ==========================================
    // GOOGLE MAPS INTEGRATION (placeholder)
    // ==========================================
    window.initMap = function() {
        // This function will be called when Google Maps API loads
        // Replace with actual map initialization code
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: { lat: 17.3850, lng: 78.4867 } // Hyderabad coordinates
        });
        
        // Add markers for project locations
        var projects = [
            { lat: 17.2403, lng: 78.4294, title: 'Green Valley Plots' },
            { lat: 17.5010, lng: 78.3948, title: 'Royal Gardens' },
            { lat: 17.3698, lng: 78.3325, title: 'Elite Enclave' }
        ];
        
        projects.forEach(function(project) {
            new google.maps.Marker({
                position: { lat: project.lat, lng: project.lng },
                map: map,
                title: project.title
            });
        });
    };

    // ==========================================
    // CONTACT FORM VALIDATION
    // ==========================================
    function validateEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        var re = /^[\+]?[1-9][\d]{0,15}$/;
        return re.test(phone.replace(/\D/g, ''));
    }

    // Real-time form validation
    $('form').on('submit', function(e) {
        var isValid = true;
        var form = $(this);
        
        // Clear previous error states
        form.find('.is-invalid').removeClass('is-invalid');
        form.find('.invalid-feedback').remove();
        
        // Validate email fields
        form.find('input[type="email"]').each(function() {
            if ($(this).val() && !validateEmail($(this).val())) {
                $(this).addClass('is-invalid');
                $(this).after('<div class="invalid-feedback">Please enter a valid email address.</div>');
                isValid = false;
            }
        });
        
        // Validate phone fields
        form.find('input[type="tel"]').each(function() {
            if ($(this).val() && !validatePhone($(this).val())) {
                $(this).addClass('is-invalid');
                $(this).after('<div class="invalid-feedback">Please enter a valid phone number.</div>');
                isValid = false;
            }
        });
        
        // Validate required fields
        form.find('[required]').each(function() {
            if (!$(this).val().trim()) {
                $(this).addClass('is-invalid');
                $(this).after('<div class="invalid-feedback">This field is required.</div>');
                isValid = false;
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            showNotification('Please correct the errors in the form.', 'error');
        }
    });

    // ==========================================
    // TESTIMONIALS CAROUSEL (if implemented)
    // ==========================================
    function initTestimonialsCarousel() {
        if ($('.testimonials-carousel').length) {
            $('.testimonials-carousel').slick({
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 5000,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });
        }
    }

    // Initialize testimonials carousel
    initTestimonialsCarousel();

    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            if (!$('#backToTop').length) {
                $('body').append(`
                    <button id="backToTop" class="btn btn-primary" style="position: fixed; bottom: 100px; right: 30px; z-index: 999; border-radius: 50%; width: 50px; height: 50px; display: none;">
                        <i class="fas fa-arrow-up"></i>
                    </button>
                `);
                $('#backToTop').fadeIn();
            }
        } else {
            $('#backToTop').fadeOut();
        }
    });

    // Back to top click handler
    $(document).on('click', '#backToTop', function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    // ==========================================
    // PRINT FUNCTIONALITY
    // ==========================================
    window.printPage = function() {
        window.print();
    };

    // ==========================================
    // SHARE FUNCTIONALITY
    // ==========================================
    window.shareProject = function(title, url) {
        if (navigator.share) {
            navigator.share({
                title: title,
                url: url
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(url).then(function() {
                showNotification('Link copied to clipboard!', 'success');
            });
        }
    };

    // ==========================================
    // INITIALIZATION COMPLETE
    // ==========================================
    console.log('KK Projects website initialized successfully!');
    
    // Trigger initial scroll event to activate any scroll-based features
    $(window).trigger('scroll');
    
    // Add loading complete class to body
    $('body').addClass('loaded');
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Format phone number
function formatPhoneNumber(phone) {
    var cleaned = phone.replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
}

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}