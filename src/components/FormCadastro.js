import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, ImageBackground, Text, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { modificaSenha, modificaEmail, modificaNome, cadastraUsuario } from '../actions/AutenticacaoActions';

class FormCadastro extends Component {

    _cadastraUsuario() {
        const {nome, email, senha} = this.props;
        //é o mesmo q fazer
        //const nome = this.props.nome;
        //const email = this.props.email;
        //const senha = this.props.senha
        this.props.cadastraUsuario({nome, email, senha});
    }

    renderBtnCadastrar() {
        if(this.props.loadingCadastro) {
            return(
                <ActivityIndicator size="large"/>
            )
        }
        return(
            <Button title="Cadastrar" color="#115E54" onPress={() => this._cadastraUsuario()} />
        )
    }
    render() {
        return(
            <ImageBackground style={styles.imagemFundo} source={require('../imgs/bg.png')}>
                <View style={styles.estrutura}>
                    <View style={styles.estruturaCampos}>
                        <TextInput value={this.props.nome} style={styles.campos} placeholder="Nome" placeholderTextColor="#fff" onChangeText={texto => this.props.modificaNome(texto)}/>
                        <TextInput style={styles.campos} placeholder="E-mail" placeholderTextColor="#fff" onChangeText={texto => this.props.modificaEmail(texto)}/>
                        <TextInput style={styles.campos} secureTextEntry placeholder="Senha" placeholderTextColor="#fff" onChangeText={texto => this.props.modificaSenha(texto)}/>
                        <Text style={styles.msgErro}>{this.props.erroCadastro}</Text>
                    </View>
                    <View style={styles.estruturaBotao}>
                        {this.renderBtnCadastrar()}
                    </View>
                </View>
            </ImageBackground>    
        );
    }
}

const mapStateToProps = state => ({
    nome: state.AutenticacaoReducer.nome,
    email: state.AutenticacaoReducer.email,
    senha: state.AutenticacaoReducer.senha,
    erroCadastro: state.AutenticacaoReducer.erroCadastro,
    loadingCadastro: state.AutenticacaoReducer.loadingCadastro
});

export default connect(mapStateToProps, { modificaEmail, modificaSenha, modificaNome, cadastraUsuario })(FormCadastro);

const styles = StyleSheet.create({
    imagemFundo: {
        flex: 1,
        width: null
    },
    estrutura: {
        flex: 1,
        padding: 10
    },
    estruturaCampos: {
        flex: 4,
        justifyContent: 'center'
    },
    estruturaBotao: {
        flex: 1
    },
    campos: {
        fontSize: 20
    },
    msgErro: {
        color: '#ff0000',
        fontSize: 18
    }
}); 
