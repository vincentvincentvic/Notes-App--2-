// components/notes-list.js
class NotesList extends HTMLElement {
  constructor() {
    super();
    this._notes = [];
  }

  connectedCallback() {
    // Mendengarkan perubahan data
    document.addEventListener("data-changed", () => {
      this._updateNotes();
    });

    // Pastikan mendapatkan data saat komponen pertama kali dimuat
    this._updateNotes();
  }

  _updateNotes() {
    // Pastikan notesData sudah tersedia
    if (window.notesData) {
      this._notes = window.notesData.getActiveNotes();
      this._render();
    }
  }

  _render() {
    // Hapus konten sebelumnya
    this.innerHTML = "";

    // Buat container grid
    const gridContainer = document.createElement("div");
    gridContainer.className = "notes-grid";

    if (this._notes.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.textContent =
        "Tidak ada catatan tersedia. Silakan tambahkan catatan baru.";
      gridContainer.appendChild(emptyMessage);
    } else {
      // Render setiap catatan
      this._notes.forEach((note) => {
        const noteItem = document.createElement("note-item");
        noteItem.setAttribute("id", note.id);
        noteItem.setAttribute("title", this._escapeHtml(note.title));
        noteItem.setAttribute("body", this._escapeHtml(note.body));
        noteItem.setAttribute("created-at", note.createdAt);

        gridContainer.appendChild(noteItem);
      });
    }

    this.appendChild(gridContainer);
  }

  _escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

customElements.define("notes-list", NotesList);
