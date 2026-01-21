// ==========================================
// 1. LÓGICA DEL CARRUSEL (HERO)
// ==========================================
let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function moveSlide(step) {
    showSlide(currentSlide + step);
}

let slideInterval = setInterval(() => {
    moveSlide(1);
}, 5000);

function manualMove(step) {
    clearInterval(slideInterval);
    moveSlide(step);
    slideInterval = setInterval(() => {
        moveSlide(1);
    }, 5000);
}

// ==========================================
// 2. DICCIONARIO DE TRADUCCIONES (ACTUALIZADO)
// ==========================================
const translations = {
    'es': {
        'nav_home': 'INICIO',
        'nav_about': 'Sobre nosotros',
        'nav_areas': 'Areas',
        'nav_contact': 'Contacto',
        'hero_title': 'CICTAEC',
        'hero_subtitle': 'Cámara Internacional de Comercio y Turismo',
        'about_title': 'Cámara Internacional de Comercio y Turismo Asociación Ecuatoriano-Catalán',
        'about_description': 'CICTAEC es una organización de carácter internacional que actúa como puente entre latinoamérica y Europa, promocionando y facilitando relaciones comerciales y turísticas. La entidad trabaja en la promoción de la exportación de productos de calidad como banano, trucha y miel, mostrando así la diversidad económica y la generación de oportunidades internacionales de negocio.',
        'founder_tag': 'SOBRE CICTAEC',
        'founder_quote': '"CICTAEC es una organización de carácter internacional que actúa como puente entre latinoamérica y Europa, promocionando y facilitando relaciones comerciales y turísticas."',
        'founder_title': 'FUNDADORA',
        'mission_title': 'Misión',
        'mission_text': 'Ser un puente eficaz en la conexión internacional entre Ecuador y Europa, promoviendo relaciones comerciales, facilitando oportunidades de negocios e involucrando instituciones públicas y privadas de ambos continentes.',
        'vision_title': 'Visión',
        'vision_text': 'Ser una cámara de referencia en la conexión internacional entre Ecuador y Europa, relacionando sectores de importancia tales como comercio, turismo, educación, innovación tecnológica, industrial y agrícola, promocionando la exportación de productos de calidad y creando oportunidades de desarrollo económico y empresarial.',
        'areas_main_title': 'AREAS',
        'area_1': 'COMERCIO',
        'area_2': 'TURISMO',
        'area_3': 'CULTURAL',
        'commerce_title': 'COMERCIO',
        'trad_prod_title': 'PRODUCTOS TRADICIONALES',
        'trad_prod_desc': 'El comercio de productos tradicionales es fundamental para nuestra identidad y economía, facilitando el intercambio de bienes artesanales y agrícolas de alta calidad.',
        'btn_more': 'SOLICITAR ASESORÍA',
        'btn_details': 'DETALLES',
        'btn_form': 'IR AL FORMULARIO DE CONTACTO',
        'ie_title': 'IMPORTACIÓN & EXPORTACIÓN',
        'ie_desc': 'Facilitamos los procesos logísticos y legales para conectar los mercados locales con el mundo, garantizando estándares internacionales.',
        'products_section_title': 'PRODUCTOS',
        'tourism_subtitle': 'PROMOCIÓN Y RUTAS',
        'tourism_desc': 'Impulsamos el turismo sostenible y el reconocimiento de destinos estratégicos en ambos continentes, facilitando el intercambio cultural.',
        'cultural_subtitle': 'EDUCACIÓN E INNOVACIÓN',
        'cultural_desc': 'Fomentamos el intercambio de conocimientos, innovación tecnológica y desarrollo educativo internacional entre instituciones.',
        'contact_company_name': 'Cámara Internacional de Comercio y Turismo',
        'contact_section_title': 'CONTACTO',
        'address_label': 'Dirección:',
        'phone_label': 'Teléfono:',
        'footer_copy': '© 2024 CICTAEC - Cámara Internacional de Comercio y Turismo. Todos los derechos reservados.',
        'prod_1_title': 'ACEITE',
        'prod_2_title': 'FRUTOS',
        'prod_3_title': 'TEXTIL',
        'prod_4_title': 'JAMON'
    },
    'fr': {
        'nav_home': 'ACCUEIL',
        'nav_about': 'À propos',
        'nav_areas': 'Domaines',
        'nav_contact': 'Contact',
        'hero_title': 'CICTAEC',
        'hero_subtitle': 'Chambre Internationale de Commerce et de Tourisme',
        'about_title': 'Chambre Internationale de Commerce et de Tourisme Association Équatoriano-Catalane',
        'about_description': 'CICTAEC est une organisation internationale qui agit comme un pont entre l\'Amérique latine et l\'Europe, promouvant et facilitant les relations commerciales et touristiques. L\'entité travaille à la promotion de l\'exportation de produits de qualité comme les bananes, la truite et le miel.',
        'founder_tag': 'À PROPOS DE CICTAEC',
        'founder_quote': '"CICTAEC est une organisation internationale agissant comme un pont entre l\'Amérique latine et l\'Europe, promouvant les relations commerciales et touristiques."',
        'founder_title': 'FONDATRICE',
        'mission_title': 'Mission',
        'mission_text': 'Être un pont efficace dans la connexion internationale entre l\'Équateur et l\'Europe, en promouvant les relations commerciales, en facilitant les opportunités d\'affaires et en impliquant les institutions publiques et privées des deux continents.',
        'vision_title': 'Vision',
        'vision_text': 'Être une chambre de référence dans la connexion internationale entre l\'Équateur et l\'Europe, reliant des secteurs d\'importance tels que le commerce, le tourisme, l\'éducation, l\'innovation technologique, industrielle et agricole.',
        'areas_main_title': 'DOMAINES',
        'area_1': 'COMMERCE',
        'area_2': 'TOURISME',
        'area_3': 'CULTUREL',
        'commerce_title': 'COMMERCE',
        'trad_prod_title': 'PRODUITS TRADITIONNELS',
        'trad_prod_desc': 'Le commerce de produits traditionnels est fondamental pour notre identité, facilitant l\'échange de produits artisanaux et agricoles de haute qualité.',
        'btn_more': 'DEMANDER CONSEIL',
        'btn_details': 'DÉTAILS',
        'btn_form': 'ACCÉDER AU FORMULAIRE DE CONTACT',
        'ie_title': 'IMPORTATION & EXPORTATION',
        'ie_desc': 'Nous facilitons les processus logistiques et juridiques pour connecter les marchés locaux au monde, en garantissant les normes internationales.',
        'products_section_title': 'PRODUITS',
        'tourism_subtitle': 'PROMOTION ET ITINÉRAIRES',
        'tourism_desc': 'Nous promouvons le tourisme durable et la reconnaissance des destinations stratégiques sur les deux continents.',
        'cultural_subtitle': 'ÉDUCATION ET INNOVATION',
        'cultural_desc': 'Nous encourageons l\'échange de connaissances, l\'innovation technologique et le développement éducatif international.',
        'contact_company_name': 'Chambre Internationale de Commerce et de Tourisme',
        'contact_section_title': 'CONTACT',
        'address_label': 'Adresse:',
        'phone_label': 'Téléphone:',
        'footer_copy': '© 2024 CICTAEC - Chambre Internationale de Commerce et de Tourisme. Tous droits réservés.',
        'prod_1_title': 'HUILE',
        'prod_2_title': 'FRUITS',
        'prod_3_title': 'TEXTILE',
        'prod_4_title': 'JAMBON'
    },
    'en': {
        'nav_home': 'HOME',
        'nav_about': 'About Us',
        'nav_areas': 'Areas',
        'nav_contact': 'Contact',
        'hero_title': 'CICTAEC',
        'hero_subtitle': 'International Chamber of Commerce and Tourism',
        'about_title': 'International Chamber of Commerce and Tourism Ecuadorian-Catalan Association',
        'about_description': 'CICTAEC is an international organization acting as a bridge between Latin America and Europe, promoting and facilitating commercial and tourist relations.',
        'founder_tag': 'ABOUT CICTAEC',
        'founder_quote': '"CICTAEC is an international organization acting as a bridge between Latin America and Europe."',
        'founder_title': 'FOUNDER',
        'mission_title': 'Mission',
        'mission_text': 'To be an effective bridge in the international connection between Ecuador and Europe, promoting trade relations and business opportunities.',
        'vision_title': 'Vision',
        'vision_text': 'To be a reference chamber in the international connection between Ecuador and Europe, relating important sectors such as trade, tourism, education, technological innovation, industrial and agricultural.',
        'areas_main_title': 'AREAS',
        'area_1': 'COMMERCE',
        'area_2': 'TOURISM',
        'area_3': 'CULTURAL',
        'commerce_title': 'COMMERCE',
        'trad_prod_title': 'TRADITIONAL PRODUCTS',
        'trad_prod_desc': 'Trade in traditional products is fundamental to our identity and economy.',
        'btn_more': 'REQUEST ADVISORY',
        'btn_details': 'DETAILS',
        'btn_form': 'GO TO CONTACT FORM',
        'ie_title': 'IMPORT & EXPORT',
        'ie_desc': 'We facilitate logistical and legal processes to connect local markets with the world.',
        'products_section_title': 'PRODUCTS',
        'tourism_subtitle': 'PROMOTION AND ROUTES',
        'tourism_desc': 'We promote sustainable tourism and the recognition of strategic destinations on both continents.',
        'cultural_subtitle': 'EDUCATION AND INNOVATION',
        'cultural_desc': 'We foster knowledge exchange, technological innovation, and international educational development.',
        'contact_company_name': 'International Chamber of Commerce and Tourism',
        'contact_section_title': 'CONTACT',
        'address_label': 'Address:',
        'phone_label': 'Phone:',
        'footer_copy': '© 2024 CICTAEC - International Chamber of Commerce and Tourism. All rights reserved.',
        'prod_1_title': 'OIL',
        'prod_2_title': 'FRUITS',
        'prod_3_title': 'TEXTILE',
        'prod_4_title': 'HAM'
    },
    'ca': {
        'nav_home': 'INICI',
        'nav_about': 'Sobre nosaltres',
        'nav_areas': 'Àrees',
        'nav_contact': 'Contacte',
        'hero_title': 'CICTAEC',
        'hero_subtitle': 'Cambra Internacional de Comerç i Turisme',
        'about_title': 'Cambra Internacional de Comerç i Turisme Associació Equatoriana-Catalana',
        'about_description': 'CICTAEC és una organització de caràcter internacional que actua com a pont entre l'Amèrica Llatina i Europa.',
        'founder_tag': 'SOBRE CICTAEC',
        'founder_quote': '"CICTAEC és una organització de caràcter internacional que actua com a pont entre l'Amèrica Llatina i Europa."',
        'founder_title': 'FUNDADORA',
        'mission_title': 'Missió',
        'mission_text': 'Ser un pont eficaç en la connexió internacional entre l'Equador i Europa, promovent relacions comercials, facilitant oportunitats de negocis.',
        'vision_title': 'Visió',
        'vision_text': 'Ser una cambra de referència en la connexió internacional entre l'Equador i Europa, relacionant sectors d'importància com comerç, turisme i educació.',
        'areas_main_title': 'ÀREES',
        'area_1': 'COMERÇ',
        'area_2': 'TURISME',
        'area_3': 'CULTURAL',
        'commerce_title': 'COMERÇ',
        'trad_prod_title': 'PRODUCTES TRADICIONALS',
        'trad_prod_desc': 'El comerç de productes tradicionals és fonamental per a la nostra identitat i economia.',
        'btn_more': 'SOL·LICITAR ASSESSORAMENT',
        'btn_details': 'DETALLS',
        'btn_form': 'ANAR AL FORMULARI DE CONTACTE',
        'ie_title': 'IMPORTACIÓ I EXPORTACIÓ',
        'ie_desc': 'Facilitem els processos logístics i legals per connectar els mercats locals amb el món.',
        'products_section_title': 'PRODUCTES',
        'tourism_subtitle': 'PROMOCIÓ I RUTES',
        'tourism_desc': 'Impulsem el turisme sostenible i el reconeixement de destinacions estratègiques en ambdós continents.',
        'cultural_subtitle': 'EDUCACIÓ I INNOVACIÓ',
        'cultural_desc': 'Fomentem l'intercanvi de coneixements, innovació tecnològica i desenvolupament educatiu internacional.',
        'contact_company_name': 'Cambra Internacional de Comerç i Turisme',
        'contact_section_title': 'CONTACTE',
        'address_label': 'Adreça:',
        'phone_label': 'Telèfon:',
        'footer_copy': '© 2024 CICTAEC - Cambra Internacional de Comerç i Turisme. Tots els drets reservats.',
        'prod_1_title': 'OLI',
        'prod_2_title': 'FRUITES',
        'prod_3_title': 'TÈXTIL',
        'prod_4_title': 'PERNIL'
    }
};

// ==========================================
// 3. FUNCIÓN DE CAMBIO DE IDIOMA
// ==========================================
function setLang(lang) {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    const currentFlag = document.getElementById('current-flag');
    const currentLangText = document.getElementById('current-lang-text');
    
    if (currentFlag) currentFlag.src = `images/flag_${lang}.png`;
    if (currentLangText) currentLangText.innerText = lang.toUpperCase();

    localStorage.setItem('preferredLang', lang);
}

// ==========================================
// 4. INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'es';
    setLang(savedLang);
    showSlide(0);

    // --- EFECTO ZOOM PRODUCTOS ---
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05)';
            item.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
            item.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        });
    });
});

// --- ANIMATION DES TITRES AU SCROLL ---
const observerOptions = {
    threshold: 0.2 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

const titlesToAnimate = document.querySelectorAll('.reveal-title');
titlesToAnimate.forEach(title => observer.observe(title));
