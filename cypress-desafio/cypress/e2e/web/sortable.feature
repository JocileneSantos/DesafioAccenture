# language: pt
@web
Funcionalidade: Sortable

  Cenário: Ordenar a lista em ordem crescente com drag and drop
    Dado que eu acesso a página inicial do demoqa
    Quando eu escolho a opção "Interactions" na página inicial
    E eu clico no submenu "Sortable"
    E a lista está na ordem "Six, Two, One, Four, Five, Three"
    E eu ordeno os elementos em ordem crescente usando drag and drop
    Então os elementos devem estar na ordem "One, Two, Three, Four, Five, Six"
