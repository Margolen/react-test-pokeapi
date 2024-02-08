import { createSlice } from '@reduxjs/toolkit';

export const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState: {
    value: [],
  },
  reducers: {
		setPokemons: (state, pokemons) => {
			state.value = pokemons;
		}
  },
})

export const { setPokemons } = pokemonSlice.actions
export default pokemonSlice.reducer;
