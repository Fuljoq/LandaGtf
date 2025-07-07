// Variables
const videoGrid = document.querySelector('.video-grid');
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links-container');
const navLinks = document.querySelectorAll('.nav-links a');
const navbar = document.querySelector('.navbar');
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

// Agregar videos al grid
videos.forEach(video => {
    const card = createVideoCard(video);
    videoGrid.appendChild(card);
    
    // Agregar eventos hover a los botones de días si es Landa Challenge
    if (video.title === "Landa Challenge") {
        const dayButtons = card.querySelectorAll('.day-button');
        dayButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
                button.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            });
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
                button.style.boxShadow = 'none';
            });
        });
    }
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
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
            document.body.style.overflow = '';
            document.documentElement.classList.remove('menu-open');
        }
        
        // Actualizar el enlace activo después de un pequeño retraso para permitir la navegación
        setTimeout(updateActiveLink, 100);
    });
});

// Actualizar el enlace activo al cargar la página
document.addEventListener('DOMContentLoaded', updateActiveLink);
window.addEventListener('load', updateActiveLink);
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
    
    // Desplazamiento suave para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Ajustar para la barra de navegación fija
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Scroll suave para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
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
