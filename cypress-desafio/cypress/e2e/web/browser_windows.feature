# language: pt
@web
Funcionalidade: Browser Windows

  Cenário: Abrir uma nova janela e validar a mensagem
    Dado que eu acesso a página inicial do demoqa
    Quando eu escolho a opção "Alerts, Frame & Windows" na página inicial
    E eu clico no submenu "Browser Windows"
    E eu clico no botão New Window
    Então uma nova janela deve ser aberta com a mensagem "This is a sample page"
    Quando eu fecho a nova janela
    Então eu devo estar de volta na página "Browser Windows"
