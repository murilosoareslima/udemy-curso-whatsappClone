import React from 'react';
import { View, Text, StatusBar, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { habilitaInclusaoContato } from '../actions/AppActions';


const TabBarMenu = props => (
    <View style={styles.tela}>
        <StatusBar backgroundColor="#114D44" />

        <View style={styles.barraTitulo}>
            <View style={styles.tituloView}>
                <Text style={styles.tituloText}>WhatsApp Clone</Text>            
            </View>
            <View style={styles.barraAdicionarSair}>
                <View style={styles.imagemAdicionar}>
                    <TouchableHighlight 
                      onPress={() => { Actions.adicionarContato(); props.habilitaInclusaoContato() }}
                      underlayColor='#114D44'>
                        <Image source={require('../imgs/adicionar-contato.png')}/>
                    </TouchableHighlight>
                </View>
                <View style={styles.viewBotaoSair}>
                <TouchableHighlight 
                    onPress={() => firebase.auth().signOut().then(() => Actions.formLogin())}
                    underlayColor='#114D44'>
                    <Text style={styles.textoBotaoSair}>Sair</Text>
                </TouchableHighlight>
                </View>
            </View>
        </View>

        <TabBar {...props} style={styles.tabBar}/>
    </View>
);

export default connect(null, { habilitaInclusaoContato })(TabBarMenu);

const styles = StyleSheet.create({
    tela: {
        backgroundColor: "#115E54",
        elevation: 4,
        marginBottom: 6        
    },
    barraTitulo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    barraAdicionarSair: {
        flexDirection: 'row',
        marginRight: 20
    },
    tituloView: {
        height: 50,
        justifyContent: 'center',        
    },
    tituloText: {
        color: "#fff",
        fontSize: 20,
        marginLeft: 20
    }, 
    imagemAdicionar: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoBotaoSair: {
        fontSize: 20,
        color: '#fff'
    },
    viewBotaoSair: {        
        justifyContent: 'center'
    },
    tabBar: {
        backgroundColor: "#115E54",
        elevation: 0
    }
});
