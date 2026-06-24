

// === TODO EN UN SOLO DOMCONTENTLOADED (EVITA DUPLICADOS) ===
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // === CARRUSEL DE ARTISTAS CON LOOP INFINITO ===
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
    
    initArtistCarousel();
    
    // === MODAL DE ARTISTA ===
    const modal = document.getElementById('artistModal');
    if (!modal) {
        console.warn('Modal no encontrado (esto es normal si no hay modal en la página)');
        return;
    }
    
    console.log('✅ Modal inicializado');
    
    document.addEventListener('click', function(e) {
        const card = e.target.closest('.artist-card');
        if (!card) return;
        
        // No prevenir default aquí para que no interfiera con otros clicks
        // Solo detenemos la propagación si es necesario
        
        const name = card.dataset.name || '';
        const desc = card.dataset.desc || '';
        const instagram = card.dataset.instagram || '';
        const facebook = card.dataset.facebook || '';
        const youtube = card.dataset.youtube || '';
        
        const photoImg = card.querySelector('.artist-photo img');
        const photoSrc = photoImg ? photoImg.src : '';
        const initialsDiv = card.querySelector('.artist-initials');
        const initialsText = initialsDiv ? initialsDiv.textContent : '';
        
        const modalName = document.getElementById('modalArtistName');
        const modalDesc = document.getElementById('modalArtistDesc');
        
        if (modalName) modalName.textContent = name;
        if (modalDesc) modalDesc.textContent = desc;
        
        const modalPhoto = document.getElementById('modalArtistPhoto');
        const modalInitials = document.getElementById('modalArtistInitials');
        
        if (modalPhoto && modalInitials) {
            if (photoSrc && photoImg && photoImg.style.display !== 'none') {
                modalPhoto.src = photoSrc;
                modalPhoto.alt = name;
                modalPhoto.style.display = 'block';
                modalInitials.style.display = 'none';
            } else {
                modalPhoto.style.display = 'none';
                modalInitials.style.display = 'flex';
                modalInitials.textContent = initialsText;
            }
        }
        
        const socialContainer = document.getElementById('modalArtistSocial');
        if (socialContainer) {
            socialContainer.innerHTML = '';
            
            const socials = [
                { url: instagram, icon: '📷', name: 'Instagram' },
                { url: facebook, icon: '📘', name: 'Facebook' },
                { url: youtube, icon: '▶️', name: 'YouTube' }
            ];
            
            socials.forEach(s => {
                if (s.url && s.url.trim() !== '') {
                    const link = document.createElement('a');
                    link.href = s.url;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    link.className = 'social-link-item';
                    link.innerHTML = `<span>${s.icon}</span><span>${s.name}</span>`;
                    socialContainer.appendChild(link);
                }
            });
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    window.closeArtistModal = function() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    modal.addEventListener('click', e => {
        if (e.target === modal) closeArtistModal();
    });
    
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeArtistModal();
    });
});
// === MODAL DE ARTISTA ===
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    const modal = document.getElementById('artistModal');
    if (!modal) {
        console.error('❌ Modal no encontrado');
        return;
    }
    
    console.log('✅ Modal inicializado');
    
    document.addEventListener('click', function(e) {
        const card = e.target.closest('.artist-card');
        if (!card) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const name = card.dataset.name || '';
        const desc = card.dataset.desc || '';
        const instagram = card.dataset.instagram || '';
        const facebook = card.dataset.facebook || '';
        const youtube = card.dataset.youtube || '';
        
        const photoImg = card.querySelector('.artist-photo img');
        const photoSrc = photoImg ? photoImg.src : '';
        const initialsDiv = card.querySelector('.artist-initials');
        const initialsText = initialsDiv ? initialsDiv.textContent : '';
        
        document.getElementById('modalArtistName').textContent = name;
        document.getElementById('modalArtistDesc').textContent = desc;
        
        const modalPhoto = document.getElementById('modalArtistPhoto');
        const modalInitials = document.getElementById('modalArtistInitials');
        
        if (photoSrc && photoImg.style.display !== 'none') {
            modalPhoto.src = photoSrc;
            modalPhoto.alt = name;
            modalPhoto.style.display = 'block';
            modalInitials.style.display = 'none';
        } else {
            modalPhoto.style.display = 'none';
            modalInitials.style.display = 'flex';
            modalInitials.textContent = initialsText;
        }
        
        const socialContainer = document.getElementById('modalArtistSocial');
        socialContainer.innerHTML = '';
        
        const socials = [
            { url: instagram, icon: '📷', name: 'Instagram' },
            { url: facebook, icon: '📘', name: 'Facebook' },
            { url: youtube, icon: '▶️', name: 'YouTube' }
        ];
        
        socials.forEach(s => {
            if (s.url && s.url.trim() !== '') {
                const link = document.createElement('a');
                link.href = s.url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.className = 'social-link-item';
                link.innerHTML = `<span>${s.icon}</span><span>${s.name}</span>`;
                socialContainer.appendChild(link);
            }
        });
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    window.closeArtistModal = function() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    modal.addEventListener('click', e => {
        if (e.target === modal) closeArtistModal();
    });
    
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeArtistModal();
    });
});