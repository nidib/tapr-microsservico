# Projeto de TAPR - Microsserviço | Lançamento de notas e frequências do professor

### Descrição

Desenvolvido em node, esse microsserviço tem o objetivo de receber requisições para a criação, edição e consulta de notas e frequência de um aluno em uma determinada disciplina.

### Tecnologias

-   Banco de dados não relacional: `Cosmos DB`
-   Linguagem: `TypeScript`
-   Runtime: `Node`

### Como executar via Docker?

1.  Ter o docker instalado
2.  Ter uma instância do `Cosmos DB`, criar uma database e uma `KEY`
3.  Duplicar o arquivo `.env-example`, renomear para `.env` e preencher nele as variáveis de ambiente

| Variável          | Descrição                                  | Obrigatória | Valor default |
| ----------------- | ------------------------------------------ | :---------: | :-----------: |
| `COSMOS_DB_NAME`  | Nome do database na instância do Cosmos    |     ✅      |       -       |
| `COSMOS_ENDPOINT` | URL de conexão para a instância do Cosmos  |     ✅      |       -       |
| `COSMOS_KEY`      | KEY de autenticação da instância do Cosmos |     ✅      |       -       |

4.  Executar `docker-compose up`
5.  Após alguns instantes a aplicação deverá estar de rodando na porta `8080`
6.  Utilizar os arquivos `request-example-*.http` para realizar testes dos endpoints
    -   É recomendado o uso da extensão `REST Client` para o `VSCode`
