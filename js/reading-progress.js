(function() {
    // Reading Progress Bar - Professional Implementation
    const progressBar = document.getElementById('reading-progress-bar');
    const progressText = document.getElementById('reading-progress-text');
    
    if (!progressBar || !progressText) return;
    
    let ticking = false;
    
    function updateProgress() {
        // Find the main content element
        const articleMain = document.querySelector('.article-main') || document.querySelector('.article-grid');
        
        if (!articleMain) {
            // Fallback to body if no article element found
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min((scrollTop / docHeight) * 100, 100);
            
            progressBar.style.width = progress + '%';
            progressText.innerText = Math.round(progress) + '%';
            return;
        }
        
        // Calculate progress based on article content only
        const articleTop = articleMain.offsetTop;
        const articleHeight = articleMain.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        
        // Calculate when article content ends on screen
        const articleEnd = articleTop + articleHeight - windowHeight;
        
        // Calculate progress (0% when article starts, 100% when article ends)
        let progress = ((scrollTop - articleTop) / (articleEnd - articleTop)) * 100;
        
        // Clamp between 0 and 100
        progress = Math.max(0, Math.min(100, progress));
        
        // Update UI
        progressBar.style.width = progress + '%';
        progressText.innerText = Math.round(progress) + '%';
        
        ticking = false;
    }
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateProgress);
            ticking = true;
        }
    }
    
    // Initial update
    updateProgress();
    
    // Listen to scroll events
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Update on resize
    window.addEventListener('resize', onScroll, { passive: true });
})();
