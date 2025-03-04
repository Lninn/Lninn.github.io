import { createClient } from '@supabase/supabase-js'

var VITE_SUPABASE_URL='https://lpfmjvvkofoglztkztyr.supabase.co'
var VITE_SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwZm1qdnZrb2ZvZ2x6dGt6dHlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwNTU1NzQsImV4cCI6MjA1NjYzMTU3NH0.bTQuyl4giJbwOvG_7qyndafHhoRQAz4McuOEVjpJ5gI'

const supabaseUrl = VITE_SUPABASE_URL
const supabaseAnonKey = VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
