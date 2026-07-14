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










// === REPRODUCTOR YOUTUBE SHORTS ===
// === REPRODUCTOR YOUTUBE SHORTS ===
(function() {
    'use strict';
    
    // Tus 3 vídeos de YouTube
    const videoIds = [
        '8W57qwLyrNQ',  // Short 1
        'FCUePKAfOrA',  // Vídeo 2
        'by8lD6VTkaU'   // Short 3
    ];
    
    let currentIndex = 0;
    let player = null;
    let autoPlayInterval;
    let isUserInteracting = false;
    const AUTOPLAY_DURATION = 15000; // 15 segundos

    // Cargar API de YouTube
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Cuando la API esté lista
    window.onYouTubeIframeAPIReady = function() {
        createPlayer();
    };
    
    function createPlayer() {
        if (!document.getElementById('youtubeShortsPlayer')) return;
        
        player = new YT.Player('youtubeShortsPlayer', {
            height: '100%',
            width: '100%',
            videoId: videoIds[0],
            playerVars: {
                'autoplay': 1,
                'controls': 0,
                'disablekb': 1,
                'fs': 0,
                'modestbranding': 1,
                'rel': 0,
                'enablejsapi': 1
                // NO poner 'loop' aquí
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        // Empezar muteado (obligatorio para autoplay)
        event.target.mute();
        event.target.playVideo();
        
        // Iniciar contador para cambio automático
        startAutoPlay();
    }

    function onPlayerStateChange(event) {
        // Cuando el vídeo termina (estado 0 = ENDED)
        if (event.data === YT.PlayerState.ENDED) {
            console.log('Vídeo terminado, pasando al siguiente...');
            nextVideo();
        }
        
        // Cuando está reproduciéndose (estado 1 = PLAYING)
        if (event.data === YT.PlayerState.PLAYING) {
            resetAutoPlay();
        }
    }

  // Cambiar a un vídeo específico
function changeVideo(index) {
    if (index < 0) index = videoIds.length - 1;
    if (index >= videoIds.length) index = 0;
    
    currentIndex = index;
    const videoId = videoIds[index];
    
    console.log('Cargando vídeo:', videoId);
    
    if (player && player.loadVideoById) {
        player.loadVideoById(videoId);
        
        // ✅ SOLUCIÓN: Forzar audio DESPUÉS de cargar el vídeo
        setTimeout(() => {
            if (player && !player.isMuted()) {
                player.unMute();
                updateMuteButton();
                console.log('Audio forzado en nuevo vídeo');
            }
        }, 1500); // Esperar 1.5 segundos
    }
    
    resetAutoPlay();
}

    // Siguiente vídeo
    window.nextVideo = function() {
        isUserInteracting = false;
        changeVideo(currentIndex + 1);
    };

    // Vídeo anterior
    window.prevVideo = function() {
        isUserInteracting = false;
        changeVideo(currentIndex - 1);
    };

    // Hacer changeVideo global para las miniaturas (si las añades luego)
    window.changeVideo = changeVideo;

    // Toggle mute
    window.toggleMute = function() {
        if (!player || !player.isMuted) return;
        
        if (player.isMuted()) {
            player.unMute();
            const btn = document.querySelector('.mute-btn');
            if (btn) {
                btn.classList.add('unmuted');
                btn.querySelector('.icon-off').style.display = 'none';
                btn.querySelector('.icon-on').style.display = 'block';
            }
        } else {
            player.mute();
            const btn = document.querySelector('.mute-btn');
            if (btn) {
                btn.classList.remove('unmuted');
                btn.querySelector('.icon-off').style.display = 'block';
                btn.querySelector('.icon-on').style.display = 'none';
            }
        }
    };

    // Auto-play cada 15 segundos
    function startAutoPlay() {
        resetAutoPlay();
        autoPlayInterval = setInterval(() => {
            if (!isUserInteracting && player && player.getPlayerState && player.getPlayerState() === YT.PlayerState.PLAYING) {
                console.log('Autoplay: pasando al siguiente vídeo');
                nextVideo();
            }
        }, AUTOPLAY_DURATION);
    }

    function resetAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
        startAutoPlay();
    }

    // Pausar al hacer hover
    const container = document.querySelector('.video-player-container');
    if (container) {
        container.addEventListener('mouseenter', () => {
            isUserInteracting = true;
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
            if (player && player.pauseVideo) {
                player.pauseVideo();
            }
        });
        
        container.addEventListener('mouseleave', () => {
            isUserInteracting = false;
            if (player && player.playVideo) {
                player.playVideo();
            }
            startAutoPlay();
        });
    }
    
    console.log('✅ Reproductor de YouTube inicializado con', videoIds.length, 'vídeos');
})();













function updateMuteButton() {
    const btn = document.querySelector('.mute-btn');
    if (!btn || !player) return;
    
    const iconOff = btn.querySelector('.icon-off');
    const iconOn = btn.querySelector('.icon-on');
    
    if (!player.isMuted()) {
        btn.classList.add('unmuted');
        if (iconOff) iconOff.style.display = 'none';
        if (iconOn) iconOn.style.display = 'block';
    } else {
        btn.classList.remove('unmuted');
        if (iconOff) iconOff.style.display = 'block';
        if (iconOn) iconOn.style.display = 'none';
    }
}