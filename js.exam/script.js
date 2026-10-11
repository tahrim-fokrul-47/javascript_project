
let tasks = [
    {
        title: "Practice JavaScript",
        subject: "Web Development",
        priority: "High",
        completed: false
    }
];

let currentFilter = 'all';


const taskForm = document.getElementById('task-form');
const tasksContainer = document.getElementById('tasks-container');
const filterButtons = document.querySelectorAll('.btn-filter');

const statTotal = document.getElementById('stat-total');
const statCompleted = document.getElementById('stat-completed');
const statPending = document.getElementById('stat-pending');

const liveDateEl = document.getElementById('live-date');
const liveTimeEl = document.getElementById('live-time');
const themeToggleBtn = document.getElementById('theme-toggle');


function updateClock() {
    const now = new Date();
    

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    liveDateEl.textContent = now.toLocaleDateString('en-GB', options);
    
    liveTimeEl.textContent = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
}

setInterval(updateClock, 1000);
updateClock(); 


function renderTasks() {
    tasksContainer.innerHTML = '';

    
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'completed') return task.completed;
        if (currentFilter === 'pending') return !task.completed;
        return true; 
    });

    
    filteredTasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.className = `task-card priority-${task.priority} ${task.completed ? 'completed' : ''}`;
        
        taskElement.innerHTML = `
            <div class="task-info">
                <h4 class="task-title">${task.title}</h4>
                <div class="task-meta">
                    <span><strong>Subject:</strong> ${task.subject}</span>
                    <span><strong>Priority:</strong> <span class="badge ${task.priority}">${task.priority}</span></span>
                    <span><strong>Status:</strong> ${task.completed ? '✅ Completed' : '⏳ Pending'}</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="action-btn btn-complete" onclick="toggleComplete(${index})" ${task.completed ? 'disabled' : ''}>
                    ${task.completed ? 'Done' : 'Complete'}
                </button>
                <button class="action-btn btn-delete" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        tasksContainer.appendChild(taskElement);
    });

    updateCounters();
}


function updateCounters() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    statTotal.textContent = total;
    statCompleted.textContent = completed;
    statPending.textContent = pending;
}


taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('task-title').value.trim();
    const subject = document.getElementById('task-subject').value.trim();
    const priority = document.getElementById('task-priority').value;


    tasks.push({
        title,
        subject,
        priority,
        completed: false
    });

    taskForm.reset();
    renderTasks();
});


window.toggleComplete = function(index) {
    
    tasks[index].completed = true;
    renderTasks();
};


window.deleteTask = function(index) {
    tasks.splice(index, 1);
    renderTasks();
};

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        currentFilter = button.getAttribute('data-filter');
        renderTasks();
    });
});


themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.body.removeAttribute('data-theme');
        themeToggleBtn.textContent = '🌙 Dark Mode';
    } else {
        document.body.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = '☀️ Light Mode';
    }
});


renderTasks();