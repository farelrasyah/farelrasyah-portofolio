// Script untuk verifikasi koneksi database Supabase
const { createClient } = require('@supabase/supabase-js');

// Load environment variables manually
const fs = require('fs');
const path = require('path');

// Read .env file
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');

// Parse environment variables
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    const value = valueParts.join('=').trim();
    envVars[key.trim()] = value;
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Verifying Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey ? '✅ Found' : '❌ Missing');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyConnection() {
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('achievements')
      .select('*');
    
    if (error) {
      console.error('❌ Database Error:', error.message);
      console.log('\n💡 Solutions:');
      console.log('1. Create the "achievements" table in Supabase dashboard');
      console.log('2. Enable Row Level Security (RLS)');
      console.log('3. Add public read policy');
      return;
    }
    
    console.log('✅ Database connection successful!');
    console.log('📊 Table "achievements" exists');
    console.log(`📝 Total rows: ${data?.length || 0}`);
    
    if (data && data.length > 0) {
      console.log('\n📋 Sample data:');
      console.log(JSON.stringify(data[0], null, 2));
    } else {
      console.log('\n⚠️  Table is empty. Add some sample data.');
    }
    
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  }
}

verifyConnection();
