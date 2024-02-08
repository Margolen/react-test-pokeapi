import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";

export const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState: {
    value: [],
		count: 0,
  },
  reducers: {
		setPokemons: (state, pokemons) => {
			state.value = pokemons;
		},
		setPokemonCount: (state, count) => {
			state.count = count;
		}
  },
})

export const updatePokemonsAsync = (offset, limit) => (dispatch) => {
	axios
		.get("https://pokeapi.co/api/v2/pokemon/", {
			params: {
				offset: offset,
				limit: limit,
			},
		})
		.then((response) => {
			dispatch(setPokemons(response.data.results));
			dispatch(setPokemonCount(response.data.count));
		});
}

export const { setPokemons, setPokemonCount, updatePokemons } = pokemonSlice.actions
export default pokemonSlice.reducer;
