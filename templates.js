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
                <a class="nav-link text-dark pointer" onclick="renderPokemonValues('pokemon_selected_infos', renderPokemonAboutHTML())">About</a>
                <!-- class="active border-primary " aria-current="page" -->
                </li>
                <li class="nav-item">
                <a class="nav-link text-dark pointer" onclick="renderPokemonValues('pokemon_selected_infos', renderPokemonStatsHTML())">Base Stats</a>
                </li>
                <li class="nav-item">
                <a class="nav-link text-dark pointer" onclick="renderPokemonEvolution()">Evolution</a>
                </li>
                <li class="nav-item">
                <a class="nav-link text-dark pointer" onclick="renderPokemonMoves()">Moves</a>
                </li>
            </ul>
            <div id="pokemon_selected_infos" class="d-flex align-items-center" style="height: 350px;"></div><!--  style="height: 400px;" -->
        </div>
    </div>
  `
}


function renderPokemonAboutHTML() {
    return /* html */`
        <div class="w-40">
            <p class="">Base Happiness</p>
            <p class="">Height</p>       
            <p class="">Weight</p>       
            <p>Abilities</p>      
            <p class="">Egg Groups</p>   
            
        </div>
        <div class="w-60">
            <p><b>${currentSpecies['base_happiness']}</b></p>
            <p><b>${currentPokemon['height']}</b></p>
            <p><b>${currentPokemon['weight']}</b></p>
            <p class="text-capitalize"><b id="pokemon_selected_abilities"></b></p>
            <p><b>${currentSpecies['egg_groups'][0]['name']}</b></p>
            
        </div>
    `;
}


function renderPokemonStatsHTML() {
    return /* html */`
        <div class="w-40">
            <p>HP</p>
            <p>Attack</p>
            <p>Defense</p>
            <p>Special Attack</p>
            <p>Special Defense</p>
            <p>Speed</p> 
        </div>
        <div class="w-60">
            <p><b>${currentPokemon['stats'][0]['base_stat']}</b></p>
            <p><b>${currentPokemon['stats'][1]['base_stat']}</b></p>
            <p><b>${currentPokemon['stats'][2]['base_stat']}</b></p>
            <p><b>${currentPokemon['stats'][3]['base_stat']}</b></p>
            <p><b>${currentPokemon['stats'][4]['base_stat']}</b></p>
            <p><b>${currentPokemon['stats'][5]['base_stat']}</b></p>         
        </div>
    `;
}


function renderPokemonOverviewCardHTML(pokemonName, imgURL, pokemonID, color, pokemonType) {
    return /*html*/`
        <div 
        class="col-12 col-sm-6 col-lg-4 col-xl-3 d-flex flex-column mb-4"><!-- d-flex justify-content-center justify-content-sm-between -->
            <div class=" rounded" style="max-width: 100%; background-color: ${color}; color: white;" onclick="showPokemonDetail(${pokemonID})">
                <div class="ps-2 pt-2"><!-- d-flex justify-content-between align-items-center -->
                    <h3 class="card-title text-capitalize">${pokemonName}</h5>
                    <h4 class="card-subtitle mb-2 text-capitalize">${pokemonType}</h4>
                </div>
                <div class="d-flex">
                    <div class="w-40"></div>
                    <div class="w-60 d-flex justify-content-end" style="height: 150px;"><img src="${imgURL}" class="img-card" alt="Bild_${pokemonName}"></div>
                </div>    
            </div>
        </div>
        `
}