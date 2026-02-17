const launchDate = new Date("2026-07-01T00:00:00-05:00");
const timeIds = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

const messages = [
  "Compiling brand vision...",
  "Calibrating portfolio modules...",
  "Deploying story-driven design...",
  "Optimizing launch sequence...",
  "Rendering the final details...",
];

const statusLine = document.getElementById("status-line");
const shell = document.getElementById("shell");
const warpBtn = document.getElementById("warp-btn");

function updateCountdown() {
  const now = new Date();
  const diff = launchDate - now;

  if (diff <= 0) {
    Object.values(timeIds).forEach((el) => {
      el.textContent = "00";
    });
    statusLine.textContent = "Launch window is open.";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  timeIds.days.textContent = String(days).padStart(2, "0");
  timeIds.hours.textContent = String(hours).padStart(2, "0");
  timeIds.minutes.textContent = String(minutes).padStart(2, "0");
  timeIds.seconds.textContent = String(seconds).padStart(2, "0");
}

function typeMessageLoop() {
  let i = 0;

  function typeText(text, index = 0) {
    statusLine.textContent = text.slice(0, index);
    if (index < text.length) {
      setTimeout(() => typeText(text, index + 1), 36);
      return;
    }

    setTimeout(() => eraseText(text, text.length), 1300);
  }

  function eraseText(text, index) {
    statusLine.textContent = text.slice(0, index);
    if (index > 0) {
      setTimeout(() => eraseText(text, index - 1), 18);
      return;
    }

    i = (i + 1) % messages.length;
    setTimeout(() => typeText(messages[i], 0), 250);
  }

  typeText(messages[i], 0);
}

function setupTilt() {
  window.addEventListener("pointermove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 8;
    const y = (event.clientY / window.innerHeight - 0.5) * -8;
    shell.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
  });

  window.addEventListener("pointerleave", () => {
    shell.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
}

function setupWarpButton() {
  warpBtn.addEventListener("click", () => {
    document.body.animate(
      [
        { filter: "hue-rotate(0deg) saturate(100%)" },
        { filter: "hue-rotate(120deg) saturate(130%)" },
        { filter: "hue-rotate(260deg) saturate(120%)" },
        { filter: "hue-rotate(360deg) saturate(100%)" },
      ],
      { duration: 1800, easing: "ease-in-out" }
    );
  });
}

function setupParticles() {
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  const particles = [];
  const particleCount = 90;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i += 1) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        r: Math.random() * 1.8 + 0.6,
      });
    }
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(122, 240, 216, 0.8)";
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.15;
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });

  resize();
  createParticles();
  tick();
}

updateCountdown();
setInterval(updateCountdown, 1000);
typeMessageLoop();
setupTilt();
setupWarpButton();
setupParticles();
