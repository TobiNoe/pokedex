let currentPokemon;
let pokemonList;


function init() {
    /* loadPokemon(); */
    loadPokemonList();
}


async function loadPokemon(pokemonID) {
    /* let pokemonID = Number(id);
    pokemonID++; */
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
}


async function loadPokemonList() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=4&offset=0.'; //limit from 10000 to 4 sets!!!
    let response2 = await fetch(url);
    pokemonList = await response2.json();
    /* console.log('loaded PokemonList', pokemonList); */

    for (let i = 0; i < pokemonList['results'].length; i++) {
        /* const pokemonName = pokemonList['results'][i]['name']; */
        const pokemonID = i + 1;
        await loadPokemon(pokemonID);
        renderPokemonOverviewCard(currentPokemon['species']['name'], currentPokemon['sprites']['other']['home']['front_default'], pokemonID);
    }
}


async function showPokemonDetail(pokemonID) {
    await loadPokemon(pokemonID);
    renderPokemonInfo();
}


function renderPokemonInfo() {
    document.getElementById('pokemon_name').innerHTML = currentPokemon['name'];
}


function renderPokemonOverviewCard(pokemonName, imgURL, pokemonID) {
    document.getElementById('pokemon_overview').innerHTML += /*html*/`
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 d-flex justify-content-center justify-content-sm-between  mb-4">
            <div class="card" style="max-width: 21rem;">
            <div class="card-body d-flex justify-content-between align-items-center">
                    <h3 class="card-title">${pokemonName}</h5>
                    <h4 class="card-subtitle mb-2 text-body-secondary">${pokemonID}</h6>
            </div>    
            <img src="${imgURL}" class="card-img-top" alt="Bild_${pokemonName}">
                <div class="card-body d-flex justify-content-center align-items-center">
                    <a href="#" class="btn btn-primary" onclick="showPokemonDetail(${pokemonID})">Show Pokemon</a>
                </div>
            </div>
        </div>`
}


/* async function showPokemonDetail(pokemonName, pokemonID) {
    await loadPokemon(pokemonName, pokemonID);
    renderPokemonInfo();
} */