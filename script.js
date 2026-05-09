console.log("Hello, World! This is script.js file.");

const setTooltips = () => {
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    const t = bootstrap.Tooltip.getInstance(el);
    if (t) t.dispose();
    new bootstrap.Tooltip(el, { trigger: 'hover', boundary: 'clippingParents' });
  });
};

initBBMultiSelect("pets-select");
initBBMultiSelect("flavours-select");

document.querySelectorAll("form").forEach(f => f.onsubmit = e => {
  e.preventDefault();
  console.log(f.id, Object.fromEntries(new FormData(e.target).entries()));
});

// add a click to demo-heading that will change bs-theme to dark and light
document.querySelector(".demo-heading").addEventListener("click", () => {
  const themeContainer = document.querySelector("[data-bs-theme]");
  if (themeContainer.getAttribute("data-bs-theme") === "dark") {
    themeContainer.setAttribute("data-bs-theme", "light");
  } else {
    themeContainer.setAttribute("data-bs-theme", "dark");
  }
});