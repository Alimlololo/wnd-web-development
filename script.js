const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.08,
    rootMargin: "0px 0px -6% 0px",
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const zoomableImages = document.querySelectorAll(".zoomable-image");
const imageModal = document.getElementById("image-modal");
const modalImage = document.querySelector(".image-modal-content");
const modalClose = document.querySelector(".image-modal-close");

if (imageModal && modalImage && modalClose && zoomableImages.length) {
  const closeModal = () => {
    imageModal.classList.remove("open");
    imageModal.setAttribute("aria-hidden", "true");
    modalImage.setAttribute("src", "");
    document.body.style.overflow = "";
  };

  zoomableImages.forEach((img) => {
    img.addEventListener("click", () => {
      modalImage.setAttribute("src", img.getAttribute("src") || "");
      modalImage.setAttribute("alt", img.getAttribute("alt") || "Увеличенное изображение");
      imageModal.classList.add("open");
      imageModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  modalClose.addEventListener("click", closeModal);

  imageModal.addEventListener("click", (event) => {
    if (event.target === imageModal) {
      closeModal();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && imageModal.classList.contains("open")) {
      closeModal();
    }
  });
}
