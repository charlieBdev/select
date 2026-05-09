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
  const body = document.body;
  if (body.getAttribute("data-bs-theme") === "dark") {
    body.setAttribute("data-bs-theme", "light");
  } else {
    body.setAttribute("data-bs-theme", "dark");
  }
});