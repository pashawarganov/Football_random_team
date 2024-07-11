let teamsData = [];
const playerNames = ['Богдан', 'Саша', 'Ваня', 'Паша'];
let additionalPlayerCount = 1;

// Load teams data from teams.json
fetch('teams.json')
    .then(response => response.json())
    .then(data => {
        teamsData = data;
        initializeTeams();
    })
    .catch(error => console.error('Error loading teams data:', error));

function initializeTeams() {
    const savedTeams = JSON.parse(localStorage.getItem('savedTeams'));
    if (savedTeams) {
        loadTeams();
    } else {
        const teamsContainer = document.getElementById('teams');
        teamsContainer.innerHTML = '';
        for (let i = 0; i < 4; i++) {
            teamsContainer.innerHTML += `
                <div class="team">
                    <img class="team-icon" src="ball.png" alt="Placeholder Icon">
                    <div class="team-info">
                        <h2>Натисніть кнопку щоб обрати команди</h2>
                        <p>Ліга: N/A</p>
                    </div>
                    <div class="rating">
                        <img src="0stars.png" alt="Rating: 0">
                    </div>
                </div>
            `;
        }
    }
}

function shuffleTeams() {
    const shuffledTeams = teamsData.sort(() => 0.5 - Math.random()).slice(0, 4);
    const teamsContainer = document.getElementById('teams');
    teamsContainer.innerHTML = '';
    shuffledTeams.forEach((team, index) => {
        let playerName = playerNames[index] || `Гравець ${additionalPlayerCount++}`;
        teamsContainer.innerHTML += `
            <div class="team">
                <img class="team-icon" src="${team.icon}" alt="${team.name} Icon">
                <div class="team-info">
                    <h2>${playerName} грає ${team.name}</h2>
                    <p>Ліга: ${team.league}</p>
                </div>
                <div class="rating">
                    <img src="${team.ratingico}" alt="Rating: ${team.rating}">
                </div>
            </div>
        `;
    });
}

function saveTeams() {
    const currentTeams = document.querySelectorAll('.team');
    const savedTeams = [];
    currentTeams.forEach(team => {
        const teamName = team.querySelector('.team-info h2').innerText.split(' грає ')[1];
        const teamData = teamsData.find(t => t.name === teamName);
        savedTeams.push(teamData);
    });
    localStorage.setItem('savedTeams', JSON.stringify(savedTeams));
}

function loadTeams() {
    const savedTeams = JSON.parse(localStorage.getItem('savedTeams'));
    if (savedTeams) {
        const teamsContainer = document.getElementById('teams');
        teamsContainer.innerHTML = '';
        savedTeams.forEach((team, index) => {
            let playerName = playerNames[index] || `Гравець ${additionalPlayerCount++}`;
            teamsContainer.innerHTML += `
                <div class="team">
                    <img class="team-icon" src="${team.icon}" alt="${team.name} Icon">
                    <div class="team-info">
                        <h2>${playerName} грає ${team.name}</h2>
                        <p>Ліга: ${team.league}</p>
                    </div>
                    <div class="rating">
                        <img src="${team.ratingico}" alt="Rating: ${team.rating}">
                    </div>
                </div>
            `;
        });
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    document.querySelectorAll('.container, button, .team-placeholder').forEach(element => {
        element.classList.toggle('dark-mode');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeTeams();
});
