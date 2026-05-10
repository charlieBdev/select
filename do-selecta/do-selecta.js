/**
 * @param {string} elementId 
 * @param {object} options 
 */
function doSelecta(elementId, options = {}) {
  const select = document.getElementById(elementId);
  if (!select) return;

  const {
    placeholder = "Choose options...",
    tooltipsFunction = null,
    showSearch = true,
    maxOptions = null
  } = options;

  const isMultiple = select.hasAttribute("multiple");
  
  if (!isMultiple) {
    const hasExplicitSelection = Array.from(select.options).some(opt => opt.hasAttribute('selected'));
    if (!hasExplicitSelection) {
      select.selectedIndex = -1;
    }
  }

  const container = document.createElement("div");
  container.className = "do-selecta-container";
  
  const uniqueAnchor = `--ds-anchor-${elementId}`;
  const popoverId = `ds-popover-${elementId}`;

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "ds-trigger form-select";
  trigger.setAttribute("popovertarget", popoverId);
  trigger.style.setProperty("--ds-anchor-name", uniqueAnchor);
  trigger.innerHTML = `<span class="ds-placeholder text-muted">${placeholder}</span><div class="ds-chips"></div>`;

  const clearBtn = document.createElement("span");
  clearBtn.className = "ds-clear-trigger";
  clearBtn.title = isMultiple ? "Clear All" : "Clear";

  const popover = document.createElement("div");
  popover.id = popoverId;
  popover.setAttribute("popover", "");
  popover.className = "ds-dropdown";
  popover.style.setProperty("--ds-anchor-name", uniqueAnchor);

  if (showSearch) {
    const searchWrapper = document.createElement("div");
    searchWrapper.className = "ds-search-wrapper";
    searchWrapper.innerHTML = `<input type="search" class="form-control form-control-sm" placeholder="Search...">`;
    
    searchWrapper.querySelector("input").oninput = (e) => {
      const val = e.target.value.toLowerCase();
      optionsWrapper.querySelectorAll(".form-check").forEach(l => {
        l.classList.toggle("d-none", !l.textContent.toLowerCase().includes(val));
      });
    };
    popover.appendChild(searchWrapper);
  }

  const optionsWrapper = document.createElement("div");
  optionsWrapper.className = "ds-options d-flex flex-column";

  const createRow = (opt, wrapper) => {
    if (!opt.value) return;
    const label = document.createElement("label");
    label.className = "form-check";
    const inputType = isMultiple ? 'checkbox' : 'radio';
    
    // Nameless inputs prevent duplicate keys in FormData
    label.innerHTML = `
      <input class="form-check-input" type="${inputType}" 
             value="${opt.value}" ${opt.selected ? 'checked' : ''}>
      <span class="form-check-label">${opt.text}</span>`;
    wrapper.appendChild(label);
  };

  Array.from(select.children).forEach(child => {
    if (child.tagName === "OPTGROUP") {
      const gLabel = document.createElement("div");
      gLabel.className = "ds-optgroup-label";
      gLabel.textContent = child.label;
      optionsWrapper.appendChild(gLabel);
      Array.from(child.children).forEach(opt => createRow(opt, optionsWrapper));
    } else createRow(child, optionsWrapper);
  });

  popover.appendChild(optionsWrapper);
  select.parentNode.insertBefore(container, select);
  [trigger, clearBtn, popover, select].forEach(el => container.appendChild(el));

  const enforceLimits = () => {
    if (!isMultiple || !maxOptions) return;
    const allInputs = optionsWrapper.querySelectorAll("input");
    const checkedInputs = optionsWrapper.querySelectorAll("input:checked");
    
    allInputs.forEach(input => {
      if (!input.checked) input.disabled = checkedInputs.length >= maxOptions;
    });
  };

  const updateUI = () => {
    const checkedInputs = optionsWrapper.querySelectorAll("input:checked");
    const chips = container.querySelector(".ds-chips");
    chips.innerHTML = "";
    
    // SYNC START: Reset the hidden select options
    Array.from(select.options).forEach(opt => opt.selected = false);
    
    clearBtn.style.display = checkedInputs.length ? "block" : "none";

    checkedInputs.forEach(cb => {
      const opt = select.querySelector(`option[value="${cb.value}"]`);
      if (opt) {
        opt.selected = true; // Sync custom UI -> Hidden Select
        
        const chip = document.createElement("span");
        chip.className = "badge ds-chip";
        chip.innerHTML = `
          <span class="ds-chip-text">${opt.text}</span>
          <button type="button" class="ds-remove-chip" aria-label="Remove">&times;</button>
        `;
        
        chip.querySelector("button").onclick = (e) => { 
          e.preventDefault(); 
          e.stopPropagation();
          cb.checked = false; 
          updateUI(); 
        };
        chips.appendChild(chip);
      }
    });

    container.querySelector(".ds-placeholder").classList.toggle("d-none", checkedInputs.length > 0);
    enforceLimits();
    
    // Crucial: Manually trigger change event so the Form knows data moved
    select.dispatchEvent(new Event('change', { bubbles: true }));

    if (typeof tooltipsFunction === "function") tooltipsFunction();
  };

  clearBtn.onclick = (e) => { 
    e.preventDefault(); 
    optionsWrapper.querySelectorAll("input").forEach(i => i.checked = false); 
    updateUI(); 
  };

  optionsWrapper.onchange = (e) => {
    if (!isMultiple) {
      // In single mode, uncheck others manually to simulate radio behavior
      optionsWrapper.querySelectorAll("input").forEach(i => {
        if (i !== e.target) i.checked = false;
      });
      popover.hidePopover();
    }
    updateUI();
  };

  popover.onclick = e => e.stopPropagation();
  updateUI();
}