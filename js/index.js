const pokemongenerated = document.getElementById("pokemongenerated");

const fetchPokemonRandom = () => {
const array = [];
const randomID = Math.floor(Math.random() * 386) + 1;

const url = `https://pokeapi.co/api/v2/pokemon/${randomID}`;
array.push(fetch(url).then((res) => res.json()));
Promise.all(array).then((results) => {
    const pokemon = results.map((data) => ({
        name: data.name,
        image: data.sprites["other"],
        type: data.types.map((type) => type.type.name).join(", "),
        typeCss: data.types.map((type) => type.type.name).join("--"),
        id: data.id,
        stats: data.stats.map((stat) => stat.stat.name).join(","),
        statsCss: data.stats.map((stat) => stat.stat.name).join("<br>"),
        statsNr: data.stats.map((base) => base.base_stat).join("<br>"),

    }));
    displayPokemonRandom(pokemon);
    console.log(results)
});
};
const displayPokemonRandom = (pokemon) => {
    const pokemonHTMLString = pokemon.map((pokemon) => 
    `<table class="table">
    <thead>
    <tr>
        <th scope="col">ID</th>
        <th scope="col">${pokemon.id}</th>
    </tr>
    <tr>
        <th scope="col">Name</th>
        <th scope="col">${pokemon.name.toUpperCase()}</th>
    </tr>
    <tr>
        <th scope="col">${pokemon.statsCss.toUpperCase()}</th>
        <td colspan="2">${pokemon.statsNr}</td>
    </tr>
    <tr>
        <th scope="col">Type</th>
        <td colspan="2">${pokemon.type.toUpperCase()}</td>
    </tr>
    </thead>
</table>`).join("")
;
const image = document.getElementById("pokemon_img");
image.src = pokemon[0].image.dream_world.front_default;
document.querySelector("#pokemonGenerated").innerHTML = pokemonHTMLString;
};

const fetchPokemon = () => {
    const buscador  = document.querySelector("#input_pokemon");
    buscador.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            e.preventDefault();
            return false;
        }
    });
    const button = document.querySelector("#search_pokemon");
    button.addEventListener("click", () => {
    const pokemon = buscador.value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((res) => res.json())
    .then((data) => {
        const pokemon = [{
            name: data.name,
            image: data.sprites["other"],
            type: data.types.map((type) => type.type.name).join(", "),
            typeCss: data.types.map((type) => type.type.name).join("--"),
            id: data.id,
            stats: data.stats.map((stat) => stat.stat.name).join(","),
            statsCss: data.stats.map((stat) => stat.stat.name).join("<br>"),
            statsNr: data.stats.map((base) => base.base_stat).join("<br>"),
        }];
        Swal.fire({
            title: 'Pokemon found!',
            text: 'These are your stats',
            imageUrl: `${pokemon[0].image.dream_world.front_default}`,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        })
        displayPokemon(pokemon);
    })
    .catch((e) => {
        Swal.fire({
            icon: 'error',
            title: 'Pokemon not found',
            text: 'Try another pokemon',});
        });
});
    };
const displayPokemon = (pokemon) => {
        const pokemonHTMLString = pokemon.map((pokemon) => 
        `<table class="table">
        <thead>
        <tr>
            <th scope="col">ID</th>
            <th scope="col">${pokemon.id}</th>
        </tr>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">${pokemon.name.toUpperCase()}</th>
        </tr>
        <tr>
            <th scope="col">${pokemon.statsCss.toUpperCase()}</th>
            <td colspan="2">${pokemon.statsNr}</td>
        </tr>
        <tr>
            <th scope="col">Type</th>
            <td colspan="2">${pokemon.type.toUpperCase()}</td>
        </tr>
        </thead>
    </table>`)
    ;
    const image = document.getElementById("pokemon_img");
    image.src = pokemon[0].image.dream_world.front_default;
    document.querySelector("#pokemonGenerated").innerHTML = pokemonHTMLString;
    };

fetchPokemonRandom();
fetchPokemon();