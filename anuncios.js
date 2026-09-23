// === TABLÓN DE ANUNCIOS - AUTOPLAY AL SCROLL ===
// Archivo: anuncios.js

(function() {
    'use strict';
    
    const anuncios = document.querySelectorAll('.anuncio-card');
    const playedVideos = new Set(); // Evitar reproducir el mismo video dos veces
    
    // Intersection Observer para detectar cuando los videos son visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const videoId = card.getAttribute('data-video-id');
                
                if (videoId && !playedVideos.has(videoId)) {
                    // Reproducir video automáticamente
                    playVideo(card, videoId);
                    playedVideos.add(videoId);
                }
            }
        });
    }, {
        threshold: 0.5 // El 50% del video debe ser visible
    });
    
    // Observar todas las tarjetas
    anuncios.forEach(anuncio => {
        observer.observe(anuncio);
    });
    
    // Función para reproducir el video
    function playVideo(card, videoId) {
        const container = card.querySelector('.anuncio-video-container');
        
        // Crear iframe de YouTube con autoplay y mute
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&controls=1`;
        iframe.allow = 'autoplay; encrypted-media';
        iframe.allowFullscreen = true;
        iframe.className = 'anuncio-video-embed';
        
        // Reemplazar thumbnail con video
        container.innerHTML = '';
        container.appendChild(iframe);
    }
    
    // Click manual para reproducir (por si el usuario quiere ver antes)
    anuncios.forEach(anuncio => {
        anuncio.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            if (videoId && !playedVideos.has(videoId)) {
                playVideo(this, videoId);
                playedVideos.add(videoId);
            }
        });
    });
})();











// === SISTEMA DE NOTICIAS AUTOMÁTICAS ===
(function() {
    'use strict';
    const RSS_FEEDS = [
    {
        url: 'https://news.google.com/rss/search?q=extranjeros+españa+2026&hl=es&gl=ES&ceid=ES:es&when=7d',
        category: 'inmigracion',
        source: 'Google News'
    },
    {
        url: 'https://news.google.com/rss/search?q=ayudas+vivienda+españa+2026&hl=es&gl=ES&ceid=ES:es&when=7d',
        category: 'vivienda',
        source: 'Google News'
    },
    {
        url: 'https://news.google.com/rss/search?q=ley+extranjería+2026&hl=es&gl=ES&ceid=ES:es&when=7d',
        category: 'legislacion',
        source: 'BOE'
    },
    {
        url: 'https://news.google.com/rss/search?q=eventos+barcelona+latinos+2026&hl=es&gl=ES&ceid=ES:es&when=7d',
        category: 'comunidad',
        source: 'Comunidad'
    }
];
    
    // Servicio para convertir RSS a JSON (gratuito)
    const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url=';
    
    let allNews = [];
    let currentFilter = 'all';
    
    // Cargar noticias
    async function loadNews() {
        const grid = document.getElementById('noticiasGrid');
        
        try {
            // Cargar todas las fuentes en paralelo
            const promises = RSS_FEEDS.map(feed => 
                fetch(RSS2JSON_API + encodeURIComponent(feed.url))
                    .then(res => res.json())
                    .then(data => {
                        if (data.status === 'ok') {
                            return data.items.slice(0, 3).map(item => ({
                                title: cleanTitle(item.title),
                                excerpt: cleanExcerpt(item.description),
                                link: item.link,
                                date: new Date(item.pubDate),
                                category: feed.category,
                                source: feed.source
                            }));
                        }
                        return [];
                    })
                    .catch(() => [])
            );
            
            const results = await Promise.all(promises);
            allNews = results.flat().sort((a, b) => b.date - a.date);
            
            renderNews();
            
        } catch (error) {
            console.error('Error cargando noticias:', error);
            grid.innerHTML = `
                <div class="news-loading">
                    <p>⚠️ No se pudieron cargar las noticias. Inténtalo más tarde.</p>
                </div>
            `;
        }
    }
    
    // Limpiar título
    function cleanTitle(title) {
        return title.replace(/ - .*$/, '').trim();
    }
    
    // Limpiar extracto
    function cleanExcerpt(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent.substring(0, 120) + '...';
    }
    
    // Formatear fecha
    function formatDate(date) {
        const now = new Date();
        const diff = now - date;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        if (hours < 1) return 'Hace minutos';
        if (hours < 24) return `Hace ${hours}h`;
        if (days < 7) return `Hace ${days}d`;
        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    }
    
    // Renderizar noticias
    function renderNews() {
        const grid = document.getElementById('noticiasGrid');
        const filtered = currentFilter === 'all' 
            ? allNews 
            : allNews.filter(n => n.category === currentFilter);
        
        if (filtered.length === 0) {
            grid.innerHTML = '<div class="news-loading"><p>No hay noticias en esta categoría.</p></div>';
            return;
        }
        
        grid.innerHTML = filtered.slice(0, 8).map(news => `
            <article class="noticia-card-compact" onclick="window.open('${news.link}', '_blank')">
                <span class="noticia-category-compact ${news.category}">
                    ${getCategoryIcon(news.category)} ${news.category}
                </span>
                <h4 class="noticia-title-compact">${news.title}</h4>
                <p class="noticia-excerpt">${news.excerpt}</p>
                <div class="noticia-meta-compact">
                    <span>${formatDate(news.date)}</span>
                    <a href="${news.link}" target="_blank" class="noticia-source-compact" onclick="event.stopPropagation()">
                        ${news.source} →
                    </a>
                </div>
            </article>
        `).join('');
    }
    
    function getCategoryIcon(category) {
        const icons = {
            inmigracion: '🛂',
            vivienda: '',
            eventos: '🎉',
            legislacion: '⚖️',
            comunidad: '🤝',
            urgente: '⚠️'
        };
        return icons[category] || '📰';
    }
    
    // Filtros
    document.querySelectorAll('.news-filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.news-filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            renderNews();
        });
    });
    
    // Cargar al inicio
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadNews);
    } else {
        loadNews();
    }
    
    // Actualizar cada 30 minutos
    setInterval(loadNews, 30 * 60 * 1000);
})();