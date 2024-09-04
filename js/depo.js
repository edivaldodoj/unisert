const carouselItems = document.querySelector('.carousel-items');
const carouselItem = document.querySelector('.carousel-item');
let index = 0;
const itemCount = document.querySelectorAll('.carousel-item').length;
let startX, endX;
let isDragging = false;
const threshold = 50; // Sensibilidade do arrasto
const transitionTime = 0.3; // Tempo de transição em segundos

// Função para atualizar o carrossel
const updateCarousel = () => {
    const offset = -index * 100;
    carouselItems.style.transform = `translateX(${offset}%)`;
};

// Iniciar o arrasto
carouselItems.addEventListener('mousedown', (e) => {
    startX = e.pageX;
    isDragging = true;
    carouselItems.style.transition = 'none'; // Remover transição durante o arrasto
});

// Arrastar
carouselItems.addEventListener('mousemove', (e) => {
    if (isDragging) {
        endX = e.pageX;
        const distance = endX - startX;
        carouselItems.style.transform = `translateX(calc(-${index * 100}% + ${distance}px))`;
    }
});

// Finalizar o arrasto
carouselItems.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        const distance = endX - startX;
        if (Math.abs(distance) > threshold) {
            if (distance < 0) {
                index = (index + 1) % itemCount; // Próximo item
            } else {
                index = (index - 1 + itemCount) % itemCount; // Item anterior
            }
        }
        updateCarousel();
        carouselItems.style.transition = `transform ${transitionTime}s ease-in-out`; // Reaplicar transição
    }
});

// Adicionar suporte ao toque para dispositivos móveis
carouselItems.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX;
    isDragging = true;
});

carouselItems.addEventListener('touchmove', (e) => {
    if (isDragging) {
        endX = e.touches[0].pageX;
        const distance = endX - startX;
        carouselItems.style.transform = `translateX(calc(-${index * 100}% + ${distance}px))`;
    }
});

carouselItems.addEventListener('touchend', () => {
    if (isDragging) {
        isDragging = false;
        const distance = endX - startX;
        if (Math.abs(distance) > threshold) {
            if (distance < 0) {
                index = (index + 1) % itemCount; // Próximo item
            } else {
                index = (index - 1 + itemCount) % itemCount; // Item anterior
            }
        }
        updateCarousel();
        carouselItems.style.transition = `transform ${transitionTime}s ease-in-out`; // Reaplicar transição
    }
});

// Função para auto-play
const autoPlay = () => {
    setInterval(() => {
        index = (index + 1) % itemCount;
        updateCarousel();
    }, 4000); // Mudar segundos
};

autoPlay();
