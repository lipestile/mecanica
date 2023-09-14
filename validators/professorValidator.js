const professorValidator = {
    nome: {
        required: "Campo obrigatório",
        minLength: {
          value: 10,
          message: 'O mínimo de caracteres é 10'
        },
    
        maxLength: {
          value: 40,
          message: 'O máximo de caracteres é 40'
        }
      },
      
    cpf: {
      required: "Campo obrigatório",
        pattern: {
          value: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
          message: 'CPF inválido! XXX.XXX.XXX-XX'
        },
    }, 

    matricula: {
      required: "Campo obrigatório",
      maxLength: {
        value: 15,
        message: 'O máximo de caracteres é 15'
      }
    }, 

    email: {
      required: "Campo obrigatório",
    }, 

    telefone: {
      required: "Campo obrigatório",
      pattern: {
        value: /^\([0-9]{2}\) [0-9]?[0-9]{4}-[0-9]{4}$/,
        message: 'Núimero de telefone inválido! (XX) XXXXX-XXXX'
      },
    },

    cep: {
      required: "Campo obrigatório",
        pattern: {
          value: /\d{5}-\d{3}/,
          message: 'CEP inválido! XXXXX-XXX'
        },
    },

    bairro: {
      required: "Campo obrigatório",
    }, 

    salario: {
      required: "Campo obrigatório",
    },

    função: {
      required: "Campo obrigatório",
    },
}

export default professorValidator