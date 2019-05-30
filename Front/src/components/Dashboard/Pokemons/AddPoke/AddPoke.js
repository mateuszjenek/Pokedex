import React, { Component } from 'react'

class AddPoke extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
        }
        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }
    handleFormChange(e) {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleFormSubmit(e) {
        e.preventDefault()
        var pokemon = {
            name: this.state.name,
        }
        console.log(this.state.addPokemon)
        this.props.addPokeFun(pokemon)
        this.props.closeModalFun()
    }
    render() {
        return(
            <form onSubmit={this.handleFormSubmit} style={{padding: "1rem"}}>
                <h3 style={{textAlign: "center", marginBottom: "30px"}}>Dodaj Pokemona</h3>
                <div className="form-group">
                    <label for="name">Nazwa Pokemona</label>       
                    <input type="text" class="form-control" id="name" placeholder="Wpisz nazwę" onChange={this.handleFormChange} />
                </div>
                <button type="submit" className="pokemons-button" style={{width: "100%", marginTop: "15px"}}>Dodaj</button>
            </form>
        )
    }
}

export default AddPoke