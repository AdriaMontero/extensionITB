document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.section-title').forEach(title => {
    title.addEventListener('click', () => {
      const sectionClass = title.getAttribute('onclick').split("'")[1];
      toggleSection(sectionClass);
    });
  });

  document.querySelectorAll('.command').forEach(command => {
    command.addEventListener('click', function() {
      copyToClipboard(this);
    });
  });
});

function toggleSection(sectionClass) {
  const commands = document.querySelectorAll(`.${sectionClass}`);
  commands.forEach(command => {
    if (command.style.display === 'none' || command.style.display === '') {
      command.style.display = 'block';
    } else {
      command.style.display = 'none';
    }
  });
}

function copyToClipboard(element) {
  const text = element.innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert('Comando copiado: ' + text);
  });
}
