let currentPokemon;
let currentSpecies;
let pokemonList;


function init() {
    /* loadPokemon(); */
    loadPokemonList();
}


async function loadPokemon(pokemonID) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
}


async function loadSpecies(pokemonID) {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`;
    let response = await fetch(url);
    currentSpecies = await response.json();
}


async function loadPokemonList() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0.'; //limit from 10000 to 20 sets!!!
    let response2 = await fetch(url);
    pokemonList = await response2.json();

    for (let i = 0; i < pokemonList['results'].length; i++) {
        const pokemonID = i + 1;
        await loadPokemon(pokemonID);
        let color = getColor(currentPokemon['types'][0]['type']['name']);
        renderPokemonOverviewCard(currentPokemon['species']['name'], currentPokemon['sprites']['other']['home']['front_default'], pokemonID, color, currentPokemon['types'][0]['type']['name']);
    }
}


async function showPokemonDetail(pokemonID) {
    await loadPokemon(pokemonID);
    await loadSpecies(pokemonID);
    renderPokemonInfo();
    toggleVisibility();
}


function renderPokemonInfo() {
    let color = getColor(currentPokemon['types'][0]['type']['name']);
    document.getElementById('pokemon_detail').innerHTML = renderPokemonInfoHTML(color);
    renderPokemonValues('pokemon_selected_infos', renderPokemonAboutHTML());
}


function renderPokemonOverviewCard(pokemonName, imgURL, pokemonID, color, pokemonType) {
    document.getElementById('pokemon_overview').innerHTML += renderPokemonOverviewCardHTML(pokemonName, imgURL, pokemonID, color, pokemonType);
}


function renderPokemonValues(ID, returnHTML) {
    document.getElementById(ID).innerHTML = returnHTML;

    if (returnHTML === renderPokemonAboutHTML()) {
        renderPokemonAbilities();
    }
}


function renderPokemonAbilities() {
    let abilitiyID = document.getElementById('pokemon_selected_abilities')
    abilitiyID.innerHTML = '';

    for (let i = 0; i < currentPokemon['abilities'].length; i++) {
        const ability = currentPokemon['abilities'][i]['ability']['name'];
        abilitiyID.innerHTML += /* html */`${ability} / `
    }
}


/* function renderPokemonBaseStats() {
    document.getElementById('pokemon_selected_infos').innerHTML = renderPokemonStatsHTML();
} */


function renderPokemonEvolution() {
    document.getElementById('pokemon_selected_infos').innerHTML = /* html */`
    <div class="w-40">test</div>
    <div class="w-60">test</div>
    `;
}


function renderPokemonMoves() {
    document.getElementById('pokemon_selected_infos').innerHTML = /* html */`
        <div id="pokemon_selected_moves" class="text-column-two d-box text-capitalize"></div>  
    `;

    let moveID = document.getElementById('pokemon_selected_moves')
    moveID.innerHTML = '';

    for (let i = 0; i < currentPokemon['moves'].length; i++) {
        const move = currentPokemon['moves'][i]['move']['name'];
        moveID.innerHTML += /* html */`
        
            <p class="border border-1 rounded-pill p-2 text-center">${move}</p>
       
        `;
    }
}

function toggleVisibility() {
    document.getElementById('show_pokemon_detail').classList.toggle('invisible');
}


function doNotToggleVisibility(event) {
    event.stopPropagation();
}


function getColor(typeOfPokemon) {
    return colours[typeOfPokemon];
}