// === CARRUSEL CINEMATOGRÁFICO DE EVENTOS ===
(function() {
    'use strict';
    
    let currentSlide = 0;
    let autoplayInterval = null;
    let progressInterval = null;
    let isAutoplay = true;
    const AUTOPLAY_DURATION = 7000;
    
    const slides = document.querySelectorAll('.event-slide');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    const progressBar = document.getElementById('progressBar');
    const autoplayBtn = document.getElementById('autoplayBtn');
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    
    if (slides.length === 0) return;
    
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
    
    function createIndicators() {
        if (!indicatorsContainer) return;
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'indicator' + (index === 0 ? ' active' : '');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }
    
    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            
            const localVideo = slide.querySelector('.flyer-video');
            if (localVideo) localVideo.pause();
            
            const bgVideo = slide.querySelector('.flyer-video-bg');
            if (bgVideo && index !== currentSlide) bgVideo.pause();
            
            if (index === currentSlide) {
                slide.classList.add('active');
                if (localVideo) {
                    localVideo.currentTime = 0;
                    localVideo.play().catch(e => console.log('Autoplay bloqueado:', e));
                }
                if (bgVideo) {
                    bgVideo.currentTime = 0;
                    bgVideo.play().catch(e => console.log('Autoplay bloqueado:', e));
                }
            }
        });
        
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((ind, index) => {
            ind.classList.toggle('active', index === currentSlide);
        });
    }
    
    function moveSlide(direction) {
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        updateSlides();
        resetProgress();
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
        resetProgress();
    }
    
    function startProgress() {
        if (!progressBar) return;
        let progress = 0;
        progressBar.style.width = '0%';
        
        progressInterval = setInterval(() => {
            progress += 100 / (AUTOPLAY_DURATION / 50);
            progressBar.style.width = progress + '%';
            if (progress >= 100) clearInterval(progressInterval);
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
    
    function startAutoplay() {
        if (autoplayInterval) clearInterval(autoplayInterval);
        startProgress();
        autoplayInterval = setInterval(() => moveSlide(1), AUTOPLAY_DURATION);
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
    
    function init() {
        createParticles();
        createIndicators();
        updateSlides();
        
        if (autoplayBtn) autoplayBtn.addEventListener('click', toggleAutoplay);
        if (btnPrev) btnPrev.addEventListener('click', () => moveSlide(-1));
        if (btnNext) btnNext.addEventListener('click', () => moveSlide(1));
        
        const container = document.querySelector('.events-carousel-container');
        if (container) {
            container.addEventListener('mouseenter', () => { if (isAutoplay) stopAutoplay(); });
            container.addEventListener('mouseleave', () => { if (isAutoplay) startAutoplay(); });
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') moveSlide(-1);
            if (e.key === 'ArrowRight') moveSlide(1);
            if (e.key === ' ') {
                e.preventDefault();
                toggleAutoplay();
            }
        });
        
        startAutoplay();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

// === CARRUSEL DE ARTISTAS CON LOOP INFINITO ===
(function() {
    'use strict';
    
    const artistTracks = document.querySelectorAll('.artists-carousel-track');
    
    artistTracks.forEach(track => {
        const items = track.querySelector('.artists-carousel-items');
        if (!items) return;
        
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

// === MODAL DE ARTISTA ===
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    const modal = document.getElementById('artistModal');
    if (!modal) {
        console.error('❌ Modal no encontrado');
        return;
    }
    
    console.log('✅ Modal inicializado');
    
    document.addEventListener('click', function(e) {
        const card = e.target.closest('.artist-card');
        if (!card) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const name = card.dataset.name || '';
        const desc = card.dataset.desc || '';
        const instagram = card.dataset.instagram || '';
        const facebook = card.dataset.facebook || '';
        const youtube = card.dataset.youtube || '';
        
        const photoImg = card.querySelector('.artist-photo img');
        const photoSrc = photoImg ? photoImg.src : '';
        const initialsDiv = card.querySelector('.artist-initials');
        const initialsText = initialsDiv ? initialsDiv.textContent : '';
        
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
        if (e.key === 'Escape' && modal.classList.contains('active')) closeArtistModal();
    });
});