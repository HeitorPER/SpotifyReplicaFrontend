import HomeScreen from "./centerScreens/HomeScreen";

export function CenterBoard(){
    return(
        <div className="flex flex-col items-start justify-start
        border-transparent rounded-lg w-2/4 text-gray-300
        ">
            <HomeScreen/>
        
        </div>
    )
}