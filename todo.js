let tasks = getTaskFromLocalStorage();
        renderTask(tasks);

        function addTask() {
            const taskInput = document.getElementById('taskInput');
            const taskName = taskInput.value.trim();

            if (taskName === "") {
                showNotification("Hãy thêm thông tin");
                return;
            }

            const newTask = { name: taskName, status: 'pending' };
            tasks.push(newTask);
            saveTasksToLocalStorage();
            renderTask(tasks);
            taskInput.value = '';
        }

        function editTask(index) {
            const newName = prompt("Nhập tên mới cho công việc", tasks[index].name);
            if (newName !== null) {
                tasks[index].name = newName;
                saveTasksToLocalStorage();
                renderTask(tasks);
                showNotification("Đã sửa thành công!");
            }
        }

        function deleteTask(index) {
            if (confirm('Bạn có muốn xóa công việc này không?')) {
                tasks.splice(index, 1);
                saveTasksToLocalStorage();
                renderTask(tasks);
            }
        }

        function toggleTaskStatus(index) {
            tasks[index].status = tasks[index].status === 'pending' ? 'completed' : 'pending';
            saveTasksToLocalStorage();
            renderTask(tasks);
        }

        function filterTasks(status) {
            if (status === 'all') {
                renderTask(tasks);
            } else if (status === 'completed') {
                renderTask(tasks.filter(task => task.status === 'completed'));
            } else if (status === 'pending') {
                renderTask(tasks.filter(task => task.status === 'pending'));
            }
        }

        function renderTask(tasks) {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';

            tasks.forEach((task, index) => {
                const taskItem = document.createElement('li');
                taskItem.className = `task-item ${task.status}`;
                taskItem.innerHTML = `
                    <button class="action-button complete-button" onclick="toggleTaskStatus(${index})">${task.status === 'completed' ? '✔' : ''}</button>
                    <span style="margin-right: 200px">${task.name}</span>
                    <div class="actions">
                        <button class="action-button edit-button" onclick="editTask(${index})"><i class="fa-solid fa-pen"></i></button>
                        <button class="action-button delete-button" onclick="deleteTask(${index})"><i class="fa-solid fa-trash-can"></i></button>
                    </div>`;
                taskList.appendChild(taskItem);
            });
        }

        function saveTasksToLocalStorage() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function getTaskFromLocalStorage() {
            return JSON.parse(localStorage.getItem('tasks')) || [];
        }

        function showNotification(message) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            setTimeout(() => {
                notification.textContent = '';
            }, 2000);
        }

