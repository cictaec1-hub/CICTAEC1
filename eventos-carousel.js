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









// === REPRODUCTOR YOUTUBE SHORTS (Efecto Scroll-to-Unmute) ===
(function() {
    'use strict';
    
    const videoIds = [
        '8W57qwLyrNQ',
        'FCUePKAfOrA',
        'by8lD6VTkaU',
         'KwX9Hv3s76c',
          'CWTXD1ysiq8',
           'ih40e8lRHEc',
            'Hb0dEY4_A8A',
             'bPLiiI0i7NE',
              'x1hnCGSF9k8'
        
    ];
    
    let currentIndex = 0;
    let player = null;
    let autoPlayInterval;
    let isUserInteracting = false;
    let hasUserInteracted = false; // Clave: se activa con el primer gesto válido
    const AUTOPLAY_DURATION = 15000;

    // Cargar API de YouTube
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
        
        // Mostrar aviso tras 1.5 segundos
        setTimeout(showAudioNotice, 1500);
        
        // Iniciar el observador de scroll
        setupScrollObserver();
    }

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            nextVideo();
        }
        
        if (event.data === YT.PlayerState.PLAYING) {
            // Si el usuario ya interactuó, asegurar que el nuevo vídeo tenga audio
            if (hasUserInteracted && player && player.isMuted()) {
                setTimeout(() => {
                    player.unMute();
                    updateMuteButtonUI();
                    hideAudioNotice();
                }, 600);
            }
            resetAutoPlay();
        }
    }

    // ✅ 1. DETECTAR PRIMERA INTERACCIÓN VÁLIDA (Click, Toque, Tecla)
    function registerFirstInteraction() {
        if (!hasUserInteracted) {
            hasUserInteracted = true;
            console.log('✅ Interacción de usuario detectada (Audio desbloqueado)');
            
            // Si el vídeo ya está en pantalla, activar audio inmediatamente
            if (player && player.isMuted()) {
                player.unMute();
                updateMuteButtonUI();
                hideAudioNotice();
            }
            
            // Limpiar listeners para ahorrar recursos
            document.removeEventListener('mousedown', registerFirstInteraction);
            document.removeEventListener('touchstart', registerFirstInteraction);
            document.removeEventListener('keydown', registerFirstInteraction);
        }
    }

    // Escuchamos gestos que el navegador SÍ acepta para desbloquear audio
    document.addEventListener('mousedown', registerFirstInteraction); // Incluye clic en barra de scroll
    document.addEventListener('touchstart', registerFirstInteraction, { passive: true }); // Toque en móvil
    document.addEventListener('keydown', registerFirstInteraction); // Flechas del teclado

    // ✅ 2. OBSERVADOR DE SCROLL (Detecta cuando el vídeo es visible)
    function setupScrollObserver() {
        const container = document.querySelector('.video-player-container');
        if (!container) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Cuando más del 50% del vídeo es visible al hacer scroll
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    if (hasUserInteracted && player && player.isMuted()) {
                        player.unMute();
                        updateMuteButtonUI();
                        hideAudioNotice();
                        console.log('🔊 Audio activado automáticamente al hacer scroll');
                    }
                }
            });
        }, { threshold: 0.5 }); // Se dispara cuando el 50% del elemento es visible
        
        observer.observe(container);
    }

    function changeVideo(index) {
        if (index < 0) index = videoIds.length - 1;
        if (index >= videoIds.length) index = 0;
        
        currentIndex = index;
        const videoId = videoIds[index];
        
        if (player && player.loadVideoById) {
            player.loadVideoById(videoId);
            
            // Si ya hubo interacción, preparar el audio para el nuevo vídeo
            if (hasUserInteracted) {
                setTimeout(() => {
                    if (player && player.isMuted()) {
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
            hasUserInteracted = true;
            hideAudioNotice();
        } else {
            player.mute();
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

    function showAudioNotice() {
        if (!player || !player.isMuted()) return;
        
        const wrapper = document.querySelector('.main-video-wrapper');
        if (!wrapper) return;
        
        const existingNotice = wrapper.querySelector('.audio-auto-notice');
        if (existingNotice) existingNotice.remove();
        
        const notice = document.createElement('div');
        notice.className = 'audio-auto-notice';
        notice.innerHTML = '🔊 Desplázate o toca la pantalla para activar el sonido';
        wrapper.appendChild(notice);
        
        requestAnimationFrame(() => notice.classList.add('show'));
    }

    function hideAudioNotice() {
        const notice = document.querySelector('.audio-auto-notice');
        if (notice) {
            notice.classList.remove('show');
            setTimeout(() => {
                if (notice.parentNode) notice.remove();
            }, 400);
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
    
    console.log('✅ Reproductor listo con detección de scroll');
})();









(function() {
    'use strict';
    
    let currentSlide = 1;
    const totalSlides = 4;
    let autoPlayInterval;
    const AUTOPLAY_DELAY = 8000;
    
    // Elementos del DOM
    let slides, dots, btnPrev, btnNext, currentEl, totalEl;
    
    function initElements() {
        slides = document.querySelectorAll('.masonry-slide');
        dots = document.querySelectorAll('.dot');
        btnPrev = document.getElementById('btnPrev');
        btnNext = document.getElementById('btnNext');
        currentEl = document.getElementById('currentSlide');
        totalEl = document.getElementById('totalSlides');
    }
    
    function updateSlides() {
        if (!slides || !dots) return;
        
        slides.forEach(slide => {
            slide.classList.remove('active');
            if (parseInt(slide.dataset.slide) === currentSlide) {
                slide.classList.add('active');
            }
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
            if (parseInt(dot.dataset.slide) === currentSlide) {
                dot.classList.add('active');
            }
        });
        
        if (currentEl) currentEl.textContent = currentSlide;
        if (totalEl) totalEl.textContent = totalSlides;
    }
    
    function next() {
        currentSlide = currentSlide >= totalSlides ? 1 : currentSlide + 1;
        updateSlides();
        resetAutoPlay();
    }
    
    function prev() {
        currentSlide = currentSlide <= 1 ? totalSlides : currentSlide - 1;
        updateSlides();
        resetAutoPlay();
    }
    
    function goTo(slide) {
        currentSlide = slide;
        updateSlides();
        resetAutoPlay();
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(next, AUTOPLAY_DELAY);
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    function pause() {
        clearInterval(autoPlayInterval);
    }
    
    function resume() {
        startAutoPlay();
    }
    
    // Inicializar
    function init() {
        initElements();
        
        if (slides.length === 0) {
            console.warn('⚠️ No se encontraron slides del masonry');
            return;
        }
        
        updateSlides();
        startAutoPlay();
        
        // ✅ Event listeners directos en los botones (más robusto que onclick)
        if (btnPrev) {
            btnPrev.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                prev();
            });
        }
        
        if (btnNext) {
            btnNext.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                next();
            });
        }
        
        // ✅ Event listeners en los dots
        if (dots) {
            dots.forEach(dot => {
                dot.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const slideNum = parseInt(this.dataset.slide);
                    goTo(slideNum);
                });
            });
        }
        
        // Pausar al hacer hover en el wrapper
        const wrapper = document.querySelector('.cinematic-slideshow-wrapper');
        if (wrapper) {
            wrapper.addEventListener('mouseenter', pause);
            wrapper.addEventListener('mouseleave', resume);
        }
        
        // Navegación con teclado
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prev();
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                next();
            }
        });
        
        console.log('✅ Masonry Slideshow inicializado con', totalSlides, 'slides');
    }
    
    // Iniciar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();






/*

// === POPUP FESTIVAL DEL PLÁTANO Y BANANO (DESPLIEGUE)===
(function() {
    'use strict';
    
    const POPUP_DELAY = 5000; // 5 segundos
    const POPUP_STORAGE_KEY = 'cictaec_banana_popup_shown';
    const POPUP_COOLDOWN = 24 * 60 * 60 * 1000; // 24 horas
    
    function showBananaPopup() {
        const lastShown = localStorage.getItem(POPUP_STORAGE_KEY);
        const now = Date.now();
        
        if (lastShown && (now - parseInt(lastShown)) < POPUP_COOLDOWN) {
            return;
        }
        
        const popup = document.getElementById('banana-festival-popup');
        if (popup) {
            setTimeout(() => {
                popup.classList.add('active');
                localStorage.setItem(POPUP_STORAGE_KEY, now.toString());
            }, POPUP_DELAY);
        }
    }
    
    window.closeBananaPopup = function() {
        const popup = document.getElementById('banana-festival-popup');
        if (popup) {
            popup.classList.remove('active');
        }
    };
    
    document.addEventListener('click', function(e) {
        const popup = document.getElementById('banana-festival-popup');
        if (e.target === popup) {
            closeBananaPopup();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeBananaPopup();
        }
    });
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showBananaPopup);
    } else {
        showBananaPopup();
    }
})(); */


// === POPUP FESTIVAL DEL PLÁTANO Y BANANO (SOLO PRUEBA) ===
(function() {
    'use strict';
    
    const POPUP_DELAY = 5000; // 5 segundos
    
    function showBananaPopup() {
        const popup = document.getElementById('banana-festival-popup');
        if (popup) {
            setTimeout(() => {
                popup.classList.add('active');
            }, POPUP_DELAY);
        }
    }
    
    window.closeBananaPopup = function() {
        const popup = document.getElementById('banana-festival-popup');
        if (popup) {
            popup.classList.remove('active');
        }
    };
    
    document.addEventListener('click', function(e) {
        const popup = document.getElementById('banana-festival-popup');
        if (e.target === popup) {
            closeBananaPopup();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeBananaPopup();
        }
    });
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showBananaPopup);
    } else {
        showBananaPopup();
    }
})();






/* =========================================================
   -----------------SLIDESHOW · CARD 4----------------------
   ========================================================= */

(function () {

    'use strict';


    /* =====================================================
       CONTENIDO DEL SLIDESHOW
       =====================================================

       Cada elemento puede ser:

       - ARTISTA
       - MOMENTO
       - RECONOCIMIENTO
       - EVENTO
       - PÚBLICO
       - BACKSTAGE
       - ETC.

       La imagen y el texto pertenecen al mismo elemento.
       ===================================================== */

 const slides = [

    {
        image: 'images/gala1.png',
        badge: '✨ MOMENTO DE LA GALA',
        title: 'Brillo, elegancia y reconocimiento',
        description:
            'Una noche en el Hotel Palace de Barcelona para celebrar el talento y la trayectoria ecuatoriana.'
    },

    {
        image: 'images/daniloparra.png',
        badge: '🎵 TALENTO MUSICAL',
        title: 'Danilo Parra',
        description:
            'Cantautor ecuatoriano de amplia trayectoria, reconocido por llevar su música a escenarios internacionales.'
    },

    {
        image: 'images/josedelgado.png',
        badge: '📰 TRAYECTORIA PERIODÍSTICA',
        title: 'José Delgado',
        description:
            'Periodista ecuatoriano con más de tres décadas de trayectoria y reconocido por su trabajo en televisión.'
    },

    {
        image: 'images/hildamurillo.png',
        badge: '🎵 TRAYECTORIA MUSICAL',
        title: 'Hilda Murillo',
        description:
            'Una de las grandes voces de la música ecuatoriana, con una extensa trayectoria artística nacional e internacional.'
    },

    {
        image: 'images/douglasbastidas.png',
        badge: '🎸 ÍCONO DEL POP ROCK',
        title: 'Douglas Bastidas',
        description:
            'Cantante y compositor ecuatoriano, referente del pop rock y voz histórica de la agrupación Tranzas.'
    },

    {
        image: 'images/paoloplaza.png',
        badge: '🎤 TALENTO MUSICAL',
        title: 'Paolo Plaza',
        description:
            'Cantautor ecuatoriano reconocido por su trayectoria y su propuesta dentro de la salsa romántica.'
    },

    {
        image: 'images/kattyelisa.png',
        badge: '✨ TALENTO ECUATORIANO',
        title: 'Katty Elisa',
        description:
            'Cantante ecuatoriana de amplia experiencia, reconocida por su trayectoria junto a Las Damas de Oro.'
    }

];




    /* =====================================================
       ELEMENTOS
       ===================================================== */

    const image =
        document.getElementById(
            'galaSlideImage'
        );

    const badge =
        document.getElementById(
            'galaSlideBadge'
        );

    const title =
        document.getElementById(
            'galaSlideTitle'
        );

    const description =
        document.getElementById(
            'galaSlideDescription'
        );

    const number =
        document.getElementById(
            'galaSlideNumber'
        );

    const total =
        document.getElementById(
            'galaSlideTotal'
        );

    const dotsContainer =
        document.getElementById(
            'galaSlideDots'
        );

    const prevButton =
        document.getElementById(
            'galaSlidePrev'
        );

    const nextButton =
        document.getElementById(
            'galaSlideNext'
        );


    /* =====================================================
       COMPROBACIÓN
       ===================================================== */

    if (
        !image ||
        !badge ||
        !title ||
        !description ||
        !number ||
        !total ||
        !dotsContainer ||
        !prevButton ||
        !nextButton
    ) {

        return;

    }


    /* =====================================================
       CONFIGURACIÓN
       ===================================================== */

    let currentIndex = 0;

    let slideshowInterval = null;

    const SLIDE_DURATION = 5000;


    /* =====================================================
       TOTAL
       ===================================================== */

    total.textContent =
        String(slides.length)
            .padStart(2, '0');


    /* =====================================================
       CREAR INDICADORES
       ===================================================== */

    slides.forEach(
        (slide, index) => {

            const dot =
                document.createElement(
                    'button'
                );

            dot.type = 'button';

            dot.className =
                'gala-slide-dot';

            dot.setAttribute(
                'aria-label',
                `Mostrar ${slide.title}`
            );

            dot.addEventListener(
                'click',
                () => {

                    showSlide(index);

                    restartSlideshow();

                }
            );

            dotsContainer.appendChild(dot);

        }
    );


    const dots =
        dotsContainer.querySelectorAll(
            '.gala-slide-dot'
        );


    /* =====================================================
       MOSTRAR SLIDE
       ===================================================== */

    function showSlide(index) {

        if (index < 0) {

            index =
                slides.length - 1;

        }


        if (index >= slides.length) {

            index = 0;

        }


        currentIndex = index;


        const slide =
            slides[currentIndex];


        /* Animación */

        image.classList.add(
            'slide-changing'
        );


        setTimeout(
            () => {

                image.src =
                    slide.image;

                image.alt =
                    slide.title;

                badge.textContent =
                    slide.badge;

                title.textContent =
                    slide.title;

                description.textContent =
                    slide.description;

                number.textContent =
                    String(
                        currentIndex + 1
                    ).padStart(2, '0');


                image.classList.remove(
                    'slide-changing'
                );

            },

            180
        );


        /* Indicadores */

        dots.forEach(
            (dot, dotIndex) => {

                dot.classList.toggle(
                    'active',
                    dotIndex === currentIndex
                );

            }
        );

    }


    /* =====================================================
       SIGUIENTE
       ===================================================== */

    function nextSlide() {

        showSlide(
            currentIndex + 1
        );

    }


    /* =====================================================
       ANTERIOR
       ===================================================== */

    function previousSlide() {

        showSlide(
            currentIndex - 1
        );

    }


    /* =====================================================
       BOTONES
       ===================================================== */

    nextButton.addEventListener(
        'click',
        () => {

            nextSlide();

            restartSlideshow();

        }
    );


    prevButton.addEventListener(
        'click',
        () => {

            previousSlide();

            restartSlideshow();

        }
    );


    /* =====================================================
       AUTOPLAY
       ===================================================== */

    function startSlideshow() {

        clearInterval(
            slideshowInterval
        );

        slideshowInterval =
            setInterval(
                nextSlide,
                SLIDE_DURATION
            );

    }


    function restartSlideshow() {

        clearInterval(
            slideshowInterval
        );

        startSlideshow();

    }


    /* =====================================================
       PAUSA AL PASAR EL RATÓN
       ===================================================== */

    const slideshowCard =
        document.querySelector(
            '.gala-slideshow-card'
        );


    if (slideshowCard) {

        slideshowCard.addEventListener(
            'mouseenter',
            () => {

                clearInterval(
                    slideshowInterval
                );

            }
        );


        slideshowCard.addEventListener(
            'mouseleave',
            () => {

                startSlideshow();

            }
        );

    }


    /* =====================================================
       INICIAR
       ===================================================== */

    showSlide(0);

    startSlideshow();


})();