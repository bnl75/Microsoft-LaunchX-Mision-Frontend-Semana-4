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
    const nombrePokemonDesktop = document.getElementById('nombrePokemonDesktop');
    const idPokemonDesktop     = document.getElementById('idPokemonDesktop');
    const imagenPokemonDesktop = document.getElementById('imagenPokemonDesktop');
    const tipoPokemonDesktop   = document.getElementById('tipoPokemonDesktop');

    const nombrePokemonMobile = document.getElementById('nombrePokemonMobile');
    const idPokemonMobile     = document.getElementById('idPokemonMobile');
    const imagenPokemonMobile = document.getElementById('imagenPokemonMobile');
    const tipoPokemonMobile   = document.getElementById('tipoPokemonMobile');

    //Asigno la info de la API a los elementos del DOM:
    nombrePokemonDesktop.innerText = nombre;
    idPokemonDesktop.innerText     = id;
    imagenPokemonDesktop.src       = imagen;
    tipoPokemonDesktop.innerText   = tipo;

    nombrePokemonMobile.innerText = nombre;
    idPokemonMobile.innerText     = id;
    imagenPokemonMobile.src       = imagen;
    tipoPokemonMobile.innerText   = tipo;
} //llenarInformacionBasica



function llenarEstadisticas(hp, attack, defense, specialAttack, specialDefense, speed) {
    //Busco los elementos en el DOM:
    const hpProgressBarDesktop             = document.getElementById('hpProgressBarDesktop');
    const attackProgressBarDesktop         = document.getElementById('attackProgressBarDesktop');
    const defenseProgressBarDesktop        = document.getElementById('defenseProgressBarDesktop');
    const specialAttackProgressBarDesktop  = document.getElementById('specialAttackProgressBarDesktop');
    const specialDefenseProgressBarDesktop = document.getElementById('specialDefenseProgressBarDesktop');
    const speedProgressBarDesktop          = document.getElementById('speedProgressBarDesktop');

    const hpProgressBarMobile             = document.getElementById('hpProgressBarMobile');
    const attackProgressBarMobile         = document.getElementById('attackProgressBarMobile');
    const defenseProgressBarMobile        = document.getElementById('defenseProgressBarMobile');
    const specialAttackProgressBarMobile  = document.getElementById('specialAttackProgressBarMobile');
    const specialDefenseProgressBarMobile = document.getElementById('specialDefenseProgressBarMobile');
    const speedProgressBarMobile          = document.getElementById('speedProgressBarMobile');

    //Asigno la info de la API a los elementos del DOM:
    hpProgressBarDesktop.style.width  = `${hp}%`;
    hpProgressBarDesktop.ariaValueNow = hp;
    hpProgressBarDesktop.innerText    = hp;

    hpProgressBarMobile.style.width  = `${hp}%`;
    hpProgressBarMobile.ariaValueNow = hp;
    hpProgressBarMobile.innerText    = hp;


    attackProgressBarDesktop.style.width  = `${attack}%`;
    attackProgressBarDesktop.ariaValueNow = attack;
    attackProgressBarDesktop.innerText    = attack;

    attackProgressBarMobile.style.width  = `${attack}%`;
    attackProgressBarMobile.ariaValueNow = attack;
    attackProgressBarMobile.innerText    = attack;


    defenseProgressBarDesktop.style.width  = `${defense}%`;
    defenseProgressBarDesktop.ariaValueNow = defense;
    defenseProgressBarDesktop.innerText    = defense;

    defenseProgressBarMobile.style.width  = `${defense}%`;
    defenseProgressBarMobile.ariaValueNow = defense;
    defenseProgressBarMobile.innerText    = defense;


    specialAttackProgressBarDesktop.style.width  = `${specialAttack}%`;
    specialAttackProgressBarDesktop.ariaValueNow = specialAttack;
    specialAttackProgressBarDesktop.innerText    = specialAttack;

    specialAttackProgressBarMobile.style.width  = `${specialAttack}%`;
    specialAttackProgressBarMobile.ariaValueNow = specialAttack;
    specialAttackProgressBarMobile.innerText    = specialAttack;


    specialDefenseProgressBarDesktop.style.width  = `${specialDefense}%`;
    specialDefenseProgressBarDesktop.ariaValueNow = specialDefense;
    specialDefenseProgressBarDesktop.innerText    = specialDefense;

    specialDefenseProgressBarMobile.style.width  = `${specialDefense}%`;
    specialDefenseProgressBarMobile.ariaValueNow = specialDefense;
    specialDefenseProgressBarMobile.innerText    = specialDefense;


    speedProgressBarDesktop.style.width  = `${speed}%`;
    speedProgressBarDesktop.ariaValueNow = speed;
    speedProgressBarDesktop.innerText    = speed;

    speedProgressBarMobile.style.width  = `${speed}%`;
    speedProgressBarMobile.ariaValueNow = speed;
    speedProgressBarMobile.innerText    = speed;
} //llenarEstadisticas



function llenarMovimientos(movimientos) {
    let totalMovimientos  = movimientos.length;
    let limiteMovimientos = 6;
    let elementosDesktop = elementosMobile = '';

    if(totalMovimientos < limiteMovimientos) limiteMovimientos = totalMovimientos;

    const boxMovimientosDesktop = document.getElementById('boxMovimientosDesktop');
    const boxMovimientosMobile = document.getElementById('boxMovimientosMobile');

    for (let index = 0; index < limiteMovimientos; index++) {
        const movimiento  = movimientos[index].move.name;
        let nuevoElemento = `<span class="badge rounded-pill bg-warning text-dark m-2">${movimiento}</span>`;
        elementosDesktop += nuevoElemento;
        if (index < 4) elementosMobile += nuevoElemento;
        // console.log(movimiento);
    }

    // console.log(movimientos);
    boxMovimientosDesktop.innerHTML = elementosDesktop;
    boxMovimientosMobile.innerHTML = elementosMobile;
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
