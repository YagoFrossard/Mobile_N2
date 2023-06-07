import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, TextInput } from 'react-native';

export default function MensagensPage({ route }) {

    const [nome, setNome] = useState();

    async function salvarUsuario (usuario) {
        await AsyncStorage.setItem('usuario', JSON.stringify(usuario))
    } 

    useEffect(() => {
        usuario = route.params
        salvarUsuario(usuario)
        if(usuario){
            setNome(usuario.nome)
        }
    })

    return (
        <View>
            <Text>Olá</Text>
            <TextInput
                style={styles.inputTexto} 
                value={nome}
                editable={false}>
            </TextInput>
        </View>
    );
}

const styles = StyleSheet.create({
    inputTexto: {
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 16,
        marginBottom: 5,
        backgroundColor: '#FFF'
    }
})