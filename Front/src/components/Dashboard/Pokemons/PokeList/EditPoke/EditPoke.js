import React, { Component } from 'react'

class EditPoke extends Component {
    constructor(params) {
        super(params)
        this.state = {
            id: params.pokemon.id,
            name: params.pokemon.name
        }
        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.removePokemon = this.removePokemon.bind(this)
    }

    handleFormChange(e) {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleFormSubmit(e) {
        e.preventDefault()
        var pokemon = {
            id: this.state.id,
            name: this.state.name
        }
        this.props.editPokeFun(pokemon)
        this.props.closeModalFun()
    }

    removePokemon(id) {
        console.log(this)
        this.props.removePokeFun(id)
        this.props.closeModalFun()
    }

    render() {
        return(
            <form onSubmit={this.handleFormSubmit} style={{padding: "1rem", color: 'black'}}>
                <h3 style={{textAlign: "center", marginBottom: "30px"}}>Edycja Pokemona</h3>
                <div className="form-group">
                    <label htmlFor="name">Nazwa Pokemona</label>       
                    <input type="text" className="form-control" id="name" placeholder="Wpisz nazwę" value={this.state.name} onChange={this.handleFormChange} />
                </div>
                
                <button type="submit" className="pokemons-button" style={{width: "100%", marginTop: "15px"}}>Edytuj</button>
                <button type="button" onClick={this.removePokemon} className="pokemons-button pokemons-button-delete" style={{width: "100%", marginTop: "5px"}}>Usuń</button>
            </form>
        )
    }
}

export default EditPoke