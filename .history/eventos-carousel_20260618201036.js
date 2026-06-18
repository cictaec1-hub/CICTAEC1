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