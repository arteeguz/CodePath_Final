import { createClient } from '@supabase/supabase-js'

const URL = 'https://yamyrkqwwnamalezwryc.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhbXlya3F3d25hbWFsZXp3cnljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5NjkyMzUsImV4cCI6MjAyODU0NTIzNX0.P5dbFN2USX4YYv77CFHYJa6fyllWHu80wM5pIn6d4mA'

export const supabase = createClient(URL, API_KEY)