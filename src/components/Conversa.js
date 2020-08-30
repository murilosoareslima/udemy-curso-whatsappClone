import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, Text, StyleSheet, TextInput, TouchableHighlight, Image, ListView} from 'react-native';
import { modificaMensagem, enviaMensagem, conversaUsuariosFetch } from '../actions/AppActions';
import _ from 'lodash';

class Conversa extends Component {

    componentWillMount() {        
        this.props.conversaUsuariosFetch(this.props.contatoEmail);
        this.criaFonteDeDados(this.props.conversa);
    }

    componentWillReceiveProps(nextProps) {
        //evitando que ao sair de uma conversa e entrar em outra rapidamente
        //o router flux, mantenha a conversa anterior, afinal, o router flux demora
        //um pouco para destruir o componente anterior
        if(this.props.contatoEmail != nextProps.contatoEmail) {
            this.props.conversaUsuariosFetch(nextProps.contatoEmail);
        }
        this.criaFonteDeDados(nextProps.conversa);
    }

    criaFonteDeDados( conversa ) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2});
        this.dataSource = ds.cloneWithRows(conversa);
    }

    renderRow(texto) {
        if(texto.tipo === 'e') {
            return (
                <View style={styles.viewMsgEnviada}>
                    <Text style={styles.msgEnviada}>{texto.mensagem}</Text>                    
                </View>                
            )
        }
        return (
            <View style={styles.viewMsgRecebida}>
                <Text style={styles.msgRecebida}>{texto.mensagem}</Text>
            </View>
        )
    }

    _enviaMensagem() {
        const { mensagem, contatoNome, contatoEmail } = this.props;
        this.props.enviaMensagem({mensagem, contatoNome, contatoEmail});
    }

    render() {
        return(
            <View style={styles.viewConversa}>
                <View style={styles.viewMensagens}>
                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={data => this.renderRow(data)}
                    />             
                </View>
                <View style={styles.viewMensagem}>
                    <TextInput
                        value={this.props.mensagem}
                        onChangeText={texto => this.props.modificaMensagem(texto)}
                        style={styles.textInput}
                    />
                    <TouchableHighlight
                        onPress={() => this._enviaMensagem()} 
                        underlayColor="#fff"                                       
                    >
                        <Image source={require('../imgs/enviar_mensagem.png')} />
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewConversa: {
        flex: 1,
        backgroundColor: "#eee4dc",
        padding: 10
    },
    viewMensagens: {
        flex: 1,
        paddingBottom: 20
    },
    viewMensagem: {
        flexDirection: 'row',
        height: 60
    },
    textInput: {
        flex: 4,
        backgroundColor: '#fff',
        fontSize: 18
    },
    viewMsgEnviada: {
        alignItems: 'flex-end',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 40
    },
    msgEnviada: {
        fontSize: 18,
        color: '#000',
        padding: 10,
        backgroundColor: '#dbf5b4',
        elevation: 1
    },
    viewMsgRecebida: {
        alignItems: 'flex-start',
        marginTop: 5,
        marginBottom: 5,
        marginRight: 40
    },
    msgRecebida: {
        fontSize: 18,
        color: '#000',
        padding: 10,
        backgroundColor: '#f7f7f7',
        elevation: 1
    }
})

mapStateToProps = state => {
    const conversa = _.map(state.ListaConversaReducer, (val) => {
        return { ...val };
    });
    return ({
        conversa: conversa,
        mensagem: state.AppReducer.mensagem
    })
}

export default connect(mapStateToProps, { modificaMensagem, enviaMensagem, conversaUsuariosFetch })(Conversa);
