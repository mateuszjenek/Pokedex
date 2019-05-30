import React, { Component } from 'react'
import TypeList from './TypeList/TypeList'
import DBService from '../../../services/DBService'
import './Types.css'
import Popup from 'reactjs-popup'
import AddType from './AddType/AddType'

class Types extends Component {
    constructor(props) {
        super(props)
        this.state = {
            types: []
        }
        this.getTypes = this.getTypes.bind(this)
        this.addType = this.addType.bind(this)
        this.removeType = this.removeType.bind(this)
        this.updateUnlessError = this.updateUnlessError.bind(this)
    }
    componentDidMount() {
        this.getTypes()
    }

    updateUnlessError(res) {
        if(res.message === "OK") {
            this.getTypes();
        } else {
            alert(res.message)
        }
    }

    getTypes() {
        DBService.getTypeList().then(res => {
            this.setState({
                types: res
            })
        })
    }

    removeType(id) {
        DBService.removeType(id)
            .then(res => this.updateUnlessError(res))
    }

    addType(type) {
        DBService.addType(type)
            .then(res => this.updateUnlessError(res))
    }

    render() {
        return(
            <div style={{background: "#2ecc71", borderRadius: "40px", padding:"1rem"}}>
                <h4 style={{textAlign: "center", marginBottom: "20px"}}>Typy</h4>
                <TypeList list={this.state.types} removeTypeFun={this.removeType}/>
                <Popup trigger={(<button className="types-button" style={{width: "100%", marginTop: "20px"}}>Dodaj typ</button>)} modal closeOnDocumentClick>
                    { close => <AddType addTypeFun={this.addType} closeModalFun={close}/> }
                </Popup>
            </div>
        )
    }
}

export default Types