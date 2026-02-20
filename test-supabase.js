const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Testing Supabase Connection...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseAnonKey ? 'Found' : 'Missing');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
    try {
        const { data, error } = await supabase.from('generations').select('*').limit(1);
        if (error) {
            console.error('Error fetching generations:', error.message);
            console.error('Error details:', error);
        } else {
            console.log('Successfully connected and queried generations table.');
            console.log('Data:', data);
        }
    } catch (err) {
        console.error('Unexpected error:', err.message);
    }
}

test();
