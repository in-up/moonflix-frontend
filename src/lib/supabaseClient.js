import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tyhtwkhibrtyvsktwemf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5aHR3a2hpYnJ0eXZza3R3ZW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxMzc2MzksImV4cCI6MjAyNzcxMzYzOX0.ZsEHXHKQmiBwx0yKUX5i0WVh9kSWD2ju1KIeJMuwa_8'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase

// supabase 프로젝트에 연결하기 위한 설정 정보 포함 