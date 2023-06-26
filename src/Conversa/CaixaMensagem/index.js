import { Image, StyleSheet, Text, View } from 'react-native';

export default function CaixaMensagem(props) {

    function verificaEnvio() {
        if (props.idEnvio == props.idUsuario) return true
        else return false
    }

    return (
        <View style={verificaEnvio() ? styles.caixaUsuario : styles.caixaContato}> 
            <Text>{props.nomeEnvio}</Text>
            <Text>{props.mensagem}</Text>
            <Text>{props.horario}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    caixaContato: {
        width: 300,
        marginBottom: 10,
        alignSelf: 'flex-start',
        backgroundColor: 'white',
        paddingLeft: 5,
        borderRadius: 10
    },
    caixaUsuario: {
        width: 300,
        marginBottom: 10,
        alignSelf: 'flex-end',
        backgroundColor: 'white',
        paddingLeft: 5,
        borderRadius: 10
    }
})