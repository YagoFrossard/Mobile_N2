import { StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import FotoContato from '../FotoContato';
import { launchImageLibraryAsync, launchCameraAsync } from 'expo-image-picker';
import { gravarUsuario } from '../API/api';

export default function LoginPage() {

    const navigation = useNavigation();

    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [telefone, setTelefone] = useState();
    const [senha, setSenha] = useState();
    const [confsenha, setConfsenha] = useState();
    const [foto, setFoto] = useState('');

    function nomeUpdate(nome) {
        setNome(nome);
    }

    function emailUpdate(email) {
        setEmail(email);
    }

    function telefoneUpdate(telefone) {
        setTelefone(telefone);
    }

    function senhaUpdate(senha) {
        setSenha(senha);
    }

    function confsenhaUpdate(confsenha) {
        setConfsenha(confsenha);
    }

    const gerarAlertaSenha = () => {
        Alert.alert('Senha não combina', 'As senhas digitadas não são iguais!', [
            {
                text: 'OK',
                style: 'cancel'
            }
        ]);
    }

    const gerarAlertaCampos = () => {
        Alert.alert('Campos obrigatórios', 'Algum dos campos obrigatórios não foi preenchido!', [
            {
                text: 'OK',
                style: 'cancel'
            }
        ]);
    }

    const salvarUsuario = async () => {
        if (! (senha === confsenha)) {
            gerarAlertaSenha()
            return
        }
        if( !(nome && email && telefone && senha) ){
            gerarAlertaCampos()
            return
        }
        gravarUsuario(nome, foto, email, telefone, senha)
        irParaLogin()
    }

    const irParaLogin = () => {
        navigation.navigate('Login')
    }

    const abrirCamera = async () => {

        let result = await launchCameraAsync({
            allowsEditing: true,
            quality: 1,
            base64: true
        });

        if (!result.canceled) {
            setFoto(result.assets[0].uri);
        } else {
            Alert.alert('Erro', 'Você não tirou nenhuma foto.', [
                {
                    text: 'OK',
                    style: 'cancel'
                }
            ])
        }
    }

    const abrirGaleria = async () => {

        let result = await launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            base64: true
        });

        if (!result.canceled) {
            setFoto(result.assets[0].base64);
        } else {
            Alert.alert('Erro', 'Você não selecionou nenhuma imagem.', [
                {
                    text: 'OK',
                    style: 'cancel'
                }
            ])
        }
    }

    const selecionarImagem = () => {
        Alert.alert('Escolher imagem', 'Selecione de onde gostaria de escolher a imagem', [
            {
                text: 'Galeria',
                style: 'default',
                onPress: () => { abrirGaleria() }
            },
            {
                text: 'Câmera',
                style: 'default',
                onPress: () => { abrirCamera() }
            }
        ],
            {
                cancelable: true,
                onDismiss: () =>
                    Alert.alert(
                        'Seleção de imagem cancelada.',
                    ),
            });
    }


    useEffect(() => {

    }, [])

    return (
        <View style={styles.pagina}>
            <View style={styles.blocoLogin}>
                <View style={styles.imageIcon}>
                    <TouchableOpacity onPress={selecionarImagem}>
                        <FotoContato mini={false} foto={foto} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.texto}>Nome *</Text>
                <TextInput
                    style={styles.inputTexto}
                    placeholder='Nome'
                    clearButtomMode='always'
                    value={nome}
                    onChangeText={nomeUpdate} />
                <Text style={styles.texto}>E-mail *</Text>
                <TextInput
                    style={styles.inputTexto}
                    placeholder='E-mail'
                    clearButtomMode='always'
                    value={email}
                    onChangeText={emailUpdate} />
                <Text style={styles.texto}>Telefone *</Text>
                <TextInput
                    style={styles.inputTexto}
                    keyboardType='numeric'
                    placeholder='Telefone'
                    clearButtomMode='always'
                    value={telefone}
                    onChangeText={telefoneUpdate} />
                <Text style={styles.texto}>Senha *</Text>
                <TextInput
                    style={styles.inputTexto}
                    placeholder='Senha'
                    clearButtomMode='always'
                    value={senha}
                    secureTextEntry={true}
                    onChangeText={senhaUpdate} />
                <Text style={styles.texto}>Confirmar Senha *</Text>
                <TextInput
                    style={styles.inputTexto}
                    placeholder='Confirmar senha'
                    clearButtomMode='always'
                    value={confsenha}
                    secureTextEntry={true}
                    onChangeText={confsenhaUpdate} />
                <TouchableOpacity style={styles.alinharBotao} onPress={salvarUsuario}>
                    <Text style={styles.botao}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    blocoLogin: {
        display: 'flex',
        height: 800,
        width: 350,
        borderRadius: 15,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: '#d5e7ed',
        marginTop: 20
    },
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
    },
    pagina: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    texto: {
        fontSize: 16,
        marginTop: 10,
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
        justifyContent: 'center',
        marginVertical: 50
    },
    botao: {
        width: 115,
        height: 35,
        backgroundColor: '#2DBDF1',
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        borderRadius: 10,
        textAlignVertical: 'center',
    },
    imageIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    }
})