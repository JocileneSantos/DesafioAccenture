# language: pt
@web
Funcionalidade: Web Tables

  Contexto:
    Dado que eu acesso a página inicial do demoqa
    Quando eu escolho a opção "Elements" na página inicial
    E eu clico no submenu "Web Tables"

  Cenário: Criar, editar e deletar um registro
    Quando eu crio um novo registro
    Então o novo registro deve aparecer na tabela
    Quando eu edito o novo registro criado
    Então a tabela deve exibir os dados editados
    Quando eu deleto o novo registro criado
    Então o novo registro não deve mais aparecer na tabela

  @bonus
  Esquema do Cenário: Criar <quantidade> registros dinamicamente e deletar todos
    Quando eu crio <quantidade> novos registros
    Então os <quantidade> novos registros devem aparecer na tabela
    Quando eu deleto todos os novos registros criados
    Então nenhum dos novos registros deve aparecer na tabela

    Exemplos:
      | quantidade |
      | 12         |
