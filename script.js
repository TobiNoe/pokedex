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
    document.getElementById('pokemon_detail').innerHTML = /* html */`
    <div class="card-body border-top rounded-top-4" style="background-color: rgb(83, 245, 191); color: white; height: 300px;">
        <h3>${currentPokemon['name']}</h3>
        <p class="card-text">${currentPokemon['types'][0]['type']['name']}</p>
     </div>
     <div class="position-fixed w-100 d-flex justify-content-center" style="top: 48px;"><!-- style="background-color: rgb(83, 245, 191);" -->
        <img src="${currentPokemon['sprites']['other']['home']['front_default']}" class="img-detail" alt="..."><!-- card-img-top -->
    </div>
    <div class="card-body border-top border-bottom rounded-bottom-4 rounded-top-4 mt-n bg-white">
        <div class="ms-4 me-4"  style="margin-top: 32px;">
            <ul class="nav nav-underline justify-content-between mb-4">
                <li class="nav-item">
                <a class="nav-link text-dark active border-primary" href="#">About</a>
                <!-- class="active border-primary " aria-current="page" -->
                </li>
                <li class="nav-item">
                <a class="nav-link text-dark" href="#">Base Stats</a>
                </li>
                <li class="nav-item">
                <a class="nav-link text-dark" href="#">Evolution</a>
                </li>
                <li class="nav-item">
                <a class="nav-link text-dark" href="#">Moves</a><!-- aria-disabled="true" -->
                </li>
            </ul>
            <div class="d-flex align-items-center justify-content-between col-12 col-sm-6 col-md-12 col-lg-6">
                <p class="">Species</p>
                <p><b>API Wert ?</b></p>
            </div>
            <div class="d-flex align-items-center justify-content-between col-12 col-sm-6 col-md-12 col-lg-6">
                <p class="">Height</p>
                <p><b>${currentPokemon['height']}</b></p>
            </div>
            <div class="d-flex align-items-center justify-content-between col-12 col-sm-6 col-md-12 col-lg-6">
                <p class="">Weight</p>
                <p><b>${currentPokemon['weight']}</b></p>
            </div>
            <div class="d-flex align-items-center justify-content-between col-12 col-sm-6 col-md-12 col-lg-6 mb-2">
                <p class="">Abilities</p>
                <p><b>${currentPokemon['abilities'][0]['ability']['name']}</b></p>
            </div>
            <h5 class="mb-4">Breeding</h3>
            <div class="d-flex align-items-center justify-content-between col-12 col-sm-6 col-md-12 col-lg-6">
                <p class="">Gender</p>
                <p><b>API Wert ?</b></p>
            </div>
            <div class="d-flex align-items-center justify-content-between col-12 col-sm-6 col-md-12 col-lg-6">
                <p class="">Egg Groups</p>
                <p><b>API Wert aus species/PokemonID</b></p>
            </div>
            <div class="d-flex align-items-center justify-content-between col-12 col-sm-6 col-md-12 col-lg-6">
                <p class="">Egg Cycle</p>
                <p><b>API Wert ?</b></p>
            </div>
        </div>
    </div>
  `
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