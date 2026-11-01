# language: pt
@api
Funcionalidade: Book Store API
  Como usuário da Book Store
  Quero criar uma conta, me autenticar e alugar livros
  Para consultar os livros vinculados ao meu perfil

  Cenário: Criar usuário, autorizar e alugar dois livros
    Dado que eu crio um novo usuário
    Quando eu gero um token de acesso
    Então o usuário criado deve estar autorizado
    Quando eu listo os livros disponíveis
    E eu alugo dois livros da lista
    Então os detalhes do usuário devem conter os dois livros alugados
