const prfV = {
    nome : { 
        required: "O campo de Marca é obrigatorio"
    },
    modelo : { 
        required: "O campo de Modelo é obrigatorio"
    },
    placa: {
        required: "O campo de Placa é obrigatorio",
        maxLength: {
            value: 7,
            message: "O máximo é 11 digitos"
           },
           minLength: {
            value: 7,
            message: "O minimo é 11 digitos"
           }
    },
    matricula: {
        required: "O campo de matricula é obrigatorio",
        maxLength: {
            value: 14,
            message: "O máximo é 4 digitos"
           },
           minLength: {
            value: 4,
            message: "O minimo é 4 digitos"
           }
           
    },
    data: {
        required: 'O campo data é obrigatório',
        
    },
    cor: {
        required:'A cor é Obrigatório'
    }

}
export default prfV;