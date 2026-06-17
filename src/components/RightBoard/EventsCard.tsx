function SingleEventCard(){
    return(
        <div className="w-full items-center justify-start flex gap-x-4">
            <div className="aspect-square border-transparent border rounded-lg bg-[#121212]
            flex flex-col items-center w-15 h-15 justify-center">
                <h2 className="text-sm">Mai.</h2>
                <h2 className="font-bold text-white text-2xl">24</h2>
            </div>
            <div className="">
                <h2 className="text-white font-bold">Los Angeles</h2>
                <h2>LNGSHOT, P1Harmony e Jay Park</h2>
                <h2>dom., 18:00 Peacock Theather</h2>
            </div>
        </div>
    )
}

export function EventsCard(){
    return(
        <div className="flex flex-col items-center justify-start bg-[#1F1F1F]
        rounded-lg w-full text-gray-300
        cursor-pointer gap-2 py-3 px-5">
            <div className="justify-start flex items-start w-full">
                <h2 className="font-bold text-white">Em turnê</h2>
            </div>
            <div className="w-full">
                <SingleEventCard/>
            </div>
        </div>
    )
}