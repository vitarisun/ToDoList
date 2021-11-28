'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add');
  const newTask = document.getElementById('newTask');
  const startTasks = document.getElementById('startTasks');
  const finishTasks = document.getElementById('finishTasks');

  let todoList, id;

  let data = localStorage.getItem('todo');

  if (data) {
    todoList = JSON.parse(data);
    id = id;
    displayTasks();
  } else {
    todoList = [];
    id = 0;
  }

  function SaveStorage() {
    localStorage.setItem('todo', JSON.stringify(todoList));
  }

  function newToDo() {
    let newToDo = {
      todo: newTask.value,
      id: genID(),
      checked: false,
      important: false,
      edit: false,
      delete: false,
    };
    todoList.push(newToDo);
  }

  addButton.addEventListener('click', function (e) {
    enterText();
    clearNewTask();
  });

  newTask.addEventListener('keydown' || 'click', function (e) {
    if (e.code == 'Enter' || e.code == 'NumpadEnter') {
      enterText();
      clearNewTask();
    }
  });

  function enterText() {
    if (newTask.value == '') {
      alert('Введите задачу!');
    } else {
      newToDo();
      displayTasks();
      SaveStorage();
    }
  }

  function clearNewTask() {
    setTimeout(() => {
      newTask.value = '';
    }, 200);
  }

  startTasks.addEventListener('change', function (e) {
    let idInput = e.target.getAttribute('id');
    let forLabel = startTasks.querySelector('[for=' + idInput + ']');
    let valueLabel = forLabel.textContent;

    todoList.forEach(function (item) {
      if (item.todo === valueLabel) {
        item.checked = !item.checked;
        displayTasks();
        SaveStorage();
      }
    });
  });

  finishTasks.addEventListener('change', function (e) {
    let idInputOld = e.target.getAttribute('id');
    let forlabelOld = finishTasks.querySelector('[for=' + idInputOld + ']');
    let valueOldLabel = forlabelOld.textContent;

    todoList.forEach(function (item) {
      if (item.todo === valueOldLabel) {
        item.checked = !item.checked;
        displayTasks();
        SaveStorage();
      }
    });
  });

  startTasks.addEventListener('contextmenu', function (e) {
    e.preventDefault();

    todoList.forEach(function (item) {
      if (item.todo === e.target.innerHTML) {
        item.important = !item.important;
        displayTasks();
        SaveStorage();
      }
    });
  });

  function genID() {
    return Math.floor(Math.random() * 100000);
  }

  finishTasks.addEventListener('click', function (e) {
    const element = +e.target.getAttribute('id');

    todoList.forEach(function (item, i) {
      if (item.id === element) {
        todoList.splice(i, 1);
        displayTasks();
        SaveStorage();
      }
    });
  });

  function displayTasks() {
    let displayTasks = '';

    todoList.forEach(function (item, i) {
      if (item.checked === false) {
        displayTasks += `
            <li>
            <input type = 'checkbox' id = 'item_${i}' ${
          item.checked ? 'checked' : ''
        }>
            <label for = 'item_${i}' class="${
          item.important ? 'important' : ''
        }"}>${item.todo}</label>
            </button>
            <button class="material-icons-edit">
            <i class="material-icons">edit</i>
            </button>
            </li>
            `;
      }
    });
    startTasks.innerHTML = displayTasks;

    displayTasks = '';

    todoList.forEach(function (item, i) {
      if (item.checked === true) {
        displayTasks += `
                <li>
                <input type = 'checkbox' id = 'item_${i}' ${
          item.checked ? 'checked' : ''
        }>
            <label for = 'item_${i}'>${item.todo}</label>
             <button class="material-icons-delete">
            <i type = 'button' id = ${item.id} class="material-icons">delete</i>
            </button>
            <button class="material-icons-edit">
            <i id="btnEdit"class="material-icons">edit</i>
            </button>
            </li>
                `;
      }
    });
    finishTasks.innerHTML = displayTasks;
  }
});
