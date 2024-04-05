let participantes = [
    {
        nome: "Nelson de oliveira",
        email: "nelson123@gmail.com",
        dataInscricao: new Date(2024, 3, 3, 19, 20),
        dataCheckin: new Date(2024, 3, 4, 20, 10)
    },
    {
        nome: "Maria da Silva",
        email: "maria.silva@example.com",
        dataInscricao: new Date(2024, 3, 6, 15, 30),
        dataCheckin: new Date(2024, 3, 3, 10, 45)
    },
    {
        nome: "João Souza",
        email: "joao.souza@example.com",
        dataInscricao: new Date(2024, 4, 8, 12, 0),
        dataCheckin: new Date(2024, 4, 9, 9, 15)
    },
    {
        nome: "Ana Santos",
        email: "ana.santos@example.com",
        dataInscricao: new Date(2024, 5, 11, 17, 45),
        dataCheckin: new Date(2024, 5, 10, 14, 20)
    },
    {
        nome: "Pedro Oliveira",
        email: "pedro.oliveira@example.com",
        dataInscricao: new Date(2024, 6, 15, 10, 10),
        dataCheckin: new Date(2024, 6, 11, 11, 30)
    },
    {
        nome: "Laura Costa",
        email: "laura.costa@example.com",
        dataInscricao: new Date(2024, 7, 20, 8, 20),
        dataCheckin: new Date(2024, 7, 10, 16, 40)
    },
    {
        nome: "Carlos Ferreira",
        email: "carlos.ferreira@example.com",
        dataInscricao: new Date(2024, 8, 20, 14, 50),
        dataCheckin: new Date(2024, 8, 18, 9, 0)
    },
    {
        nome: "Juliana Almeida",
        email: "juliana.almeida@example.com",
        dataInscricao: new Date(2024, 9, 21, 11, 15),
        dataCheckin: new Date(2024, 9, 20, 8, 45)
    },
    {
        nome: "Ricardo Pereira",
        email: "ricardo.pereira@example.com",
        dataInscricao: new Date(2024, 10, 23, 16, 30),
        dataCheckin: new Date(2024, 10, 24, 13, 10)
    },
    {
        nome: "Amanda Rocha",
        email: "amanda.rocha@example.com",
        dataInscricao: new Date(2024, 11, 25, 18, 0),
        dataCheckin: new Date(2024, 11, 26, 10, 20)
    }
];

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to
 (participante.dataInscricao)
    
    let dataCheckin = dayjs(Date.now()).to
    (participante.dataCheckin)


    if (participante.dataCheckin === null) {
    dataCheckin = `<button 
                        data-email="${participante.email}"
                        onclick="fazerCheckIn(event)"
                    >
                        Confirmar check-in
                    </button>`;
    }
    
    return `
<tr>
<td>
    <strong>
        ${participante.nome}
    </strong>
    <br>
    <small>
    ${participante.email}
    </small>
</td>
<td> ${dataInscricao}</td>
<td> ${dataCheckin}</td>
</tr>
    `;
}

const atualizarLista = (participantes) => {
    let output = ""
    //estrutura  de repetição - loop
    for(let participante of participantes) {
        output = output + criarNovoParticipante(participante)
    }
        

    // Substituir informações do HTML
    document.querySelector('tbody').innerHTML = output
}
const adicionarParticipante = (event) => {
    event.preventDefault();

    const dadosDoFormulario = new FormData(event.target);

    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: dayjs().format('DD/MM/YYYY HH:mm'),
        dataCheckin: null
    };

    // Verificar se o participante já existe
    const participanteExiste = participantes.find(
        (p) => p.email === participante.email
    );

    if (participanteExiste !== undefined) {
        alert('Email já cadastrado!');
        return; // Evita adicionar participante duplicado
    }

    participantes = [participante, ...participantes];
    atualizarLista(participantes);

    // Limpar o formulário
    event.target.querySelector('[name="nome"]').value = "";
    event.target.querySelector('[name="email"]').value = "";
}

const fazerCheckIn = (event) => {
    const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

    if(confirm(mensagemConfirmacao) == false){
        return
    }
    
    const participante = participantes.find((p) =>{
        return p.email == event.target.dataset.email
    })

    participante.dataCheckin = new Date()


    atualizarLista(participantes)
}
