
// Função para carregar as musicas do banco de dados e exibir no player
async function CarregarPlayerMusica() {
    const resposta = await fetch('http://localhost:3000/api/musicas');
    const musicas = await resposta.json();
    
}