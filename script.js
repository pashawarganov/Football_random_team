let teamsData = [];

function getRandomTeams(teams, count) {
    const shuffled = teams.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displayTeams(teams) {
    const teamsList = document.getElementById('teams-list');
    teamsList.innerHTML = ''; // Clear the current list
    teams.forEach((team, index) => {
        const teamElement = document.createElement('div');
        teamElement.className = 'team';
        teamElement.innerHTML = `
            <img src="${team.icon}" alt="${team.name} logo" class="team-icon">
            <div class="team-info">
                <h2>${team.name}</h2>
                <p>Гравець ${index + 1} грає за ${team.name}</p>
                <p>League: ${team.league}</p>
            </div>
            <div class="rating">
                <img src="${team.ratingico}" alt="Rating: ${team.rating}">
            </div>
        `;
        teamsList.appendChild(teamElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('teams.json')
        .then(response => response.json())
        .then(data => {
            teamsData = data;
            const randomTeams = getRandomTeams(teamsData, 4);
            displayTeams(randomTeams);
        })
        .catch(error => console.error('Error fetching the teams data:', error));
});

document.getElementById('change-teams').addEventListener('click', () => {
    const randomTeams = getRandomTeams(teamsData, 4);
    displayTeams(randomTeams);
});
