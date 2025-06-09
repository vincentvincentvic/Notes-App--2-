// components/header-component.js
class HeaderComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <h1>Aplikasi Catatan</h1>
        <p>Simpan semua ide dan informasi penting Anda dalam satu tempat</p>
      </header>
    `;
  }
}

customElements.define("header-component", HeaderComponent);
