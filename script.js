// Variables globales
const videoGrid = document.querySelector('.video-grid');
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links-container');
const navLinks = document.querySelectorAll('.nav-links a');
const navbar = document.querySelector('.navbar');
const socialLinks = document.querySelectorAll('.social-icons a');
let lastScroll = 0;

// Videos
const videos = [
    {
        title: "Landa Challenge",
        thumbnail: "cara.jpg",
        url: "https://www.youtube.com/embed/VIDEO_ID_1"
    },
    {
        title: "Ejercicios",
        thumbnail: "cara.jpg",
        buttons: [
            {
                url: "https://www.tiktok.com/@landa_gtf/video/7504786976101436727",
                title: "Ejercicio de Técnica",
                icon: "fist-raised"
            },
            {
                url: "https://www.tiktok.com/@landa_gtf/video/7520033056682462520",
                title: "Entrenamiento Completo",
                icon: "dumbbell"
            }
        ]
    }
];

// Función para crear tarjetas de video
function createVideoCard(video) {
    const videoCard = document.createElement('div');
    videoCard.className = 'video-card';
    
    // Botones especiales según el tipo de video
    let specialButtons = '';
    
    if (video.title === "Landa Challenge") {
        specialButtons = `
            <div class="days-buttons">
                <a href="https://www.tiktok.com/@landa_gtf/video/7310754461704523013" target="_blank" class="day-button">
                    <i class="fas fa-calendar-day"></i>
                    <span>Día 100</span>
                </a>
                <a href="https://www.tiktok.com/@landa_gtf/video/7347895368157269254" target="_blank" class="day-button">
                    <i class="fas fa-calendar-day"></i>
                    <span>Día 200</span>
                </a>
                <a href="https://www.tiktok.com/@landa_gtf/video/7385012012977310982" target="_blank" class="day-button">
                    <i class="fas fa-calendar-day"></i>
                    <span>Día 300</span>
                </a>
                <a href="https://www.tiktok.com/@landa_gtf/video/7409509296116878598" target="_blank" class="day-button special-day">
                    <i class="fas fa-trophy"></i>
                    <span>Día 366</span>
                </a>
            </div>
        `;
    } else if (video.buttons) {
        // Botones para la sección de ejercicios
        specialButtons = `
            <div class="exercise-buttons">
                ${video.buttons.map(btn => `
                    <a href="${btn.url}" target="_blank" class="exercise-button">
                        <i class="fas fa-${btn.icon}"></i>
                        <span>${btn.title}</span>
                    </a>
                `).join('')}
            </div>
        `;
    }
    
    videoCard.innerHTML = `
        <div class="video-thumbnail">
            <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail-img">
        </div>
        <div class="video-info">
            <h3 class="video-title">${video.title}</h3>
            ${specialButtons}
        </div>
    `;
    return videoCard;
}

// Función para manejar la interacción con los botones de video
const setupVideoButtons = (card) => {
    // Función para el efecto hover en desktop
    const setupHoverEffect = (button) => {
        if (window.innerWidth > 768) { // Solo para escritorio
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
                button.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
                button.style.boxShadow = 'none';
            });
        }
    };

    // Función para manejar el toque en móviles
    const handleButtonTap = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const button = e.currentTarget;
        const href = button.getAttribute('href');
        
        if (href) {
            // Pequeño retraso para mejorar la retroalimentación táctil
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
                window.open(href, '_blank');
            }, 100);
        }
    };

    // Configurar botones de días (Landa Challenge)
    const dayButtons = card.querySelectorAll('.day-button');
    dayButtons.forEach(button => {
        setupHoverEffect(button);
        
        // Para móviles
        button.addEventListener('touchstart', () => {
            button.style.opacity = '0.8';
        }, { passive: true });
        
        button.addEventListener('touchend', handleButtonTap, { passive: false });
        button.addEventListener('click', handleButtonTap);
    });
    
    // Configurar botones de ejercicios
    const exerciseButtons = card.querySelectorAll('.exercise-button');
    exerciseButtons.forEach(button => {
        setupHoverEffect(button);
        
        // Para móviles
        button.addEventListener('touchstart', () => {
            button.style.opacity = '0.8';
        }, { passive: true });
        
        button.addEventListener('touchend', handleButtonTap, { passive: false });
        button.addEventListener('click', handleButtonTap);
    });
};

// Agregar videos al grid
videos.forEach(video => {
    const card = createVideoCard(video);
    videoGrid.appendChild(card);
    
    // Configurar los botones del video
    setupVideoButtons(card);
});

// Menú móvil
hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevenir que el evento se propague
    const isActive = !hamburger.classList.contains('active');
    
    // Alternar clases
    hamburger.classList.toggle('active', isActive);
    navLinksContainer.classList.toggle('active', isActive);
    
    // Bloquear/desbloquear scroll del body
    document.body.style.overflow = isActive ? 'hidden' : '';
    
    // Agregar/remover clase al html para estilos específicos
    document.documentElement.classList.toggle('menu-open', isActive);
});

// Cerrar menú al hacer clic fuera de él
document.addEventListener('click', (e) => {
    const isClickInside = navLinksContainer.contains(e.target) || hamburger.contains(e.target);
    
    if (!isClickInside && navLinksContainer.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('active');
        document.body.style.overflow = '';
        document.documentElement.classList.remove('menu-open');
    }
});

// Función para actualizar el enlace activo basado en la URL actual
function updateActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentHash = window.location.hash || '#home';
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        // Verificar si el enlace coincide con la ruta actual o el hash
        if ((linkPath === currentPath) || 
            (linkPath === currentHash) || 
            (currentPath === 'index.html' && linkPath === '#home' && currentHash === '')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Cerrar menú al hacer clic en un enlace
const handleNavLinkClick = (e) => {
    // Prevenir el comportamiento por defecto para manejar manualmente la navegación
    e.preventDefault();
    e.stopPropagation();
    
    // Obtener el enlace
    const link = e.currentTarget;
    const href = link.getAttribute('href');
    
    // Navegar al destino del enlace
    if (href.startsWith('#')) {
        // Para enlaces de anclaje
        const targetElement = document.querySelector(href);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        // Para enlaces a otras páginas
        window.location.href = href;
    }
};

// Función para cerrar el menú móvil
function closeMobileMenu() {
    if (window.innerWidth <= 1024) {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('active');
        document.body.style.overflow = '';
        document.documentElement.classList.remove('menu-open');
    }
}

// Función para manejar la navegación
function handleNavigation(e) {
    // Prevenir el comportamiento por defecto
    e.preventDefault();
    e.stopPropagation();
    
    const link = e.currentTarget;
    const href = link.getAttribute('href');
    const target = link.getAttribute('target');
    
    // Navegación interna (anclas)
    if (href.startsWith('#')) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    } 
    // Navegación externa
    else if (href) {
        target === '_blank' ? window.open(href, '_blank') : window.location.href = href;
    }
    
    closeMobileMenu();
}

// Inicialización de eventos
document.addEventListener('DOMContentLoaded', function() {
    // Configuración de enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
        link.addEventListener('touchend', handleNavigation, { passive: true });
    });

    // Configuración de enlaces de redes sociales
    socialLinks.forEach(link => {
        link.addEventListener('click', e => e.stopPropagation());
        link.addEventListener('touchend', e => e.stopPropagation(), { passive: true });
    });

    // Configuración de botones de video
    const handleVideoButton = (e) => {
        e.stopPropagation();
        const href = e.currentTarget.getAttribute('href');
        if (href) window.open(href, '_blank');
    };

    document.querySelectorAll('.day-button, .exercise-button').forEach(button => {
        button.addEventListener('click', handleVideoButton);
        button.addEventListener('touchend', handleVideoButton, { passive: true });
    });
});

// Actualizar el enlace activo al cargar la página
document.addEventListener('DOMContentLoaded', updateActiveLink);
window.addEventListener('hashchange', updateActiveLink);

// Efecto de scroll en la barra de navegación
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Efecto de mostrar/ocultar navbar al hacer scroll
    if (currentScroll <= 0) {
        navbar.classList.remove('scrolled');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scrolled-down')) {
        // Scroll hacia abajo
        navbar.classList.add('scrolled-down');
        navbar.classList.add('scrolled');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scrolled-down')) {
        // Scroll hacia arriba
        navbar.classList.remove('scrolled-down');
        navbar.classList.add('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Cerrar menú al hacer clic fuera de él
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links-container') && !e.target.closest('.hamburger')) {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Asegurar que el menú se cierre al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Efecto de carga suave para la página
document.addEventListener('DOMContentLoaded', () => {
    // Añadir clase de carga inicial
    document.body.classList.add('page-loaded');
    
    // Configuración de desplazamiento suave para enlaces internos
    const setupSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            // Evitar duplicar manejadores
            if (!anchor.hasAttribute('data-smooth-scroll')) {
                anchor.setAttribute('data-smooth-scroll', 'true');
                
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href === '#' || href === '') return;
                    
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        window.scrollTo({
                            top: target.offsetTop - 80, // Ajustar para la barra de navegación fija
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });
    };
    
    // Inicializar desplazamiento suave
    setupSmoothScroll();
    
    // Volver a configurar si se agregan elementos dinámicamente
    const observer = new MutationObserver(setupSmoothScroll);
    observer.observe(document.body, { childList: true, subtree: true });
});

// Entrenamientos
const entrenamientos = [
    {
        title: "Entrenamiento 1",
        gif: "Entrenamiento1.gif", // Usando el nombre exacto del archivo
        description: "Mi entrenamiento de Taekwondo",
        link: "https://www.tiktok.com/@landa_gtf/video/7504422996199623991"
    }
];

// Función para crear tarjetas de entrenamiento
function createEntrenamientoCard(entrenamiento) {
    const card = document.createElement('div');
    card.className = 'entrenamiento-card';
    
    card.innerHTML = `
        <img src="${entrenamiento.gif}" alt="${entrenamiento.title}" style="width: 100%; height: 200px; object-fit: contain;">
        <div class="entrenamiento-info">
            <h3>${entrenamiento.title}</h3>
            <p>${entrenamiento.description}</p>
            <a href="${entrenamiento.link}" target="_blank" class="see-more-button">Ver más</a>
        </div>
    `;
    
    return card;
}

// Agregar entrenamientos al grid
const entrenamientosGrid = document.querySelector('.entrenamientos-grid');
entrenamientos.forEach(entrenamiento => {
    const card = createEntrenamientoCard(entrenamiento);
    entrenamientosGrid.appendChild(card);
});
