import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { contatosUsuariosFetch } from '../actions/AppActions';
import _ from 'lodash'
import { Actions } from 'react-native-router-flux';

class Contatos extends Component {

    componentWillMount () {
        this.props.contatosUsuariosFetch();
        
        this.criaFonteDeDados(this.props.contatos);
    }

    componentWillReceiveProps(nextProps) {        
        this.criaFonteDeDados(nextProps.contatos)
    }

    criaFonteDeDados( contatos ) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

        this.fonteDeDados = ds.cloneWithRows(contatos)
    }

    renderRow(contato) {
        return (
            <TouchableHighlight
                //passando parametros pelo routerFlux e alterando o title da sena 
                onPress={() => Actions.conversa({ title: contato.nome, contatoNome: contato.nome, contatoEmail: contato.email})}
            >
                <View style={styles.viewListView}>
                    <Text style={styles.nomeListView}>{contato.nome}</Text>
                    <Text style={styles.emailListView}>{contato.email}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <ListView
                enableEmptySections
                dataSource={this.fonteDeDados}
                renderRow={data => this.renderRow(data)}            
            />
        );
    }
}

mapStateToProps = state => {
    const contatos = _.map(state.ListaContatosReducer, (val) => {
        return { ...val }
    })
    return { contatos }
}

const styles = new StyleSheet.create({
    viewListView: {
        flex: 1,
        padding: 20,
        borderBottomWidth: 1,
        borderColor: "#CCC"
    },
    nomeListView: {
        fontSize: 25
    },
    emailListView: {
        fontSize: 18
    }
})

export default connect(mapStateToProps, { contatosUsuariosFetch })(Contatos);