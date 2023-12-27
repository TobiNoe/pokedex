function renderPokemonInfoHTML(color) {
    return /* html */`
    <div class="card-body d-flex justify-content-between border-top rounded-top-4" style="background-color: ${color}; color: white; height: 300px;">
        <div>
        <h3 class="text-capitalize">${currentPokemon['name']}</h3>
        <p class="card-text text-capitalize">${currentPokemon['types'][0]['type']['name']}</p>
        </div>
        <div>
            <p class="pointer" onclick="toggleVisibility()">close</p>
        </div>
     </div>
     <div class="position-fixed w-100 d-flex justify-content-center" style="top: 48px;"><!-- style="background-color: rgb(83, 245, 191);" -->
        <img src="${currentPokemon['sprites']['other']['home']['front_default']}" class="img-detail" alt="..."><!-- card-img-top -->
    </div>
    <div class="card-body border-top border-bottom rounded-bottom-4 rounded-top-4 mt-n bg-white">
        <div class="ms-4 me-4"  style="margin-top: 32px;">
            <ul class="nav nav-underline justify-content-between mb-4">
                <li class="nav-item">
                <a class="nav-link text-dark active" onclick="renderPokemonAbout()">About</a>
                <!-- class="active border-primary " aria-current="page" -->
                </li>
                <li class="nav-item">
                <a class="nav-link text-dark" onclick="renderPokemonBaseStats()">Base Stats</a>
                </li>
                <li class="nav-item">
                <a class="nav-link text-dark" onclick="renderPokemonEvolution()">Evolution</a>
                </li>
                <li class="nav-item">
                <a class="nav-link text-dark" onclick="renderPokemonMoves()">Moves</a>
                </li>
            </ul>
            <div id="pokemon_selected_infos" class="d-flex"></div>
        </div>
    </div>
  `
}


function renderPokemonOverviewCardHTML(pokemonName, imgURL, pokemonID, color) {
    return /*html*/`
        <div 
        class="col-12 col-sm-6 col-lg-4 col-xl-3 d-flex justify-content-center justify-content-sm-between  mb-4">
            <div class="card" style="max-width: 21rem; background-color: ${color}; color: white;">
            <div class="card-body d-flex justify-content-between align-items-center">
                    <h3 class="card-title text-capitalize">${pokemonName}</h5>
                    <h4 class="card-subtitle mb-2 text-body-secondary">${pokemonID}</h6>
            </div>    
            <img src="${imgURL}" class="img-card" alt="Bild_${pokemonName}"><!-- card-img-top -->
                <div class="card-body d-flex justify-content-center align-items-center">
                    <a class="btn btn-primary" onclick="showPokemonDetail(${pokemonID})">Show Pokemon</a><!-- href="#" -->
                </div>
            </div>
        </div>`
}