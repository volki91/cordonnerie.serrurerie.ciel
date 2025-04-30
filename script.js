
const continueBtn = document.getElementById('continue');
const gameDiv = document.getElementById('game');
const canvas = document.getElementById('wheelcanvas');
const ctx = canvas.getContext('2d');
const resultDiv = document.getElementById('result');

const segments = ['PERDU', 'CADEAU', 'PERDU', 'CADEAU', 'PERDU', 'PERDU'];
const colors = ['#555', '#999', '#555', '#999', '#555', '#555'];
let angle = 0;

function drawWheel() {
    const segmentAngle = 2 * Math.PI / segments.length;
    for (let i = 0; i < segments.length; i++) {
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 150, i * segmentAngle, (i + 1) * segmentAngle);
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(i * segmentAngle + segmentAngle / 2);
        ctx.fillStyle = "white";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        ctx.fillText(segments[i], 100, 5);
        ctx.restore();
    }

    // Draw center logo
    const logo = new Image();
    logo.src = 'logo_cordonnerie_resized.png';
    logo.onload = function () {
        ctx.save();
        ctx.beginPath();
        ctx.arc(150, 150, 40, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(logo, 110, 110, 80, 80);
        ctx.restore();
    };
}

drawWheel();

continueBtn.onclick = () => {
    gameDiv.style.display = "block";
    let rotations = Math.floor(Math.random() * 5) + 5;
    let step = 0;
    const totalSteps = rotations * segments.length;
    const interval = setInterval(() => {
        angle += (2 * Math.PI / segments.length);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(angle);
        ctx.translate(-150, -150);
        drawWheel();
        ctx.restore();
        step++;
        if (step > totalSteps) {
            clearInterval(interval);
            const index = segments.length - Math.floor((angle / (2 * Math.PI)) * segments.length) % segments.length;
            const result = segments[index % segments.length];
            resultDiv.textContent = result === 'CADEAU' ? "Bravo ! Vous avez gagné un porte-clé offert !" : "Dommage, retentez votre chance.";
        }
    }, 100);
};
