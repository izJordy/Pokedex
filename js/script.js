const pokemonHandler = async (e) => {
  e.preventDefault();

  const input = document.getElementById("search-pokemon").value.toLowerCase();
  const img = document.getElementById("img");
  const message = document.getElementById("message");
  const buttonShiny = document.getElementById("button-shiny");
  const buttonArt = document.getElementById("button-art");

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      const pokemonShiny = data.sprites.other["official-artwork"].front_shiny;
      const pokemonDefault = data.sprites.other["official-artwork"].front_default;

      img.src = (img.src === pokemonDefault) ? pokemonShiny : pokemonDefault;

      message.innerHTML = `
        name: ${data.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        height: ${data.height}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        weight: ${data.weight}`

        buttonShiny.textContent = (img.src === pokemonDefault) ? 'SHINY' : 'DEFAULT';
        buttonShiny.style.display = "flex";
        buttonArt.style.display = "flex";

    } else {
      throw new Error(`code ${response.status}`);
    };

  } catch (error) {
    console.error(error);
  };
};

const changeArtHandler = async () => {
  const input = document.getElementById("search-pokemon").value.toLowerCase();
  const img = document.getElementById("img");
  const buttonShiny = document.getElementById("button-shiny");

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    
    if (response.ok) {
      const data = await response.json();
      const dreamworkArt = data.sprites.other["dream_world"].front_default;
      const pokemonDefault = data.sprites.other["official-artwork"].front_default;

      img.src = (img.src === dreamworkArt) ? pokemonDefault : dreamworkArt;

      buttonShiny.textContent = (img.src === pokemonDefault) ? 'SHINY' : 'DEFAULT';

    } else {
      throw new Error(`code ${response.status}`);
    }

  } catch (error) {
    console.error(error);
  }
};

document.getElementById("button-shiny").addEventListener("click", pokemonHandler);
document.getElementById("form").addEventListener("submit", pokemonHandler);
document.getElementById("button-art").addEventListener("click", changeArtHandler);
