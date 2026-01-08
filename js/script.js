// --- INICIALIZAÇÃO DO LENIS ---
const lenis = new Lenis({
    duration: 0.6, // Duração do scroll (quanto maior, mais suave)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Função de suavização
    smoothWheel: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


// --- EFEITO DO HEADER (ALPHA) ---
const header = document.querySelector('.header-lando');

// Usamos o evento de scroll do próprio Lenis para melhor performance
lenis.on('scroll', (e) => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight; // Pega a altura da tela atual
    const startFade = vh * 0.5; // Começa a aplicar o efeito após 10% da altura da tela
    const endFade = vh * 1; // Termina o efeito aos 30% da altura da tela

    let opacity = (scrollY - startFade) / (endFade - startFade);
    opacity = Math.min(Math.max(opacity, 0), 1);

    header.style.opacity = opacity;
    header.style.backgroundColor = `rgba(0, 0, 0, ${opacity * 0.8})`;
    header.style.backdropFilter = `blur(${opacity * 10}px)`;

    if (opacity > 0.1) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
});