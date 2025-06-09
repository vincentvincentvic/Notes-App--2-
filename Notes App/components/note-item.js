// components/note-item.js
class NoteItem extends HTMLElement {
  constructor() {
    super();
    this._id = "";
    this._title = "";
    this._body = "";
    this._createdAt = "";
  }

  static get observedAttributes() {
    return ["id", "title", "body", "created-at"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "id":
          this._id = newValue;
          break;
        case "title":
          this._title = newValue;
          break;
        case "body":
          this._body = newValue;
          break;
        case "created-at":
          this._createdAt = newValue;
          break;
      }
      // Re-render ketika atribut berubah
      if (this.isConnected) {
        this._render();
      }
    }
  }

  connectedCallback() {
    this._render();
    this._attachEventListeners();
  }

  _render() {
    const formattedDate = new Date(this._createdAt).toLocaleDateString(
      "id-ID",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    this.innerHTML = `
        <div class="note-card">
          <h3>${this._title}</h3>
          <div class="note-created">${formattedDate}</div>
          <div class="note-body">${this._body}</div>
          <div class="note-actions">
            <button class="note-button archive-button">Arsip</button>
            <button class="note-button delete-button">Hapus</button>
          </div>
        </div>
      `;
  }

  _attachEventListeners() {
    const archiveButton = this.querySelector(".archive-button");
    const deleteButton = this.querySelector(".delete-button");

    if (archiveButton) {
      archiveButton.addEventListener("click", () => {
        window.notesData.toggleArchiveNote(this._id);
      });
    }

    if (deleteButton) {
      deleteButton.addEventListener("click", () => {
        if (confirm("Apakah Anda yakin ingin menghapus catatan ini?")) {
          window.notesData.deleteNote(this._id);
        }
      });
    }
  }
}

customElements.define("note-item", NoteItem);
