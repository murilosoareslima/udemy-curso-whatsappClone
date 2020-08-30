import { MODIFICA_EMAIL,
         MODIFICA_SENHA, 
         MODIFICA_NOME,
         CADASTRO_USUARIO_ERRO, 
         CADASTRO_USUARIO_SUCESSO, 
         LOGIN_USUARIO_ERRO,
         LOGIN_EM_ANDAMENTO,
         LOGIN_USUARIO_SUCESSO,
         USUARIO_CADASTRANDO
        } from "../actions/types";

const INITIAL_STATE = {
    nome: '',
    email: '',
    senha: '',
    erroCadastro: '',
    loginErro: '',
    loadingLogin: false,
    loadingCadastro: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MODIFICA_EMAIL:
            return { ...state, email: action.payload };
        case MODIFICA_SENHA:
            return { ...state, senha: action.payload };
        case MODIFICA_NOME:
            return { ...state, nome: action.payload };
        case CADASTRO_USUARIO_ERRO:
            return { ...state, erroCadastro: action.payload, loadingCadastro: false };
        case CADASTRO_USUARIO_SUCESSO:
            return { ...state, nome: '', senha: '' };
        case LOGIN_USUARIO_ERRO:
            return { ...state, loginErro: action.payload, loadingLogin: false };
        case LOGIN_EM_ANDAMENTO: 
            return {...state, loadingLogin: true};    
        case LOGIN_USUARIO_SUCESSO: 
            return {...state, ...INITIAL_STATE};                
        case USUARIO_CADASTRANDO:
            return { ...state, loadingCadastro: true};
        default: 
            return state;
    }  
}