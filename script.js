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
        'hero_slide_connect': 'CONECTANDO CONTINENTES',
        'hero_slide_bridge': 'TU PUENTE AL MUNDO',
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
        'btn_more': 'VER MAS DETALLES',
        'btn_info': 'SOLICITAR INFO',
        'btn_advisory': 'SOLICITAR ASESORÍA',
        'btn_details': 'DETALLES',
        'btn_details_area': 'MAS DETALLES',
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
        'prod_4_title': 'JAMON',
        'prod_5_title': 'PESCADO',
        'prod_6_title': 'CACAO',
        'prod_1_desc': 'Aceite de alta calidad proveniente de Ecuador, ideal para exportación a mercados internacionales.',
        'prod_2_desc': 'Frutas frescas y frutos secos de la mejor calidad, cultivados en las tierras ecuatorianas.',
        'prod_aceite_oliva_intenso': 'ACEITE OLIVA INTENSO',
        'prod_aceite_oliva_intenso_desc': 'Aceite de oliva intenso de alta calidad, ideal para exportación a mercados internacionales.',
        'prod_3_desc': 'Productos textiles artesanales y de alta calidad, representando la tradición ecuatoriana.',
        'prod_banana_title': 'BANANA',
        'prod_banana_desc': 'Banana ecuatoriana de exportación, reconocida mundialmente por su sabor dulce y textura perfecta.',
        'prod_pitaya_title': 'PITAYA',
        'prod_pitaya_desc': 'Pitaya o fruta del dragón, exótica y nutritiva, cultivada en las tierras tropicales de Ecuador.',
        'prod_4_desc': 'Jamón curado de excelente calidad, preparado con métodos tradicionales.',
        'prod_5_desc': 'Pescado fresco y mariscos de las costas del Pacífico ecuatoriano.',
        'prod_6_desc': 'Cacao ecuatoriano de fino aroma, reconocido mundialmente por su calidad excepcional y sabor único.',
        'prod_atun_title': 'ATUN',
        'prod_atun_desc': 'Atún fresco de las costas del Pacífico ecuatoriano, ideal para la gastronomía internacional.',
        'prod_camaron_title': 'CAMARON',
        'prod_camaron_desc': 'Camarón ecuatoriano de primera calidad, reconocido por su sabor y frescura excepcionales.',
        'prod_albacora_title': 'ALBACORA',
        'prod_albacora_desc': 'Albacora de aguas profundas del Pacífico, apreciada por su textura firme y sabor delicado.',
        'prod_aceite_virgen': 'ACEITE VIRGEN EXTRA',
        'prod_aceite_virgen_desc': 'Aceite virgen extra de primera prensada en frío, con certificación de calidad premium para mercados internacionales.',
        'products_page_title': 'Nuestros Productos',
        'badge_export': 'Exportación',
        'badge_import': 'Importación',
        'form_url': 'https://forms.gle/5951nVBJNCh4sBi78'
    },
    'fr': {
        'nav_home': 'ACCUEIL',
        'nav_about': 'À propos',
        'nav_areas': 'Domaines',
        'nav_contact': 'Contact',
        'hero_title': 'CICTAEC',
        'hero_subtitle': 'Chambre Internationale de Commerce et de Tourisme',
        'hero_slide_connect': 'CONNECTER LES CONTINENTS',
        'hero_slide_bridge': 'VOTRE PONT VERS LE MONDE',
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
        'btn_more': 'VOIR PLUS DE DÉTAILS',
        'btn_info': 'DEMANDER INFO',
        'btn_advisory': 'DEMANDER CONSEIL',
        'btn_details': 'DÉTAILS',        'btn_details_area': 'PLUS DE DÉTAILS',        'btn_form': 'ACCÉDER AU FORMULAIRE DE CONTACT',
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
        'prod_4_title': 'JAMBON',
        'prod_5_title': 'POISSON',        'prod_6_title': 'CACAO',        'prod_1_desc': 'Huile de haute qualité provenant d\'Équateur, idéale pour l\'exportation vers les marchés internationaux.',
        'prod_2_desc': 'Fruits frais et fruits secs de la meilleure qualité, cultivés sur les terres équatoriennes.',
        'prod_aceite_oliva_intenso': 'HUILE D\'OLIVE INTENSE',
        'prod_aceite_oliva_intenso_desc': 'Huile d\'olive intense de haute qualité, idéale pour l\'exportation vers les marchés internationaux.',
        'prod_3_desc': 'Produits textiles artisanaux de haute qualité, représentant la tradition équatorienne.',
        'prod_banana_title': 'BANANE',
        'prod_banana_desc': 'Banane équatorienne d\'exportation, reconnue mondialement pour sa saveur sucrée et sa texture parfaite.',
        'prod_pitaya_title': 'PITAYA',
        'prod_pitaya_desc': 'Pitaya ou fruit du dragon, exotique et nutritif, cultivé dans les terres tropicales de l\'\u00c9quateur.',
        'prod_4_desc': 'Jambon séché de qualité exceptionnelle, préparé selon des méthodes traditionnelles.',
        'prod_5_desc': 'Poissons frais et fruits de mer des côtes du Pacifique équatorien.',
        'prod_6_desc': 'Cacao équatorien à arôme fin, reconnu mondialement pour sa qualité exceptionnelle et sa saveur unique.',
        'prod_atun_title': 'THON',
        'prod_atun_desc': 'Thon frais des côtes du Pacifique équatorien, idéal pour la gastronomie internationale.',
        'prod_camaron_title': 'CREVETTE',
        'prod_camaron_desc': 'Crevette équatorienne de première qualité, reconnue pour sa saveur et sa fraîcheur exceptionnelles.',
        'prod_albacora_title': 'ALBACORE',
        'prod_albacora_desc': 'Albacore des eaux profondes du Pacifique, apprécié pour sa texture ferme et sa saveur délicate.',        'prod_aceite_virgen': 'HUILE VIERGE EXTRA',
        'prod_aceite_virgen_desc': 'Huile vierge extra de première pression à froid, avec certification de qualité premium pour les marchés internationaux.',        'products_page_title': 'Nos Produits',
        'badge_export': 'Exportation',
        'badge_import': 'Importation',
        'form_url': 'https://docs.google.com/forms/d/1Bsjxey6_Y9yGgwF3xPTHx7tOudQXe6t5cxqrB5cBO5E/viewform'
    },
    'en': {
        'nav_home': 'HOME',
        'nav_about': 'About Us',
        'nav_areas': 'Areas',
        'nav_contact': 'Contact',
        'hero_title': 'CICTAEC',
        'hero_subtitle': 'International Chamber of Commerce and Tourism',
        'hero_slide_connect': 'CONNECTING CONTINENTS',
        'hero_slide_bridge': 'YOUR BRIDGE TO THE WORLD',
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
        'btn_more': 'SEE MORE DETAILS',
        'btn_info': 'REQUEST INFO',
        'btn_advisory': 'REQUEST ADVISORY',
        'btn_details': 'DETAILS',
        'btn_details_area': 'MORE DETAILS',
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
        'prod_4_title': 'HAM',
        'prod_5_title': 'FISH',
        'prod_6_title': 'COCOA',
        'prod_1_desc': 'High quality oil from Ecuador, ideal for export to international markets.',
        'prod_2_desc': 'Fresh fruits and dried fruits of the best quality, grown on Ecuadorian lands.',
        'prod_aceite_oliva_intenso': 'INTENSE OLIVE OIL',
        'prod_aceite_oliva_intenso_desc': 'High quality intense olive oil, ideal for export to international markets.',
        'prod_3_desc': 'Handcrafted textile products of high quality, representing Ecuadorian tradition.',
        'prod_banana_title': 'BANANA',
        'prod_banana_desc': 'Export-quality Ecuadorian banana, recognized worldwide for its sweet flavor and perfect texture.',
        'prod_pitaya_title': 'PITAYA',
        'prod_pitaya_desc': 'Pitaya or dragon fruit, exotic and nutritious, grown in the tropical lands of Ecuador.',
        'prod_4_desc': 'Cured ham of excellent quality, prepared with traditional methods.',
        'prod_5_desc': 'Fresh fish and seafood from the Ecuadorian Pacific coast.',
        'prod_6_desc': 'Fine aroma Ecuadorian cocoa, recognized worldwide for its exceptional quality and unique flavor.',
        'prod_atun_title': 'TUNA',
        'prod_atun_desc': 'Fresh tuna from the Ecuadorian Pacific coast, ideal for international gastronomy.',
        'prod_camaron_title': 'SHRIMP',
        'prod_camaron_desc': 'Top quality Ecuadorian shrimp, recognized for its exceptional flavor and freshness.',
        'prod_albacora_title': 'ALBACORE',
        'prod_albacora_desc': 'Deep water Pacific albacore, appreciated for its firm texture and delicate flavor.',
        'prod_aceite_virgen': 'EXTRA VIRGIN OIL',
        'prod_aceite_virgen_desc': 'Extra virgin oil from first cold pressing, with premium quality certification for international markets.',
        'products_page_title': 'Our Products',
        'badge_export': 'Export',
        'badge_import': 'Import',
        'form_url': 'https://docs.google.com/forms/d/e/1FAIpQLScqEPD_uMeHBLZXmpucLE1a_TDyYZAjEGwem9Dfi8k9MheecA/viewform'
    },
    'ca': {
        'nav_home': 'INICI',
        'nav_about': 'Sobre nosaltres',
        'nav_areas': 'Àrees',
        'nav_contact': 'Contacte',
        'hero_title': 'CICTAEC',
        'hero_subtitle': 'Cambra Internacional de Comerç i Turisme',
        'hero_slide_connect': 'CONNECTANT CONTINENTS',
        'hero_slide_bridge': 'EL TEU PONT AL MÓN',
        'about_title': 'Cambra Internacional de Comerç i Turisme Associació Equatoriana-Catalana',
        'about_description': 'CICTAEC és una organització de caràcter internacional que actua com a pont entre l\'Amèrica Llatina i Europa.',
        'founder_tag': 'SOBRE CICTAEC',
        'founder_quote': '"CICTAEC és una organització de caràcter internacional que actua com a pont entre l\'Amèrica Llatina i Europa."',
        'founder_title': 'FUNDADORA',
        'mission_title': 'Missió',
        'mission_text': 'Ser un pont eficaç en la connexió internacional entre l\'Equador i Europa, promovent relacions comercials, facilitant oportunitats de negocis.',
        'vision_title': 'Visió',
        'vision_text': 'Ser una cambra de referència en la connexió internacional entre l\'Equador i Europa, relacionant sectors d\'importància com comerç, turisme i educació.',
        'areas_main_title': 'ÀREES',
        'area_1': 'COMERÇ',
        'area_2': 'TURISME',
        'area_3': 'CULTURAL',
        'commerce_title': 'COMERÇ',
        'trad_prod_title': 'PRODUCTES TRADICIONALS',
        'trad_prod_desc': 'El comerç de productes tradicionals és fonamental per a la nostra identitat i economia.',
        'btn_more': 'VEURE MÉS DETALLS',
        'btn_info': 'SOL·LICITAR INFO',
        'btn_advisory': 'SOL·LICITAR ASSESSORAMENT',
        'btn_details': 'DETALLS',
        'btn_details_area': 'MÉS DETALLS',
        'btn_form': 'ANAR AL FORMULARI DE CONTACTE',
        'ie_title': 'IMPORTACIÓ I EXPORTACIÓ',
        'ie_desc': 'Facilitem els processos logístics i legals per connectar els mercats locals amb el món.',
        'products_section_title': 'PRODUCTES',
        'tourism_subtitle': 'PROMOCIÓ I RUTES',
        'tourism_desc': 'Impulsem el turisme sostenible i el reconeixement de destinacions estratègiques en ambdós continents.',
        'cultural_subtitle': 'EDUCACIÓ I INNOVACIÓ',
        'cultural_desc': 'Fomentem l\'intercanvi de coneixements, innovació tecnològica i desenvolupament educatiu internacional.',
        'contact_company_name': 'Cambra Internacional de Comerç i Turisme',
        'contact_section_title': 'CONTACTE',
        'address_label': 'Adreça:',
        'phone_label': 'Telèfon:',
        'footer_copy': '© 2024 CICTAEC - Cambra Internacional de Comerç i Turisme. Tots els drets reservats.',
        'prod_1_title': 'OLI',
        'prod_2_title': 'FRUITES',
        'prod_3_title': 'TÈXTIL',
        'prod_4_title': 'PERNIL',
        'prod_5_title': 'PEIX',        'prod_6_title': 'CACAU',        'prod_1_desc': 'Oli d\'alta qualitat provinent de l\'Equador, ideal per a l\'exportació a mercats internacionals.',
        'prod_2_desc': 'Fruites fresques i fruites seques de la millor qualitat, cultivades a les terres equatorianes.',
        'prod_aceite_oliva_intenso': 'OLI D\'OLIVA INTENS',
        'prod_aceite_oliva_intenso_desc': 'Oli d\'oliva intens d\'alta qualitat, ideal per a l\'exportació a mercats internacionals.',
        'prod_3_desc': 'Productes tèxtils artesanals d\'alta qualitat, representant la tradició equatoriana.',
        'prod_banana_title': 'BANANA',
        'prod_banana_desc': 'Banana equatoriana d\'exportació, reconeguda mundialment pel seu sabor dolç i textura perfecta.',
        'prod_pitaya_title': 'PITAYA',
        'prod_pitaya_desc': 'Pitaya o fruita del drac, exòtica i nutritiva, cultivada a les terres tropicals de l\'Equador.',
        'prod_4_desc': 'Pernil curat de qualitat excel·lent, preparat amb mètodes tradicionals.',
        'prod_5_desc': 'Peix fresc i marisc de les costes del Pacífic equatorià.',
        'prod_6_desc': 'Cacau equatorià de fina aroma, reconegut mundialment per la seva qualitat excepcional i sabor únic.',
        'prod_atun_title': 'TONYINA',
        'prod_atun_desc': 'Tonyina fresca de les costes del Pacífic equatorià, ideal per a la gastronomia internacional.',
        'prod_camaron_title': 'GAMBA',
        'prod_camaron_desc': 'Gamba equatoriana de primera qualitat, reconeguda pel seu sabor i frescor excepcionals.',
        'prod_albacora_title': 'ALBACORA',
        'prod_albacora_desc': 'Albacora d\'aigües profundes del Pacífic, apreciada per la seva textura ferma i sabor delicat.',        'prod_aceite_virgen': 'OLI VERGE EXTRA',
        'prod_aceite_virgen_desc': 'Oli verge extra de primera premsa en fred, amb certificació de qualitat premium per a mercats internacionals.',        'products_page_title': 'Els Nostres Productes',
        'badge_export': 'Exportació',
        'badge_import': 'Importació',
        'form_url': 'https://docs.google.com/forms/d/e/1FAIpQLSeuPu_ceclsak6l1MelMbZuSp5_WQ3Oscagp_49upE67mSDhg/viewform'
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

    // Changer l'URL du formulaire de contact selon la langue
    const contactFormLink = document.getElementById('contact-form-link');
    if (contactFormLink && translations[lang] && translations[lang]['form_url']) {
        contactFormLink.href = translations[lang]['form_url'];
    }

    localStorage.setItem('preferredLang', lang);
}

// ==========================================
// 4. FONCTION DE REDIRECTION VERS FORMULAIRE
// ==========================================
function redirectToForm() {
    const savedLang = localStorage.getItem('preferredLang') || 'es';
    const formUrl = translations[savedLang] && translations[savedLang]['form_url'] 
        ? translations[savedLang]['form_url'] 
        : 'https://forms.gle/5951nVBJNCh4sBi78';
    window.open(formUrl, '_blank');
}

// ==========================================
// 5. INICIALIZACIÓN
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
