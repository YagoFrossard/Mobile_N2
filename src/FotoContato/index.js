import { Image, StyleSheet, Text, View } from 'react-native';

export default function FotoContato({ foto, mini }) {

    let fotoUri = `data:image/png;base64,${foto}`;

    return (
        <Image style={mini ? styles.miniImagem : styles.maxImagem} source={{uri: fotoUri}}></Image>
    );
}

const styles = StyleSheet.create({
    maxImagem: {
        marginTop: 30,
        width: 200,
        height: 200,
        borderRadius: 1000
    },
    miniImagem: {
        width: 60,
        height: 60,
        borderRadius: 1000
    }
})