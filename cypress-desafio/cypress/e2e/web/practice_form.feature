# language: pt
@web
Funcionalidade: Practice Form
  Como estudante
  Quero preencher o formulário de registro
  Para concluir a minha inscrição

  Cenário: Preencher e submeter o formulário com valores aleatórios
    Dado que eu acesso a página inicial do demoqa
    Quando eu escolho a opção "Forms" na página inicial
    E eu clico no submenu "Practice Form"
    E eu preencho todo o formulário com valores aleatórios
    E eu submeto o formulário
    Então um popup deve ser aberto com os dados enviados
    Quando eu fecho o popup
    Então o popup não deve mais ser exibido
