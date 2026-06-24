// === CARRUSEL CINEMATOGRÁFICO DE EVENTOS ===
(function() {
    'use strict';
    
    // Variables
    let currentSlide = 0;
    let autoplayInterval = null;
    let progressInterval = null;
    let isAutoplay = true;
    const AUTOPLAY_DURATION = 7000; // 7 segundos
    
    const slides = document.querySelectorAll('.event-slide');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    const progressBar = document.getElementById('progressBar');
    const autoplayBtn = document.getElementById('autoplayBtn');
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    
    if (slides.length === 0) return;
    
    // Crear partículas de fondo
    function createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 15 + 15) + 's';
            container.appendChild(particle);
        }
    }
    
    // Crear indicadores
    function createIndicators() {
        if (!indicatorsContainer) return;
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'indicator' + (index === 0 ? ' active' : '');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }
    
    // Actualizar slides
    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            
            // Pausar videos locales
            const localVideo = slide.querySelector('.flyer-video');
            if (localVideo) {
                localVideo.pause();
            }
            
            // Pausar video de fondo
            const bgVideo = slide.querySelector('.flyer-video-bg');
            if (bgVideo && index !== currentSlide) {
                bgVideo.pause();
            }
            
            if (index === currentSlide) {
                slide.classList.add('active');
                
                // Reproducir video local
                if (localVideo) {
                    localVideo.currentTime = 0;
                    localVideo.play().catch(e => console.log('Autoplay bloqueado:', e));
                }
                
                // Reproducir video de fondo
                if (bgVideo) {
                    bgVideo.currentTime = 0;
                    bgVideo.play().catch(e => console.log('Autoplay bloqueado:', e));
                }
            }
        });
        
        // Actualizar indicadores
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((ind, index) => {
            ind.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Mover slide
    function moveSlide(direction) {
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        updateSlides();
        resetProgress();
    }
    
    // Ir a slide específico
    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
        resetProgress();
    }
    
    // Barra de progreso
    function startProgress() {
        if (!progressBar) return;
        let progress = 0;
        progressBar.style.width = '0%';
        
        progressInterval = setInterval(() => {
            progress += 100 / (AUTOPLAY_DURATION / 50);
            progressBar.style.width = progress + '%';
            
            if (progress >= 100) {
                clearInterval(progressInterval);
            }
        }, 50);
    }
    
    function resetProgress() {
        if (progressInterval) clearInterval(progressInterval);
        if (progressBar) progressBar.style.width = '0%';
        
        if (isAutoplay) {
            stopAutoplay();
            startAutoplay();
        }
    }
    
    // Autoplay
    function startAutoplay() {
        if (autoplayInterval) clearInterval(autoplayInterval);
        startProgress();
        
        autoplayInterval = setInterval(() => {
            moveSlide(1);
        }, AUTOPLAY_DURATION);
    }
    
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
        if (progressInterval) {
            clearInterval(progressInterval);
            progressInterval = null;
        }
    }
    
    // TOGGLE AUTOPLAY
    function toggleAutoplay() {
        isAutoplay = !isAutoplay;
        
        const iconPause = autoplayBtn.querySelector('.icon-pause');
        const iconPlay = autoplayBtn.querySelector('.icon-play');
        
        if (isAutoplay) {
            autoplayBtn.classList.remove('paused');
            iconPause.style.display = 'block';
            iconPlay.style.display = 'none';
            startAutoplay();
        } else {
            autoplayBtn.classList.add('paused');
            iconPause.style.display = 'none';
            iconPlay.style.display = 'block';
            stopAutoplay();
            if (progressBar) progressBar.style.width = '0%';
        }
    }
    
    // Inicializar
    function init() {
        createParticles();
        createIndicators();
        updateSlides();
        
        // Event listeners
        if (autoplayBtn) {
            autoplayBtn.addEventListener('click', toggleAutoplay);
        }
        
        if (btnPrev) {
            btnPrev.addEventListener('click', () => moveSlide(-1));
        }
        
        if (btnNext) {
            btnNext.addEventListener('click', () => moveSlide(1));
        }
        
        // Pausar al hacer hover
        const container = document.querySelector('.events-carousel-container');
        if (container) {
            container.addEventListener('mouseenter', () => {
                if (isAutoplay) stopAutoplay();
            });
            container.addEventListener('mouseleave', () => {
                if (isAutoplay) startAutoplay();
            });
        }
        
        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') moveSlide(-1);
            if (e.key === 'ArrowRight') moveSlide(1);
            if (e.key === ' ') {
                e.preventDefault();
                toggleAutoplay();
            }
        });
        
        // Iniciar autoplay
        startAutoplay();
    }
    
    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
// === CARRUSEL DE ARTISTAS CON LOOP INFINITO (SIN DUPLICAR HTML) ===
(function() {
    'use strict';
    
    const artistTracks = document.querySelectorAll('.artists-carousel-track');
    
    artistTracks.forEach(track => {
        const items = track.querySelector('.artists-carousel-items');
        if (!items) return;
        
        // Clonar el contenido para crear el loop
        const clone = items.cloneNode(true);
        track.appendChild(clone);
        
        // Calcular el ancho total para la animación
        const updateAnimation = () => {
            const itemsWidth = items.offsetWidth;
            const gap = 30; // Debe coincidir con el gap del CSS
            
            // Crear animación dinámica
            const animationName = `scrollArtists_${Math.random().toString(36).substr(2, 9)}`;
            const keyframes = `
                @keyframes ${animationName} {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-${itemsWidth + gap}px); }
                }
            `;
            
            // Añadir keyframes al documento
            const styleSheet = document.createElement('style');
            styleSheet.textContent = keyframes;
            document.head.appendChild(styleSheet);
            
            // Aplicar animación a ambos conjuntos
            items.style.animation = `${animationName} 35s linear infinite`;
            clone.style.animation = `${animationName} 35s linear infinite`;
        };
        
        // Ejecutar cuando las imágenes carguen
        const images = items.querySelectorAll('img');
        if (images.length > 0) {
            let loadedCount = 0;
            images.forEach(img => {
                if (img.complete) {
                    loadedCount++;
                } else {
                    img.addEventListener('load', () => {
                        loadedCount++;
                        if (loadedCount === images.length) {
                            updateAnimation();
                        }
                    });
                }
            });
            
            if (loadedCount === images.length) {
                updateAnimation();
            }
        } else {
            updateAnimation();
        }
        
        // Pausar al hacer hover
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
// === CARRUSEL DE ARTISTAS CON LOOP INFINITO ===
(function() {
    'use strict';
    
    const artistTracks = document.querySelectorAll('.artists-carousel-track');
    
    artistTracks.forEach(track => {
        const items = track.querySelector('.artists-carousel-items');
        if (!items) return;
        
        // Clonar el contenido para crear el loop
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

// === MODAL DE ARTISTA - CON DELEGACIÓN DE EVENTOS ===
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    const modal = document.getElementById('artistModal');
    
    if (!modal) {
        console.error('❌ Modal #artistModal no encontrado en el DOM');
        return;
    }
    
    console.log('✅ Modal encontrado, inicializando...');
    
    // DELEGACIÓN DE EVENTOS - funciona incluso con tarjetas clonadas
    document.addEventListener('click', function(e) {
        const card = e.target.closest('.artist-card');
        
        if (!card) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        console.log('🎤 Click en artista:', card.dataset.name);
        
        // Obtener datos
        const name = card.dataset.name || '';
        const desc = card.dataset.desc || '';
        const instagram = card.dataset.instagram || '';
        const facebook = card.dataset.facebook || '';
        const youtube = card.dataset.youtube || '';
        
        // Obtener foto
        const photoImg = card.querySelector('.artist-photo img');
        const photoSrc = photoImg ? photoImg.src : '';
        const initialsDiv = card.querySelector('.artist-initials');
        const initialsText = initialsDiv ? initialsDiv.textContent : '';
        
        // Llenar modal
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
        
        // Generar enlaces sociales
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
        
        // Mostrar modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Cerrar modal
    window.closeArtistModal = function() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    // Cerrar al hacer click fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeArtistModal();
        }
    });
    
    // Cerrar con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeArtistModal();
        }
    });
});