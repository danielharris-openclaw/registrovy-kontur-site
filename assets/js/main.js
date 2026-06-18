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

document.querySelectorAll("[data-lead-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const botField = form.querySelector("input[name='website']");
    if (botField && botField.value) return;

    const status = form.querySelector(".form-status");
    const data = new FormData(form);
    const name = data.get("name") || "Спасибо";

    if (status) {
      status.textContent = `${name}, заявка зафиксирована в демо-форме. Для запуска нужно подключить отправку на email, Telegram или CRM.`;
      status.classList.add("visible");
    }

    form.reset();
  });
});
