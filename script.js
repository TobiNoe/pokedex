let currentPokemon;
let currentSpecies;
let loadedPokemon;
let pokemonList;
let pokemonCache = [];
let pokemonSearch = [];
let pokemonRender = [];
let pokemonRange;
let pokemonPreviewEnd;
let pokemonPreview = 500;
let renderOverview = false;


async function init() {
    await loadPokemonList();
    switchRenderOverview();
}


async function loadPokemon(pokemonName) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    let response = await fetch(url);
    let pokemon = await response.json();/* currentPokemon */
    return pokemon;
}


async function loadSpecies(pokemonName) {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`;
    let response = await fetch(url);
    currentSpecies = await response.json();
}


async function loadPokemonList() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonPreview}&offset=0.`; //limit from 10000 to 20 sets!!!
    let response2 = await fetch(url);
    pokemonList = await response2.json();

    for (let y = 0; y < pokemonList['results'].length; y++) {
        const pokemonName = pokemonList['results'][y]['name'];
        pokemonCache.push(pokemonName);
       /*  const pokemonID = y + 1;
        cachePokemons(pokemonName, pokemonID); */
    }
}


/* function cachePokemons(pokemonName, pokemonID) {

    let pokemonDataset = {
        name: pokemonName,
        id: pokemonID
    };

    pokemonCache.push(pokemonDataset);
} */


function switchRenderOverview() {
    if (document.getElementById('input_search').value != "") {
        document.getElementById('pokemon_overview').innerHTML = '';
        pokemonRange = 20;
        pokemonPreviewEnd = pokemonRange;
        readInputField();
    } else {
        document.getElementById('pokemon_overview').innerHTML = '';
        pokemonRange = 20;
        pokemonPreviewEnd = pokemonRange;
        pokemonPreview = 500;
        renderPokemonOverview(pokemonCache);
    }
}


async function renderPokemonOverview(renderDatabase) {
    pokemonRender = renderDatabase;
    console.log(pokemonRender);
    console.log(pokemonRange);
    console.log(pokemonPreviewEnd);

    for (let i = pokemonPreviewEnd - pokemonRange; i < pokemonPreviewEnd && i < pokemonPreview; i++) {
        const pokemonName = pokemonRender[i];
        loadedPokemon = await loadPokemon(pokemonName);/* pokemonID */
        let color = getColor(loadedPokemon['types'][0]['type']['name']);
        renderPokemonOverviewCard(pokemonName, loadedPokemon['sprites']['other']['home']['front_default'], color, loadedPokemon['types'][0]['type']['name']);
    }
}


/* async function renderPokemonOverviewSearch() {
    pokemonRange = pokemonSearch.length;
    pokemonPreviewEnd = pokemonRange;
    
    for (let i = pokemonPreviewEnd - pokemonRange; i < pokemonPreviewEnd && i < pokemonPreview; i++) {
        const pokemonName = pokemonSearch[i];
        /* console.log(pokemonCache[i], i, pokemonPreviewEnd, pokemonPreview, i < pokemonPreviewEnd && i < pokemonPreview); 
        loadedPokemon = await loadPokemon(pokemonName);/* pokemonID 
        let color = getColor(loadedPokemon['types'][0]['type']['name']);
        renderPokemonOverviewCard(pokemonName, loadedPokemon['sprites']['other']['home']['front_default'], color, loadedPokemon['types'][0]['type']['name']);
    }
} */


async function showPokemonDetail(pokemonName) {
    currentPokemon = await loadPokemon(pokemonName);
    await loadSpecies(pokemonName);
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

    switch (returnHTML) {
        case renderPokemonAboutHTML():
            renderPokemonAbilities();
            break;
        case renderPokemonMovesContainerHTML():
            renderPokemonMoves();
            break;
        default:
            console.log("No value found");
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
    let color = getColor(currentPokemon['types'][0]['type']['name']);
    let moveID = document.getElementById('pokemon_selected_moves')
    moveID.innerHTML = '';


    for (let i = 0; i < currentPokemon['moves'].length; i++) {
        const move = currentPokemon['moves'][i]['move']['name'];
        moveID.innerHTML += renderPokemonMovesHTML(color, move);
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


async function readInputField() {
    let pokemonSearchStr = document.getElementById('input_search').value.toLowerCase();
    console.log(pokemonSearchStr);
    await fillPokemonSearch(pokemonSearchStr);
    pokemonPreview = pokemonSearch.length;
    renderPokemonOverview(pokemonSearch);
}


function fillPokemonSearch(pokemonSearchStr) {
    pokemonSearch = [];

    for (let j = 0; j < pokemonCache.length; j++) {
        const pokemon = pokemonCache[j];

        if (pokemon.indexOf(pokemonSearchStr) != -1) {
            pokemonSearch.push(pokemon);
        }
    }
    console.log(pokemonSearch);
}


/* Testfunktion zum ermitteln des unteren Bildschirmrandes */


// Funktion, die aufgerufen wird, wenn das Ende erreicht wurde
async function bottomOfWindowIsReached() {
    renderOverview = true;
    /* console.log("Unterer Bildschirmrand erreicht!"); */
    pokemonPreviewEnd += 20;
    /* console.log(pokemonPreviewEnd); */
    await renderPokemonOverview(pokemonRender);
    renderOverview = false;
    // Hier kannst du den Code für deine gewünschte Aktion einfügen
}

// Funktion zum Überprüfen, ob der untere Bildschirmrand erreicht wurde
function checkIfBottomOfWindowIsReached() {
    // Wenn die Verarbeitung im Gange ist, beende die Funktion frühzeitig
    if (renderOverview) {
        return;
    }

    // Aktuelle Scroll-Position von oben
    let scrollPositionVonOben = window.scrollY;/*  || window.pageYOffset || document.documentElement.scrollTop */

    // Gesamte Höhe des gerenderten Inhalts im Dokument
    let gesamteDokumentHoehe = document.documentElement.scrollHeight;

    // Aktuelle Bildschirmhöhe
    let aktuelleHoehe = window.innerHeight;/*  || document.documentElement.clientHeight || document.body.clientHeight */

    // Überprüfen, ob der untere Bildschirmrand erreicht wurde (mit einer Toleranz von 50 Pixeln)
    if (gesamteDokumentHoehe - (scrollPositionVonOben + aktuelleHoehe) < 50) {
        bottomOfWindowIsReached();
    }
}

// Eventlistener für das Scroll-Event hinzufügen
window.addEventListener("scroll", checkIfBottomOfWindowIsReached);
