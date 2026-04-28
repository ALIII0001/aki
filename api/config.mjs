export default function handler(_request, response) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    response.status(500).json({ configured: false });
    return;
  }

  response.status(200).json({
    configured: true,
    supabaseUrl,
    supabaseAnonKey
  });
}
