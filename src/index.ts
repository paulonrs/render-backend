import express, { Application, Request, Response } from "express";
import cors from "cors";
import { Pool } from "pg";
import itemRoutes from "./routes/itemRoutes";

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use("/items", itemRoutes);

// Configurar a conexão com o banco de dados PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Rota de teste
app.get("/", (req: Request, res: Response) => {
  res.send("API funcionando!");
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export { pool };
