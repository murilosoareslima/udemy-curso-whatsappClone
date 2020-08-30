import { LISTA_CONTATO_USUARIO } from "../actions/types";

const INICIAL_STATE = {};

export default (state = INICIAL_STATE, action) => {
    switch(action.type) {
        case LISTA_CONTATO_USUARIO:            
            return action.payload
        default: 
            return state;
    }
}