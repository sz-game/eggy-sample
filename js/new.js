// Page Loading Animation
            window.addEventListener('load', function () {
                setTimeout(() => {
                    document.getElementById('pageLoader').style.opacity = '0';
                    setTimeout(() => {
                        document.getElementById('pageLoader').style.display = 'none';
                    }, 500);
                }, 1000);
            });

            // Background Particles Animation
            function createParticles() {
                const bgAnimation = document.getElementById('bgAnimation');
                const particleCount = 50;

                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'bg-particle';
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.animationDelay = Math.random() * 15 + 's';
                    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                    bgAnimation.appendChild(particle);
                }
            }

            createParticles();

            // Fullscreen Functionality
            let isFullscreen = false;

            function toggleFullscreen() {
                const gameContainer = document.getElementById('gameContainer');
                const fullscreenBtn = document.getElementById('fullscreenBtn');

                if (!isFullscreen) {
                    // Enter fullscreen
                    gameContainer.classList.add('fullscreen-mode');
                    fullscreenBtn.innerHTML = '❌ Exit Fullscreen';
                    isFullscreen = true;

                    // Try to use browser fullscreen API if available
                    if (gameContainer.requestFullscreen) {
                        gameContainer.requestFullscreen();
                    } else if (gameContainer.webkitRequestFullscreen) {
                        gameContainer.webkitRequestFullscreen();
                    } else if (gameContainer.msRequestFullscreen) {
                        gameContainer.msRequestFullscreen();
                    }
                } else {
                    // Exit fullscreen
                    gameContainer.classList.remove('fullscreen-mode');
                    fullscreenBtn.innerHTML = '🔍 Fullscreen';
                    isFullscreen = false;

                    // Exit browser fullscreen
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                }
            }

            // Handle ESC key to exit fullscreen
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && isFullscreen) {
                    toggleFullscreen();
                }
            });

            // Handle fullscreen change events
            document.addEventListener('fullscreenchange', function () {
                if (!document.fullscreenElement && isFullscreen) {
                    toggleFullscreen();
                }
            });

            // Game Control Functions
            function reloadGame() {
                const gameFrame = document.getElementById('gameFrame');
                gameFrame.src = gameFrame.src;
            }

            function showControls() {
                alert('🎮 CONTROLS:\n\n' +
                    '⬆ UP Arrow / W - Accelerate\n' +
                    '⬇ DOWN Arrow / S - Brake/Reverse\n' +
                    '🎯 Goal: Keep the egg safe while driving!\n\n' +
                    'Tips:\n' +
                    '• Drive smoothly to avoid dropping the egg\n' +
                    '• Use gentle acceleration and braking\n' +
                    '• Be careful on jumps and bumps\n' +
                    '• Practice makes perfect!');
            }

            // FAQ Accordion Functionality
            document.querySelectorAll('.faq-question').forEach(question => {
                question.addEventListener('click', function () {
                    const faqItem = this.parentElement;
                    const answer = faqItem.querySelector('.faq-answer');
                    const toggle = this.querySelector('.faq-toggle');

                    // Check if this item is currently active
                    const isActive = faqItem.classList.contains('active');

                    // Close all FAQ items first
                    document.querySelectorAll('.faq-item').forEach(item => {
                        item.classList.remove('active');
                        const itemAnswer = item.querySelector('.faq-answer');
                        const itemToggle = item.querySelector('.faq-toggle');
                        itemAnswer.classList.remove('active');
                        itemAnswer.style.maxHeight = '0';
                        itemAnswer.style.padding = '0 20px';
                        itemToggle.textContent = '+';
                    });

                    // If this item wasn't active, open it
                    if (!isActive) {
                        faqItem.classList.add('active');
                        answer.classList.add('active');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        answer.style.padding = '20px';
                        toggle.textContent = '×';
                    }
                });
            });

            // Smooth Scrolling for Navigation
            document.querySelectorAll('.floating-nav a').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);

                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Hover Effects for Cards
            document.querySelectorAll('.strategy-card, .level-card').forEach(card => {
                card.addEventListener('mouseenter', function () {
                    this.style.transform = 'translateY(-10px)';
                });

                card.addEventListener('mouseleave', function () {
                    this.style.transform = 'translateY(0)';
                });
            });

            // Intersection Observer for Animation Triggers
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Observe all sections for scroll animations
            document.querySelectorAll('.section').forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(30px)';
                section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(section);
            });

            // Active Navigation Highlighting
            window.addEventListener('scroll', function () {
                const sections = document.querySelectorAll('.section');
                const navLinks = document.querySelectorAll('.floating-nav a');

                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (window.pageYOffset >= sectionTop - 200) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + current) {
                        link.classList.add('active');
                    }
                });
            });

            // Performance optimization
            let ticking = false;
            function updateScrollPosition() {
                ticking = false;
            }

            window.addEventListener('scroll', function () {
                if (!ticking) {
                    requestAnimationFrame(updateScrollPosition);
                    ticking = true;
                }
            });

            // Add hover effects for better UX
            document.querySelectorAll('.control-btn').forEach(btn => {
                btn.addEventListener('mouseenter', function () {
                    this.style.transform = 'translateY(-3px) scale(1.05)';
                });

                btn.addEventListener('mouseleave', function () {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
            // Original Fullscreen functionality - NO CHANGES
                // Replace the problematic line with:
                const fullscreenState = {
                    isFullscreen: false
                };

                function toggleFullscreen() {
                    const gameContainer = document.getElementById('gameContainer');
                    const gameFrame = document.getElementById('gameFrame');
                    const fullscreenBtn = document.getElementById('fullscreenBtn');

                    if (!fullscreenState.isFullscreen) {
                        gameContainer.classList.add('fullscreen-mode');
                        gameFrame.style.width = '100%';
                        gameFrame.style.height = '100%';
                        fullscreenBtn.innerHTML = '❌ Exit Fullscreen';
                        fullscreenState.isFullscreen = true;

                        if (gameContainer.requestFullscreen) {
                            gameContainer.requestFullscreen();
                        } else if (gameContainer.webkitRequestFullscreen) {
                            gameContainer.webkitRequestFullscreen();
                        } else if (gameContainer.msRequestFullscreen) {
                            gameContainer.msRequestFullscreen();
                        }
                    } else {
                        gameContainer.classList.remove('fullscreen-mode');
                        gameFrame.style.width = '';
                        gameFrame.style.height = '';
                        fullscreenBtn.innerHTML = '🔍 Fullscreen';
                        fullscreenState.isFullscreen = false;

                        if (document.exitFullscreen) {
                            document.exitFullscreen();
                        } else if (document.webkitExitFullscreen) {
                            document.webkitExitFullscreen();
                        } else if (document.msExitFullscreen) {
                            document.msExitFullscreen();
                        }
                    }
                }

                function reloadGame() {
                    const gameFrame = document.getElementById('gameFrame');
                    gameFrame.src = gameFrame.src;
                }

                function showControls() {
                    alert('🎮 CONTROLS:\n\n' +
                        '⬆ UP Arrow / W - Accelerate\n' +
                        '⬇ DOWN Arrow / S - Brake/Reverse\n' +
                        '🎯 Goal: Keep the egg safe while driving!\n\n' +
                        'Tips:\n' +
                        '• Drive smoothly to avoid dropping the egg\n' +
                        '• Use gentle acceleration and braking\n' +
                        '• Be careful on jumps and bumps\n' +
                        '• Practice makes perfect!');
                }

                // Handle ESC key and fullscreen changes - NO CHANGES
                document.addEventListener('keydown', function (e) {
                    if (e.key === 'Escape' && isFullscreen) {
                        toggleFullscreen();
                    }
                });

                document.addEventListener('fullscreenchange', function () {
                    if (!document.fullscreenElement && isFullscreen) {
                        toggleFullscreen();
                    }
                });

                // Original control button hover effects - NO CHANGES
                document.querySelectorAll('.control-btn').forEach(btn => {
                    btn.addEventListener('mouseenter', function () {
                        this.style.transform = 'translateY(-3px) scale(1.05)';
                    });

                    btn.addEventListener('mouseleave', function () {
                        this.style.transform = 'translateY(0) scale(1)';
                    });
                });
                // Eggy Car Navigation JavaScript - Isolated Functions
        // Get references to DOM elements
        document.addEventListener('DOMContentLoaded', function () {
            const searchInput = document.getElementById('eggy-nav-search-input');
            const searchResults = document.getElementById('eggy-nav-search-results');
            const searchForm = document.querySelector('.eggy-nav-search-form');

            if (!searchInput || !searchResults || !searchForm) {
                console.error('Search elements not found!');
                return;
            }

            // Prevent form submission
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
            });

            // Handle search input
            searchInput.addEventListener('input', function () {
                const query = this.value.toLowerCase().trim();

                // Hide results if query is too short
                if (query.length < 1) {
                    searchResults.style.display = 'none';
                    return;
                }

                // Filter games based on search query
                const filteredGames = window.games.filter(game =>
                    game.name.toLowerCase().includes(query)
                );

                // Display results
                if (filteredGames.length > 0) {
                    searchResults.innerHTML = filteredGames.map(game => `
                <a href="${game.url}" class="eggy-nav-search-result">
                    <img src="${game.image}" alt="${game.name}" width="40" height="40">
                    <span>${game.name}</span>
                </a>
            `).join('');
                    searchResults.style.display = 'block';
                } else {
                    searchResults.innerHTML = '<div class="eggy-nav-search-no-results">No games found</div>';
                    searchResults.style.display = 'block';
                }
            });

            // Close search results when clicking outside
            document.addEventListener('click', function (e) {
                if (!searchResults.contains(e.target) && e.target !== searchInput) {
                    searchResults.style.display = 'none';
                }
            });
        });

        // ADD YOUR EXISTING SEARCH CODE HERE
        // Replace the example below with your actual search implementation
        eggyNavSearchInput.addEventListener('input', function (e) {
            const query = e.target.value.toLowerCase().trim();

            if (query.length < 2) {
                eggyNavSearchResults.style.display = 'none';
                return;
            }

            // Your search logic goes here
            // Example placeholder - replace with your actual search
            console.log('Searching for:', query);

            // Hide results for now - implement your search display logic
            eggyNavSearchResults.style.display = 'none';
        });

        // Dropdown functionality
        function eggyNavToggleDropdown() {
            const dropdown = document.getElementById('eggy-nav-dropdown');
            const arrow = document.getElementById('eggy-nav-dropdown-arrow');

            dropdown.classList.toggle('active');

            if (dropdown.classList.contains('active')) {
                arrow.style.transform = 'rotate(180deg)';
            } else {
                arrow.style.transform = 'rotate(0deg)';
            }
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.eggy-nav-item')) {
                const dropdown = document.getElementById('eggy-nav-dropdown');
                const arrow = document.getElementById('eggy-nav-dropdown-arrow');
                dropdown.classList.remove('active');
                arrow.style.transform = 'rotate(0deg)';
            }
        });

        // Mobile menu functionality
        function eggyNavToggleMobileMenu() {
            const navCategories = document.getElementById('eggy-nav-categories');
            navCategories.classList.toggle('active');
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.eggy-nav-container') && !e.target.closest('.eggy-nav-mobile-toggle')) {
                document.getElementById('eggy-nav-categories').classList.remove('active');
            }
        });

        // Handle window resize
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) {
                document.getElementById('eggy-nav-categories').classList.remove('active');
            }
        });

        // Active states
        document.querySelectorAll('.eggy-nav-link').forEach(link => {
            link.addEventListener('click', function (e) {
                document.querySelectorAll('.eggy-nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                if (window.innerWidth <= 768) {
                    document.getElementById('eggy-nav-categories').classList.remove('active');
                }
            });
        });
        function loadMoreContent() {
        const additionalContent = document.getElementById('additionalContent');
        const button = document.querySelector('.load-more-btn');

        // Show additional content with animation
        additionalContent.style.display = 'block';

        // Small delay to ensure display change is applied before opacity change
        setTimeout(() => {
          additionalContent.classList.add('show');
        }, 10);

        // Update button text and disable it
        button.textContent = 'Content Loaded!';
        button.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
        button.disabled = true;
        button.style.cursor = 'default';

        // Smooth scroll to the new content
        setTimeout(() => {
          additionalContent.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 300);
      }

      function closeContent() {
        const additionalContent = document.getElementById('additionalContent');
        const button = document.querySelector('.load-more-btn');

        // Hide additional content with animation
        additionalContent.classList.remove('show');

        // After animation completes, hide the element
        setTimeout(() => {
          additionalContent.style.display = 'none';
        }, 500);

        // Reset the load more button
        button.textContent = 'Read More';
        button.style.background = 'linear-gradient(45deg, #f0d210, #ffd700)';
        button.disabled = false;
        button.style.cursor = 'pointer';

        // Scroll back to the load more button
        setTimeout(() => {
          document.querySelector('.load-more-container').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }, 100);
      }s