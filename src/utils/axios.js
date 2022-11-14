import Axios from 'axios';

const createAxios = (basrUrl) => {
  return Axios.create({
    baseURL: basrUrl
  });
};

const pokemonApiV2 = createAxios('https://pokeapi.co/api/v2/');

export { pokemonApiV2 };
