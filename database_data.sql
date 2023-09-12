CREATE DATABASE visitantes_db;
USE visitantes_db;

-- Create the 'roles' table
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL UNIQUE
);

-- Create the 'departamentos' table
CREATE TABLE departamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL UNIQUE
);

-- Create the 'usuarios' table
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol_id INT NOT NULL,
  FOREIGN KEY (rol_id) REFERENCES roles(id)
);

-- Create the 'visitantes' table
CREATE TABLE visitantes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombres VARCHAR(255) NOT NULL,
  apellidos VARCHAR(255) NOT NULL,
  cedula VARCHAR(255) NOT NULL UNIQUE
);

-- Create the 'visitas' table
CREATE TABLE visitas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  fecha_ingreso DATETIME NOT NULL,
  motivo_visita VARCHAR(255) NOT NULL,
  estado VARCHAR(255) NOT NULL,
  novedad VARCHAR(255) DEFAULT '',
  visitante_id INT NOT NULL,
  departamento_id INT NOT NULL,
  FOREIGN KEY (visitante_id) REFERENCES visitantes(id),
  FOREIGN KEY (departamento_id) REFERENCES departamentos(id)
);

-- Add 'createdAt' and 'updatedAt' columns to the 'roles' table
ALTER TABLE roles
ADD COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Add 'createdAt' and 'updatedAt' columns to the 'departamentos' table
ALTER TABLE departamentos
ADD COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Add 'createdAt' and 'updatedAt' columns to the 'usuarios' table
ALTER TABLE usuarios
ADD COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Add 'createdAt' and 'updatedAt' columns to the 'visitantes' table
ALTER TABLE visitantes
ADD COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Add 'createdAt' and 'updatedAt' columns to the 'visitas' table
ALTER TABLE visitas
ADD COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;



INSERT INTO roles (nombre, createdAt, updatedAt) VALUES ('RECEPCION', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());
INSERT INTO roles (nombre, createdAt, updatedAt) VALUES ('SUPERVISOR', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

INSERT INTO departamentos (nombre, createdAt, updatedAt) VALUES ('ADMINISTRACION', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());
INSERT INTO departamentos (nombre, createdAt, updatedAt) VALUES ('PROVEEDORES', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());
INSERT INTO departamentos (nombre, createdAt, updatedAt) VALUES ('SERVICIO AL CLIENTE', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());
INSERT INTO departamentos (nombre, createdAt, updatedAt) VALUES ('VENTAS', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());


INSERT INTO usuarios (username, password, rol_id , createdAt, updatedAt) 
VALUES ('recepcion', '$2y$10$t.TYP1KnauGZXpQ6pbGrROXClfXFR0IbKlxGFupLPdmM.3vEYwm16', 1,CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());
INSERT INTO usuarios (username, password, rol_id , createdAt, updatedAt) 
VALUES ('supervisor', '$2y$10$t.TYP1KnauGZXpQ6pbGrROXClfXFR0IbKlxGFupLPdmM.3vEYwm16', 2,CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

INSERT INTO visitantes (nombres, apellidos, cedula , createdAt, updatedAt)
VALUES ('Javier Alejandro', 'Vega Molina', '0943915561' ,CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());