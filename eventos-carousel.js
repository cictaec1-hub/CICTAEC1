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










// === REPRODUCTOR YOUTUBE SHORTS CON ACTIVACIÓN AL PRIMER CLIC ===
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
        
        // Mostrar aviso sutil para activar sonido
        showAudioNotice();
    }

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            nextVideo();
        }
        
        if (event.data === YT.PlayerState.PLAYING) {
            if (audioEnabled) {
                setTimeout(() => {
                    player.unMute();
                    updateMuteButtonUI();
                }, 500);
            }
            resetAutoPlay();
        }
    }

    // ✅ TRUCO: El primer clic en CUALQUIER parte de la página activa el audio
    function enableAudioOnFirstClick() {
        if (!audioEnabled && player) {
            player.unMute();
            audioEnabled = true;
            updateMuteButtonUI();
            hideAudioNotice();
            console.log('🔊 Audio activado por interacción del usuario');
        }
        // Eliminar el listener después del primer clic para no interferir
        document.removeEventListener('click', enableAudioOnFirstClick);
        document.removeEventListener('touchstart', enableAudioOnFirstClick);
    }

    // Escuchar el primer clic o toque en toda la página
    document.addEventListener('click', enableAudioOnFirstClick, { once: true });
    document.addEventListener('touchstart', enableAudioOnFirstClick, { once: true });

    function changeVideo(index) {
        if (index < 0) index = videoIds.length - 1;
        if (index >= videoIds.length) index = 0;
        
        currentIndex = index;
        const videoId = videoIds[index];
        
        if (player && player.loadVideoById) {
            player.loadVideoById(videoId);
            
            if (audioEnabled) {
                setTimeout(() => {
                    player.unMute();
                    updateMuteButtonUI();
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
            showAudioNotice();
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

    function showAudioNotice() {
        let notice = document.querySelector('.audio-auto-notice');
        if (!notice) {
            notice = document.createElement('div');
            notice.className = 'audio-auto-notice';
            notice.innerHTML = '🔊 Haz clic en la página para activar el sonido';
            notice.style.cursor = 'pointer';
            notice.onclick = function() {
                player.unMute();
                audioEnabled = true;
                hideAudioNotice();
                updateMuteButtonUI();
            };
            document.querySelector('.main-video-wrapper').appendChild(notice);
        }
        setTimeout(() => notice.classList.add('show'), 1000); // Aparece tras 1 segundo
    }

    function hideAudioNotice() {
        const notice = document.querySelector('.audio-auto-notice');
        if (notice) {
            notice.classList.remove('show');
            setTimeout(() => { if(notice.parentNode) notice.remove(); }, 500);
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












