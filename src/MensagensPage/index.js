import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, TextInput, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { pegarTodosUsuarios, pegarUsuariosComConversa } from '../API/api';
import MiniContato from '../MiniContato';
import ReactNativeModal from 'react-native-modal';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function MensagensPage({ route }) {

    const [modalVisivel, setModalVisivel] = useState(false);
    const [items, setItems] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [dimensions, setDimensions] = useState({
        window: windowDimensions,
        screen: screenDimensions,
    });

    setTimeout(() => {
        carregarContatos().then(items => setItems(items))
        carregarUsuarios().then(usuarios => setUsuarios(usuarios))
    }, 10000)

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

    async function carregarUsuarios() {
        return pegarTodosUsuarios(route.params.telefone)
            .then(({ data }) => {
                if (data)
                    return Promise.resolve(data)
                else
                    return Promise.resolve([])
            })
    }

    useEffect(() => {
        console.log(route.params)
        salvarUsuario(route.params)
        carregarContatos().then(items => setItems(items))
        carregarUsuarios().then(usuarios => setUsuarios(usuarios))
    }, [])

    return (
        <>
            <ReactNativeModal
                isVisible={modalVisivel}
                onBackButtonPress={() => setModalVisivel(!modalVisivel)}
                onBackdropPress={() => setModalVisivel(!modalVisivel)}
            >
                <ScrollView>
                    {usuarios.map(usuario => {
                        return <MiniContato
                            key={usuario.id}
                            idUsuario={route.params.id}
                            idContato={usuario.id}
                            nomeUsuario={route.params.nome}
                            nomeContato={usuario.nome}
                            telefone={usuario.telefone}
                            foto={usuario.avatar} />
                    })}
                </ScrollView>
            </ReactNativeModal>
            <View style={{ height: dimensions.window.height }}>
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
                <TouchableOpacity style={styles.novoContatoButton} onPress={() => setModalVisivel(!modalVisivel)}>
                    <Text style={styles.adicao}>+</Text>
                </TouchableOpacity>
            </View>
        </>
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