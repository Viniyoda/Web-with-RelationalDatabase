CREATE DATABASE joguinhodb;

USE joguinhodb;

CREATE TABLE usuarios (
	usuario_id				INT AUTO_INCREMENT PRIMARY KEY,
    nome_usuario			varchar(100),
    senha_usuario			varchar(100)
);
SELECT * FROM usuarios;

CREATE TABLE jogo (
	jogo_id					INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id				INT,
    vida_heroi				DOUBLE,
    vida_vilao				DOUBLE,
    acao_heroi				TEXT,
    acao_vilao				TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);
SELECT * FROM jogo;

DELIMITER //
CREATE TRIGGER after_usuarios_insert
AFTER INSERT ON usuarios
FOR EACH ROW
BEGIN
    INSERT INTO jogo (usuario_id, vida_heroi, vida_vilao)
    VALUES (NEW.usuario_id, 100, 100);
END//
DELIMITER ;

ALTER USER 'avnadmin'@'%' IDENTIFIED WITH mysql_native_password BY 'AVNS_KPxvTUUtahG1o6-uTlV';