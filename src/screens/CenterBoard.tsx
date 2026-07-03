import { Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./centerScreens/HomeScreen";
import UserScreen from "./centerScreens/UserScreen";
import ArtistScreen from "./centerScreens/ArtistScreen";
import PlaylistScreen from "./centerScreens/PlaylistScreen";
import AlbumScreen from "./centerScreens/AlbumScreen";

export function CenterBoard(){
    return(
        <div className="flex flex-col items-start justify-start
        border-transparent rounded-lg w-2/4 text-gray-300
        ">
            <Routes>
                <Route path="/" element={<Navigate to="/HomeScreen" replace />} />
                <Route path="/HomeScreen" element={<HomeScreen />} />
                <Route path="/UserScreen" element={<UserScreen name="Heitor Giometti" playlistNumber={5} />} />
                <Route path="/ArtistScreen/:artistId" element={<ArtistScreen />}/>
                <Route path="/PlaylistScreen/:playlistId" element={<PlaylistScreen />}/>
                <Route path="/AlbumScreen/:albumId" element={<AlbumScreen/>}/>
            </Routes>
        </div>
    )
}