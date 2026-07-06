import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDB } from '../config/db';

export const createItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const db = getDB();
        const result = await db.collection('items').insertOne(req.body);
        res.status(201).json({ insertedId: result.insertedId, ...req.body });
    } catch (err) {
        res.status(500).json({ error: 'Error al insertar', details: String(err) });
    }
};

export const getItems = async (req: Request, res: Response): Promise<void> => {
    try {
        const db = getDB();
        const filter: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(req.query)) {
            filter[key] = value;
        }
        const items = await db.collection('items').find(filter).toArray();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Error al buscar', details: String(err) });
    }
};

export const getItemById = async (req: Request, res: Response): Promise<void> => {
    try {
        const db = getDB();
        const item = await db.collection('items').findOne({ _id: new ObjectId(req.params.id) });
        if (!item) {
            res.status(404).json({ error: 'Item no encontrado' });
            return;
        }
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: 'Error al buscar', details: String(err) });
    }
};

export const updateItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const db = getDB();
        const result = await db.collection('items').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );
        if (result.matchedCount === 0) {
            res.status(404).json({ error: 'Item no encontrado' });
            return;
        }
        res.json({ message: 'Item actualizado', modifiedCount: result.modifiedCount });
    } catch (err) {
        res.status(500).json({ error: 'Error al editar', details: String(err) });
    }
};

export const deleteItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const db = getDB();
        const result = await db.collection('items').deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
            res.status(404).json({ error: 'Item no encontrado' });
            return;
        }
        res.json({ message: 'Item eliminado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al borrar', details: String(err) });
    }
};
