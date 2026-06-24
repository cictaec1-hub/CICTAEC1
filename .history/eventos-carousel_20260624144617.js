// === CARRUSEL DE ARTISTAS - VERSIÓN SIMPLE ===
(function() {
    'use strict';
    
    // Verificar si ya se inicializó
    if (window.artistCarouselLoaded) return;
    window.artistCarouselLoaded = true;
    
    const track = document.querySelector('.artists-carousel-track');
    if (!track) return;
    
    const items = track.querySelector('.artists-carousel-items');
    if (!items) return;
    
    // Eliminar clones existentes
    const existingClones = track.querySelectorAll('[data-clone="true"]');
    existingClones.forEach(c => c.remove());
    
    // Crear clon exacto
    const clone = items.cloneNode(true);
    clone.setAttribute('data-clone', 'true');
    clone.style.marginLeft = '30px'; // gap
    track.appendChild(clone);
    
    // Calcular ancho total
    function animate() {
        const itemWidth = items.scrollWidth + 30; // + gap
        const duration = 40; // segundos
        
        // Crear animación CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes artistScroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-${itemWidth}px); }
            }
            .artists-carousel-items,
            .artists-carousel-items[data-clone="true"] {
                animation: artistScroll ${duration}s linear infinite;
            }
            .artists-carousel-track:hover .artists-carousel-items,
            .artists-carousel-track:hover .artists-carousel-items[data-clone="true"] {
                animation-play-state: paused;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Esperar imágenes
    const images = items.querySelectorAll('img');
    let loaded = 0;
    
    if (images.length === 0) {
        animate();
    } else {
        images.forEach(img => {
            if (img.complete) {
                loaded++;
                if (loaded === images.length) animate();
            } else {
                img.addEventListener('load', () => {
                    loaded++;
                    if (loaded === images.length) animate();
                });
                img.addEventListener('error', () => {
                    loaded++;
                    if (loaded === images.length) animate();
                });
            }
        });
    }
})();

// === MODAL DE ARTISTA ===
(function() {
    'use strict';
    
    if (window.artistModalLoaded) return;
    window.artistModalLoaded = true;
    
    const modal = document.getElementById('artistModal');
    if (!modal) return;
    
    document.addEventListener('click', function(e) {
        const card = e.target.closest('.artist-card');
        if (!card) return;
        
        e.preventDefault();
        
        const name = card.dataset.name || '';
        const desc = card.dataset.desc || '';
        const instagram = card.dataset.instagram || '';
        const facebook = card.dataset.facebook || '';
        const youtube = card.dataset.youtube || '';
        
        document.getElementById('modalArtistName').textContent = name;
        document.getElementById('modalArtistDesc').textContent = desc;
        
        const photoImg = card.querySelector('.artist-photo img');
        const photoSrc = photoImg ? photoImg.src : '';
        const initialsDiv = card.querySelector('.artist-initials');
        const initialsText = initialsDiv ? initialsDiv.textContent : '';
        
        const modalPhoto = document.getElementById('modalArtistPhoto');
        const modalInitials = document.getElementById('modalArtistInitials');
        
        if (photoSrc && photoImg.style.display !== 'none') {
            modalPhoto.src = photoSrc;
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
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeArtistModal();
        }
    });
})();