import { MODIFICA_ADICIONA_CONTATO_EMAIL, 
    ADICIONA_CONTATO_ERRO, 
    ADICIONA_CONTATO_SUCESSO, 
    LISTA_CONTATO_USUARIO, 
    MODIFICA_MENSAGEM,
    LISTA_CONVERSA_USUARIO,
    ENVIA_MENSAGEM,
    LISTA_CONVERSAS_USUARIO } from "./types";
import b64 from 'base-64';
import firebase from 'firebase';
import 'firebase/firestore';
import _ from 'lodash';
import { Actions } from "react-native-router-flux";


export const modificaAdicionaContatoEmail = texto => {
    return {
        type: MODIFICA_ADICIONA_CONTATO_EMAIL,
        payload: texto
    }
}

export const adicionaContato = email => {
    return dispatch => {
        let email64 = b64.encode(email);
        firebase.firestore().collection("contatos").doc(email64).get().
            then(snapshot => {
                if(snapshot.exists) {                    
                    const { currentUser } = firebase.auth();                    
                    let emailUsuarioAutenticado = b64.encode(currentUser.email);

                    const dadosUsuario = _.first(_.values(snapshot.data()));

                    firebase.firestore().collection("usuarioContatos")
                        .doc(emailUsuarioAutenticado)                        
                        .set({ dadosUsuario: {email: email, nome: dadosUsuario}}, {merge: true})
                        .then(result => adicionaContatoSucesso(dispatch))
                        .catch(erro => adicionaContatoErro(erro.message, dispatch))
                } else {
                    dispatch({type: ADICIONA_CONTATO_ERRO, 
                              payload: 'E-mail informado não corresponde a um usuário válido!'})
                }
            })
    }    
}

const adicionaContatoErro = (erro, dispatch) => (
    dispatch( {
        type: ADICIONA_CONTATO_ERRO, 
        payload: erro
    })
)

const adicionaContatoSucesso = (dispatch) => (
    dispatch (
        {
            type: ADICIONA_CONTATO_SUCESSO,
            payload: true
        }
    )
)

export const habilitaInclusaoContato = () => (
    {
        type: ADICIONA_CONTATO_SUCESSO,
        payload: false
    }
)

export const contatosUsuariosFetch = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {        
        let emailUsuarioB64 = b64.encode( currentUser.email );        

        firebase.firestore().collection('usuarioContatos').doc(emailUsuarioB64)
        .onSnapshot(snapshot => {            
            dispatch({type: LISTA_CONTATO_USUARIO, payload: snapshot.data()})
        })
    }
}

export const modificaMensagem = (texto) => {
    return {
        type: MODIFICA_MENSAGEM,
        payload: texto
    }
}

export const enviaMensagem = ({mensagem, contatoNome, contatoEmail}) => {
    const { currentUser } = firebase.auth();

    return dispatch => {        
        const usuarioEmailB64 = b64.encode( currentUser.email );                
        const contatoEmailB64 = b64.encode( contatoEmail );                      

        firebase.firestore().collection('mensagens').doc(usuarioEmailB64).collection(contatoEmailB64)
        .add({ msg: {mensagem, tipo: 'e'}})
        .then(() => {
            firebase.firestore().collection('mensagens').doc(contatoEmailB64).collection(usuarioEmailB64)
            .add({ msg: {mensagem, tipo: 'r'}})
            .then(() => dispatch ({ type: ENVIA_MENSAGEM}))
        })        
        .then(() => {//armazenando cabecalhos das conversas para o usuario autenticado
            firebase.firestore().collection('usuarioConversas').doc(usuarioEmailB64).collection(contatoEmailB64)
            .add({ nome: contatoNome, email: contatoEmail })
        })
        .then(() => {//armazenando o cabecalho de conversa para o contato                        
            firebase.firestore().collection("contatos").doc(usuarioEmailB64).get().
            then(snapshot => {
                const dadosUsuario = _.first(_.values(snapshot.data()));                      
                firebase.firestore().collection('usuarioConversas').doc(contatoEmailB64).collection(usuarioEmailB64)
                .add({ nome: dadosUsuario, email: currentUser.email })
            })            
        })
    }
}

export const conversaUsuariosFetch = (contatoEmail) => {    
    const { currentUser } = firebase.auth();
    const usuarioEmailB64 = b64.encode( currentUser.email );                
    const contatoEmailB64 = b64.encode( contatoEmail );                      
    
    return(dispatch) => {        
        firebase.firestore().collection('mensagens').doc(usuarioEmailB64).collection(contatoEmailB64)
        .doc('RFRdHdIj3blUWBRZN56z').onSnapshot(snapshot => {
            dispatch({ type: LISTA_CONVERSA_USUARIO, payload: snapshot.data()})            
        })
    }
}

export const conversasUsuarioFetch = () => {
    const { currentUser } = firebase.auth();        
    
    return (dispatch) => {
        let usuarioEmailB64 = b64.encode( currentUser.email );         

        firebase.firestore().collection("usuarioConversas").doc(usuarioEmailB64)
        .onSnapshot(snapshot => {
            dispatch({type: LISTA_CONVERSAS_USUARIO, payload: snapshot.data()})
        })
    }
}