// Importando as bibliotecas necessárias
import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Esse codigo faz o banco de dados sair da pasta back-end e ir pra pasta do front-end
//app.use(express.sqlite3(path.join(__dirname, '../front-end')));

// Esse codigo leva a pastas de musicas com mp3 para o front-end
//app.use('/musicas', express.static(path.join(__dirname, 'musicas')));

// Função para conectar ao banco de dados e retornar a conexão
async function ConectarBanco() {
    const db = await open({
        filename: './banco.db',
        driver: sqlite3.Database,
    });
    return db;
}

// Função para iniciar o banco de dados, criar as tabelas e inserir as músicas (se ainda não existirem)
async function IniciarBanco() {
    const db = await ConectarBanco();

    // Criar Tabela de Musicas no banco de dados
    await db.run(`CREATE TABLE IF NOT EXISTS musicas (id INTEGER PRIMARY KEY, titulo TEXT, duracao TEXT, artista TEXT, url TEXT)`);

    // Criar Tabela de usuarios no banco de dados caso não exista
    await db.run(`CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, nome TEXT, email TEXT, senha TEXT)`);

    const musicas = await db.get(`SELECT COUNT(*) as total FROM musicas`);
    if (musicas.total === 0) {
        // Inserir musicas na tabela de musicas
        await db.run(`INSERT INTO musicas (titulo, duracao, artista, url) VALUES (?, ?, ?, ?)`, ['Chicago', '4:07', 'Michael Jackson', 'musica1.mp3']);
        await db.run(`INSERT INTO musicas (titulo, duracao, artista, url) VALUES (?, ?, ?, ?)`, ['Billie Jean', '4:54', 'Michael Jackson', 'musica2.mp3']);
        await db.run(`INSERT INTO musicas (titulo, duracao, artista, url) VALUES (?, ?, ?, ?)`, ['In the closet', '4:58', 'Michael Jackson', 'musica3.mp3']);
    }

}

// Função para registrar uma nova musica no banco de dados
async function RegistrarMusica(titulo, duracao, artista, url) {
    const db = await ConectarBanco();

    await db.run(`INSERT INTO musicas (titulo, duracao, artista, url) VALUES (?, ?, ?, ?)`, [titulo, duracao, artista, url]);
}

RegistrarMusica('Smooth Criminal', '4:17', 'Michael Jackson', 'musica4.mp3');

IniciarBanco();

