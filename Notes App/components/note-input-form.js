// components/note-input-form.js
class NoteInputForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this._render();
    this._attachEventListeners();
  }

  _render() {
    this.innerHTML = `
        <div class="note-form">
          <h2>Tambah Catatan Baru</h2>
          <form id="noteForm">
            <div class="form-group">
              <label for="title">Judul</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                placeholder="Masukkan judul catatan" 
                required
              >
            </div>
            <div class="form-group">
              <label for="body">Isi Catatan</label>
              <textarea 
                id="body" 
                name="body" 
                placeholder="Tuliskan isi catatan Anda" 
                required
              ></textarea>
            </div>
            <button type="submit" class="form-submit">Save</button>
          </form>
        </div>
      `;
  }

  _attachEventListeners() {
    const form = this.querySelector("#noteForm");

    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const titleInput = this.querySelector("#title");
        const bodyInput = this.querySelector("#body");

        if (titleInput && bodyInput) {
          const title = titleInput.value;
          const body = bodyInput.value;

          if (window.notesData) {
            window.notesData.addNote(title, body);
          }

          // Reset form
          form.reset();
        }
      });
    }
  }
}

customElements.define("note-input-form", NoteInputForm);
