import React from 'react'
import AuthService from '../../../../services/AuthService'

const TypeList = ({list, removeTypeFun}) => {

    const DeleteButton = ({type}) => {
        return(
            AuthService.role === "dr_oak_role" ? (
                <button onClick={() => removeTypeFun(type)} className="types-button types-button-delete" style={{float: "right", fontSize: "0.9rem"}}>usuń</button>
            ) : null
        )
    }
    
    const _list = list.length ? (
        list.map((type) => {
            return(
                <div key={type.id} style={{background: "#27ae60", borderRadius: "40px", paddingLeft: "1rem", marginBottom: "5px", color: "white"}}>
                
                <span>{type.name}</span>
                <DeleteButton type={type}/>
                </div>
            )
        })
    ) : (
        <p>W bazie danych nie ma żadnych typów albo wczytywanie trwa wyjątkowo długo</p>
    )
    
    return(
        <div>
            {_list}
        </div>
    )
}

export default TypeList