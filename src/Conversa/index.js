import { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { enviarMensagem, pegarConversa } from '../API/api';
import CaixaMensagem from './CaixaMensagem';

export default function Conversa({ route }) {

    const [mensagens, setMensagens] = useState([]);
    const [texto, setTexto] = useState();

    /*
    setTimeout(() => {
        carregarMensagens().then(mensagens => setMensagens(mensagens))
    }, 10000)
    */

    async function carregarMensagens() {
        return pegarConversa(route.params.idUsuario, route.params.idContato)
            .then(({ data }) => {
                if (data) {
                    data.sort((a, b) => a.dataHora.localeCompare(b.dataHora))
                    return Promise.resolve(data)
                }
                else
                    return Promise.resolve([])
            })
    }

    const enviar = () => {
        if (texto) {
            textoLimpo = texto.trim()
            enviarMensagem(textoLimpo, route.params.idUsuario, route.params.idContato)
            setTexto()
            carregarMensagens().then(mensagens => setMensagens(mensagens))
        }
    }

    function textoUpdate(texto) {
        setTexto(texto)
    }

    useEffect(() => {
        carregarMensagens().then(mensagens => setMensagens(mensagens))
        
        const interval = setInterval(() => {
            carregarMensagens().then(mensagens => setMensagens(mensagens))
        }, 10000);
        return () => clearInterval(interval);
    }, [])

    const scrollRef = useRef();

    return (
        <View style={styles.container}>
            <View style={styles.listaMensagens}>
                <LinearGradient colors={['#528AAE', '#00008B', '#000']} style={styles.planoDeFundo}>
                    <ScrollView style={styles.mensagensView}
                        ref={scrollRef}
                        onContentSizeChange={() => scrollRef.current.scrollToEnd({ animated: false })}>
                        {mensagens.map(mensagem => {
                            return <CaixaMensagem
                                key={mensagem.id}
                                idUsuario={route.params.idUsuario}
                                idEnvio={mensagem.from.id}
                                nomeEnvio={mensagem.from.nome}
                                mensagem={mensagem.mensagem}
                                horario={mensagem.dataHora}
                            />
                        })}
                    </ScrollView>
                </LinearGradient>
            </View>
            <View style={styles.barraEnvio}>
                <TextInput style={styles.caixaMensagem}
                    placeholder='Mensagem...'
                    multiline={true}
                    clearButtomMode='always'
                    onChangeText={textoUpdate}
                    value={texto} />
                <TouchableOpacity style={styles.iconeEnvio} onPress={enviar}>
                    <Icon name='arrow-forward-outline' color='black' size={40}></Icon>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1
    },
    listaMensagens: {
        flex: 10,
        display: 'flex'
    },
    planoDeFundo: {
        width: '100%',
        height: '100%',
        flex: 0,
        zIndex: -1
    },
    barraEnvio: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    caixaMensagem: {
        flex: 8,
        marginLeft: 10
    },
    iconeEnvio: {
        flex: 1,
        justifyContent: 'center'
    },
    mensagensView: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 20,
        paddingRight: 20
    }
})