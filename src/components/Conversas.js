import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { conversasUsuarioFetch } from '../actions/AppActions';
import _ from 'lodash'
import { Actions } from 'react-native-router-flux';


class Conversas extends Component {

    componentWillMount() {
        this.props.conversasUsuarioFetch();
        this.criaFonteDeDados(this.props.conversas);
    }

    componentWillReceiveProps(nextProps) {        
        this.criaFonteDeDados(nextProps.conversas);
    }

    criaFonteDeDados( conversas ) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

        this.fonteDeDados = ds.cloneWithRows(conversas)
    }

    renderRow(conversa) {
        return(
        <TouchableHighlight
            onPress={() => Actions.conversa({title: conversa.nome, contatoNome: conversa.nome, contatoEmail: conversa.email})}>
            <View style={styles.viewListView}>
                <Text style={styles.nomeListView}>{conversa.nome}</Text>
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
    const conversas = _.map(state.ListaConversasReducer, (val) => {
        return { ...val}
    })
    return { conversas }
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
    }
})


export default connect(mapStateToProps, {conversasUsuarioFetch})(Conversas);