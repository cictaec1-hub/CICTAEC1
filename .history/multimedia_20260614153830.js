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
                    type: "flash",
                    time: 2,
                    top: "10%", left: "10%", 
                    title: "Parque Nacional Machalilla", 
                    desc: "Bosque nativo de gran riqueza ecológica"
                    
                },
                { 
                    time: 7,
                    top: "10%", left: "10%", 
                    title: "Horizonte del Pacífico", 
                    desc: "Un paisaje donde el cielo y el mar parecen unirse"  
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
// === NUEVO: Sincronización de hotspots con el tiempo del video ===
// === SINCRONIZACIÓN DE HOTSPOTS CON EL VIDEO ===
videoEl.addEventListener('timeupdate', () => {
    const currentTime = videoEl.currentTime;
    const allHotspots = hotspotLayer.querySelectorAll('.docu-hotspot');
    
    allHotspots.forEach(dot => {
        const startTime = parseFloat(dot.dataset.startTime);
        const endTime = dot.dataset.endTime;
        
        // Determinar el tiempo final (si es 'end', usamos la duración total del video)
        const finalTime = endTime === 'end' ? (videoEl.duration - 5) : parseFloat(endTime);
        
        // Lógica de aparición y desaparición
        if (currentTime >= startTime && currentTime < finalTime) {
            // Dentro del rango: MOSTRAR
            if (!dot.classList.contains('visible')) {
                dot.classList.add('visible');
            }
        } else {
            // Fuera del rango: OCULTAR
            if (dot.classList.contains('visible')) {
                dot.classList.remove('visible');
            }
        }
    });
});
    // === 5. FUNCIONES AUXILIARES ===
function renderHotspots(hotspots) {
    hotspotLayer.innerHTML = ''; 
    if(!hotspots || hotspots.length === 0) return;
    
    hotspots.forEach((spot, index) => {
        const dot = document.createElement('div');
        dot.className = 'docu-hotspot';
        dot.style.top = spot.top;
        dot.style.left = spot.left;
        
        // Tiempo de aparición
        dot.dataset.startTime = spot.time;
        
        // Tiempo de desaparición
        const nextSpot = hotspots[index + 1];
        if (nextSpot) {
            dot.dataset.endTime = nextSpot.time;
        } else {
            dot.dataset.endTime = 'end';
        }
        
        // ️ NUEVO: Según el tipo, abrir modal o flash
        dot.onclick = (e) => {
            e.stopPropagation();
            if (spot.type === 'flash') {
                showFlashTitle(spot);
            } else {
                openModal(spot); // Por defecto, modal
            }
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

    // === FUNCIÓN PARA TÍTULOS FLASH ===
// === FUNCIÓN PARA TÍTULOS FLASH (COMPACTOS) ===
// === FUNCIÓN PARA TÍTULOS FLASH (CON POSICIONAMIENTO INTELIGENTE) ===
function showFlashTitle(spotData) {
    const flashContainer = document.getElementById('flash-container');
    
    // Limpiar cualquier flash anterior
    flashContainer.innerHTML = '';
    
    // Pausar el video al abrir el flash
    videoEl.pause();
    
    // Crear el elemento flash
    const flashEl = document.createElement('div');
    flashEl.className = 'flash-title';
    flashEl.innerHTML = `
        <h3>${spotData.title}</h3>
        <p>${spotData.desc}</p>
    `;
    
    // 🧠 LÓGICA DE POSICIONAMIENTO INTELIGENTE
    const topVal = parseFloat(spotData.top);
    const leftVal = parseFloat(spotData.left);
    
    let topPos, transform;

    // 1. Posición Vertical (¿Está muy arriba?)
    if (topVal < 25) {
        // Está en el tercio superior -> Mostrar etiqueta DEBAJO del punto
        topPos = `calc(${spotData.top} + 20px)`; 
    } else {
        // Está en el medio o abajo -> Mostrar etiqueta ENCIMA del punto
        topPos = `calc(${spotData.top} - 60px)`; 
    }

    // 2. Posición Horizontal (¿Está muy a la izquierda o derecha?)
    if (leftVal < 20) {
        // Está muy a la izquierda -> Alinear a la izquierda
        transform = 'translateX(0)'; 
    } else if (leftVal > 80) {
        // Está muy a la derecha -> Alinear a la derecha
        transform = 'translateX(-100%)'; 
    } else {
        // Está en el centro -> Centrar etiqueta
        transform = 'translateX(-50%)'; 
    }

    // Aplicar las posiciones calculadas
    flashEl.style.top = topPos;
    flashEl.style.left = spotData.left;
    flashEl.style.transform = transform;
    
    flashContainer.appendChild(flashEl);
    
    // Forzar reflow para la transición
    setTimeout(() => {
        flashEl.classList.add('visible');
    }, 10);
    
    // Función para cerrar el flash
    const closeFlash = () => {
        flashEl.classList.remove('visible');
        // Reanudar el video después de la animación
        setTimeout(() => {
            videoEl.play().catch(e => console.log("Autoplay bloqueado:", e));
            if (flashEl.parentNode) {
                flashEl.parentNode.removeChild(flashEl);
            }
        }, 300);
    };
    
    // Cerrar al hacer clic en el propio flash
    flashEl.onclick = (e) => {
        e.stopPropagation();
        closeFlash();
    };
    
    // Cerrar automáticamente después de 3 segundos
    setTimeout(() => {
        if (flashEl.parentNode) {
            closeFlash();
        }
    }, 3000); // 3 segundos visible
}

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