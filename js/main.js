//Mes selections

const userrequestHTML=document.querySelector('.inpute');
const searchBouttonHTML=document.querySelector('button');
const displayResultat=document.querySelector('.result');
const imageHTML = document.querySelector('img');
const displaygitftHTML=document.querySelector('.imageGit');

const nombreHTML=document.querySelector('.nombre');
const langage = document.querySelector('.langage');

const pokemonHTML=document.querySelector('.pokemonNoame');
const pokemonDeHTML=document.querySelector('.pokemondetail');



// searchBouttonHTML.addEventListener('click',async (event)=>{

//     event.preventDefault();

//     // let result = await iConvert('USD','EUR',50);
//     let rest = await getPokemons(20);
   
//     for(pokemon of rest){
//         // console.log(pokemon.name);

//         pokemonHTML.innerHTML+=`
//             <a href="">
//                 <span>${pokemon.name}</sapn>            
//             </a>
//         `;
//     }

//     // console.log(result);


// });



async function displayPokemon() {
    let rest = await getPokemons(20);
   
    for(pokemon of rest){
        // console.log(pokemon.name);

        pokemonHTML.innerHTML+=`
            <a href="">
                <span>${pokemon.name}</sapn>            
            </a>
        `;
    }
}

displayPokemon();

pokemonHTML.addEventListener('click', async (event) => {
    event.preventDefault();
    let pokemonName = event.target.textContent;

    if (pokemonName) {
        let data = await getPokemonInformation(pokemonName);
        // Boucle pour les types
        let typeHTML = '';
        
        for (let types of data.types) {
            typeHTML += `<span>${types.type.name}</span>`;
        }

        // Boucle pour les stats
        let statsHTML = '';
        for (let stat of data.stats) {
            statsHTML += `
                <div class="stat-element">
                    <div class="stat-detail">
                        <span>${stat.stat.name} :</span>
                        <span>${stat.base_stat}</span>
                    </div>
                </div>`;
        }
        // Affichage final
        pokemonDeHTML.innerHTML = `
            <div class="pokemon-card">
                <div class="photo">
                    <img src="${data.sprites.back_default}" alt="${data.species.name}">
                </div>
                <div class="inform">
                    <h2>Nom : ${data.species.name}</h2>
                    <div class="content type">
                        <span>Type : </span>${typeHTML}
                    </div>
                    <div class="content">
                        <span>Taille :</span>
                        <span>${data.height}</span>
                    </div>
                    <div class="content">
                        <span>Poids :</span>
                        <span>${data.weight}</span>
                    </div>
                    <div class="content">
                        <span>Stats :</span>
                        <div class="stats">
                            ${statsHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
});


async function getPokemons(limit) {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results; // retourne bien les données ici

    } catch (error) {
        console.error("Erreur lors du chargement des Pokémon :", error);
    }
}


async function getPokemonInformation(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Pokémon non trouvé");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération du Pokémon :", error);
        return null;
    }
}

