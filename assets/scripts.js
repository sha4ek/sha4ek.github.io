// ===== CONFIG =====
const TYPE_SPEED = 90;
const DELETE_SPEED = 50;

// ===== ELEMENTS =====
const nav = document.querySelector(".nav");
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
const cursor = document.querySelector(".cursor");

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ===== SAFE LINK TRANSITION =====
document.querySelectorAll("a[href]").forEach((a) => {
  const href = a.getAttribute("href");

  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    a.target === "_blank"
  )
    return;

  a.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.classList.add("fade-out");
    setTimeout(() => (location.href = href), 300);
  });
});

// ===== SCROLL LOGIC =====
const sections = document.querySelectorAll("section, .section");
const navLinksAll = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {
  // navbar shadow
  nav.style.boxShadow =
    window.scrollY > 40 ? "0 10px 30px rgba(0,0,0,.3)" : "none";

  // parallax
  const hero = document.querySelector(".hero");
  hero.style.transform = `translateY(${window.scrollY * 0.2}px)`;

  // active section
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 100;
    if (scrollY >= top) current = section.getAttribute("id");
  });

  navLinksAll.forEach((link) => {
    link.style.opacity = "0.5";
    if (link.getAttribute("href") === "#" + current) {
      link.style.opacity = "1";
    }
  });
});

// ===== BUTTON =====
function scrollToSection() {
  document.getElementById("about").scrollIntoView({ behavior: "smooth" });
}

// ===== TYPING =====
const typingWords = [
  "Потребитель контента",
  "Создатель контента",
  "Прокрастинация, но с планом",
  "Сначала идея – затем реализация",
  "Иногда продуктивный",
  "Не идеально, зато честно",
  "Постепенно становлюсь лучше",
  "И жнец, и чтец, и на дуде игрец",
  "А когда не делали?",
  "Учусь на ошибках, следующая – фатальная",
  "Поиграйте в Terraria",
  "Умный в гору деньги время, потеха деньги горы умный",
];

let tj = 0;
let deleting = false;
let currentIndex = Math.floor(Math.random() * typingWords.length);

function type() {
  const el = document.getElementById("typing");
  const current = typingWords[currentIndex];

  el.textContent = current.substring(0, tj);

  if (!deleting) {
    if (tj < current.length) {
      tj++;
      setTimeout(type, TYPE_SPEED);
    } else {
      setTimeout(() => {
        deleting = true;
        type();
      }, 1500);
    }
  } else {
    if (tj > 0) {
      tj--;
      setTimeout(type, DELETE_SPEED);
    } else {
      deleting = false;

      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * typingWords.length);
      } while (nextIndex === currentIndex);

      currentIndex = nextIndex;
      setTimeout(type, 400);
    }
  }
}

type();

// ===== INTERSECTION OBSERVER =====
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
});

document.querySelectorAll(".card").forEach((el) => observer.observe(el));

// ===== CUSTOM CURSOR =====
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

document.addEventListener("mousedown", () => {
  cursor.style.transform = "translate(-50%, -50%) scale(0.7)";
});

document.addEventListener("mouseup", () => {
  cursor.style.transform = "translate(-50%, -50%) scale(1)";
});

// ===== PROJECT CARDS (mobile fix) =====
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("active");
  });
});

// ===== BURGER MENU =====
burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
    burger.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// ===== PARTICLES =====
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particleCount = window.innerWidth < 768 ? 40 : 80;

let particles = Array.from({ length: particleCount }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: Math.random() - 0.5,
  vy: Math.random() - 0.5,
}));

let mouse = { x: null, y: null };

document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    const dx = p.x - mouse.x;
    const dy = p.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 120) {
      p.x += dx * 0.02;
      p.y += dy * 0.02;
    }

    ctx.fillStyle = "#7b68ee";
    ctx.fillRect(p.x, p.y, 2, 2);
  });

  requestAnimationFrame(draw);
}

draw();

// ===== LOAD =====
window.addEventListener("load", () => {
  document.getElementById("loader").classList.add("hidden");
  document.body.classList.add("loaded");
});
