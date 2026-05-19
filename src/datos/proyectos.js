import { createClient } from '@supabase/supabase-js';

// Estos datos los sacas de Project Settings > API en tu panel de Supabase
const supabaseUrl = 'https://pokvepiphawdiabvrnac.supabase.co'; // Sin el /rest/v1 al final
const supabaseAnonKey = 'sb_publishable_3oF9Ak5uXKQidcQtsbg0vg_XyXH38kT';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);