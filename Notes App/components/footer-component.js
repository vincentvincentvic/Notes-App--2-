// components/footer-component.js
class FooterComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <footer>
          <p>&copy; ${new Date().getFullYear()} Aplikasi Catatan </p>
        </footer>
      `;
  }
}

customElements.define("footer-component", FooterComponent);
