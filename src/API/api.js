import axios from "axios";

const ip = 'http://192.168.0.139:8080'

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
    }catch (e){
        console.log(e)
    }
}

export const pegarHash = async (id) => {
    try {
        const { data:response } = await axios.get(`${ip}/user/${id}`)
        return response
    }catch(e){
        console.log(e)
    }
}