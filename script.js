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
    renderPokemonAbout();
}


function renderPokemonOverviewCard(pokemonName, imgURL, pokemonID, color, pokemonType) {
    document.getElementById('pokemon_overview').innerHTML += renderPokemonOverviewCardHTML(pokemonName, imgURL, pokemonID, color, pokemonType);
}


function renderPokemonAbout() {
    document.getElementById('pokemon_selected_infos').innerHTML = /* html */`
        <div class="w-40">
            <p class="">Species</p>
            <p class="">Height</p>       
            <p class="">Weight</p>       
            <p class="">Abilities</p>
            <h5 class="mb-4">Breeding</h5>
            <p class="">Gender</p>       
            <p class="">Egg Groups</p>   
            <p class="">Egg Cycle</p>
        </div>
        <div class="w-60">
            <p><b>API Wert ?</b></p>
            <p><b>${currentPokemon['height']}</b></p>
            <p><b>${currentPokemon['weight']}</b></p>
            <p><b>${currentPokemon['abilities'][0]['ability']['name']}</b></p>
            <h5 class="mb-4" style="color: white;">Breeding</h5>
            <p><b>API Wert ?</b></p>
            <p><b>API Wert aus species/PokemonID</b></p>
            <p><b>API Wert ?</b></p>
        </div>
    `;
}


function renderPokemonBaseStats() {
    document.getElementById('pokemon_selected_infos').innerHTML = /* html */`
    <div class="w-40">test</div>
    <div class="w-60">test</div>
    `;
}


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