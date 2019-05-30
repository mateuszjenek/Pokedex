import React from 'react'
import Popup from "reactjs-popup"
import PokeDetails from "./PokeDetails"
import EditPoke from "./EditPoke"


const PokeList = ({list, editPokeFun, removePokeFun}) => {
    const _list = list.length ? (
        list.map((pokemon) => {
            return(
                <div key={pokemon.id} style={{background: "#27ae60", borderRadius: "40px", paddingLeft: "1rem", marginBottom: "5px", color: "white"}}>
                
                <Popup trigger={(<span className="pokemons_name">{pokemon.name}</span>)} modal closeOnDocumentClick>
                    <PokeDetails pokemon={pokemon}/>
                </Popup>
                <Popup trigger={<button className="pokemons-button" style={{float: "right", fontSize: "0.8rem"}}>edytuj</button>} modal closeOnDocumentClick>
                    { close => <EditPoke pokemon={pokemon} editPokeFun={editPokeFun} removePokeFun={removePokeFun} closeModalFun={close}/> }
                </Popup>
                
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