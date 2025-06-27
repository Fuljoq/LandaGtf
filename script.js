// Variables
const videoGrid = document.querySelector('.video-grid');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Videos
const videos = [
    {
        title: "Desafío Landa",
        thumbnail: "cara.jpg",
        url: "https://www.youtube.com/embed/VIDEO_ID_1"
    },
    {
        title: "Ejercicios",
        thumbnail: "cara.jpg",
        url: "https://www.youtube.com/embed/VIDEO_ID_2"
    }
];

// Función para crear tarjetas de video
function createVideoCard(video) {
    const videoCard = document.createElement('div');
    videoCard.className = 'video-card';
    
    // Si es el video de Desafío Landa, agregar botones de días
    let daysButtons = '';
    if (video.title === "Desafío Landa") {
        daysButtons = `
            <div class="days-buttons">
                <a href="https://www.tiktok.com/@landa_gtf/video/7310754461704523013" target="_blank" class="day-button">Día 100</a>
                <a href="https://www.tiktok.com/@landa_gtf/video/7347895368157269254" target="_blank" class="day-button">Día 200</a>
                <a href="https://www.tiktok.com/@landa_gtf/video/7385012012977310982" target="_blank" class="day-button">Día 300</a>
                <a href="https://www.tiktok.com/@landa_gtf/video/7409509296116878598" target="_blank" class="day-button">Día 365</a>
            </div>
        `;
    }
    
    videoCard.innerHTML = `
        <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail">
        <div class="video-info">
            <h3>${video.title}</h3>
            ${daysButtons}
            ${video.title === "Ejercicios" ? `
                <div class="days-buttons">
                    <a href="https://www.tiktok.com/@landa_gtf/video/7504422996199623991" target="_blank" class="day-button">Ver Video</a>
                </div>
            ` : ''}
        </div>
    `;
    return videoCard;
}

// Agregar videos al grid
videos.forEach(video => {
    const card = createVideoCard(video);
    videoGrid.appendChild(card);
    
    // Agregar eventos hover a los botones de días si es Desafío Landa
    if (video.title === "Desafío Landa") {
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
hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
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
