function buscarPokemon(pokemon = null) {
    //Obtengo el valor ingresado por el usuario y lo paso a minúsculas:
    let inputPokemon = document.getElementById('inputPokemon').value;
    if(pokemon == null) pokemon = inputPokemon.toLowerCase();
    // console.log(inputPokemon);

    //Defino la URL a consultar de la API:
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    //Creo las promesas con fetch:
    fetch(url).then((resultadoAPI) => {
        if (resultadoAPI.status != "200") {
            console.log(resultadoAPI);
            // pokeImage("./pokemon-sad.gif")
        }
        else {
            return resultadoAPI.json();
        }
    }).then((data) => {
        if (data) {
            //Obtengo los datos para la información básica:
            let nombre = data.name;
            let id     = data.id;
            let imagen = data.sprites.front_default;
            let tipo   = data.types[0].type.name;

            //Obtengo los datos para las estadísticas:
            let hp             = data.stats[0].base_stat;
            let attack         = data.stats[1].base_stat;
            let defense        = data.stats[2].base_stat;
            let specialAttack  = data.stats[3].base_stat;
            let specialDefense = data.stats[4].base_stat;
            let speed          = data.stats[5].base_stat;

            //Obtengo los datos para los movimientos:
            let movimientos = data.moves;

            // console.log(movimientos);

            llenarInformacionBasica(nombre, id, imagen, tipo);
            llenarEstadisticas(hp, attack, defense, specialAttack, specialDefense, speed);
            llenarMovimientos(movimientos)
        }
    });

} //buscarPokemon



function llenarInformacionBasica(nombre, id, imagen, tipo) {
    //Busco los elementos en el DOM:
    const nombrePokemon = document.getElementById('nombrePokemonDesktop');
    const idPokemon     = document.getElementById('idPokemonDesktop');
    const imagenPokemon = document.getElementById('imagenPokemonDesktop');
    const tipoPokemon   = document.getElementById('tipoPokemonDesktop');

    //Asigno la info de la API a los elementos del DOM:
    nombrePokemon.innerText = nombre;
    idPokemon.innerText     = id;
    imagenPokemon.src       = imagen;
    tipoPokemon.innerText   = tipo;
} //llenarInformacionBasica



function llenarEstadisticas(hp, attack, defense, specialAttack, specialDefense, speed) {
    //Busco los elementos en el DOM:
    const hpProgressBar             = document.getElementById('hpProgressBarDesktop');
    const attackProgressBar         = document.getElementById('attackProgressBarDesktop');
    const defenseProgressBar        = document.getElementById('defenseProgressBarDesktop');
    const specialAttackProgressBar  = document.getElementById('specialAttackProgressBarDesktop');
    const specialDefenseProgressBar = document.getElementById('specialDefenseProgressBarDesktop');
    const speedProgressBar          = document.getElementById('speedProgressBarDesktop');

    //Asigno la info de la API a los elementos del DOM:
    hpProgressBar.style.width  = `${hp}%`;
    hpProgressBar.ariaValueNow = hp;
    hpProgressBar.innerText    = hp;

    attackProgressBar.style.width  = `${attack}%`;
    attackProgressBar.ariaValueNow = attack;
    attackProgressBar.innerText    = attack;

    defenseProgressBar.style.width  = `${defense}%`;
    defenseProgressBar.ariaValueNow = defense;
    defenseProgressBar.innerText    = defense;

    specialAttackProgressBar.style.width  = `${specialAttack}%`;
    specialAttackProgressBar.ariaValueNow = specialAttack;
    specialAttackProgressBar.innerText    = specialAttack;

    specialDefenseProgressBar.style.width  = `${specialDefense}%`;
    specialDefenseProgressBar.ariaValueNow = specialDefense;
    specialDefenseProgressBar.innerText    = specialDefense;

    speedProgressBar.style.width  = `${speed}%`;
    speedProgressBar.ariaValueNow = speed;
    speedProgressBar.innerText    = speed;
} //llenarEstadisticas



function llenarMovimientos(movimientos) {
    let totalMovimientos  = movimientos.length;
    let limiteMovimientos = 6;
    let elementos = '';

    if(totalMovimientos < limiteMovimientos) limiteMovimientos = totalMovimientos;

    const boxMovimientos = document.getElementById('boxMovimientosDesktop');

    for (let index = 0; index < limiteMovimientos; index++) {
        const movimiento  = movimientos[index].move.name;
        let nuevoElemento = `<span class="badge rounded-pill bg-warning text-dark m-2">${movimiento}</span>`;
        elementos += nuevoElemento;
        // console.log(movimiento);
    }

    // console.log(movimientos);
    boxMovimientos.innerHTML = elementos;
} //llenarMovimientos



//Poner pokemon por defecto al cargar la página:
document.addEventListener("DOMContentLoaded", function(event) {
    //Defino la URL a consultar de la API para traer los 100 primeros elementos:
    const url = `https://pokeapi.co/api/v2/pokemon?limit=100`;

    fetch(url).then((resultadoAPI) => {
        if (resultadoAPI.status != "200") console.log(resultadoAPI);
        else return resultadoAPI.json();
    }).then((data) => {
        let arrayElementos   = data.results;
        let numeroRandom     = Math.floor((Math.random() * (99 - 0)) + 0);
        let nombreDelElegido = arrayElementos[numeroRandom].name;
        // console.log(nombreDelElegido);

        buscarPokemon(nombreDelElegido); 
    });
});
