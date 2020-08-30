import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { modificaAdicionaContatoEmail, adicionaContato } from '../actions/AppActions';


class AdicionarContato extends Component {
    renderAdicionarContato() {
        if(!this.props.cadastro_resultado_inclusao) {
            return (
                <View style={styles.estruturaTelaPrincipal}>
                <View style={styles.estruturaCampos}>
                    <TextInput
                        placeholder='E-mail'
                        style={styles.inputEmail}
                        onChangeText={(texto) => this.props.modificaAdicionaContatoEmail(texto)}
                        value={this.props.adiciona_contato_email}
                    />
                </View>    
                <View style={styles.estruturaBotao}>
                    <Button title="Adicionar" color="#115E54" 
                    onPress={() => this.props.adicionaContato(this.props.adiciona_contato_email)}/>

                    <Text style={styles.msgErro}>
                        {this.props.cadastro_resultado_txt_erro}
                    </Text>
                </View>  
                </View>
        )              
        } else {
            return (
                <View>
                    <Text style={styles.msgSucesso}> Cadastro realizado com sucesso! </Text>
                </View>
            )
        }
    }

     render() {
         return (
            <View style={styles.estruturaTelaSecundaria}>
            {this.renderAdicionarContato()}
            </View>
         )
     }
}

const mapStateToProps = state => (
    {
        adiciona_contato_email: state.AppReducer.adiciona_contato_email,
        cadastro_resultado_txt_erro: state.AppReducer.cadastro_resultado_txt_erro,
        cadastro_resultado_inclusao: state.AppReducer.cadastro_resultado_inclusao
    }
)

export default connect(mapStateToProps, {modificaAdicionaContatoEmail, adicionaContato})(AdicionarContato);

const styles = StyleSheet.create({
    estruturaTelaPrincipal: {
        flex: 1
    },
    estruturaTelaSecundaria: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    estruturaCampos: {
        flex: 1,
        justifyContent: 'center'
    },
    estruturaBotao: {
        flex: 1
    },
    inputEmail: {
        fontSize: 20,
        height: 45
    },
    msgErro: {
        color: '#ff0000',
        fontSize: 20
    },
    msgSucesso: {
        fontSize: 20
    }

});