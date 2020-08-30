import React,  { Component } from 'react';
import {View, Text, Button, TextInput, StyleSheet, TouchableHighlight, ImageBackground, ActivityIndicator} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, autenticarUsuario } from '../actions/AutenticacaoActions';

class FormLogin extends Component {

    _autenticarUsuario() {
        const {email, senha} = this.props;

        this.props.autenticarUsuario({email, senha});
    }

    //Renderizar o carregamendo de dados após clicar no botão login
    renderBtnAcessar() {
        if(this.props.loadingLogin) {
            return(
                <ActivityIndicator color="#FFFF" size="large"/>
            )
        }
        return(
            <Button title="Acessar" color="#115E54" onPress={() => this._autenticarUsuario()} />
        )
    }

    render() {
        return (
                <ImageBackground style={styles.imagemFundo} source={require('../imgs/bg.png')}>
                    <View style={styles.estrutura}>
                        <View style={styles.estruturaTitulo}>
                            <Text style={styles.titulo}>WhatsApp Clone</Text>
                        </View>
                        <View style={styles.estruturaCampos}>
                        <TextInput value={this.props.email} style={styles.campos} placeholder="E-mail" placeholderTextColor="#fff" onChangeText={texto => this.props.modificaEmail(texto)} />
                        <TextInput value={this.props.senha} secureTextEntry style={styles.campos} placeholder="Senha" placeholderTextColor="#fff" onChangeText={texto => this.props.modificaSenha(texto)} />
                        <TouchableHighlight onPress={() => Actions.formCadastro()}>
                            <Text style={styles.txt}>Ainda não tem cadastro? Cadastre-se</Text>
                        </TouchableHighlight>
                        <Text style={styles.msgErro}>{this.props.loginErro}</Text>
                        </View>
                        <View style={styles.estruturaBotao}>
                            {this.renderBtnAcessar()}                            
                        </View>
                    </View>
            </ImageBackground>
        );
    }
}    


const mapStateToProps = state => (
    {
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        loginErro: state.AutenticacaoReducer.loginErro,
        loadingLogin: state.AutenticacaoReducer.loadingLogin
    }
)

export default connect(mapStateToProps, { modificaEmail, modificaSenha, autenticarUsuario })(FormLogin);

const styles = StyleSheet.create( {
    imagemFundo: {
        flex: 1,
        width: null
    },
    estrutura: {
        flex: 1,
        padding: 10
    },
    estruturaTitulo: {
        marginTop: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titulo: {        
        fontSize: 25,
        color: '#fff'
    },
    estruturaCampos: {
        flex: 2
    },
    txt: {
        fontSize: 20,
        color: '#fff'
    },
    campos: {
        fontSize: 20,
    },
    estruturaBotao: {
        flex: 2
    },
    msgErro: {
        color: '#ff0000',
        fontSize: 18
    }
});