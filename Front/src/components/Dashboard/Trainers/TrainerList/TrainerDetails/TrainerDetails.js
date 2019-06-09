import React from 'react'
import DBService from '.././../../../../services/DBService'

class TrainerDetails extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            trainer: props.trainer,
            trainerPokemons: []
        }
        this._renderList = this._renderList.bind(this)
        this.catchedPokemon = this.catchedPokemon.bind(this)
    }

    componentDidMount() {
        DBService.getTrainerPokemons(this.state.trainer).then(res => {
            this.setState({
                trainerPokemons: res
            })
        })
    }

    _renderList() {
        console.log("this.state.trainerPokemons")
        console.log(this.state.trainerPokemons)
        return this.state.trainerPokemons.length ? (
            this.state.trainerPokemons.map((pokemon) => {
                return(
                    <tr>
                        <td>{pokemon.name}</td>
                    </tr>
                )
            })
        ) : null
    }

    catchedPokemon() {
        console.log("this.state.trainerPokemons")
        console.log(this.state.trainerPokemons)
        return this.state.trainerPokemons.length ? (
            <table className="table table-striped">
                <tbody>
                    <this._renderList />
                </tbody>
            </table>
        ) : (<p>W bazie danych nie ma żadnych trenerów albo wczytywanie trwa wyjątkowo długo</p>)
    }

    render(){
    return(
        <div style={{padding: "1rem", color: "black"}}>
            <h3 style={{textAlign: "center", marginBottom: "30px"}}>Więcej o Trenerze</h3>
            
            <table className="table table-striped">
                <tbody>
                    <tr>
                    <td>Nazwa</td>
                    <td>{this.state.trainer.name}</td>
                    </tr>
                    <tr>
                    <td>ID</td>
                    <td>{this.state.trainer.id}</td>
                    </tr>
                </tbody>
            </table>

            <h4>Złapane Pokemony</h4>
            <this.catchedPokemon />
        </div>
    )
    }
    
}

export default TrainerDetails