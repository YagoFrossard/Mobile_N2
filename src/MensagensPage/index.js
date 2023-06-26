import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, TextInput, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { pegarUsuariosComConversa } from '../API/api';
import MiniContato from '../MiniContato';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function MensagensPage({ route }) {

    const [items, setItems] = useState([]);
    const [dimensions, setDimensions] = useState({
        window: windowDimensions,
        screen: screenDimensions,
      });

    async function salvarUsuario(usuario) {
        await AsyncStorage.setItem('usuario', JSON.stringify(usuario))
    }

    async function carregarContatos() {
        return pegarUsuariosComConversa(route.params.id)
            .then(response => {
                if (response)
                    return Promise.resolve(response.data)
                else
                    return Promise.resolve([])
            })
    }

    useEffect(() => {
        salvarUsuario(route.params)
        carregarContatos().then(items => setItems(items))
    }, [])

    return (
        <View style={{height: dimensions.window.height}}>
            <ScrollView style={styles.itemView}>
                {items.map(item => {
                    return <MiniContato
                        key={item.id}
                        idUsuario={route.params.id}
                        idContato={item.id}
                        nomeUsuario={route.params.nome}
                        nomeContato={item.nome}
                        telefone={item.telefone}
                        foto={item.avatar} />
                })}
            </ScrollView>
            <TouchableOpacity style={styles.novoContatoButton}>
                <Text style={styles.adicao}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    itemView: {
        alignSelf: 'center',
        marginTop: 20
    },
    novoContatoButton: {
        position: 'absolute',
        bottom: 70,
        right: 20
    },
    adicao: {
        width: 50,
        height: 50,
        backgroundColor: '#2DBDF1',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 1000,
        fontSize: 30
    }
})