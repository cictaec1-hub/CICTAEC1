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










// === REPRODUCTOR YOUTUBE SHORTS CON AUTO-AUDIO AL SCROLL ===
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
    let userHasInteracted = false; // ✅ Clave: detecta primera interacción
    let audioUnlocked = false; // ✅ Clave: detecta si ya desbloqueamos el audio
    const AUTOPLAY_DURATION = 15000;

    // Cargar API de YouTube
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // ✅ DETECTAR PRIMERA INTERACCIÓN DEL USUARIO (scroll, clic, tecla, touch)
    function markUserInteraction() {
        if (!userHasInteracted) {
            userHasInteracted = true;
            console.log('✅ Usuario interactuó con la página');
            
            // Si el vídeo ya está visible, activar audio inmediatamente
            if (player && audioUnlocked) {
                tryUnlockAudio();
            }
        }
    }

    // Escuchar TODOS los tipos de interacción
    document.addEventListener('scroll', markUserInteraction, { passive: true });
    document.addEventListener('click', markUserInteraction, { passive: true });
    document.addEventListener('touchstart', markUserInteraction, { passive: true });
    document.addEventListener('keydown', markUserInteraction, { passive: true });

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
        
        // ✅ INICIAR OBSERVER PARA DETECTAR CUANDO EL VÍDEO ES VISIBLE
        setupIntersectionObserver();
    }

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            nextVideo();
        }
        
        if (event.data === YT.PlayerState.PLAYING) {
            // Si el usuario ya interactuó y el audio está desbloqueado, activarlo
            if (userHasInteracted && audioUnlocked) {
                setTimeout(() => {
                    tryUnlockAudio();
                }, 800);
            }
            resetAutoPlay();
        }
    }

    // ✅ INTERSECTION OBSERVER: Detecta cuando el vídeo entra en pantalla
    function setupIntersectionObserver() {
        const container = document.querySelector('.video-player-container');
        if (!container) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    // El vídeo está más del 50% visible
                    console.log('👁️ Vídeo visible en pantalla');
                    audioUnlocked = true;
                    
                    // Si el usuario ya interactuó, activar audio
                    if (userHasInteracted) {
                        tryUnlockAudio();
                    }
                }
            });
        }, {
            threshold: [0.5] // Se activa cuando el 50% del elemento es visible
        });
        
        observer.observe(container);
    }

    // ✅ INTENTAR ACTIVAR EL AUDIO (funciona si el usuario ya interactuó)
    function tryUnlockAudio() {
        if (!player || !player.unMute) return;
        
        try {
            player.unMute();
            
            // Verificar si realmente se desmuté después de un breve momento
            setTimeout(() => {
                if (player && !player.isMuted()) {
                    console.log('🔊 ¡Audio activado automáticamente!');
                    updateMuteButtonUI();
                    
                    // Mostrar notificación temporal
                    let notice = document.querySelector('.audio-auto-notice');
                    if (!notice) {
                        notice = document.createElement('div');
                        notice.className = 'audio-auto-notice';
                        notice.textContent = '🔊 Audio activado';
                        document.querySelector('.main-video-wrapper').appendChild(notice);
                    }
                    notice.classList.add('show');
                    
                    // Ocultar la notificación después de 2 segundos
                    setTimeout(() => {
                        notice.classList.remove('show');
                    }, 2000);
                    
                } else {
                    console.log('⚠️ El navegador bloqueó el audio automático');
                }
            }, 300);
        } catch (e) {
            console.log('Error al activar audio:', e);
        }
    }

    function changeVideo(index) {
        if (index < 0) index = videoIds.length - 1;
        if (index >= videoIds.length) index = 0;
        
        currentIndex = index;
        const videoId = videoIds[index];
        
        console.log('Cambiando a vídeo:', videoId);
        
        if (player && player.loadVideoById) {
            player.loadVideoById(videoId);
            
            // Si el audio está desbloqueado, activarlo en el nuevo vídeo
            if (audioUnlocked && userHasInteracted) {
                setTimeout(() => {
                    tryUnlockAudio();
                }, 1500);
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

    window.changeVideo = changeVideo;

    // Toggle mute manual (por si el usuario quiere silenciar)
    window.toggleMute = function() {
        if (!player) return;
        
        if (player.isMuted()) {
            player.unMute();
            audioUnlocked = true;
        } else {
            player.mute();
            audioUnlocked = false;
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
    
    console.log('✅ Reproductor listo con auto-audio al scroll');
})();











