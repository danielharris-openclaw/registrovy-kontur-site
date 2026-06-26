const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll("a[href^='#']").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks?.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

// TODO (перед запуском): подключить реальную отправку заявки на email / Telegram / CRM.
// Сейчас обработчик только показывает подтверждение в интерфейсе и НЕ отправляет данные.
document.querySelectorAll("[data-lead-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const botField = form.querySelector("input[name='website']");
    if (botField && botField.value) return;

    const status = form.querySelector(".form-status");
    const data = new FormData(form);
    const name = data.get("name") || "Спасибо";

    if (status) {
      status.textContent = `${name}, спасибо! Заявка принята — мы свяжемся с вами по указанным контактам.`;
      status.classList.add("visible");
    }

    form.reset();
  });
});


// Визуальное улучшение: мягкое появление блоков при прокрутке.
// Не влияет на форму и меню; при отключённом JS всё видно по умолчанию.
(function () {
  if (!("IntersectionObserver" in window)) return;

  const targets = document.querySelectorAll(
    ".section-head, .card, .price-card, .process-step, .metric, .media-panel, .check-list li, .hero-note"
  );
  if (!targets.length) return;

  document.documentElement.classList.add("js-reveal");

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  targets.forEach((el) => el.classList.add("reveal"));

  if (reduce) {
    targets.forEach((el) => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  targets.forEach((el, i) => {
    el.style.transitionDelay = (i % 6) * 45 + "ms";
    io.observe(el);
  });
})();
