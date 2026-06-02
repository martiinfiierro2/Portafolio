
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://pokvepiphawdiabvrnac.supabase.co'
const supabaseKey = 'sb_publishable_3oF9Ak5uXKQidcQtsbg0vg_XyXH38kT'
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;