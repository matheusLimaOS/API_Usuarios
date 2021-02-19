CREATE DATABASE `aula_node`;

CREATE TABLE `password_tokens` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `token` varchar(200) NOT NULL DEFAULT '0',
  `user_id` int unsigned NOT NULL,
  `used` tinyint unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);


CREATE TABLE `produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(45) NOT NULL,
  `tamanho` double NOT NULL,
  `quantidade` int NOT NULL,
  `valor` double NOT NULL,
  `horario` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT '0',
  `email` varchar(150) NOT NULL DEFAULT '0',
  `password` varchar(200) NOT NULL DEFAULT '0',
  `role` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
);


CREATE TABLE `carrinho` (
  `ID_carrinho` int NOT NULL AUTO_INCREMENT,
  `ID_produto` int NOT NULL,
  `descricao` varchar(45) NOT NULL,
  `valorprod` double NOT NULL,
  `quantprod` int NOT NULL,
  `usuario` varchar(150) NOT NULL,
  PRIMARY KEY (`ID_carrinho`)
);

CREATE TABLE `vendas_itens` (
  `id_venda_item` int NOT NULL AUTO_INCREMENT,
  `id_venda` int NOT NULL,
  `id_produto` int NOT NULL,
  `descricao` varchar(45) NOT NULL,
  `quantidade_vendida` int NOT NULL,
  `valor_vendido` double NOT NULL,
  PRIMARY KEY (`id_venda_item`)
);

CREATE TABLE `vendas` (
  `id_venda` int NOT NULL AUTO_INCREMENT,
  `quantidade_vendida` int NOT NULL,
  `valor_vendido` double NOT NULL,
  `hora_venda` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_usuario` int NOT NULL,
  PRIMARY KEY (`id_venda`)
);







