import { sql } from './db.js'

async function createTable() {
  try {
    // DROP: precisa ser chamado sozinho
    await sql`DROP TABLE IF EXISTS videos`;

    // CREATE: chamado separadamente também
    await sql`
      CREATE TABLE videos (
        id UUID PRIMARY KEY,
        title TEXT,
        description TEXT,
        duration INTEGER
      );
    `;

    console.log('✅ Tabela criada com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao criar a tabela:', err);
  }
}

createTable();