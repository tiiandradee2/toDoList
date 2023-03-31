// Selecionando elementos do DOM
const inputTask = document.getElementById('input-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Array para armazenar tarefas
let tasks = [];

// Função para recuperar as tarefas armazenadas no armazenamento local
function getTasksFromLocalStorage() {
    const tasksString = localStorage.getItem('tasks');
    if (tasksString) {
        tasks = JSON.parse(tasksString);
    }
}

// Função para salvar as tarefas no armazenamento local
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para atualizar a lista de tarefas na tela
function updateTaskList() {
    // Limpar lista de tarefas
    taskList.innerHTML = '';

    // Adicionar tarefas à lista
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.innerText = task.text;
        if (task.completed) {
            taskItem.style.textDecoration = 'line-through';
        }
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'X';
        deleteButton.addEventListener('click', () => {
            removeTask(index);
        });
        taskItem.appendChild(deleteButton);
        taskItem.addEventListener('click', () => {
            toggleCompleted(index);
        });
        taskList.appendChild(taskItem);
    });

    // Salvar as tarefas no armazenamento local
    saveTasksToLocalStorage();
}

// Função para adicionar tarefa
function addTask() {
    const taskText = inputTask.value;
    if (taskText) {
        const newTask = {
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        inputTask.value = '';
        updateTaskList();
    }
}

// Função para remover tarefa
function removeTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
}

// Função para marcar tarefa como concluída ou não concluída
function toggleCompleted(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
}

// Adicionar evento de clique no botão "Adicionar"
addTaskButton.addEventListener('click', addTask);

// Adicionar evento de pressionar a tecla Enter no input de tarefas
inputTask.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Recuperar as tarefas do armazenamento local ao carregar a página
getTasksFromLocalStorage();

// Atualizar a lista de tarefas na tela
updateTaskList();
