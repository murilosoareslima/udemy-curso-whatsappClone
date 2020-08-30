import { 
    MODIFICA_ADICIONA_CONTATO_EMAIL, 
    ADICIONA_CONTATO_ERRO, 
    ADICIONA_CONTATO_SUCESSO,
    MODIFICA_MENSAGEM,
    ENVIA_MENSAGEM
} from "../actions/types";

const INICIAL_STATE = {
    adiciona_contato_email: '',
    cadastro_resultado_txt_erro: '',    
    cadastro_resultado_inclusao: false,
    mensagem: ''
};

export default (state = INICIAL_STATE, action) => {
    switch(action.type) {
        case MODIFICA_ADICIONA_CONTATO_EMAIL:
            return {...state, adiciona_contato_email: action.payload}
        case ADICIONA_CONTATO_ERRO: 
            return {...state, cadastro_resultado_txt_erro: action.payload}
        case ADICIONA_CONTATO_SUCESSO:
            return {...state, adiciona_contato_email: '', cadastro_resultado_txt_erro: '',
                    cadastro_resultado_inclusao: action.payload}
        case MODIFICA_MENSAGEM:
            return {...state, mensagem: action.payload}
        case ENVIA_MENSAGEM: 
            return {...state, mensagem: ''}
        default:
            return state;
    }
}