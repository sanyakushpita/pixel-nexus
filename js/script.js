// API-ключ
const apiKey = 'a76b9cd5ec8f47c199ee88d6a397f373'; // Заміни на свій ключ
const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&page_size=12`;

const gameList = document.getElementById('game-list');
const loadMoreButton = document
  .getElementById('load-more')
  .querySelector('button');

let currentPage = 1;

// Завантажуємо ігри з API
function loadGames() {
  console.log('Завантаження ігор...');
  fetch(`${apiUrl}&page=${currentPage}`)
    .then((response) => response.json())
    .then((data) => {
      console.log('Дані з API:', data); // Перевірка, що приходить з API
      const games = data.results; // Отримуємо список ігор

      if (games.length === 0) {
        console.log('Ігри не знайдені.');
      }

      games.forEach((game) => {
        const gameItem = document.createElement('div');
        gameItem.classList.add('game-item');
        gameItem.innerHTML = `
          <img src="${game.background_image}" alt="${game.name}" />
          <div>
            <h4>${game.name}</h4>
            <p>${game.short_description || 'Опис не доступний'}</p>
            <p>Рейтинг: ${game.metacritic || 'N/A'}</p>
            <p>Системні вимоги: ${
              game.platforms
                ? game.platforms
                    .map((platform) => platform.platform.name)
                    .join(', ')
                : 'Не зазначено'
            }</p>
          </div>
        `;
        gameList.appendChild(gameItem);
      });

      currentPage++; // Збільшуємо сторінку для наступного запиту
    })
    .catch((error) => {
      console.error('Помилка при завантаженні даних:', error);
    });
}

// Завантажуємо ігри при натисканні на кнопку
loadMoreButton.addEventListener('click', loadGames);

// Завантажуємо перші ігри при першому завантаженні сторінки
loadGames();
