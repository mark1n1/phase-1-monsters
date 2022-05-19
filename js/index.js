// Default link to GET
// http://localhost:3000/monsters/?_limit=50&_page=1
document.addEventListener('DOMContentLoaded', () => {
	const monsterContainerDiv = document.getElementById('monster-container');
	let currentPage = 1;

	fetchMonsters(currentPage);

	const backButton = document.getElementById('back');
	const forwardButton = document.getElementById('forward');
	const createMonsterButton = document.getElementById('monster-form');

	backButton.addEventListener('click', () => {
		if(--currentPage === 0) {
			alert('No previous monsters to show');
			currentPage = 1;
		}
		else {
			removePreviousPage();
			fetchMonsters(--currentPage)
		}
	});

	forwardButton.addEventListener('click', () => {
		removePreviousPage();
		fetchMonsters(++currentPage)
	});

	createMonsterButton.addEventListener('submit', (event) => {
		event.preventDefault();
		const newMonsterName = event.target.name.value;
		const newMonsterAge = event.target.age.value;
		const newMonsterDescription = event.target.description.value;

		createMonster(newMonsterName, newMonsterAge, newMonsterDescription);
	});

	function showMonster(monster) {
		const div = document.createElement('div');
		const h2 = document.createElement('h2');
		const h4 = document.createElement('h4');
		const p = document.createElement('p');

		h2.innerHTML = `${monster.name}`;
		h4.innerHTML = `Age: ${monster.age}`;

		p.innerHTML = `Bio: ${monster.description}`;

		div.appendChild(h2);
		div.appendChild(h4);
		div.appendChild(p);
		monsterContainerDiv.appendChild(div);
	}

	function createMonster(name, age, description) {
		const configurationObject = {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({
				name: name,
				age: age,
				description: description
			})
		}

		fetch('http://localhost:3000/monsters', configurationObject);
	}

	function fetchMonsters(page) {
		fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
			.then(response => response.json())
			.then(monsters => {
				monsters.forEach(monster => {
					showMonster(monster);
				})
			});
	}

	function removePreviousPage() {
		while(monsterContainerDiv.firstChild) {
			monsterContainerDiv.removeChild(monsterContainerDiv.firstChild);
		}
	}
});