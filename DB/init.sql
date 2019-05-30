
CREATE DATABASE PokeDB
GO
USE PokeDB
GO


EXEC sp_configure 'contained database authentication', 1
GO
RECONFIGURE
GO

ALTER DATABASE PokeDB
    SET containment = partial
GO



CREATE TABLE types
(
    name VARCHAR(50) PRIMARY KEY
)
CREATE TABLE pokemons
(
    ID   INT PRIMARY KEY,
    name VARCHAR(50),
    type VARCHAR(50) FOREIGN KEY REFERENCES types
);
CREATE TABLE trainers
(
    username    VARCHAR(50) PRIMARY KEY,
    firstname   VARCHAR(50),
    lastname    VARCHAR(50),
    isProfessor TINYINT,
)
CREATE TABLE partnership
(
    pokemon_ID INT FOREIGN KEY REFERENCES pokemons,
    trainer_ID VARCHAR(50) FOREIGN KEY REFERENCES trainers,
    catch_date DATE
)
GO

CREATE ROLE Professor
CREATE ROLE Trainer
GO

GRANT SELECT ON SCHEMA::dbo TO Professor
GRANT INSERT ON pokemons TO Professor
GRANT DELETE ON pokemons TO Professor
GRANT UPDATE ON pokemons TO Professor
GRANT INSERT ON types TO Professor
GRANT DELETE ON types TO Professor
GRANT UPDATE ON types TO Professor
GO

GRANT SELECT ON SCHEMA::dbo TO Trainer
GRANT INSERT ON partnership TO Trainer
GRANT DELETE ON partnership TO Trainer
GRANT UPDATE ON partnership TO Trainer
GO

