import "../font/font";
function Font() {
  const container = document.createElement("div");
  const txt = document.createElement("span");
  txt.className = "harmMediumfont icon-publish";
  txt.textContent = "ssssss";
  container.appendChild(txt);
  return container;
}

document.body.appendChild(Font());
