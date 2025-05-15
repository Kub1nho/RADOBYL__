document.addEventListener('DOMContentLoaded', function() {
    //Navigace - hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    //Zavření menu po kliknutí na odkaz
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    //Scroll efekty pro navigaci
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    //Scroll to top tlačítko
    const scrollTopBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    //Plynulý scroll pro odkazy
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    //Animace prvků při scrollování
    const animateElements = () => {
        const elements = document.querySelectorAll('.fade-in:not(.show)');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                element.classList.add('show');
            }
        });
    };

    window.addEventListener('scroll', animateElements);
    animateElements(); //Pro prvky, které jsou viditelné při načtení stránky

    //Inicializace mapy Leaflet
    const map = L.map('map').setView([50.5339, 14.0939], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    //Přidání značek na mapu
    const radobylMarker = L.marker([50.5339, 14.0939]).addTo(map)
        .bindPopup('<b>Vrch Radobýl</b><br>Nadmořská výška: 399 m n.m.')
        .openPopup();

    const litomericeMarker = L.marker([50.5340, 14.1319]).addTo(map)
        .bindPopup('<b>Litoměřice</b><br>Historické město');

    const portaBohemicaMarker = L.marker([50.5513, 14.0454]).addTo(map)
        .bindPopup('<b>Porta Bohemica</b><br>Labský kaňon');
});