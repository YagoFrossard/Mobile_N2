import { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FotoContato from '../FotoContato';
import { useNavigation } from '@react-navigation/native';

export default function MiniContato(props) {

    const navigator = useNavigation();

    const abrirConversa = () => {
        navigator.navigate('Conversa', props);
    }

    return (
        <TouchableOpacity style={styles.contatoBox} onPress={abrirConversa}>
            <View style={styles.blocoFoto}>
                <FotoContato mini={true} foto={props.foto}></FotoContato>
            </View>
            <View style={styles.grupoTextos}>
                <Text style={styles.texto}>{props.nomeContato}</Text>
                <Text style={styles.texto}>{props.telefone}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    contatoBox: {
        display: 'flex',
        flexDirection: 'row',
        width: 360,
        height: 90,
        justifyContent: 'space-between',
        backgroundColor: '#B6D0E2',
        borderRadius: 15,
        marginTop: 5,
        marginBottom: 5
    },
    grupoTextos: {
        flex: 6,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10,
        overflow: 'hidden'
    },
    blocoFoto: {
      justifyContent: 'center',
      paddingLeft: 10,
      paddingRight: 10
    },
    texto: {
        width: 249,
        height: 23,
        lineHeight: 25,
        fontSize: 16,
        fontWeight: 400
    }
})