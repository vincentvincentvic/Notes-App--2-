// app.js
import "./components/footer-component.js";
import "./components/header-component.js";
import "./components/note-input-form.js";
import "./components/note-item.js";
import "./components/note-list.js";
import "./components/loading-indicator.js";

const API_BASE_URL = "https://notes-api.dicoding.dev/v2";

class NotesData {
  constructor() {
    this.notes = [];
  }

  async fetchNotes() {
    document.dispatchEvent(new Event("loading-start"));

    try {
      const response = await fetch(`${API_BASE_URL}/notes`);
      const { data } = await response.json();
      this.notes = data;
      document.dispatchEvent(new Event("data-changed"));
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      document.dispatchEvent(new Event("loading-end"));
    }
  }

  getActiveNotes() {
    return this.notes.filter((note) => !note.archived);
  }

  getArchivedNotes() {
    return this.notes.filter((note) => note.archived);
  }

  async addNote(title, body) {
    document.dispatchEvent(new Event("loading-start"));

    try {
      await fetch(`${API_BASE_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      });

      await this.fetchNotes();
    } catch (error) {
      console.error("Gagal menambahkan catatan:", error);
    } finally {
      document.dispatchEvent(new Event("loading-end"));
    }
  }

  async deleteNote(id) {
    document.dispatchEvent(new Event("loading-start"));

    try {
      await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: "DELETE",
      });

      await this.fetchNotes();
    } catch (error) {
      console.error("Gagal menghapus catatan:", error);
    } finally {
      document.dispatchEvent(new Event("loading-end"));
    }
  }

  async toggleArchiveNote(id, isArchived) {
    document.dispatchEvent(new Event("loading-start"));

    try {
      const endpoint = isArchived ? "unarchive" : "archive";
      await fetch(`${API_BASE_URL}/notes/${id}/${endpoint}`, {
        method: "POST",
      });

      await this.fetchNotes();
    } catch (error) {
      console.error("Gagal mengubah status arsip:", error);
    } finally {
      document.dispatchEvent(new Event("loading-end"));
    }
  }
}

window.notesData = new NotesData();

document.addEventListener("DOMContentLoaded", () => {
  window.notesData.fetchNotes();
});
