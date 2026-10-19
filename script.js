"use strict";

// Ganti nilai placeholder di array ini dengan biodata kelompok yang sebenarnya.
const teamMembers = [
  {
    number: "01",
    name: "[Chrisela Hallatu]",
    npm: "[12155201240035]",
    program: "[Program Studi Informatika]",
    faculty: "[Fakultas Ilmu Komputer]",
    university: "[Universitas Kristen Indonesia Maluku]",
    role: "Team Leader",
    description: "Mengkoordinasikan anggota, mengatur pembagian tugas, dan memastikan proyek berjalan sesuai tujuan.",
    skills: ["Leadership", "Teamwork", "Problem Solving"],
    image: "images/Sela.jpeg",
    alt: "Ilustrasi avatar placeholder anggota 01"
  },
  {
    number: "02",
    name: "[Catarina Maresyembun]",
    npm: "[12155201240031]",
    program: "[Program Studi Informatika]",
    faculty: "[Fakultas Ilmu Komputer]",
    university: "[Universitas Kristen Indonesia Maluku]",
    role: "Frontend Developer",
    description: "Berkontribusi dalam membangun struktur halaman dan mengembangkan tampilan website.",
    skills: ["HTML", "CSS", "JavaScript"],
    image: "images/Yeli.jpg",
    alt: "Ilustrasi avatar placeholder anggota 02"
  },
  {
    number: "03",
    name: "[Christ W. Makailipessy]",
    npm: "[12155201240036]",
    program: "[Program Studi Informatika]",
    faculty: "[Fakultas Ilmu Komputer]",
    university: "[Universitas Kristen Indonesia Maluku]",
    role: "UI/UX Designer",
    description: "Merancang pengalaman pengguna, komposisi layout, pemilihan warna, dan konsistensi antarmuka.",
    skills: ["UI Design", "UX", "Prototyping"],
    image: "images/Christ.jpeg",
    alt: "Ilustrasi avatar placeholder anggota 03"
  },
  {
    number: "04",
    name: "[Gleyn R. Manuhua]",
    npm: "[12155201240181]",
    program: "[Program Studi Informatika]",
    faculty: "[Fakultas Ilmu Komputer]",
    university: "[Universitas Kristen Indonesia Maluku]",
    role: "Web Developer",
    description: "Mengembangkan interaksi website, membantu integrasi fitur, dan melakukan pengujian fungsional.",
    skills: ["JavaScript", "DOM", "Debugging"],
    image: "images/Glen.jpeg",
    alt: "Ilustrasi avatar placeholder anggota 04"
  },
  {
    number: "05",
    name: "[Winston D. Korlowey]",
    npm: "[12155201240164]",
    program: "[Program Studi Informatika]",
    faculty: "[Fakultas Ilmu Komputer]",
    university: "[Universitas Kristen Indonesia Maluku]",
    role: "Documentation Specialist",
    description: "Mendokumentasikan proses pengembangan dan membantu penyusunan laporan proyek.",
    skills: ["Documentation", "Testing", "Collaboration"],
    image: "images/Delan.jpeg",
    alt: "Ilustrasi avatar placeholder anggota 05"
  }
];

const teamGrid = document.querySelector("#team-grid");
const heroProfiles = document.querySelector("#hero-profiles");
const modal = document.querySelector("#profile-modal");
const dialog = modal.querySelector(".profile-dialog");
const closeModalButton = modal.querySelector(".modal-close");
const navLinks = [...document.querySelectorAll(".nav-link")];
const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");
const mobileNavQuery = window.matchMedia("(max-width: 680px)");
navPanel.inert = mobileNavQuery.matches;
let lastFocusedElement = null;
let closeModalTimer;

function initialsFor(name) {
  const cleanName = name.replace(/[\[\]]/g, "").trim();
  const parts = cleanName.split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map((part) => part[0].toUpperCase()).join("") || "05";
}

function createMemberCard(member, index) {
  const card = document.createElement("article");
  card.className = "member-card reveal";
  card.style.setProperty("--card-index", index);

  const portrait = document.createElement("div");
  portrait.className = "member-portrait";

  const image = document.createElement("img");
  image.src = member.image;
  image.alt = member.alt;
  image.loading = "lazy";
  image.addEventListener("error", () => {
    const fallback = document.createElement("span");
    fallback.className = "portrait-fallback";
    fallback.textContent = initialsFor(member.name);
    fallback.setAttribute("role", "img");
    fallback.setAttribute("aria-label", `Avatar ${member.name}`);
    image.replaceWith(fallback);
  }, { once: true });
  portrait.append(image);

  const number = document.createElement("span");
  number.className = "member-number";
  number.textContent = member.number;
  number.setAttribute("aria-hidden", "true");
  portrait.append(number);

  const cardContent = document.createElement("div");
  cardContent.className = "member-content";
  const role = document.createElement("span");
  role.className = "role-badge";
  role.textContent = member.role;
  const name = document.createElement("h3");
  name.textContent = member.name;
  const meta = document.createElement("p");
  meta.className = "member-npm";
  meta.textContent = `NPM · ${member.npm}`;
  const bio = document.createElement("p");
  bio.className = "member-bio";
  bio.textContent = member.description;
  const info = document.createElement("p");
  info.className = "member-academic";
  info.textContent = `${member.program} · ${member.faculty} · ${member.university}`;
  const skills = document.createElement("div");
  skills.className = "member-skills";
  member.skills.forEach((skill) => {
    const tag = document.createElement("span");
    tag.textContent = skill;
    skills.append(tag);
  });
  const button = document.createElement("button");
  button.className = "profile-button";
  button.type = "button";
  button.innerHTML = 'Explore Profile <span aria-hidden="true">↗</span>';
  button.setAttribute("aria-label", `Explore Profile: ${member.name}`);
  button.addEventListener("click", () => openProfile(member, button));
  cardContent.append(role, name, meta, bio, info, skills, button);
  card.append(portrait, cardContent);
  return card;
}

function createHeroProfile(member, index) {
  const profile = document.createElement("button");
  profile.className = `hero-profile hero-profile-${index + 1}`;
  profile.type = "button";
  profile.setAttribute("aria-label", `Buka biodata ${member.name}, ${member.role}`);
  profile.addEventListener("click", () => openProfile(member, profile));

  const portrait = document.createElement("span");
  portrait.className = "hero-profile-portrait";
  const image = document.createElement("img");
  image.src = `images/anggota${index + 1}.jpg`;
  image.alt = "";
  image.setAttribute("aria-hidden", "true");
  image.addEventListener("error", () => {
    const fallback = document.createElement("span");
    fallback.className = "hero-profile-fallback";
    fallback.textContent = initialsFor(member.name);
    fallback.setAttribute("aria-hidden", "true");
    image.replaceWith(fallback);
  }, { once: true });
  portrait.append(image);

  const details = document.createElement("span");
  details.className = "hero-profile-details";
  const number = document.createElement("span");
  number.className = "hero-profile-number";
  number.textContent = member.number;
  const name = document.createElement("span");
  name.className = "hero-profile-name";
  name.textContent = member.name.replace(/[\[\]]/g, "").trim();
  const role = document.createElement("span");
  role.className = "hero-profile-role";
  role.textContent = member.role;
  details.append(number, name, role);
  profile.append(portrait, details);
  return profile;
}

function renderTeam() {
  const fragment = document.createDocumentFragment();
  teamMembers.forEach((member, index) => fragment.append(createMemberCard(member, index)));
  teamGrid.replaceChildren(fragment);
  heroProfiles.replaceChildren(...teamMembers.map(createHeroProfile));
}

function setModalText(selector, value) {
  document.querySelector(selector).textContent = value;
}

function openProfile(member, trigger) {
  clearTimeout(closeModalTimer);
  lastFocusedElement = trigger;
  const image = document.querySelector("#modal-image");
  const imageFallback = document.querySelector("#modal-image-fallback");
  image.onerror = () => {
    image.hidden = true;
    imageFallback.hidden = false;
  };
  image.hidden = false;
  imageFallback.hidden = true;
  imageFallback.textContent = initialsFor(member.name);
  imageFallback.setAttribute("aria-label", `Avatar ${member.name}`);
  image.src = member.image;
  image.alt = member.alt;
  setModalText("#modal-number", member.number);
  setModalText("#modal-role", member.role);
  setModalText("#modal-name", member.name);
  setModalText("#modal-description", member.description);
  setModalText("#modal-npm", member.npm);
  setModalText("#modal-program", member.program);
  setModalText("#modal-faculty", member.faculty);
  setModalText("#modal-university", member.university);

  const skills = document.querySelector("#modal-skills");
  skills.replaceChildren(...member.skills.map((skill) => {
    const tag = document.createElement("span");
    tag.textContent = skill;
    return tag;
  }));

  modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add("is-open"));
  document.body.classList.add("modal-open");
  document.querySelector("main").inert = true;
  document.querySelector(".site-footer").inert = true;
  document.querySelector(".site-header").inert = true;
  closeModalButton.focus();
}

function closeProfile() {
  if (modal.hidden) return;
  modal.classList.remove("is-open");
  document.body.classList.remove("modal-open");
  document.querySelector("main").inert = false;
  document.querySelector(".site-footer").inert = false;
  document.querySelector(".site-header").inert = false;
  closeModalTimer = window.setTimeout(() => {
    modal.hidden = true;
    if (lastFocusedElement?.isConnected) lastFocusedElement.focus();
  }, 220);
}

function trapModalFocus(event) {
  if (event.key === "Escape") {
    event.preventDefault();
    closeProfile();
    return;
  }
  if (event.key !== "Tab") return;
  const focusable = [...dialog.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])')];
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

closeModalButton.addEventListener("click", closeProfile);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeProfile();
});
dialog.addEventListener("keydown", trapModalFocus);

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu navigasi" : "Buka menu navigasi");
  navPanel.classList.toggle("is-open", isOpen);
  navPanel.inert = !isOpen && mobileNavQuery.matches;
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

mobileNavQuery.addEventListener("change", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") === "true");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("click", (event) => {
  if (menuToggle.getAttribute("aria-expanded") === "true" &&
      !navPanel.contains(event.target) && !menuToggle.contains(event.target)) {
    setMenuOpen(false);
  }
});

const header = document.querySelector(".site-header");
function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 18);
}
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${entry.target.id}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  });
}, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

function observeReveals(root = document) {
  root.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => revealObserver.observe(element));
}

const themeToggle = document.querySelector(".theme-toggle");
const themePreference = window.matchMedia("(prefers-color-scheme: light)");

function readSavedTheme() {
  try {
    const savedTheme = localStorage.getItem("the-five-theme");
    return savedTheme === "light" || savedTheme === "dark" ? savedTheme : null;
  } catch (error) {
    console.warn("Preferensi tema tidak dapat dibaca dari penyimpanan lokal.", error);
    return null;
  }
}

function applyTheme(theme, persist = false) {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-label", isDark ? "Aktifkan tema terang" : "Aktifkan tema gelap");
  themeToggle.setAttribute("aria-pressed", String(!isDark));
  if (persist) {
    try {
      localStorage.setItem("the-five-theme", theme);
    } catch (error) {
      console.warn("Preferensi tema tidak dapat disimpan.", error);
    }
  }
}

applyTheme(readSavedTheme() || (themePreference.matches ? "light" : "dark"));
themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme, true);
});

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    const target = Number(counter.dataset.count);
    const suffix = counter.dataset.suffix || "";
    const duration = 1100;
    const startedAt = performance.now();
    function updateCounter(now) {
      const progress = Math.min((now - startedAt) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      counter.textContent = `${Math.round(target * easedProgress)}${suffix}`;
      if (progress < 1) requestAnimationFrame(updateCounter);
    }
    requestAnimationFrame(updateCounter);
    observer.unobserve(counter);
  });
}, { threshold: 0.55 });

function validateField(field) {
  const errorMessage = document.querySelector(`#${field.id.replace("contact-", "")}-error`);
  const valid = field.checkValidity();
  field.setAttribute("aria-invalid", String(!valid));
  field.classList.toggle("is-valid", valid && field.value.trim().length > 0);
  if (!valid) {
    if (field.validity.valueMissing) errorMessage.textContent = "Kolom ini wajib diisi.";
    else if (field.validity.typeMismatch) errorMessage.textContent = "Masukkan alamat email dengan format yang benar.";
    else errorMessage.textContent = `Isi minimal ${field.minLength} karakter.`;
  } else {
    errorMessage.textContent = "";
  }
  return valid;
}

const contactForm = document.querySelector("#contact-form");
const formFields = [...contactForm.querySelectorAll("input, textarea")];
const formFeedback = document.querySelector("#form-feedback");

formFields.forEach((field) => {
  field.addEventListener("blur", () => validateField(field));
  field.addEventListener("input", () => {
    if (field.getAttribute("aria-invalid") === "true" || field.classList.contains("is-valid")) {
      validateField(field);
    }
    formFeedback.textContent = "";
    formFeedback.classList.remove("is-success");
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const validity = formFields.map(validateField);
  const firstInvalid = formFields.find((field) => !field.checkValidity());
  if (firstInvalid) {
    firstInvalid.focus();
    formFeedback.textContent = "Periksa kembali kolom yang ditandai sebelum melanjutkan.";
    formFeedback.classList.remove("is-success");
    return;
  }
  if (validity.every(Boolean)) {
    contactForm.reset();
    formFields.forEach((field) => {
      field.classList.remove("is-valid");
      field.removeAttribute("aria-invalid");
    });
    formFeedback.textContent = "Formulir berhasil divalidasi, tetapi pengiriman pesan belum terhubung ke server.";
    formFeedback.classList.add("is-success");
  }
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
renderTeam();
observeReveals();
document.querySelectorAll("[data-count]").forEach((counter) => counterObserver.observe(counter));
