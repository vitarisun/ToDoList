'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add');
    const newTask = document.getElementById('newTask');
    const startTasks = document.getElementById('startTasks');
    const finishTasks = document.getElementById('finishTasks');

    let todoList = [];

    if (localStorage.getItem('todo')) {
        todoList = JSON.parse(localStorage.getItem('todo'));
        displayTasks();
    }

    function SaveStorage() {
        localStorage.setItem('todo', JSON.stringify(todoList));
    }

    function newToDo() {
        let newToDo = {
            todo: newTask.value,
            checked: false,
            important: false,
        };
        todoList.push(newToDo);
    }

    addButton.addEventListener('click', function(e) {
        enterText();
        clearNewTask();
    });

    newTask.addEventListener('keydown' || 'click', function(e) {
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

    startTasks.addEventListener('change', function(e) {
        let idInput = e.target.getAttribute('id');

        let forLabel = startTasks.querySelector('[for=' + idInput + ']');
        let valueLabel = forLabel.textContent;

        todoList.forEach(function(item) {
            if (item.todo === valueLabel) {
                item.checked = !item.checked;

                displayTasks();
                SaveStorage();
            }
        });
    });

    startTasks.addEventListener('contextmenu', function(e) {
        console.log(e.target);
        e.preventDefault();

        todoList.forEach(function(item) {
            if (item.todo === e.target.innerHTML) {
                item.important = !item.important;
                displayTasks();
                SaveStorage();
            }
        });
    });

    // finishTasks.addEventListener('change', function(e) {
    //     let idInputOld = e.target.getAttribute('id');
    //     let forlabelOld = finishTasks.querySelector('[for=' + idInputOld + ']');

    //     let valueOldLabel = forlabelOld.textContent;

    //     todoList.forEach(function(item) {
    //         if (item.todo === valueOldLabel) {
    //             item.checked = !item.checked;

    //             displayTasks();
    //             SaveStorage();
    //         }
    //     });
    // });

    function displayTasks() {
        let displayTasks = '';

        todoList.forEach(function(item, i) {
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
            <button class="material-icons edit">
            <i class="material-icons">edit</i>
            </button>
            </li>
            `;
            }
        });
        startTasks.innerHTML = displayTasks;

        displayTasks = '';

        todoList.forEach(function(item, i) {
            if (item.checked === true) {
                displayTasks += `
                <li>
                <input type = 'checkbox' id = 'item_${i}' ${
          item.checked ? 'checked' : ''
        }>
                <label for = 'item_${i}'>${item.todo}</label>
            <button class="material-icons edit">
            <i class="material-icons">edit</i></button>
            <button class="material-icons delete">
            <i class="material-icons">delete</i></button></li>
                `;
            }
        });
        finishTasks.innerHTML = displayTasks;
    }
});