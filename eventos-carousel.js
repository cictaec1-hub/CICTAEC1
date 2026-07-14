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

// === REPRODUCTOR YOUTUBE ===
(function() {
    'use strict';
    
    // VÍDEOS DE PRUEBA QUE FUNCIONAN 100%
    // Reemplaza estos IDs con tus vídeos cuando los tengas
    const videoIds = [
        '8W57qwLyrNQ',  // Short 1
        'FCUePKAfOrA',  // Vídeo 2
        'by8lD6VTkaU'   // Short 3
    ];
    
    let currentIndex = 0;
    let player = null;
    let autoPlayInterval;
    const AUTOPLAY_DURATION = 15000;

    // Cargar API de YouTube
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('youtubeShortsPlayer', {
            height: '100%',
            width: '100%',
            videoId: videoIds[0],
            playerVars: {
                'autoplay': 1,
                'controls': 0,
                'loop': 1,
                'playlist': videoIds[0],
                'modestbranding': 1,
                'rel': 0,
                'enablejsapi': 1
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange,
                'onError': onPlayerError
            }
        });
    };

    function onPlayerReady(event) {
        event.target.mute(); // Empieza muteado (obligatorio)
        event.target.playVideo();
        startAutoPlay();
    }

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            nextVideo();
        }
    }

    function onPlayerError(event) {
        console.error('Error YouTube:', event.data);
        // Si hay error, saltar al siguiente vídeo
        nextVideo();
    }

    window.toggleMute = function() {
        if (!player) return;
        
        const btn = document.querySelector('.mute-btn');
        const iconOff = btn.querySelector('.icon-off');
        const iconOn = btn.querySelector('.icon-on');

        if (player.isMuted()) {
            player.unMute();
            iconOff.style.display = 'none';
            iconOn.style.display = 'block';
        } else {
            player.mute();
            iconOff.style.display = 'block';
            iconOn.style.display = 'none';
        }
    };

    window.nextVideo = function() {
        currentIndex = (currentIndex + 1) % videoIds.length;
        loadVideo(currentIndex);
    };

    window.prevVideo = function() {
        currentIndex = (currentIndex - 1 + videoIds.length) % videoIds.length;
        loadVideo(currentIndex);
    };

    function loadVideo(index) {
        if (player && player.loadVideoById) {
            player.loadVideoById(videoIds[index]);
        }
        resetAutoPlay();
    }

    function startAutoPlay() {
        resetAutoPlay();
        autoPlayInterval = setInterval(nextVideo, AUTOPLAY_DURATION);
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
            if (player) player.pauseVideo();
        });
        
        container.addEventListener('mouseleave', () => {
            if (player) player.playVideo();
            startAutoPlay();
        });
    }
})();