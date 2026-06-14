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
                    type: "flash",
                    time: 7,
                    top: "10%", left: "10%", 
                    title: "Horizonte del Pacífico", 
                    desc: "Un paisaje donde el cielo y el mar parecen unirse."  
                },
                { 
                    type: "flash",
                    time: 13,
                    top: "10%", left: "10%", 
                    title: "Playa de Montañita", 
                    desc: "Uno de los destinos costeros más visitados."  
                },
                { 
                    type: "flash",
                    time: 19,
                    top: "50%", left: "60%", 
                    title: "Malecón 2000 de Guayaquil", 
                    desc: "Entre el río Guayas y el horizonte urbano"
                    
                },
                { 
                    type: "flash",
                    time: 30,
                    top: "10%",left: "10%", 
                    title: "Puerto López desde las alturas", 
                    desc: "Bahía costera reconocida por su tradición pesquera y su cercanía al Parque Nacional Machalilla."
                    
                },
                { 
                    type: "flash",
                    time: 34,
                    top: "50%",left: "50%", 
                    title: "Acantilados de Montañita", 
                    desc: "La acción constante del mar ha dado forma a este paisaje costero a lo largo del tiempo."
                },
                  {
    type: "flash",
    time: 40,
    top: "50%",
    left: "50%",
    title: "Panorámica de la costa de Esmeraldas",
    desc: "Atacames es uno de los destinos de playa más visitados del Ecuador."
},
{
    type: "flash",
    time: 47,
    top: "50%",
    left: "50%",
    title: "Surf en la costa ecuatoriana",
    desc: "Ecuador cuenta con algunas de las mejores olas del Pacífico sudamericano, especialmente en Montañita y Ayampe."
},

{
    type: "flash",
    time: 54,
    top: "50%",
    left: "50%",
    title: "Ballenas jorobadas",
    desc: "Cada año, entre junio y septiembre, miles de ballenas jorobadas llegan a las costas de Ecuador para reproducirse y criar a sus ballenatos."
},
{
    type: "flash",
    time: 60,
    top: "50%",
    left: "50%",
    title: "La riqueza de la costa ecuatoriana",
    desc: "Playas, bosques y paisajes marinos convierten a la costa en una de las regiones más diversas del país."
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
    type: "flash",
    time: 0,
    top: "25%",
    left: "20%",
    title: "Chimborazo: el gigante de los Andes ecuatorianos",
    desc: "La cima del Chimborazo es el punto de la Tierra más alejado del centro del planeta debido al abultamiento ecuatorial."
},

{
    type: "flash",
    time: 4,
    top: "70%",
    left: "75%",
    title: "Cotopaxi: el guardián de los Andes ecuatorianos",
    desc: "Con 5.897 metros de altitud, es uno de los volcanes activos más altos del mundo."
},
                {
    type: "flash",
    time: 7,
    top: "25%",
    left: "20%",
    title: "La majestuosa Laguna del Quilotoa",
    desc: "Laguna volcánica reconocida por el intenso color turquesa de sus aguas."
},

{
    type: "flash",
    time: 10,
    top: "70%",
    left: "75%",
    title: "Paisajes de la Sierra",
    desc: "Los Andes ecuatorianos albergan extensos paisajes naturales y una gran diversidad de ecosistemas."
},

{
    type: "flash",
    time: 14,
    top: "35%",
    left: "60%",
    title: "Entre nubes y montañas",
    desc: "Los páramos ecuatorianos actúan como una enorme esponja natural que almacena y distribuye agua a gran parte del país."
},

{
    type: "flash",
    time: 17,
    top: "75%",
    left: "25%",
    title: "Flores de los Andes ecuatorianos",
    desc: "Ecuador es uno de los principales exportadores de rosas del mundo gracias a sus condiciones climáticas privilegiadas."
},

{
    type: "flash",
    time: 19,
    top: "20%",
    left: "80%",
    title: "Quito",
    desc: "Fue una de las primeras ciudades del mundo declaradas Patrimonio de la Humanidad por la UNESCO en 1978."
},

{
    type: "flash",
    time: 22,
    top: "60%",
    left: "35%",
    title: "Celebración de las raíces culturales",
    desc: "Las danzas tradicionales reflejan la identidad y el legado cultural de los pueblos andinos."
},

{
    type: "flash",
    time: 24,
    top: "30%",
    left: "70%",
    title: "Basílica del Voto Nacional",
    desc: "Uno de los monumentos arquitectónicos más emblemáticos de la capital ecuatoriana."
},

{
    type: "flash",
    time: 28,
    top: "75%",
    left: "15%",
    title: "El esplendor dorado del barroco quiteño",
    desc: "El arte religioso de Quito destaca por su riqueza ornamental y valor histórico."
},

{
    type: "flash",
    time: 34,
    top: "50%",
    left: "50%",
    title: "La riqueza de la Sierra ecuatoriana",
    desc: "Desde volcanes y lagunas hasta ciudades patrimoniales y festividades ancestrales, la Sierra ecuatoriana refleja la riqueza y diversidad del país."
},
            ]
        },
        amazonia: {
            title: "AMAZONÍA",
            desc: "El pulmón del mundo, biodiversidad extrema y culturas ancestrales.",
            mapId: "map-amazonia",
            videoSrc: "mp4/amazonia.mp4",
            hotspots: [
               {
type: "flash",
time: 0,
top: "20%",
left: "15%",
title: "Ríos amazónicos de Ecuador",
desc: "Los bosques amazónicos desempeñan un papel fundamental en la regulación del clima y el ciclo del agua."
},

{
type: "flash",
time: 5,
top: "70%",
left: "75%",
title: "La nutria gigante de la Amazonía",
desc: "Uno de los mamíferos acuáticos más grandes de Sudamérica."
},

{
type: "flash",
time: 7,
top: "35%",
left: "60%",
title: "Guacamayo escarlata",
desc: "Ave reconocida por su colorido plumaje y gran inteligencia."
},

{
type: "flash",
time: 9,
top: "75%",
left: "25%",
title: "Un bosque milenario",
desc: "Algunos árboles amazónicos pueden superar los 40 metros de altura y vivir durante cientos de años."
},

{
type: "flash",
time: 15,
top: "25%",
left: "80%",
title: "Tucán",
desc: "Su gran pico puede representar hasta un tercio de la longitud total de su cuerpo."
},

{
type: "flash",
time: 18,
top: "65%",
left: "35%",
title: "Monos aulladores rojos",
desc: "Sus potentes aullidos pueden escucharse a varios kilómetros de distancia."
},

{
type: "flash",
time: 21,
top: "30%",
left: "70%",
title: "Pequeño guardián de las flores",
desc: "Ecuador alberga más de 130 especies de colibríes."
},

{
type: "flash",
time: 25,
top: "75%",
left: "15%",
title: "Comunidades amazónicas",
desc: "La región alberga comunidades que mantienen una estrecha relación con los ríos y la naturaleza."
},

{
type: "flash",
time: 39,
top: "25%",
left: "75%",
title: "Delfín rosado",
desc: "Es uno de los pocos delfines de agua dulce que existen en el mundo."
},

{
type: "flash",
time: 45,
top: "50%",
left: "50%",
title: "Amazonía ecuatoriana",
desc: "Entre ríos, bosques y comunidades, constituye uno de los patrimonios naturales más valiosos del Ecuador."
},

            ]
        },
        galapagos: {
            title: "GALÁPAGOS",
            desc: "Islas encantadas, laboratorio vivo de la evolución.",
            mapId: "map-galapagos",
            videoSrc: "mp4/galapagos.mp4",
            hotspots: [
                
                {
type: "flash",
time: 0,
top: "25%",
left: "20%",
title: "Piquero de patas azules",
desc: "Durante el cortejo, los machos levantan sus patas para mostrar su coloración; cuanto más intensa es, más atractivos resultan para las hembras."
},

{
type: "flash",
time: 7,
top: "70%",
left: "75%",
title: "Isla Bartolomé: un paisaje forjado por volcanes",
desc: "Las islas Galápagos se formaron por actividad volcánica hace millones de años y continúan evolucionando con el tiempo."
},

{
type: "flash",
time: 10,
top: "35%",
left: "60%",
title: "Aguas turquesas del Pacífico",
desc: "Las costas del archipiélago albergan una extraordinaria riqueza de vida marina."
},

{
type: "flash",
time: 13,
top: "75%",
left: "25%",
title: "Tortuga verde",
desc: "Es una de las especies marinas más emblemáticas de las islas y puede recorrer miles de kilómetros a lo largo de su vida."
},

{
type: "flash",
time: 17,
top: "70%",
left: "15%",
title: "Iguana marina",
desc: "Es el único lagarto del mundo capaz de alimentarse en el mar."
},

{
type: "flash",
time: 22,
top: "30%",
left: "75%",
title: "Cangrejo zayapa",
desc: "Los ejemplares jóvenes presentan colores oscuros y adquieren tonos rojos y naranjas al llegar a la edad adulta."
},

{
type: "flash",
time: 25,
top: "65%",
left: "20%",
title: "Iguana marina",
desc: "Después de nadar en aguas frías, pasa largos periodos tomando el sol sobre las rocas para recuperar temperatura."
},

{
type: "flash",
time: 27,
top: "70%",
left: "80%",
title: "Lobo marino de Galápagos",
desc: "Es una especie endémica del archipiélago y uno de los animales más fáciles de observar en playas y costas rocosas."
},

{
type: "flash",
time: 37,
top: "25%",
left: "35%",
title: "Turismo sostenible",
desc: "Miles de visitantes recorren las islas cada año para conocer su extraordinaria biodiversidad."
},

{
type: "flash",
time: 41,
top: "70%",
left: "20%",
title: "Manglares y lagunas costeras",
desc: "Estos ecosistemas sirven de refugio para aves, peces y numerosas especies marinas."
},

{
type: "flash",
time: 44,
top: "30%",
left: "75%",
title: "Aves marinas pescando",
desc: "Muchas especies dependen de la riqueza pesquera de las islas para alimentarse y reproducirse."
},

{
type: "flash",
time: 49,
top: "50%",
left: "50%",
title: "Galápagos: un patrimonio natural único",
desc: "Las islas albergan especies únicas y ecosistemas que las convierten en uno de los tesoros naturales más valiosos del planeta."
},

            
            
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