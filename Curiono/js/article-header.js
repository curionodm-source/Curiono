document.addEventListener('DOMContentLoaded', function() {
    // Calculate prefix based on current page location
    const currentPath = window.location.pathname;
    
    // For pages in articles/category/article/index.html structure
    // We need to go up 3 levels to reach the root
    const isInArticles = currentPath.includes('/articles/');
    const prefix = isInArticles ? '../../../' : '';

    // 1. INJEÇÃO DO CABEÇALHO DO ARTIGO
    const headerContainer = document.querySelector('header.article-header');
    if (headerContainer) {
        headerContainer.innerHTML = `
            <div class="article-header-content">
                
                <!-- CONTAINER ESQUERDO: Logo -> Barrinha -> Casinha -->
                <div class="article-header-left">
                    <a href="${prefix}index.html" class="article-logo-small">
                        <img src="${prefix}logo/logo.png" alt="Curiono Logo">
                        <span class="article-logo-small-text">Curiono</span>
                    </a>
                    
                    <span class="article-header-divider">|</span>
                    
                    <a href="${prefix}index.html" class="icon-btn" aria-label="Home" title="Home">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                    </a>
                </div>
                
                <!-- CONTAINER DIREITO: Somente a Lua/Sol -->
                <div class="article-header-right">
                    <button class="theme-toggle" id="themeToggle" aria-label="Switch mode" title="Switch mode">
                        <span class="theme-icon moon-icon" aria-hidden="true">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        </span>
                        <span class="theme-icon sun-icon" aria-hidden="true" style="display: none;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                            </svg>
                        </span>
                    </button>
                </div>

            </div>
        `;
    }

    // 2. INJEÇÃO DOS BOTÕES DE COMPARTILHAMENTO E METADADOS[cite: 2]
    const metaContainer = document.querySelector('.article-meta');
    if (metaContainer && !metaContainer.querySelector('.article-share')) {
        const shareHtml = `
            <div class="article-share">
                <span class="article-share-label">Share:</span>
                <a href="#" class="share-btn" aria-label="Share on Twitter" onclick="window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(window.location.href), '_blank'); return false;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </a>
                <a href="#" class="share-btn" aria-label="Share on Facebook" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href), '_blank'); return false;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" class="share-btn" aria-label="Copy Link" onclick="navigator.clipboard.writeText(window.location.href); alert('Link copied to clipboard!'); return false;" title="Copy Link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                </a>
            </div>
        `;
        metaContainer.insertAdjacentHTML('beforeend', shareHtml);
    }

    // 3. ATIVAÇÃO DO BOTÃO DE TEMA[cite: 2]
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const moonIcon = themeToggle.querySelector('.moon-icon');
        const sunIcon = themeToggle.querySelector('.sun-icon');
        
        function updateThemeIcon(theme) {
            if (theme === 'dark') {
                moonIcon.style.display = 'block';
                sunIcon.style.display = 'none';
                themeToggle.setAttribute('aria-label', 'Switch to light mode');
                themeToggle.setAttribute('title', 'Switch to light mode');
            } else {
                moonIcon.style.display = 'none';
                sunIcon.style.display = 'block';
                themeToggle.setAttribute('aria-label', 'Switch to dark mode');
                themeToggle.setAttribute('title', 'Switch to dark mode');
            }
        }
        
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        updateThemeIcon(currentTheme);
        
        themeToggle.addEventListener('click', function() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('curiono-theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
});

