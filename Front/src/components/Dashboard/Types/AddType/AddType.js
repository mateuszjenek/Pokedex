import React, { Component } from 'react'

class AddType extends Component {

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
        var type = {
            name: this.state.name,
        }
        this.props.addTypeFun(type)
        this.props.closeModalFun()
    }
    render() {
        return(
            <form onSubmit={this.handleFormSubmit} style={{padding: "1rem"}}>
                <h3 style={{textAlign: "center", marginBottom: "30px"}}>Dodaj typ</h3>
                <div className="form-group">
                    <label for="name">Nazwa typu</label>       
                    <input type="text" class="form-control" id="name" placeholder="Wpisz nazwę" onChange={this.handleFormChange} />
                </div>
                <button type="submit" className="types-button" style={{width: "100%", marginTop: "15px"}}>Dodaj</button>
            </form>
        )
    }
}

export default AddType