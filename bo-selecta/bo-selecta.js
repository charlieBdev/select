console.log("Hello, World! This is bo-selecta js file.");

function initBBMultiSelect(elementId) {
  const select = document.getElementById(elementId);
  if (!select) return;

  const container = document.createElement("div");
  container.className = "bb-multi-select-container";
  const uniqueAnchor = `--ms-anchor-${elementId}`;
  const popoverId = `ms-popover-${elementId}`;

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "ms-trigger form-select";
  trigger.setAttribute("popovertarget", popoverId);
  trigger.style.setProperty("--ms-anchor-name", uniqueAnchor);
  trigger.innerHTML = `<span class="ms-placeholder text-muted">Select options...</span><div class="ms-chips"></div>`;

  const clearBtn = document.createElement("span");
  clearBtn.className = "ms-clear-trigger";
  clearBtn.setAttribute("data-bs-toggle", "tooltip");
  clearBtn.title = "Clear All";

  const popover = document.createElement("div");
  popover.id = popoverId;
  popover.setAttribute("popover", "");
  popover.className = "ms-dropdown";
  popover.style.setProperty("--ms-anchor-name", uniqueAnchor);

  const optionsWrapper = document.createElement("div");
  optionsWrapper.className = "ms-options d-flex flex-column";

  const createRow = (opt, wrapper) => {
    if (!opt.value) return;
    const label = document.createElement("label");
    label.className = "form-check";
    label.innerHTML = `<input class="form-check-input" type="checkbox" value="${opt.value}" ${opt.selected ? 'checked' : ''}><span class="form-check-label">${opt.text}</span>`;
    wrapper.appendChild(label);
  };

  Array.from(select.children).forEach(child => {
    if (child.tagName === "OPTGROUP") {
      const gLabel = document.createElement("div");
      gLabel.className = "ms-optgroup-label";
      gLabel.textContent = child.label;
      optionsWrapper.appendChild(gLabel);
      Array.from(child.children).forEach(opt => createRow(opt, optionsWrapper));
    } else createRow(child, optionsWrapper);
  });

  popover.innerHTML = `<div class="ms-search-wrapper"><input type="search" class="form-control form-control-sm" placeholder="Search..."></div>`;
  popover.appendChild(optionsWrapper);
  
  select.parentNode.insertBefore(container, select);
  [trigger, clearBtn, popover, select].forEach(el => container.appendChild(el));

  const updateUI = () => {
    const checked = optionsWrapper.querySelectorAll("input:checked");
    const chips = container.querySelector(".ms-chips");
    chips.innerHTML = "";
    
    Array.from(select.options).forEach(opt => opt.selected = false);
    clearBtn.style.display = checked.length ? "block" : "none";

    checked.forEach(cb => {
      const opt = select.querySelector(`option[value="${cb.value}"]`);
      if (!opt) return;
      opt.selected = true;
      const chip = document.createElement("span");
      chip.className = "badge ms-chip";
      chip.innerHTML = `<span class="ms-chip-text">${opt.text}</span><button type="button" class="ms-remove-chip">&times;</button>`;
      chip.querySelector("button").onclick = (e) => { e.preventDefault(); cb.checked = false; updateUI(); };
      chips.appendChild(chip);
    });

    container.querySelector(".ms-placeholder").classList.toggle("d-none", checked.length > 0);
    setTooltips();
  };

  clearBtn.onclick = (e) => { e.preventDefault(); optionsWrapper.querySelectorAll("input").forEach(i => i.checked = false); updateUI(); };
  popover.querySelector("input").oninput = (e) => {
    const val = e.target.value.toLowerCase();
    optionsWrapper.querySelectorAll(".form-check").forEach(l => l.classList.toggle("d-none", !l.textContent.toLowerCase().includes(val)));
  };

  optionsWrapper.onchange = updateUI;
  popover.onclick = e => e.stopPropagation();
  updateUI();
}