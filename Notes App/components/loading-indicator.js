// components/loading-indicator.js
class LoadingIndicator extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      this._render();
      this._setupEventListeners();
    }
  
    _render() {
      this.shadowRoot.innerHTML = `
        <style>
          .overlay {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.4);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            visibility: hidden;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
  
          .overlay.show {
            visibility: visible;
            opacity: 1;
          }
  
          .spinner {
            width: 60px;
            height: 60px;
            border: 6px solid #ddd;
            border-top-color: #2196f3;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            background: white;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
          }
  
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        </style>
  
        <div class="overlay" id="overlay">
          <div class="spinner"></div>
        </div>
      `;
    }
  
    _setupEventListeners() {
      const overlay = this.shadowRoot.querySelector("#overlay");
  
      document.addEventListener("loading-start", () => {
        overlay.classList.add("show");
      });
  
      document.addEventListener("loading-end", () => {
        overlay.classList.remove("show");
      });
    }
  }
  
  customElements.define("loading-indicator", LoadingIndicator);
  