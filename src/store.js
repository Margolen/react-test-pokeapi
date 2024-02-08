import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./Features/pokemonSlice";

export default configureStore({
	reducer: {
		pokemons: pokemonReducer,
	}
});