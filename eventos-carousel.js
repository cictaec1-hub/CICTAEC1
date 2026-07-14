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

// === REPRODUCTOR YOUTUBE SHORTS AUTOMÁTICO ===
(function() {
    'use strict';
    
    // Tus 3 Shorts de YouTube
    const videoIds = [
        'by8lD6VTkaU',  // Short 1
        '8W57qwLyrNQ',  // Short 2
        'FCUePKAfOrA'   // Short 3 (reemplaza con otro ID cuando lo tengas)
    ];
    
    let currentIndex = 0;
    let autoPlayInterval;
    const AUTOPLAY_DURATION = 15000; // 15 segundos por vídeo
    
    const iframe = document.getElementById('youtubeShortsPlayer');
    if (!iframe) return;
    
    // Cambiar vídeo
    function changeVideo(index) {
        if (index < 0) index = videoIds.length - 1;
        if (index >= videoIds.length) index = 0;
        
        currentIndex = index;
        const videoId = videoIds[index];
        
        // Actualizar iframe
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0`;
        
        resetAutoPlay();
    }
    
    // Siguiente vídeo
    window.nextVideo = function() {
        changeVideo(currentIndex + 1);
    };
    
    // Vídeo anterior
    window.prevVideo = function() {
        changeVideo(currentIndex - 1);
    };
    
    // Auto-play
    function startAutoPlay() {
        resetAutoPlay();
        autoPlayInterval = setInterval(() => {
            nextVideo();
        }, AUTOPLAY_DURATION);
    }
    
    function resetAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    // Pausar al hacer hover
    const container = document.querySelector('.video-player-container');
    if (container) {
        container.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        container.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
    }
    
    // Iniciar
    startAutoPlay();
})();