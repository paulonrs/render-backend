import { Request, Response } from "express";
import pool from "../config/database";

// Obter todos os itens
export const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM items");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar itens." });
  }
};

// Adicionar um novo item
export const addItem = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO items (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar item." });
  }
};

// Excluir um item
export const deleteItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM items WHERE id = $1", [id]);
    res.json({ message: "Item excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir item." });
  }
};
