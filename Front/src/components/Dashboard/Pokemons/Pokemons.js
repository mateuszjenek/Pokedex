import React, { Component } from 'react'
import PokeList from './PokeList'
import DBService from '../../../services/DBService'
import './Pokemons.css'
import Popup from 'reactjs-popup'
import AddPoke from './AddPoke'

class Pokemons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemons: []
        }
        this.getPokemons = this.getPokemons.bind(this)
        this.addPokemon = this.addPokemon.bind(this)
        this.editPokemon = this.editPokemon.bind(this)
        this.removePokemon = this.removePokemon.bind(this)
        this.updateUnlessError = this.updateUnlessError.bind(this)
    }
    componentDidMount() {
        this.getPokemons()
    }

    updateUnlessError(res) {
        if(res.message === "OK") {
            this.getPokemons();
        } else {
            alert(res.message)
        }
    }

    getPokemons() {
        DBService.getPokemonList().then(res => {
            this.setState({
                pokemons: res
            })
        })
    }

    editPokemon(pokemon) {
        DBService.updatePokemon(pokemon)
            .then(res => this.updateUnlessError(res))
    }

    removePokemon(id) {
        DBService.removePokemon(id)
            .then(res => this.updateUnlessError(res))
    }

    addPokemon(pokemon) {
        DBService.addPokemon(pokemon)
            .then(res => this.updateUnlessError(res))
    }

    render() {
        return(
            <div style={{background: "#2ecc71", borderRadius: "40px", padding:"1rem"}}>
                <h4 style={{textAlign: "center", marginBottom: "20px"}}>Pokemony</h4>
                <PokeList list={this.state.pokemons} editPokeFun={this.editPokemon} removePokeFun={this.removePokemon}/>
                <Popup trigger={(<button className="pokemons-button" style={{width: "100%", marginTop: "20px"}}>Dodaj Pokemona</button>)} modal closeOnDocumentClick>
                    { close => <AddPoke addPokeFun={this.addPokemon} closeModalFun={close}/> }
                </Popup>
            </div>
        )
    }
}

export default Pokemons