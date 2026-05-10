export const howToContent = /* html */ `
  <div class="card bg-body-secondary border-0 p-4 shadow-sm">
    <h4 class="mb-3">How to use Do Selecta</h4>
    <p>This component is compatible with <strong>Bootstrap 5.3.8</strong> and enhances standard select elements into searchable dropdowns.</p>
    
    <h6 class="fw-bold mt-4">1. Define your HTML Select</h6>
    <p class="text-muted">Standard select. The function handles both single and multi-select modes automatically.</p>
    
    <pre><code>&lt;<span class="token-tag">select</span> <span class="token-attr">id</span>=<span class="token-val">"pets-select"</span> <span class="token-attr">name</span>=<span class="token-val">"pets"</span> <span class="token-attr">class</span>=<span class="token-val">"d-none"</span> <span class="token-attr">multiple</span>&gt;
  &lt;<span class="token-tag">option</span> <span class="token-attr">value</span>=<span class="token-val">"dog"</span>&gt;Dog&lt;/<span class="token-tag">option</span>&gt;
  &lt;<span class="token-tag">option</span> <span class="token-attr">value</span>=<span class="token-val">"cat"</span>&gt;Cat&lt;/<span class="token-tag">option</span>&gt;
  &lt;<span class="token-tag">option</span> <span class="token-attr">value</span>=<span class="token-val">"hamster"</span>&gt;Hamster&lt;/<span class="token-tag">option</span>&gt;
&lt;/<span class="token-tag">select</span>&gt;</code></pre>

    <h6 class="fw-bold mt-4">2. Initialize via JavaScript</h6>
    <p class="text-muted">Pass the <strong>ID</strong> of your select and a configuration <strong>object</strong>.</p>

    <pre><code><span class="token-fn">doSelecta</span>(<span class="token-string">'pets-select'</span>, {
  <span class="token-attr">placeholder</span>: <span class="token-string">'Select your pets...'</span>,
  <span class="token-attr">tooltipsFunction</span>: <span class="token-fn">setTooltips</span>
});</code></pre>

    <hr class="my-4 opacity-25">

    <h6 class="fw-bold">Configuration Options</h6>
    <p class="text-muted small">Available properties for the <code>options</code> object:</p>
    
    <div class="table-responsive">
      <table class="table table-sm table-borderless align-middle small">
        <thead class="text-secondary border-bottom">
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="font-monospace text-primary">placeholder</td>
            <td><code>string</code></td>
            <td class="text-muted">"Choose options..."</td>
            <td>The text shown when nothing is selected.</td>
          </tr>
          <tr>
            <td class="font-monospace text-primary">showSearch</td>
            <td><code>boolean</code></td>
            <td class="text-muted">true</td>
            <td>Adds a sticky search bar to the dropdown.</td>
          </tr>
          <tr>
            <td class="font-monospace text-primary">maxOptions</td>
            <td><code>number</code></td>
            <td class="text-muted">null</td>
            <td>Limits selections (Multi-select only). Disables further inputs when reached.</td>
          </tr>
          <tr>
            <td class="font-monospace text-primary">tooltipsFunction</td>
            <td><code>function</code></td>
            <td class="text-muted">null</td>
            <td>Callback to re-initialize Bootstrap tooltips after UI updates. This should be your own if you have one.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
`;