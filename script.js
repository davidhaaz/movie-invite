const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
let isMoving = false;

function moveButton() {
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

noBtn.addEventListener('mouseover', () => {
    moveButton();
});

noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    e.stopPropagation();
    isMoving = true;
    moveButton();
    
    // Temporarily disable pointer events to prevent accidental clicks
    noBtn.style.pointerEvents = 'none';
    yesBtn.style.pointerEvents = 'none';
    setTimeout(() => {
        noBtn.style.pointerEvents = 'auto';
        yesBtn.style.pointerEvents = 'auto';
        isMoving = false;
    }, 400);
});

noBtn.addEventListener('click', (e) => {
    if (isMoving) {
        e.preventDefault();
        e.stopPropagation();
        return;
    }
    moveButton();
});

yesBtn.addEventListener('click', () => {
    // Trigger confetti
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Optionally, hide buttons or show a message
    document.querySelector('.buttons').innerHTML = '<p>Yay! See you at movie night!</p>';
});