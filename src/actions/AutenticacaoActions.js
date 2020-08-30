import firebase from 'firebase';
import { YellowBox } from 'react-native';
import 'firebase/firestore';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';
import { LOGIN_USUARIO_SUCESSO, 
         LOGIN_USUARIO_ERRO, 
         LOGIN_EM_ANDAMENTO,
         CADASTRO_USUARIO_SUCESSO, 
         CADASTRO_USUARIO_ERRO, 
         MODIFICA_NOME, 
         MODIFICA_SENHA, 
         MODIFICA_EMAIL, 
         USUARIO_CADASTRANDO
        } from './types';

YellowBox.ignoreWarnings(['Setting a timer']);

export const modificaEmail = (texto) => {
    return {
        type: MODIFICA_EMAIL,
        payload: texto
    }
}

export const modificaSenha = (texto) => {
    return {
        type: MODIFICA_SENHA,
        payload: texto
    }
}

export const modificaNome = (texto) => {
    return {
        type: MODIFICA_NOME,
        payload: texto
    }
}

export const cadastraUsuario = ({nome, email, senha}) => {
    return dispatch => {

        dispatch({type: USUARIO_CADASTRANDO});

        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(user => {
                let emailB64 = b64.encode(email);
                //se criou usuario no authentication, salva ele em banco
                firebase.firestore().collection('contatos').doc(emailB64).set({nome})
                .then(value => cadastroUsuarioSucesso(dispatch))                
            })
            .catch(erro => cadastroUsuarioErro(erro, dispatch));
    }
}

const cadastroUsuarioSucesso = (dispatch) => {
    dispatch({type: CADASTRO_USUARIO_SUCESSO});
    Actions.principal();
}

const cadastroUsuarioErro = (erro, dispatch) => {
    dispatch({type: CADASTRO_USUARIO_ERRO, payload: erro.message});    
}

export const autenticarUsuario = ({email, senha}) => {
    return dispatch => {

        //Para avisar a tela que tem q renderizar o carregamento de dados
        dispatch({type: LOGIN_EM_ANDAMENTO});

        firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(result => loginUsuarioSucesso(dispatch))
        .catch(erro => loginUsuarioErro(erro, dispatch));
    }
}

const loginUsuarioSucesso = (dispatch) => {
    dispatch({type: LOGIN_USUARIO_SUCESSO});
    Actions.principal();
}

const loginUsuarioErro = (erro, dispatch) => {
    dispatch({type: LOGIN_USUARIO_ERRO, payload: erro.message});    
}