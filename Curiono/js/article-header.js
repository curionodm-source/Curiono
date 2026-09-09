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

 // 2. INJEÇÃO DO BOTÃO DE COMPARTILHAMENTO E POP-UP
    const metaContainer = document.querySelector('.article-meta');
    if (metaContainer && !metaContainer.querySelector('.article-share-container')) {
        const shareHtml = `
            <div class="article-share-container" style="position: relative; display: inline-block; margin-left: auto;">
                <button class="share-main-btn" id="shareMainBtn" style="display: inline-flex; align-items: center; gap: 8px; background-color: var(--color-text); color: var(--color-bg); border: none; padding: 8px 16px; border-radius: 999px; font-family: var(--font-sans); font-size: 13px; font-weight: 600; cursor: pointer; transition: opacity 0.2s;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                    Share
                </button>

                <div class="share-popup-modal" id="sharePopupModal" style="display: none; position: absolute; right: 0; top: calc(100% + 10px); width: 280px; background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px; padding: 20px; box-shadow: var(--shadow-md); z-index: 1000; font-family: var(--font-sans);">
                    <div style="font-weight: 700; font-size: 15px; color: var(--color-text); margin-bottom: 16px;">Share this article</div>
                    
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <a href="#" onclick="window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(window.location.href), '_blank'); return false;" style="display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--color-text); font-size: 14px; font-weight: 500;">
                            <span style="width: 32px; height: 32px; border-radius: 50%; background: rgba(29, 161, 242, 0.1); display: flex; align-items: center; justify-content: center; color: #1DA1F2;"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></span>
                            Twitter
                        </a>
                        <a href="#" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href), '_blank'); return false;" style="display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--color-text); font-size: 14px; font-weight: 500;">
                            <span style="width: 32px; height: 32px; border-radius: 50%; background: rgba(24, 119, 242, 0.1); display: flex; align-items: center; justify-content: center; color: #1877F2;"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></span>
                            Facebook
                        </a>
                        <a href="#" onclick="window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(window.location.href), '_blank'); return false;" style="display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--color-text); font-size: 14px; font-weight: 500;">
                            <span style="width: 32px; height: 32px; border-radius: 50%; background: rgba(37, 211, 102, 0.1); display: flex; align-items: center; justify-content: center; color: #25D366;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></span>
                            WhatsApp
                        </a>
                        <a href="#" onclick="navigator.clipboard.writeText(window.location.href); alert('Link copied to clipboard!'); return false;" style="display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--color-text); font-size: 14px; font-weight: 500;">
                            <span style="width: 32px; height: 32px; border-radius: 50%; background: rgba(100, 100, 100, 0.1); display: flex; align-items: center; justify-content: center;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></span>
                            Copy link
                        </a>
                    </div>

                    <div style="border-top: 1px solid var(--color-border); margin-top: 16px; padding-top: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--color-text-muted);">
                        <span>Thank you for sharing!</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </div>
                </div>
            </div>
        `;
        metaContainer.insertAdjacentHTML('beforeend', shareHtml);

        // Lógica de abrir/fechar o pop-up ao clicar no botão
        const shareBtn = document.getElementById('shareMainBtn');
        const shareModal = document.getElementById('sharePopupModal');

        shareBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = shareModal.style.display === 'block';
            shareModal.style.display = isOpen ? 'none' : 'block';
        });

        document.addEventListener('click', function(e) {
            if (!shareModal.contains(e.target) && e.target !== shareBtn) {
                shareModal.style.display = 'none';
            }
        });
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

