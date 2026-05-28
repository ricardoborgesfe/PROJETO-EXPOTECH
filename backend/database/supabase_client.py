from supabase import create_client

url = "https://yhbiyorducsvpqdxmwfx.supabase.co"

key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloYml5b3JkdWNzdnBxZHhtd2Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MzIzNTAsImV4cCI6MjA5NTUwODM1MH0.cRjGxwJz_P5-Wgs-lqFRK-dDdSUEJljPDAXr_IuwEMk"

supabase = create_client(
    url,
    key
)