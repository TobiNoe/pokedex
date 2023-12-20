let currentPokemon;
let pokemonList;


function init() {
    /* loadPokemon(); */
    loadPokemonList();
}


async function loadPokemon(pokemonName) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    renderPokemonOverviewCard(currentPokemon['species']['name'], currentPokemon['sprites']['other']['home']['front_default']);
    
    /* console.log('loaded Pokemon', currentPokemon['sprites']['other']['home']['front_default']); */
}


async function loadPokemonList() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0.';
    let response2 = await fetch(url);
    pokemonList = await response2.json();
    /* console.log('loaded PokemonList', pokemonList); */

    for (let i = 0; i < pokemonList['results'].length; i++) {
        const pokemonName = pokemonList['results'][i]['name'];
        await loadPokemon(pokemonName);
        
        /* console.log(pokemonName); */
    }
}


function renderPokemonInfo() {
    document.getElementById('pokemon_name').innerHTML = currentPokemon['name'];
}


function renderPokemonOverviewCard(pokemonName, imgURL) {
    document.getElementById('pokemon_overview').innerHTML += /*html*/`
        <div class="col">
            <div class="card bg-primary" style="width: 18rem;">
                <img src="${imgURL}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h1>${pokemonName}</h1>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        </div>`
}