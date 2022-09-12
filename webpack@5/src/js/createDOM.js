import '../css/index';

function H2 () {
  const container = document.createElement('h2');
  container.innerText = 'this is h2';
  container.className = 'title title-h2';
  return container;
}

document.body.appendChild(H2());
