const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const gallery = document.getElementById('gallery');
const editImages = document.getElementById('editImages');
const saveNote = document.getElementById('saveNote');
const notesList = document.getElementById('notesList');
const downloadBtn = document.getElementById('downloadBtn');

themeToggle.addEventListener('click', () => {
  const current = body.getAttribute('data-theme') || 'light';
  body.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
});

editImages.addEventListener('click', () => {
  const samples = [
    'https://picsum.photos/seed/143a/800/600',
    'https://picsum.photos/seed/143b/800/600',
    'https://picsum.photos/seed/143c/800/600'
  ];
  const imgs = gallery.querySelectorAll('img');
  imgs.forEach((img,i) => img.src = samples[i]);
});

saveNote.addEventListener('click', () => {
  const text = document.getElementById('note').value.trim();
  if (!text) return alert('Write something first :)');
  const div = document.createElement('div');
  div.style.padding = '10px';
  div.style.borderRadius = '8px';
  div.style.marginBottom = '8px';
  div.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.5), transparent)';
  div.textContent = text;
  notesList.prepend(div);
  document.getElementById('note').value = '';
});

downloadBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const html = '<!doctype html>' + document.documentElement.outerHTML;
  const blob = new Blob([html], {type:'text/html'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = '143-index.html';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});
// Wait until the page fully loads
document.addEventListener("DOMContentLoaded", () => {
  const noteInput = document.getElementById("note");
  const saveButton = document.getElementById("saveNote");
  const savedNote = document.getElementById("savedNote");

  // Check if a note already exists in localStorage
  const storedNote = localStorage.getItem("loveNote");
  if (storedNote) {
    savedNote.textContent = "❤️ " + storedNote;
    noteInput.value = storedNote;
  }

  // When "Save Note" button is clicked
  saveButton.addEventListener("click", () => {
    const note = noteInput.value.trim();
    if (note) {
      // Save to localStorage
      localStorage.setItem("loveNote", note);
      savedNote.textContent = "❤️ " + note;
    } else {
      savedNote.textContent = "⚠️ Please write something first!";
    }
  });
});