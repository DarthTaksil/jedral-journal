const entryFolder = 'entries/';
let pages = [];
let currentPage = 0;

async function loadEntries() {
  let i = 1;
  while (true) {
    try {
      const response = await fetch(`${entryFolder}day${i}.txt`);
      if (!response.ok) break;  // No more files

      const text = await response.text();
      pages.push(text.trim());
      i++;
    } catch (err) {
      break;
    }
  }

  if (pages.length === 0) {
    pages = ["No entries found."];
  }

  updatePage();
}

function updatePage() {
  const pageEl = document.getElementById("page");
  pageEl.textContent = pages[currentPage] || "";

  document.getElementById("page-indicator").textContent = `Page ${currentPage + 1} of ${pages.length}`;
}

document.getElementById("prev").addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    updatePage();
  }
});

document.getElementById("next").addEventListener("click", () => {
  if (currentPage < pages.length - 1) {
    currentPage++;
    updatePage();
  }
});

window.onload = loadEntries;