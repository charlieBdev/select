  const setTooltips = () => {
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    const t = bootstrap.Tooltip.getInstance(el);
    if (t) t.dispose();
    new bootstrap.Tooltip(el, { trigger: 'hover', boundary: 'clippingParents' });
  });
};

doSelecta("apes-select", { placeholder: "Select an ape...", tooltipsFunction: setTooltips, showSearch: false });
doSelecta("pets-select", { placeholder: "Select your pets...", tooltipsFunction: setTooltips });
doSelecta("flavours-select", { placeholder: "Select up to 2 flavours...", tooltipsFunction: setTooltips, maxOptions: 2 });

document.querySelectorAll("form").forEach(f => f.onsubmit = e => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  
  // This logs exactly what the browser 'sees' before sending to a server
  console.log(`${f.id} Payload:`, [...formData.entries()]);
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