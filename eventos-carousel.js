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
    let isAudioEnabled = false; // ✅ NUEVO: Guarda si el usuario activó el audio
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
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        // Empezar muteado (obligatorio para autoplay en navegadores)
        event.target.mute();
        event.target.playVideo();
        updateMuteButton(); // ✅ Actualizar icono inicial
        startAutoPlay();
    }

    function onPlayerStateChange(event) {
        // Cuando el vídeo termina (estado 0 = ENDED)
        if (event.data === YT.PlayerState.ENDED) {
            console.log('Vídeo terminado, pasando al siguiente...');
            nextVideo();
        }
        
        // ✅ NUEVO: Cuando empieza a reproducirse, aplicar el estado del audio guardado
        if (event.data === YT.PlayerState.PLAYING) {
            if (isAudioEnabled && player && player.unMute) {
                setTimeout(() => {
                    player.unMute();
                    updateMuteButton();
                    console.log('Audio restaurado para el nuevo vídeo');
                }, 500); // Pequeño delay para asegurar que la API lo permita
            }
            resetAutoPlay();
        }
    }

    // Cambiar a un vídeo específico
    function changeVideo(index) {
        if (index < 0) index = videoIds.length - 1;
        if (index >= videoIds.length) index = 0;
        
        currentIndex = index;
        const videoId = videoIds[index];
        
        console.log('Cargando vídeo:', videoId, 'Índice:', index);
        
        if (player && player.loadVideoById) {
            // Cargar y reproducir el nuevo vídeo
            player.loadVideoById({
                videoId: videoId,
                startSeconds: 0
            });
            // El audio se restaurará automáticamente en onPlayerStateChange
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

    // Hacer changeVideo global
    window.changeVideo = changeVideo;

    // Toggle mute
    window.toggleMute = function() {
        if (!player || !player.isMuted) return;
        
        if (player.isMuted()) {
            player.unMute();
            isAudioEnabled = true; // ✅ Guardar preferencia del usuario
            console.log('Audio activado manualmente');
        } else {
            player.mute();
            isAudioEnabled = false; // ✅ Guardar preferencia del usuario
            console.log('Audio desactivado manualmente');
        }
        
        updateMuteButton();
    };

    // ✅ NUEVA: Función para sincronizar el icono del botón con el estado real
    function updateMuteButton() {
        const btn = document.querySelector('.mute-btn');
        if (!btn) return;
        
        const iconOff = btn.querySelector('.icon-off');
        const iconOn = btn.querySelector('.icon-on');
        
        if (player && player.isMuted && !player.isMuted()) {
            // Audio activado
            btn.classList.add('unmuted');
            if (iconOff) iconOff.style.display = 'none';
            if (iconOn) iconOn.style.display = 'block';
        } else {
            // Audio muteado
            btn.classList.remove('unmuted');
            if (iconOff) iconOff.style.display = 'block';
            if (iconOn) iconOn.style.display = 'none';
        }
    }

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