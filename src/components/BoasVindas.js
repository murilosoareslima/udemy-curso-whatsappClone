import React from 'react';
import { View, Text, Button, Image, StyleSheet, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default props => (
    <ImageBackground style={styles.imagemFundo} source={require('../imgs/bg.png')}>
        <View style={styles.estrutura}>
            <View style={styles.estruturaTitulo}>
                <Text style={styles.titulo}>Seja Bem Vindo</Text>        
                <Image source={require('../imgs/logo.png')} />
            </View>
            <View style={styles.estruturaButton}>
                <Button title="Fazer Login" onPress={() => Actions.formLogin()}/>
            </View>
        </View>
    </ImageBackground>
);

const styles = StyleSheet.create({    
    estrutura: {
        flex: 1,
        padding: 15        
    },
    estruturaTitulo: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    estruturaButton: {
        flex: 1
    },
    imagemFundo: {
        flex: 1,
        width: null
    },
    titulo: {        
        fontSize: 20,
        color: '#ffffff'
    }
});