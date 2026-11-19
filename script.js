const form = document.getElementById('form');
const texto = document.getElementById('texto');
const lista = document.getElementById('lista');
const contador = document.getElementById('contador');

let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

function guardar() {
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

function mostrar() {
  lista.innerHTML = '';
  tareas.forEach((tarea, i) => {
    const li = document.createElement('li');
    if (tarea.hecha) li.classList.add('hecha');

    const span = document.createElement('span');
    span.textContent = tarea.texto;
    span.addEventListener('click', () => {
      tarea.hecha = !tarea.hecha;
      guardar();
      mostrar();
    });

    const borrar = document.createElement('button');
    borrar.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    borrar.setAttribute('aria-label', 'Eliminar');
    borrar.addEventListener('click', () => {
      tareas.splice(i, 1);
      guardar();
      mostrar();
    });

    li.append(span, borrar);
    lista.appendChild(li);
  });

  const pendientes = tareas.filter(t => !t.hecha).length;
  contador.textContent = `Pendientes: ${pendientes} de ${tareas.length}`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const valor = texto.value.trim();
  if (valor === '') return;
  tareas.push({ texto: valor, hecha: false });
  texto.value = '';
  guardar();
  mostrar();
});

mostrar();