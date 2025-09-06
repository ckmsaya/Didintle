const body = document.body;

const themeToggle = document.getElementById('themeToggle');
const gallery = document.getElementById('gallery');
const editImages = document.getElementById('editImages');
const saveNote = document.getElementById('saveNote');
const notesList = document.getElementById('notesList');
const downloadBtn = document.getElementById('downloadBtn');

// Theme toggle
themeToggle.addEventListener('click', () => {
  const current = body.getAttribute('data-theme') || 'light';
  body.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
});

// Image swap (kept as-is, optional)
if (editImages) {
  editImages.addEventListener('click', () => {
    const samples = [
      'https://picsum.photos/seed/143a/800/600',
      'https://picsum.photos/seed/143b/800/600',
      'https://picsum.photos/seed/143c/800/600'
    ];
    const imgs = gallery.querySelectorAll('img');
    imgs.forEach((img, i) => img.src = samples[i]);
  });
}

// Download button (kept as-is)
if (downloadBtn) {
  downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const html = '<!doctype html>' + document.documentElement.outerHTML;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '143-index.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });
}

// ---------- FIXED NOTE SAVE FUNCTIONALITY ----------

// Load saved notes from localStorage on page load
const savedNotes = JSON.parse(localStorage.getItem("loveNotes") || "[]");
savedNotes.forEach(noteText => {
  const div = document.createElement("div");
  div.style.padding = "10px";
  div.style.borderRadius = "8px";
  div.style.marginBottom = "8px";
  div.style.background = "linear-gradient(180deg, rgba(255,255,255,0.5), transparent)";
  div.textContent = noteText;
  notesList.prepend(div);
});

// Save note
saveNote.addEventListener("click", () => {
  const noteText = document.getElementById("note").value.trim();
  if (!noteText) return alert("Write something first :)");

  // Add note to the list
  const div = document.createElement("div");
  div.style.padding = "10px";
  div.style.borderRadius = "8px";
  div.style.marginBottom = "8px";
  div.style.background = "linear-gradient(180deg, rgba(255,255,255,0.5), transparent)";
  div.textContent = noteText;
  notesList.prepend(div);

  // Save note to localStorage
  savedNotes.push(noteText);
  localStorage.setItem("loveNotes", JSON.stringify(savedNotes));

  // Clear input
  document.getElementById("note").value = "";
});
