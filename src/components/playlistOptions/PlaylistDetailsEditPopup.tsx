import { ImagePlaceholder } from "../ImagePlaceholder";

export function PLaylistDeatilsEditPopup(){
    return(
        <div>
            <h2>Editar os detalhes</h2>
            <div className="flex ">
                <ImagePlaceholder
                type="playlist"/>
                <input></input>
                <input></input>
            </div>
            <div>
                <button>Tornar Privada</button>
                <button>Salvar</button>
            </div>
        </div>
    )
}