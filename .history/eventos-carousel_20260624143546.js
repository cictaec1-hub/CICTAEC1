// === CARRUSEL DE ARTISTAS CON LOOP INFINITO ===
(function() {
    'use strict';
    
    const artistTracks = document.querySelectorAll('.artists-carousel-track');
    
    artistTracks.forEach(track => {
        const items = track.querySelector('.artists-carousel-items');
        if (!items) return;
        
        // Verificar si ya fue clonado para evitar duplicación
        if (track.dataset.cloned === 'true') return;
        track.dataset.cloned = 'true';
        
        const clone = items.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
        
        const updateAnimation = () => {
            const itemsWidth = items.offsetWidth;
            const gap = 30;
            
            const animationName = `scrollArtists_${Math.random().toString(36).substr(2, 9)}`;
            const keyframes = `
                @keyframes ${animationName} {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-${itemsWidth + gap}px); }
                }
            `;
            
            const styleSheet = document.createElement('style');
            styleSheet.textContent = keyframes;
            document.head.appendChild(styleSheet);
            
            items.style.animation = `${animationName} 35s linear infinite`;
            clone.style.animation = `${animationName} 35s linear infinite`;
        };
        
        const images = items.querySelectorAll('img');
        if (images.length > 0) {
            let loadedCount = 0;
            images.forEach(img => {
                if (img.complete) loadedCount++;
                else img.addEventListener('load', () => {
                    loadedCount++;
                    if (loadedCount === images.length) updateAnimation();
                });
            });
            if (loadedCount === images.length) updateAnimation();
        } else {
            updateAnimation();
        }
        
        track.addEventListener('mouseenter', () => {
            items.style.animationPlayState = 'paused';
            clone.style.animationPlayState = 'paused';
        });
        
        track.addEventListener('mouseleave', () => {
            items.style.animationPlayState = 'running';
            clone.style.animationPlayState = 'running';
        });
    });
})();