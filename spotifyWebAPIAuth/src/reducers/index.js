import { combineReducers } from "redux";
import { alert } from "./alerts.reducer";
import { auth } from "./auth.reducer";
import { register } from "./register.reducer";
import { spotify } from "./spotify.reducer";
import { spotifySearch } from "./spotifySearch.reducer";
import { interceptor } from './interceptor.reducer';
import { nowPlaying } from "./player.reducer";

export default combineReducers({
    alert,
    auth,
    register,
    interceptor,
    spotify,
    spotifySearch,
    nowPlaying
});