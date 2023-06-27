import { Image, StyleSheet, Text, View } from 'react-native';

export default function CaixaMensagem(props) {

    function verificaEnvio() {
        if (props.idEnvio == props.idUsuario) return true
        else return false
    }

    function formatarHorario() {
        //2023-06-26T22:46
        let tempo = props.horario
        dia = tempo.slice(8, 10)
        mes = tempo.slice(5, 7)
        ano = tempo.slice(0, 4)
        hora = tempo.slice(11, 16)

        return hora + ' ' + dia + '-' + mes + '-' + ano + '  '
    }
    

    return (
        <View style={verificaEnvio() ? styles.caixaUsuario : styles.caixaContato}> 
            <Text style={styles.textoNome}>{props.nomeEnvio}</Text>
            <Text>{props.mensagem}</Text>
            <Text style={styles.textoData}>{formatarHorario()}</Text>
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
    },
    textoNome: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5
    },
    textoData: {
        textAlign: 'right',
        marginTop: 5
    }
})