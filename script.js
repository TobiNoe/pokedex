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
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0.'; //limit from 10000 to 20 sets!!!
    let response2 = await fetch(url);
    pokemonList = await response2.json();
    /* console.log('loaded PokemonList', pokemonList); */

    for (let i = 0; i < pokemonList['results'].length; i++) {
        /* const pokemonName = pokemonList['results'][i]['name']; */
        const pokemonID = i + 1;
        await loadPokemon(pokemonID);
        let color = getColor(currentPokemon['types'][0]['type']['name']);
        renderPokemonOverviewCard(currentPokemon['species']['name'], currentPokemon['sprites']['other']['home']['front_default'], pokemonID, color, currentPokemon['types'][0]['type']['name']);
    }
}


async function showPokemonDetail(pokemonID) {
    await loadPokemon(pokemonID);
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
        abilitiyID.innerHTML += /* html */`${ability} `
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
    <div class="w-40">test</div>
    <div class="w-60">test</div>
    `;
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