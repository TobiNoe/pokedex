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
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0.'; //limit from 10000 to 100 sets!!!
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
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 d-flex justify-content-center justify-content-sm-between  mb-4">
            <div class="card" style="max-width: 21rem;">
            <div class="card-body d-flex justify-content-between align-items-center">
                    <h3 class="card-title">${pokemonName}</h5>
                    <h4 class="card-subtitle mb-2 text-body-secondary">#1</h6>
            </div>    
            <img src="${imgURL}" class="card-img-top" alt="...">
                <div class="card-body d-flex justify-content-center align-items-center">
                    <a href="#" class="btn btn-primary">Detail Informationen</a>
                </div>
            </div>
        </div>`
}