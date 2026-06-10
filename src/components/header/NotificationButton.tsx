import { useState } from "react";
import { IoMdNotificationsOutline, IoMdNotifications  } from "react-icons/io";

export function NotificationButton(){

    const [selected, setSelected] = useState(false);
    
    return(
        <button>
            {selected
                ? <IoMdNotifications
                    size={25}
                    className="text-white cursor-pointer ease-out duration-300"
                    onClick={() => setSelected(!selected)} 
                />
                : <IoMdNotificationsOutline
                    size={25}
                    className="text-gray-400 cursor-pointer ease-out duration-300"
                    onClick={() => setSelected(!selected)} 
                 />
            }
        </button>
    )
}