// Prevent form submit on Enter
document.querySelector('form[action="search"]').addEventListener('submit', function(e) {
  e.preventDefault();
});
const searchResults = document.getElementById('search-results');
const desktopInput = document.getElementById('search-input');
const mobileInput = document.getElementById('mobile-search-input');
const mobileSearchResults = document.getElementById('mobile-search-results');
const gamesList = window.gamesList; // Use the global variable

function showGamesList(show) {
  gamesList.style.display = show ? "flex" : "none";
}
 
function handleSearch(input, resultsContainer) {
  input.addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    resultsContainer.innerHTML = '';
    if (query.length === 0) {
      resultsContainer.style.display = 'none';
      showGamesList(true);
      return;
    }
    const filtered = window.games.filter(g => g.name.toLowerCase().includes(query));
    if (filtered.length === 0) {
      resultsContainer.innerHTML = '<div style="padding:16px;">No results found.</div>';
    } else {
      filtered.forEach(game => {
        const a = document.createElement('a');
        a.href = game.url;
        a.style.display = "flex";
        a.style.alignItems = "center";
        a.style.gap = "12px";
        a.style.padding = "8px";
        a.style.textDecoration = "none";
        a.style.color = "inherit";
        a.innerHTML = `<img src="${game.image}" alt="${game.name}" width="40" height="40" style="border-radius:8px;"><span>${game.name}</span>`;
        resultsContainer.appendChild(a);
      });
    }
    resultsContainer.style.display = 'block';
    showGamesList(false);
  });
}

if (desktopInput) handleSearch(desktopInput, searchResults);
if (mobileInput && mobileSearchResults) handleSearch(mobileInput, mobileSearchResults);

document.addEventListener('click', function(e) {
  if (
    (!desktopInput || !desktopInput.contains(e.target)) &&
    (!mobileInput || !mobileInput.contains(e.target)) &&
    !searchResults.contains(e.target) &&
    (!mobileSearchResults || !mobileSearchResults.contains(e.target))
  ) {
    searchResults.style.display = 'none';
    if (mobileSearchResults) mobileSearchResults.style.display = 'none';
    showGamesList(true);
  }
});
// ...existing code...

// Add Light Speed Cache
const LightSpeedCache = {
  version: '1.0',
  expires: 24 * 60 * 60 * 1000, // 24 hours
  prefix: 'game-cache:',
  
  init: function() {
    if ('caches' in window) {
      // Create cache on load
      caches.open('light-speed-cache-v1').then(cache => {
        // Cache current page and its resources
        cache.add(window.location.href);
        this.cacheGameAssets();
      });

      // Add fetch interceptor
      window.addEventListener('fetch', event => {
        event.respondWith(
          caches.match(event.request)
            .then(response => {
              return response || fetch(event.request).then(networkResponse => {
                if (networkResponse.ok && event.request.method === 'GET') {
                  const responseClone = networkResponse.clone();
                  caches.open('light-speed-cache-v1').then(cache => {
                    cache.put(event.request, responseClone);
                  });
                }
                return networkResponse;
              });
            })
        );
      });
    }
  },

  cacheGameAssets: function() {
    // Cache common game assets
    const commonAssets = [
      '/css/style.css',
      '/css/h-c.css', 
      '/css/grid.css',
      '/css/p.css',
      '/js/darkMode.bundle.js',
      '/js/app.bundle.js',
      '/js/custom.js',
      '/js/play.js',
      '/js/game.js',
      '/js/search.js',
      '/img/logo.png',
      '/img/logo_white.png',
      '/img/favicon.png',
      '/img/egg-pattern.png',
      '/img/white-egg.png'
    ];

    if ('caches' in window) {
      caches.open('light-speed-cache-v1').then(cache => {
        cache.addAll(commonAssets);
      });
    }
  },

  clearCache: function() {
    if ('caches' in window) {
      caches.delete('light-speed-cache-v1');
    }
  }
};

// Initialize cache when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  LightSpeedCache.init();
});

// ...existing code...
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const gamesList = document.getElementById('games-list');

    function handleSearch(input, resultsContainer) {
        input.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            resultsContainer.innerHTML = '';
            
            if (query.length === 0) {
                resultsContainer.style.display = 'none';
                if (gamesList) gamesList.style.display = 'flex';
                return;
            }

            const filtered = window.games.filter(game => 
                game.name.toLowerCase().includes(query)
            );

            if (filtered.length === 0) {
                resultsContainer.innerHTML = '<div class="eggy-nav-search-no-results">No results found</div>';
            } else {
                filtered.slice(0, 6).forEach(game => {
                    const a = document.createElement('a');
                    a.href = game.url;
                    a.className = 'eggy-nav-search-result';
                    a.innerHTML = `
                        <img src="${game.image}" alt="${game.name}">
                        <span>${game.name}</span>
                    `;
                    resultsContainer.appendChild(a);
                });
            }

            resultsContainer.style.display = 'block';
            if (gamesList) gamesList.style.display = 'none';
        });
    }

    if (searchInput && searchResults) {
        handleSearch(searchInput, searchResults);

        // Hide results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
                if (gamesList) gamesList.style.display = 'flex';
            }
        });

        // Prevent form submission
        document.querySelector('form[action="search"]').addEventListener('submit', function(e) {
            e.preventDefault();
        });
    }
});