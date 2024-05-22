# Web-with-RelationalDatabase
Trabalho de Banco de Dados Relacional 2º semestre - Feito um jogo em HTML, CSS, Vue conectando ele a um Banco de Dados online utilizando NodeJS, MySQL

## Utilização da aplicação
- **Site do Banco de Dados:** https://aiven.io
- HTML
- CSS
- Vue
- JavaScript
- NodeJS
- MySQL

### Instalando as dependencias:
```
npm install cors
npm install express
npm install lodash
npm install mysql
npm install vue
npm install body-parser
```

### Comandos SQL
```
CREATE DATABASE joguinhodb;

USE joguinhodb;

CREATE TABLE usuarios (
    usuario_id			    INT AUTO_INCREMENT PRIMARY KEY,
    nome_usuario			varchar(100),
    senha_usuario			varchar(100)
);

CREATE TABLE jogo (
    jogo_id				    INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id				INT,
    vida_heroi				DOUBLE,
    vida_vilao				DOUBLE,
    acao_heroi				TEXT,
    acao_vilao				TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);

DELIMITER //
CREATE TRIGGER after_usuarios_insert
AFTER INSERT ON usuarios
FOR EACH ROW
BEGIN
    INSERT INTO jogo (usuario_id, vida_heroi, vida_vilao)
    VALUES (NEW.usuario_id, 100, 100);
END//
DELIMITER ;


```

## Prints das Páginas WEB
### Login
![login](https://github.com/Viniyoda/Web-with-RelationalDatabase/assets/144862427/b6a2acd5-8649-4ebe-b1c2-4980a2609369)
### Cadastro
![cadastro](https://github.com/Viniyoda/Web-with-RelationalDatabase/assets/144862427/c980dcb9-6188-434a-b3e8-1e78d17d0810)
### Jogo
![joguinho](https://github.com/Viniyoda/Web-with-RelationalDatabase/assets/144862427/27c76578-3698-41d5-b749-61b3082409cd)
### Dashboard
![dashboard](https://github.com/Viniyoda/Web-with-RelationalDatabase/assets/144862427/6c02d754-0a2a-4902-b0b4-8f3fa1f0a4c7)

## Link da aplicação online
-
