function renderPokemonInfoHTML(color) {
    return /* html */`
    <div class="card-body d-flex justify-content-between border-top rounded-top-4" style="background-color: ${color}; color: white; height: 300px;">
        <div>
        <h3 class="text-capitalize">${currentPokemon['name']}</h3>
        <h5 class="card-text text-capitalize">${currentPokemon['types'][0]['type']['name']}</h5>
        </div>
        <div>
            <h5 class="pointer" onclick="toggleVisibility()">close</h5>
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
                <a class="nav-link text-dark pointer" onclick="renderPokemonValues('pokemon_selected_infos', renderPokemonStatsHTML('${color}', percentOfMaxValue(), maxValue()))">Base Stats</a>
                </li>
                <li class="nav-item">
                <a class="nav-link text-dark pointer" onclick="renderPokemonEvolution()">Evolution</a>
                </li>
                <li class="nav-item">
                <a class="nav-link text-dark pointer" onclick="renderPokemonValues('pokemon_selected_infos', renderPokemonMovesContainerHTML())">Moves</a>
                </li>
            </ul>
            <div id="pokemon_selected_infos" class="d-flex align-items-center overflow-auto" style="height: 300px;"></div><!--  style="height: 400px;" -->
        </div>
    </div>
  `
}


function renderPokemonOverviewCardHTML(pokemonName, imgURL, color, pokemonType) {
    return /*html*/`
        <div 
        class="col-12 col-sm-6 col-lg-4 col-xl-3 d-flex flex-column mb-4"><!-- d-flex justify-content-center justify-content-sm-between -->
            <div class="rounded  pointer" style="max-width: 100%; background-color: ${color}; color: white;" onclick="showPokemonDetail('${pokemonName}')">
                <div class="ps-2 pt-2"><!-- d-flex justify-content-between align-items-center -->
                    <h3 class="card-title text-capitalize">${pokemonName}</h3>
                    <h5 class="card-subtitle mb-2 text-capitalize">${pokemonType}</h5>
                </div>
                <div class="d-flex">
                    <div class="w-40"></div>
                    <div class="w-60 d-flex justify-content-end" style="height: 150px;"><img src="${imgURL}" class="img-card" alt="Bild_${pokemonName}"></div>
                </div>    
            </div>
        </div>
        `
}


function renderPokemonAboutHTML() {
    return /* html */`
    <div class="w-100">
        <div class="w-100 d-flex align-items-center">
            <p class="w-40">Base Happiness</p>
            <p class="w-60"><b>${currentSpecies['base_happiness']}</b></p>
        </div>
        <div class="w-100 d-flex align-items-center">
            <p class="w-40">Height</p>
            <p class="w-60"><b>${currentPokemon['height']}</b></p>
        </div>
        <div class="w-100 d-flex align-items-center">
            <p class="w-40">Weight</p>
            <p class="w-60"><b>${currentPokemon['weight']}</b></p>
        </div>
        <div class="w-100 d-flex align-items-center">
            <p class="w-40">Abilities</p>
            <p class="w-60 text-capitalize"><b id="pokemon_selected_abilities"></b></p>
        </div>
        <div class="w-100 d-flex align-items-center">
            <p class="w-40">Egg Groups</p>
            <p class="w-60 text-capitalize"><b>${currentSpecies['egg_groups'][0]['name']}</b></p>
        </div>
    </div>    
    `;
}


/* function renderPokemonAboutHTML() {
    return /* html `
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
            <p class="text-capitalize"><b>${currentSpecies['egg_groups'][0]['name']}</b></p>
            
        </div>
    `;
} */


function renderPokemonStatsHTML(color, percentStats, maxValueStats) {
    return /* html */`
        <div class="w-100">
            <div class="w-100 d-flex align-items-center">
                <p class="w-40">HP</p>
                <div class="progress w-60 mb-3" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="${maxValueStats}">
                    <div class="progress-bar" style="width: ${percentStats[0]}%; background-color: ${color};">${currentPokemon['stats'][0]['base_stat']}</div>
                </div>
            </div>
            <div class="w-100 d-flex align-items-center">
                <p class="w-40">Attack</p>
                <div class="progress w-60 mb-3" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="${maxValueStats}">
                    <div class="progress-bar" style="width: ${percentStats[1]}%; background-color: ${color};">${currentPokemon['stats'][1]['base_stat']}</div>
                </div>
            </div>
            <div class="w-100 d-flex align-items-center">
                <p class="w-40">Defense</p>
                <div class="progress w-60 mb-3" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="${maxValueStats}">
                    <div class="progress-bar" style="width: ${percentStats[2]}%; background-color: ${color};">${currentPokemon['stats'][2]['base_stat']}</div>
                </div>
            </div>
            <div class="w-100 d-flex align-items-center">
                <p class="w-40">Special Attack</p>
                <div class="progress w-60 mb-3" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="${maxValueStats}">
                    <div class="progress-bar" style="width: ${percentStats[3]}%; background-color: ${color};">${currentPokemon['stats'][3]['base_stat']}</div>
                </div>
            </div>
            <div class="w-100 d-flex align-items-center">
                <p class="w-40">Special Defense</p>
                <div class="progress w-60 mb-3" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="${maxValueStats}">
                    <div class="progress-bar" style="width: ${percentStats[4]}%; background-color: ${color};">${currentPokemon['stats'][4]['base_stat']}</div>
                </div>
            </div>
            <div class="w-100 d-flex align-items-center">
                <p class="w-40">Speed</p>
                <div class="progress w-60 mb-3" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="${maxValueStats}">
                    <div class="progress-bar" style="width: ${percentStats[5]}%; background-color: ${color};">${currentPokemon['stats'][5]['base_stat']}</div>
                </div>
            </div>
        </div> 
    `;
}


/* function renderPokemonStatsHTML() {
    return /* html `
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
} */


function renderPokemonMovesContainerHTML() {
    return /* html */`
        <div id="pokemon_selected_moves" class="text-column-two d-box text-capitalize"></div>  
    `;
}


function renderPokemonMovesHTML(color, move) {
    return /* html */`
    <p class="border border-1 rounded-pill p-2 text-center" style="background-color: ${color}; color: white;">${move}</p>
    `;
}