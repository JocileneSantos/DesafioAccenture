# language: pt
@web
Funcionalidade: Progress Bar

  Cenário: Parar a barra antes de 25% e resetar ao chegar a 100%
    Dado que eu acesso a página inicial do demoqa
    Quando eu escolho a opção "Widgets" na página inicial
    E eu clico no submenu "Progress Bar"
    E eu clico em Start e paro a barra antes dos 25%
    Então o valor da barra de progresso deve ser menor ou igual a 25%
    Quando eu clico em Start novamente e aguardo a barra chegar a 100%
    E eu reseto a barra de progresso
    Então o valor da barra de progresso deve ser 0%
