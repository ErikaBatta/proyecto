const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentIndex = 0;
let intervalId;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

function startAutoSlide() {
  intervalId = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
  clearInterval(intervalId);
}

nextBtn.addEventListener("click", () => {
  nextSlide();
  stopAutoSlide();
  startAutoSlide();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  stopAutoSlide();
  startAutoSlide();
});

startAutoSlide();