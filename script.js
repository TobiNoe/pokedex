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
    document.getElementById('pokemon_detail').innerHTML = renderPokemonInfoHTML();
}


function renderPokemonOverviewCard(pokemonName, imgURL, pokemonID) {
    document.getElementById('pokemon_overview').innerHTML += renderPokemonOverviewCardHTML(pokemonName, imgURL, pokemonID);
}


/* async function showPokemonDetail(pokemonName, pokemonID) {
    await loadPokemon(pokemonName, pokemonID);
    renderPokemonInfo();
} */