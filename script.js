const workoutData = [
    {
        day: "Segunda-feira",
        workout: "Descanso ou Fortalecimento",
        description: "Musculação para pernas e core",
        completed: false
    },
    {
        day: "Terça-feira",
        workout: "Corrida + Transição Bike",
        description: "5 km moderado + 15-20 km de bike",
        completed: false
    },
    {
        day: "Quarta-feira",
        workout: "Intervalado na Corrida ou Bike Forte",
        description: "6 a 8 tiros de 400m a 1 km OU 30-40 min de bike intensa",
        completed: false
    },
    {
        day: "Quinta-feira",
        workout: "Bike leve + Força",
        description: "20-30 km em ritmo moderado + treino de força",
        completed: false
    },
    {
        day: "Sexta-feira",
        workout: "Corrida Progressiva",
        description: "5 a 8 km aumentando o ritmo a cada km",
        completed: false
    },
    {
        day: "Sábado",
        workout: "Longão ou Simulado Duathlon",
        description: "10-15 km de corrida OU 5 km corrida + 25-30 km bike + 2,5 km corrida",
        completed: false
    },
    {
        day: "Domingo",
        workout: "Pedal Longo",
        description: "40-50 km em ritmo confortável",
        completed: false
    }
];

function renderWorkouts() {
    const tbody = document.getElementById('workout-body');
    tbody.innerHTML = '';

    workoutData.forEach((workout, index) => {
        const row = document.createElement('tr');
        row.className = `workout-row border-b ${workout.completed ? 'completed-workout' : 'pending-workout'}`;
        row.innerHTML = `
            <td class="px-4 py-3 table-cell-content">${workout.day}</td>
            <td class="px-4 py-3 table-cell-content">${workout.workout}</td>
            <td class="px-4 py-3 table-cell-content">${workout.description}</td>
            <td class="px-4 py-3">
                <div class="status-badge ${workout.completed ? 'status-done' : 'status-pending'}"
                     onclick="toggleWorkout(${index})">
                    ${workout.completed ? 
                      '<span>FEITO <i class="fas fa-check ml-1"></i></span>' : 
                      '<span>PENDENTE <i class="fas fa-times ml-1"></i></span>'}
                </div>
            </td>
            <td class="px-4 py-3">
                <button onclick="editWorkout(${index})" class="edit-btn bg-blue-500 text-white px-3 py-1 rounded">
                    Editar
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    saveToLocalStorage();
}

function toggleWorkout(index) {
    const row = document.querySelectorAll('.workout-row')[index];
    const newStatus = !workoutData[index].completed;
    
    // Remove animações anteriores
    row.classList.remove('animate-complete', 'animate-pending');
    
    // Força um reflow para reiniciar a animação
    void row.offsetWidth;
    
    // Adiciona nova animação
    row.classList.add(newStatus ? 'animate-complete' : 'animate-pending');
    
    // Atualiza o status
    workoutData[index].completed = newStatus;
    renderWorkouts();
}

function saveToLocalStorage() {
    localStorage.setItem('workoutData', JSON.stringify(workoutData));
}

function loadFromLocalStorage() {
    const savedData = localStorage.getItem('workoutData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        workoutData.forEach((workout, index) => {
            workout.completed = parsedData[index].completed;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    renderWorkouts();
});

function editWorkout(index) {
    const workout = workoutData[index];
    document.getElementById('edit-day-index').value = index;
    document.getElementById('edit-workout').value = workout.workout;
    document.getElementById('edit-description').value = workout.description;
    document.getElementById('edit-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('edit-modal').classList.add('hidden');
}

document.getElementById('edit-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const index = document.getElementById('edit-day-index').value;
    const workout = document.getElementById('edit-workout').value;
    const description = document.getElementById('edit-description').value;

    workoutData[index].workout = workout;
    workoutData[index].description = description;

    renderWorkouts();
    closeModal();
});

renderWorkouts();