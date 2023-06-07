import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { logarUsuario } from '../API/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage() {

    const navigation = useNavigation();

    const [telefone, setTelefone] = useState();
    const [senha, setSenha] = useState();

    const moverParaCadastro = () => {
        setTelefone(null)
        setSenha(null)
        navigation.navigate('Cadastro')
    }

    function telefoneUpdate(telefone) {
        setTelefone(telefone);
    }

    function senhaUpdate(senha) {
        setSenha(senha);
    }

    function alertaLoginFalho() {
        Alert.alert('Usuário não encontrado', 'As credenciais estão incorretas. Tente novamente.', [
            {
                text: 'OK',
                style: 'cancel'
            }
        ]);
    }

    async function logar() {
        return logarUsuario(telefone, senha)
            .then(data => {
                if (data)
                    return Promise.resolve(data)
                else
                    return Promise.resolve(null)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function tentarLogar() {
        logar().then(usuario => {
            if (usuario) {
                navigation.navigate("Mensagens", usuario)
            } else {
                alertaLoginFalho()
            }
        })
    }

    useEffect(() => {
        (async () => {
            let dadosUsuario
            const dados = await AsyncStorage.getItem('usuario')
            if (dados) dadosUsuario = JSON.parse(dados)
            else return
            navigation.navigate("Mensagens", dadosUsuario)
        })()
    }, [])

    return (
        <View style={styles.pagina}>
            <View style={styles.blocoLogin}>
                <Text style={styles.texto}>Telefone</Text>
                <TextInput
                    style={styles.inputTexto}
                    keyboardType='numeric'
                    placeholder='Login'
                    clearButtomMode='always'
                    value={telefone}
                    onChangeText={telefoneUpdate} />
                <Text style={styles.texto}>Senha</Text>
                <TextInput
                    style={styles.inputTexto}
                    placeholder='Senha'
                    clearButtomMode='always'
                    value={senha}
                    secureTextEntry={true}
                    onChangeText={senhaUpdate} />
                <TouchableOpacity style={styles.alinharBotao} onPress={tentarLogar}>
                    <Text style={styles.botao}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.alinhar} onPress={moverParaCadastro}>
                    <Text style={styles.textoBottom}>Deseja se cadastrar? ---></Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    blocoLogin: {
        display: 'flex',
        height: 500,
        width: 350,
        borderRadius: 15,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: '#d5e7ed',
        marginTop: 120
    },
    inputTexto: {
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 24,
        marginBottom: 20,
        backgroundColor: '#FFF'
    },
    pagina: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    texto: {
        fontSize: 24,
        marginTop: 30,
        marginHorizontal: 10,
        fontWeight: 'bold',
        marginBottom: 3
    },
    textoBottom: {
        fontSize: 24,
        marginHorizontal: 10,
        fontWeight: 'bold'
    },
    alinhar: {
        alignItems: 'center'
    },
    alinharBotao: {
        width: 115,
        alignSelf: 'center',
        marginVertical: 50,
        marginBottom: 80
    },
    botao: {
        width: 115,
        height: 35,
        backgroundColor: '#2DBDF1',
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        justifyContent: 'center',
        borderRadius: 10
    }
})