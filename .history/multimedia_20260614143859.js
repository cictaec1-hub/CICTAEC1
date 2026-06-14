document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. BASE DE DATOS CON RUTAS REALES ===
    const regionsData = {
        intro: {
            title: "ECUADOR",
            desc: "Un país megadiverso, cuna de culturas ancestrales y naturaleza viva.",
            mapId: "all", 
            videoSrc: "mp4/ecuador.mp4",
            hotspots: [] 
        },
       costa: {
            
            title: "COSTA",
            desc: "Playas infinitas, manglares y la frescura del Pacífico.",
            mapId: "map-costa",
            videoSrc: "mp4/costa.mp4",
            hotspots: [
                { 
                    time: 13,
                    top: "10%", left: "10%", 
                    title: "Parque Nacional Machalilla", 
                    desc: "Avistamiento de ballenas jorobadas cada año.", 
                    img: "images/BALLENAS.webp" 
                },
                { 
                    time: 40,
                    top: "30%", left: "60%", 
                    title: "Manta", 
                    desc: "Importante puerto pesquero y del atún.", 
                    img: "images/MANTA.webp" 
                }
            ]
        },
        sierra: {
            title: "SIERRA",
            desc: "Volcanes nevados, valles eternos y la historia de Quito.",
            mapId: "map-sierra",
            videoSrc: "mp4/sierra.mp4",
            hotspots: [
                { 
                    top: "65%", left: "45%", 
                    title: "Cuenca", 
                    desc: "Famosa por arquitectura colonial y artesanías.", 
                    img: "images/CUENCA.webp" 
                },
                { 
                    top: "35%", left: "55%", 
                    title: "Laguna de Quilotoa", 
                    desc: "Cráter volcánico con aguas color turquesa.", 
                    img: "images/QUILOTOA.webp" 
                }
            ]
        },
        amazonia: {
            title: "AMAZONÍA",
            desc: "El pulmón del mundo, biodiversidad extrema y culturas ancestrales.",
            mapId: "map-amazonia",
            videoSrc: "mp4/amazonia.mp4",
            hotspots: [
                { 
                    top: "60%", left: "55%", 
                    title: "Cueva de los Tayos", 
                    desc: "Famosa por sus misterios y leyendas.", 
                    img: "images/cueva.webp" 
                },
                { 
                    top: "40%", left: "70%", 
                    title: "Reserva Cuyabeno", 
                    desc: "Hogar de los famosos delfines rosados.", 
                    img: "images/delfines.webp" 
                }
            ]
        },
        galapagos: {
            title: "GALÁPAGOS",
            desc: "Islas encantadas, laboratorio vivo de la evolución.",
            mapId: "map-galapagos",
            videoSrc: "mp4/galapagos.mp4",
            hotspots: [
                { top: "40%", left: "50%", title: "Tortuga Gigante", desc: "Símbolo de longevidad endémica.", img: "images/tortuga.webp" },
                { top: "70%", left: "30%", title: "Piquero de patas azules", desc: "Destacan por sus llamativas patas azules.", img: "images/piqueros.webp" }
            ]
        }
    };

    // === 2. CONFIGURACIÓN DE TIEMPOS EXACTOS ===
    const timelineConfig = {
        intro:    { start: 0, end: 49 }, 
        costa:    { start: 0, end: 92 },  
        sierra:   { start: 0, end: 40 },  
        amazonia: { start: 0, end: 59 },  
        galapagos:{ start: 0, end: 58 }   
    };

    let currentRegion = '';
    const videoEl = document.getElementById('main-video');
    const hotspotLayer = document.getElementById('hotspot-layer');
    const modal = document.getElementById('hotspot-modal');

    // === 3. FUNCIÓN PRINCIPAL DE CAMBIO ===
    function switchRegion(regionKey) {
        const data = regionsData[regionKey];
        if (!data || currentRegion === regionKey) return;

        currentRegion = regionKey;
        
        // ✅ ASEGURAR QUE NO HAYA LOOP
        videoEl.loop = false;

        // 1. Cambiar fuente de video
        const currentSrc = videoEl.querySelector('source').src;
        if (!currentSrc.includes(data.videoSrc)) {
            videoEl.pause();
            videoEl.querySelector('source').src = data.videoSrc;
            videoEl.load();
            
            videoEl.oncanplay = () => {
                videoEl.play().catch(e => console.log("Autoplay bloqueado:", e));
                videoEl.oncanplay = null;
            };
        } else {
            videoEl.currentTime = 0;
            videoEl.play();
        }

        // 2. Actualizar textos
        document.getElementById('region-title').textContent = data.title;
        document.getElementById('region-desc').textContent = data.desc;

        // 3. ILUMINAR MAPA
        document.querySelectorAll('.map-region').forEach(path => path.classList.remove('active'));
        
        if (regionKey === 'intro') {
            document.getElementById('map-costa').classList.add('active');
            document.getElementById('map-sierra').classList.add('active');
            document.getElementById('map-amazonia').classList.add('active');
            document.getElementById('map-galapagos').classList.add('active');
        } else {
            const activePath = document.getElementById(data.mapId);
            if (activePath) activePath.classList.add('active');
        }

        // 4. Renderizar hotspots
        renderHotspots(data.hotspots);
    }

    // === 4. SECUENCIA AUTOMÁTICA ===
    if (videoEl) {
        // Cuando termina CUALQUIER video
        videoEl.addEventListener('ended', () => {
            if (currentRegion === 'intro') switchRegion('costa');
            else if (currentRegion === 'costa') switchRegion('sierra');
            else if (currentRegion === 'sierra') switchRegion('amazonia');
            else if (currentRegion === 'amazonia') switchRegion('galapagos');
            else if (currentRegion === 'galapagos') switchRegion('intro');
        });

        // Solo para la intro: detectar segundo 49
        videoEl.addEventListener('timeupdate', () => {
            if (currentRegion === 'intro') {
                const t = videoEl.currentTime;
                const progressPct = (t / timelineConfig.intro.end) * 100;
                document.getElementById('docu-progress').style.width = `${Math.min(progressPct, 100)}%`;
                
                if (t >= timelineConfig.intro.end) {
                    switchRegion('costa');
                }
            }
        });

        // Iniciar en Intro
        switchRegion('intro');
    }

    // === 5. FUNCIONES AUXILIARES ===
function renderHotspots(hotspots) {
    hotspotLayer.innerHTML = ''; 
    if(!hotspots || hotspots.length === 0) return;
    
    hotspots.forEach(spot => {
        const dot = document.createElement('div');
        dot.className = 'docu-hotspot'; // Sin clase 'visible' inicialmente
        dot.style.top = spot.top;
        dot.style.left = spot.left;
        dot.dataset.time = spot.time; // Guardamos el tiempo en un atributo data
        dot.onclick = (e) => {
            e.stopPropagation();
            openModal(spot);
        };
        hotspotLayer.appendChild(dot);
    });
}

    function openModal(spotData) {
        document.getElementById('modal-title').textContent = spotData.title;
        document.getElementById('modal-desc').textContent = spotData.desc;
        
        const imgEl = document.getElementById('modal-img');
        imgEl.src = spotData.img + '?t=' + new Date().getTime();
        imgEl.style.display = 'block';
        imgEl.onerror = function() { this.style.display = 'none'; };

        modal.classList.add('visible');
        videoEl.pause(); 
    }

    window.closeModal = function() {
        modal.classList.remove('visible');
        videoEl.play(); 
    }

    document.addEventListener('click', (e) => {
        if(modal.classList.contains('visible') && !e.target.closest('.modal-content')) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && modal.classList.contains('visible')) closeModal();
    });

    // === 6. CONTROLES ===
    const btnPlay = document.getElementById('btn-play-pause');
    const btnSound = document.getElementById('btn-sound');
    
    if(btnPlay) {
        btnPlay.onclick = () => {
            videoEl.paused ? videoEl.play() : videoEl.pause();
            btnPlay.textContent = videoEl.paused ? '▶' : '⏸';
        };
    }
    
    if(btnSound) {
        btnSound.onclick = () => {
            videoEl.muted = !videoEl.muted;
            btnSound.textContent = videoEl.muted ? '' : '🔊';
        };
    }

    // Navegación manual
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const region = e.target.getAttribute('data-region');
            if(region && regionsData[region]) {
                switchRegion(region);
            }
        });
    });

    // === 7. AUDIO DE FONDO ===
    const audioBtn = document.getElementById('bg-audio-toggle');
    const bgAudio = document.getElementById('bg-audio');

    if (audioBtn && bgAudio) {
        bgAudio.volume = 0.2; 
        audioBtn.addEventListener('click', () => {
            if (bgAudio.paused) {
                bgAudio.play().then(() => {
                    audioBtn.classList.add('playing');
                    audioBtn.querySelector('.audio-text').textContent = 'Sonando';
                }).catch(err => console.log("Error audio:", err));
            } else {
                bgAudio.pause();
                audioBtn.classList.remove('playing');
                audioBtn.querySelector('.audio-text').textContent = 'Música';
            }
        });
    }
});