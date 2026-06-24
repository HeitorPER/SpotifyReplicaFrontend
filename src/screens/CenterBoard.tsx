import { Routes, Route } from "react-router-dom";
import HomeScreen from "./centerScreens/HomeScreen";
import UserScreen from "./centerScreens/UserScreen";

export function CenterBoard(){
    return(
        <div className="flex flex-col items-start justify-start
        border-transparent rounded-lg w-2/4 text-gray-300
        ">
            <Routes>
                <Route path="/HomeScreen" element={<HomeScreen />} />
                <Route path="/UserScreen" element={<UserScreen name="Heitor Giometti" playlistNumber={5} />} />
            </Routes>
        </div>
    )
}