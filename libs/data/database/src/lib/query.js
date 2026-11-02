import { getPool } from "./pool.js";

export const query = async (text, params) => {
    const pool = getPool();
    return pool.query(text, params);
};