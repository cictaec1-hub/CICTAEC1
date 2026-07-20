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
    
    const videoIds = [
        '8W57qwLyrNQ',
        'FCUePKAfOrA',
        'by8lD6VTkaU'
    ];
    
    let currentIndex = 0;
    let player = null;
    let autoPlayInterval;
    let isUserInteracting = false;
    let audioEnabled = false;
    const AUTOPLAY_DURATION = 15000;

    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

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
        event.target.mute();
        event.target.playVideo();
        updateMuteButtonUI();
        startAutoPlay();
        
        // Mostrar aviso grande tras 2 segundos
        setTimeout(showAudioNotice, 2000);
    }

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            nextVideo();
        }
        
        if (event.data === YT.PlayerState.PLAYING) {
            if (audioEnabled) {
                setTimeout(() => {
                    if (player && player.unMute) {
                        player.unMute();
                        updateMuteButtonUI();
                    }
                }, 500);
            }
            resetAutoPlay();
        }
    }

    // ✅ ESTA FUNCIÓN SE EJECUTA CON GESTOS VÁLIDOS (Click, Rueda presionada, Toque)
    function enableAudioOnValidGesture(e) {
        if (!audioEnabled && player) {
            try {
                player.unMute();
                audioEnabled = true;
                updateMuteButtonUI();
                hideAudioNotice();
                console.log('🔊 Audio activado por gesto válido del usuario');
                
                // Eliminar listeners para no interferir más
                document.removeEventListener('mousedown', enableAudioOnValidGesture);
                document.removeEventListener('touchend', enableAudioOnValidGesture);
                document.removeEventListener('keydown', enableAudioOnKey);
            } catch (err) {
                console.log('El navegador bloqueó el audio:', err);
            }
        }
    }

    // ✅ Teclas de dirección y espacio también cuentan como gesto válido
    function enableAudioOnKey(e) {
        const scrollKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' '];
        if (scrollKeys.includes(e.key)) {
            enableAudioOnValidGesture(e);
        }
    }

    // Registramos mousedown (incluye presionar la rueda) y touchend (toque en móvil)
    document.addEventListener('mousedown', enableAudioOnValidGesture);
    document.addEventListener('touchend', enableAudioOnValidGesture);
    document.addEventListener('keydown', enableAudioOnKey);

    function changeVideo(index) {
        if (index < 0) index = videoIds.length - 1;
        if (index >= videoIds.length) index = 0;
        
        currentIndex = index;
        const videoId = videoIds[index];
        
        if (player && player.loadVideoById) {
            player.loadVideoById(videoId);
            
            if (audioEnabled) {
                setTimeout(() => {
                    if (player && player.unMute) {
                        player.unMute();
                        updateMuteButtonUI();
                    }
                }, 800);
            }
        }
        resetAutoPlay();
    }

    window.nextVideo = function() {
        isUserInteracting = false;
        changeVideo(currentIndex + 1);
    };

    window.prevVideo = function() {
        isUserInteracting = false;
        changeVideo(currentIndex - 1);
    };

    window.toggleMute = function() {
        if (!player) return;
        
        if (player.isMuted()) {
            player.unMute();
            audioEnabled = true;
            hideAudioNotice();
        } else {
            player.mute();
            audioEnabled = false;
            setTimeout(showAudioNotice, 1000);
        }
        updateMuteButtonUI();
    };

    function updateMuteButtonUI() {
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

    // ✅ NOTIFICACIÓN GRANDE Y CENTRADA (IMPOSIBLE DE NO VER)
    function showAudioNotice() {
        if (audioEnabled) return;
        
        const wrapper = document.querySelector('.main-video-wrapper');
        if (!wrapper) return;
        
        const existingNotice = wrapper.querySelector('.audio-auto-notice');
        if (existingNotice) existingNotice.remove();
        
        const notice = document.createElement('div');
        notice.className = 'audio-auto-notice';
        notice.innerHTML = '🔊 Toca la pantalla o presiona la rueda del ratón para activar el sonido';
        wrapper.appendChild(notice);
        
        // Forzar animación
        requestAnimationFrame(() => {
            notice.classList.add('show');
        });
    }

    function hideAudioNotice() {
        const notice = document.querySelector('.audio-auto-notice');
        if (notice) {
            notice.classList.remove('show');
            setTimeout(() => {
                if (notice.parentNode) notice.remove();
            }, 500);
        }
    }

    function startAutoPlay() {
        resetAutoPlay();
        autoPlayInterval = setInterval(() => {
            if (!isUserInteracting && player && player.getPlayerState && player.getPlayerState() === YT.PlayerState.PLAYING) {
                nextVideo();
            }
        }, AUTOPLAY_DURATION);
    }

    function resetAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    const container = document.querySelector('.video-player-container');
    if (container) {
        container.addEventListener('mouseenter', () => {
            isUserInteracting = true;
            clearInterval(autoPlayInterval);
            if (player) player.pauseVideo();
        });
        
        container.addEventListener('mouseleave', () => {
            isUserInteracting = false;
            if (player) player.playVideo();
            startAutoPlay();
        });
    }
    
    console.log('✅ Reproductor listo');
})();