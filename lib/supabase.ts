import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aeifcskmkoumnkiwxzlm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaWZjc2ttb291bW5raXd4emxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NDIxMjIsImV4cCI6MjA3MDIxODEyMn0.ZmN4d0p62Dub63_Ystxj8Qe0StH37SBc_HJ96rAXvxU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)