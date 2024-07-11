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
                        <h2 class="${document.body.classList.contains('dark-mode') ? 'dark-mode' : ''}">Натисніть кнопку щоб обрати команди</h2>
                        <p class="${document.body.classList.contains('dark-mode') ? 'dark-mode' : ''}">Ліга</p>
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
    const ratingFilter = document.getElementById('rating-filter').value;
    const selectedLeagues = Array.from(document.querySelectorAll('input[name="league"]:checked')).map(checkbox => checkbox.value);
    // const mode = document.querySelector('input[name="mode"]:checked').value;

    let filteredTeams = teamsData.filter(team => parseFloat(team.rating) >= ratingFilter);
    if (selectedLeagues.length > 0) {
        filteredTeams = filteredTeams.filter(team => selectedLeagues.includes(team.league));
    }

    let shuffledTeams = filteredTeams.sort(() => 0.5 - Math.random()).slice(0, 4);
    // if (mode === 'real') {
    //     const highRatedTeams = filteredTeams.filter(team => parseFloat(team.rating) >= 4.5).slice(0, 2);
    //     const lowRatedTeams = filteredTeams.filter(team => parseFloat(team.rating) < 4.5).slice(0, 2);
    //     shuffledTeams = [...highRatedTeams, ...lowRatedTeams];
    // } else {
    //     shuffledTeams = filteredTeams.sort(() => 0.5 - Math.random()).slice(0, 4);
    // }

    const teamsContainer = document.getElementById('teams');
    teamsContainer.innerHTML = '';
    shuffledTeams.forEach((team, index) => {
        let playerName = playerNames[index] || `Гравець ${additionalPlayerCount++}`;
        teamsContainer.innerHTML += `
            <div class="team">
                <img class="team-icon" src="${team.icon}" alt="${team.name} Icon">
                <div class="team-info">
                    <h2 class="${document.body.classList.contains('dark-mode') ? 'dark-mode' : ''}">${playerName} грає ${team.name}</h2>
                    <p class="${document.body.classList.contains('dark-mode') ? 'dark-mode' : ''}">${team.league}</p>
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
                        <h2 class="${document.body.classList.contains('dark-mode') ? 'dark-mode' : ''}">${playerName} грає ${team.name}</h2>
                        <p class="${document.body.classList.contains('dark-mode') ? 'dark-mode' : ''}">${team.league}</p>
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
    document.querySelectorAll('.container, button, .team-placeholder, .team-info h2, .team-info p, label, h1').forEach(element => {
        element.classList.toggle('dark-mode');
    });

    const themeIcon = document.getElementById('theme-toggle-icon');
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.src = 'light_mode_icon.png';
    } else {
        themeIcon.src = 'dark_mode_icon.png';
    }
}

function updateRatingValue() {
    document.getElementById('rating-value').innerText = document.getElementById('rating-filter').value;
}

document.addEventListener('DOMContentLoaded', () => {
    initializeTeams();
});
