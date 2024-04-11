document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const dueDateInput = document.getElementById('dueDateInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const searchInput = document.getElementById('searchInput');
    const sortBtn = document.getElementById('sortBtn');
    const taskList = document.getElementById('taskList');
    let taskId = 0;
    let existingTasks = new Set(); // Set to store existing task texts

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    searchInput.addEventListener('input', searchTasks);

    sortBtn.addEventListener('click', sortTasks);

    function addTask() {
        const taskText = taskInput.value.trim();
        const priority = prioritySelect.value;
        const dueDate = dueDateInput.value;

        if (taskText !== '') {
            // Check if the task text already exists
            if (!existingTasks.has(taskText)) {
                taskId++;
                const listItem = document.createElement('li');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'checkbox';
                const taskSpan = document.createElement('span');
                taskSpan.textContent = taskText;
                taskSpan.className = 'task-span'; // Add a class to identify task text
                const taskNumberSpan = document.createElement('span');
                taskNumberSpan.textContent = taskId + '.';
                taskNumberSpan.className = 'task-number';
                const prioritySpan = document.createElement('span');
                prioritySpan.textContent = '(' + priority + ')';
                prioritySpan.className = 'task-priority';
                const dueDateSpan = document.createElement('span');
                dueDateSpan.textContent = ' Due: ' + dueDate;
                dueDateSpan.className = 'task-due-date';
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.className = 'delete-btn';
                listItem.appendChild(taskNumberSpan);
                listItem.appendChild(checkbox);
                listItem.appendChild(prioritySpan);
                listItem.appendChild(taskSpan);
                listItem.appendChild(dueDateSpan);
                listItem.appendChild(deleteBtn);
                taskList.appendChild(listItem);

                checkbox.addEventListener('change', function() {
                    if (checkbox.checked) {
                        taskSpan.style.textDecoration = 'line-through';
                        listItem.style.backgroundColor = 'lightgreen';
                    } else {
                        taskSpan.style.textDecoration = 'none';
                        listItem.style.backgroundColor = '';
                    }
                });

                deleteBtn.addEventListener('click', function() {
                    taskList.removeChild(listItem);
                    existingTasks.delete(taskText); // Remove task text from the set
                });

                // Add the task text to the set
                existingTasks.add(taskText);

                taskInput.value = '';
                dueDateInput.value = '';
            } else {
                alert('Task already exists!');
            }
        } else {
            alert('Please enter a task.');
        }
    }

    function searchTasks() {
        const searchText = searchInput.value.toLowerCase();
        const tasks = Array.from(taskList.children);

        tasks.forEach(task => {
            const taskText = task.querySelector('.task-span').textContent.toLowerCase();
            if (taskText.includes(searchText)) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
    }

    function sortTasks() {
        const tasks = Array.from(taskList.children);
    
        tasks.sort((a, b) => {
            const priorityA = a.querySelector('.task-priority').textContent.trim().toLowerCase();
            const priorityB = b.querySelector('.task-priority').textContent.trim().toLowerCase();
    
            if (priorityA < priorityB) {
                return -1;
            }
            if (priorityA > priorityB) {
                return 1;
            }
            return 0;
        });
    
        // Remove existing tasks from the task list
        taskList.innerHTML = '';
    
        // Append sorted tasks to the task list
        tasks.forEach(task => {
            taskList.appendChild(task);
        });
    }
    
    
    
    
});
