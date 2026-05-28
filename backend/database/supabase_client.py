from supabase import create_client

url = "SUA_URL_SUPABASE"
key = "SUA_CHAVE_SUPABASE"

supabase = create_client(
    url,
    key
)