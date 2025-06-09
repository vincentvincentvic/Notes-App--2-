// components/header-component.js
class HeaderComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <h1>Aplikasi Catatan</h1>
        <p>Simpan ide dan informasi penting Anda</p>
      </header>
    `;
  }
}

customElements.define("header-component", HeaderComponent);
