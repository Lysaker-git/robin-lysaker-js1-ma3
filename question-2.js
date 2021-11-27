const API_URL = "https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=";
const API_KEY = "91b63fcaa7c14cdd98ece6603caac656";
const URL = API_URL + API_KEY;
let html = "";
let gameContainer = document.querySelector("section");
gameContainer.innerHTML = `<p class="loading">loading...</p>`;

async function getGames() {
    try {
        const response = await fetch(URL);
        const result = await response.json();
        const games = result.results;
        for (let i = 0; i <= 7 ; i++) {
            const name = games[i].name;
            const rating = games[i].rating;
            const tags = games[i].tags;
            const backdrop = games[i].background_image;
            let returnedTags = "";
            tags.forEach(value => {
                return returnedTags += `<p>${value.name}</p>`
            });
            html += `
            <div style="background-image: url(${backdrop})"class="gameCards">
            <div>
            <h2>${name}</h2>
            <p>${rating}</p>
            <details>
                <summary>Tags:</summary>
                ${returnedTags}
            </details>
            <p>Number og tags: ${tags.length}</p>
            </div>
            </div>
            `;
            gameContainer.innerHTML = html;
        };
    } catch(error) {
        gameContainer.innerHTML = `<p class="error">An error has occurred: ${error}</p>`;
    }
};
getGames();
