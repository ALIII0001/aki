import pg from "pg";

const { Pool } = pg;

const pool = process.env.SUPABASE_DB_URL
  ? new Pool({
      connectionString: process.env.SUPABASE_DB_URL,
      ssl: { rejectUnauthorized: false },
      max: 1
    })
  : null;

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!pool) {
    response.status(500).json({
      error: "SUPABASE_DB_URL is not configured on the server."
    });
    return;
  }

  try {
    const result = await pool.query(
      "select table_name from information_schema.tables where table_schema = $1 order by table_name limit 20",
      ["public"]
    );

    response.status(200).json({ tables: result.rows });
  } catch (error) {
    response.status(500).json({
      error: "Database query failed."
    });
  }
}
