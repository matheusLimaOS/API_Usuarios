# API_Usuarios

O Script para a criação do banco de dados se encontra na pasta Database

Para alterar o usuário, vá no arquivo connection.js, dentro da pasta Database

Rota GET: ("http://localhost:8686/user")
    
    --- FUNÇÂO DA ROTA ---
    
    Essa rota tem a função de mostrar todos os usuários cadastrados no banco de dados.
    
    -- REQUISITOS DA ROTA ---
    
    A rota não possui nenhum parametro.
    A rota não possui nenhum body.
    
    --- POSSIVEIS RETORNOS ---
    Status: 200, Indica sucesso na requisição,Retorna um array contendo todos os usuários.
    Status: 500, Indica fracasso na requisição, Motivo: Problema na conexão com o banco.

Rota GET: ("http://localhost:8686/user/:id")

    --- FUNÇÂO DA ROTA ---
    
    Essa rota tem a função de retornar o usuario que tem o id mandado como parametro. 
    
    -- REQUISITOS DA ROTA ---
    
    A rota possui 1 parametro (id).
    A rota não possui nenhum body.
    
    --- POSSIVEIS RETORNOS ---
    Status: 200, Indica sucesso na requisição,Retorna um JSON contendo os dados do usuário com o determinado ID.
    Status: 404, Indica fracasso na requisição,Motivo: Usuário com determinado ID, não encontrado no Banco de Dados.
    Status: 500, Indica fracasso na requisição, Motivo: Problema na conexão com o banco.
    
Rota POST: ("http://localhost:8686/user")
    
    --- FUNÇÂO DA ROTA ---
    
    Essa rota tem a função de cadastrar um novo usuário no banco de dados.
    
    -- REQUISITOS DA ROTA ---
    
    A rota não possui nenhum parametro.
    A rota possui três dados recebidos por body (email,password,name);
    
    --- POSSIVEIS RETORNOS ---
    Status: 200, Indica sucesso na requisição,Retorna um JSON contendo os dados do usuário que acabou de ser cadastrado.
    Status: 406, Indica fracasso na requisição,Motivo: Email já cadastrado.
    Status: 411, Indica fracasso na requisição,Motivo: Email ou senha não obedecem as regras.
    Status: 500, Indica fracasso na requisição,Motivo: Problema na conexão com o banco.

Rota POST: ("http://localhost:8686/recoverpassword")
    
    --- FUNÇÂO DA ROTA ---
    
    Essa rota tem a função criação de token unico para recuperação de senha.
    
    -- REQUISITOS DA ROTA ---
    
    A rota não possui nenhum parametro.
    A rota possui 1 body (email).
    
    --- POSSIVEIS RETORNOS ---
    Status: 200, Indica sucesso na requisição,Retorna o token necessário para a recuperação de senha.
    Status: 404, Indica fracasso na requisição,Motivo: Usuário com determinado email, não encontrado no Banco de Dados.
    Status: 500, Indica fracasso na requisição, Motivo: Problema na conexão com o banco.
    
Rota POST: ("http://localhost:8686/user/login")
    
    --- FUNÇÂO DA ROTA ---
    
    Essa rota tem a função de validação para a efetuação do login.
    
    -- REQUISITOS DA ROTA ---
    
    A rota não possui nenhum parametro.
    A rota possui 2 body (email,password).
    
    --- POSSIVEIS RETORNOS ---
    Status: 200, Indica sucesso na requisição,Retorna um token JWT.
    Status: 401, Indica fracasso na requisição,Motivo: Senha digitada está incorreta.
    Status: 404, Indica fracasso na requisição,Motivo: Email não encontrado no banco de dados.
    Status: 500, Indica fracasso na requisição,Motivo: Problema na conexão com o banco.

Rota PUT: ("http://localhost:8686/user/:id")
    
    --- FUNÇÂO DA ROTA ---
    
    Essa rota tem a função de editar dados do usuário (exceto password).
    
    -- REQUISITOS DA ROTA ---
    
    A rota possui 1 parametro (id).
    A rota possui de 1 a 3 body (name,email,password).
    
    --- POSSIVEIS RETORNOS ---
    Status: 200, Indica sucesso na requisição,Retorna mensagem indicando que atualização foi realizada com sucesso.
    Status: 400, Indica fracasso na requisição,Motivo: Não foi fornecido nenhum dado por meio do body.
    Status: 404, Indica fracasso na requisição,Motivo: Não encontrado usuário com o ID cadastrado.
    Status: 406, Indica fracasso na requisição,Motivo: Email já cadastrado.
    Status: 411, Indica fracasso na requisição,Motivo: Email digitado não obedece as regras.
    Status: 500, Indica fracasso na requisição,Motivo: Problema na conexão com o banco.

Rota PUT: ("http://localhost:8686/recoverpassword/:id")
    
    --- FUNÇÂO DA ROTA ---
    
    Essa rota tem a função de alterar a senha no banco de dados.
    
    -- REQUISITOS DA ROTA ---
    
    A rota possui 1 parametro (id).
    A rota possui 2 body (token,newpassword).
    
    --- POSSIVEIS RETORNOS ---
    Status: 200, Indica sucesso na requisição,Retorna mensagem indicando que senha foi alterada com sucesso.
    Status: 404, Indica fracasso na requisição,Motivo: Não encontrado Usuário com o ID enviado.
    Status: 406, Indica fracasso na requisição,Motivo: Token já utilizado.
    Status: 500, Indica fracasso na requsição, Motivo: Problema na conexão com o banco.

Rota DELETE: ("http://localhost:8686/user/:id")
    
    --- FUNÇÂO DA ROTA ---
    
    Essa rota tem a função de deletar o usuário com o ID passado como parametro.
    
    -- REQUISITOS DA ROTA ---
    
    A rota possui 1 parametro (id).
    A rota não possui nenhum body.
    
    --- POSSIVEIS RETORNOS ---
    Status: 200, Indica sucesso na requisição,Retorna dados do usuário cadastrado.
    Status: 404, Indica fracasso na requisição,Motivo: Não encontrado usuário com o ID cadastrado.
    Status: 500, Indica fracasso na requisição,Motivo: Problema na conexão com o banco.




