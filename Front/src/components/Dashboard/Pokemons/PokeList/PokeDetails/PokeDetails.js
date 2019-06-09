import React from 'react'

const PokeDetails = ({pokemon}) => {
    console.log(pokemon)
    return(
        <div style={{padding: "1rem", color: "black"}}>
            <h3 style={{textAlign: "center", marginBottom: "30px"}}>Więcej o Pokemonie</h3>
            
            <table className="table table-striped">
                <tbody>
                    <tr>
                    <td>Nazwa</td>
                    <td>{pokemon.name}</td>
                    </tr>
                    <tr>
                    <td>Type</td>
                    <td>{pokemon.type}</td>
                    </tr>
                    <tr>
                    <td>Pokedex ID</td>
                    <td>{pokemon.id}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default PokeDetails