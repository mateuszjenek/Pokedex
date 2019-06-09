import React from 'react'
import Popup from "reactjs-popup"
import PokeDetails from "./PokeDetails"
import EditPoke from "./EditPoke"
import AuthService from '../../../../services/AuthService'


const PokeList = ({list, editPokeFun, removePokeFun}) => {

    const EditButton = ({pokemon}) => {
        return(
            AuthService.role === "dr_oak_role" ? (
                <Popup trigger={<button className="pokemons-button" style={{float: "right", fontSize: "0.9rem"}}>edytuj</button>} modal closeOnDocumentClick>
                    { close => <EditPoke pokemon={pokemon} editPokeFun={editPokeFun} removePokeFun={removePokeFun} closeModalFun={close}/> }
                </Popup>
            ) : null
        )
    }

    const _list = list.length ? (
        list.map((pokemon) => {
            return(
                <div key={pokemon.id} style={{background: "#27ae60", borderRadius: "40px", paddingLeft: "1rem", marginBottom: "5px", color: "white"}}>
                
                <Popup trigger={(<span className="pokemons_name">{pokemon.name}</span>)} modal closeOnDocumentClick>
                    <PokeDetails pokemon={pokemon}/>
                </Popup>
                <EditButton pokemon={pokemon}/>
                
                </div>
            )
        })
    ) : (
        <p>W bazie danych nie ma żadnych pokemonów albo wczytywanie trwa wyjątkowo długo</p>
    )
    
    return(
        <div>
            {_list}
        </div>
    )
}

export default PokeList