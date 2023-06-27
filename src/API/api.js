import axios from "axios";

//const ip = 'http://192.168.0.139:8080'
const ip = 'http://bdfemasschat-env-2.eba-7p43uarw.sa-east-1.elasticbeanstalk.com'

export const gravarUsuario = (nome, avatar, email, telefone, senha) => {
    const item = {
        "nome": nome,
        "avatar": avatar,
        "email": email,
        "telefone": telefone,
        "senha": senha
    }
    axios
        .post(`${ip}/user/`, item)
        .then((res) => {

        })
        .catch((err) => {
            console.log(err)
        })
}

export const logarUsuario = async (telefone, senha) => {
    try {
        const { data: response } = await axios.get(`${ip}/user/${telefone}/${senha}`)
        return response
    } catch (e) {
        console.log(e)
    }
}

export const pegarHash = async (id) => {
    try {
        const { data: response } = await axios.get(`${ip}/user/${id}`)
        return response
    } catch (e) {
        console.log(e)
    }
}

export const pegarUsuariosComConversa = async (id) => {
    try {
        const usuarios = await axios.get(`${ip}/message/buscarUsuariosComConversa/${id}`)
        return usuarios
    } catch (e) {
        console.log(e)
    }
}

export const pegarConversa = async (idUsuario, idContato) => {
    try {
        const mensagens = await axios.get(`${ip}/message/buscarMensagensComUmUsuario/${idUsuario}/${idContato}`)
        return mensagens
    } catch (e) {
        console.log(e)
    }
}

export const enviarMensagem = (texto, idUsuario, idContato) => {
    const item = {
        "idFrom": idUsuario,
        "idTo": idContato,
        "mensagem": texto
    }
    axios
        .post(`${ip}/message/enviarMensagem`, item)
        .then(res => {})
        .catch(err => console.log(err))
}

export const pegarTodosUsuarios = async (login) => {
    try {
        const usuarios = await axios.get(`${ip}/message/buscarUsuarios/${login}`)
        return usuarios
    } catch (e) {
        console.log(e)
    }
}