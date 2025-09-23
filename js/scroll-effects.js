document.addEventListener('DOMContentLoaded', function() {
    // ===== Configuración del Intersection Observer =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añadir clase active para las animaciones CSS
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observar todos los elementos con la clase scroll-animation
    const scrollElements = document.querySelectorAll('.scroll-animation');
    scrollElements.forEach(el => {
        observer.observe(el);
    });

    // ===== Efecto de reducción del header al hacer scroll =====
    const header = document.getElementById('main-header');
    const logo = document.getElementById('logo');
    const headerHeight = header.offsetHeight;

    function updateHeader() {
        if (window.scrollY > headerHeight / 2) {
            header.classList.add('header-scrolled');
            logo.classList.add('logo-scrolled');
        } else {
            header.classList.remove('header-scrolled');
            logo.classList.remove('logo-scrolled');
        }
    }

    // Ejecutar al cargar y al hacer scroll
    updateHeader();
    window.addEventListener('scroll', updateHeader);

    // ===== Smooth scrolling para enlaces internos =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = header.offsetHeight + 20;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Optimización para móviles =====
    if (window.innerWidth < 768) {
        // Reducir delays en móviles
        const delays = document.querySelectorAll('[class*="delay-"]');
        delays.forEach(delay => {
            delay.style.animationDelay = '0.1s';
        });
        
        // Ajustar opciones del observer para móviles
        observerOptions.threshold = 0.05;
    }

    // ===== Preloader (opcional) =====
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.transition = 'opacity 0.5s ease';
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
});