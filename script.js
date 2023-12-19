let currentPokemon;
let pokemonList;


function init() {
    loadPokemon();
    loadPokemonList();
}


async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/ditto';
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log('loaded Pokemon', currentPokemon);
    renderPokemonInfo();
}


function renderPokemonInfo() {
    document.getElementById('pokemon_name').innerHTML = currentPokemon['name'];
}

async function loadPokemonList() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0.';
    let response2 = await fetch(url);
    pokemonList = await response2.json();
    console.log('loaded PokemonList', pokemonList);
    let pokemonName = pokemonList['count'];
    console.log(pokemonName);

    /*  for (let i = 0; i < pokemonList.length; i++) {
         const pokemonName = pokemonList[counts];
         console.log(pokemonName);
     }*/
} 