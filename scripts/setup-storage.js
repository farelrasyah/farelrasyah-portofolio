// Script untuk setup Supabase Storage untuk achievements
const fs = require('fs');
const path = require('path');

// Load environment variables manually
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

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupStorage() {
  try {
    // Create bucket for achievements
    const { data, error } = await supabase
      .storage
      .createBucket('achievements', {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
        fileSizeLimit: 1024 * 1024 * 5 // 5MB
      });

    if (error) {
      if (error.message.includes('already exists')) {
        console.log('✅ Bucket "achievements" already exists');
      } else {
        console.error('❌ Error creating bucket:', error.message);
        return;
      }
    } else {
      console.log('✅ Bucket "achievements" created successfully');
    }

    // Create policy for public read access
    console.log('\n📋 Now add this policy in Supabase Dashboard > Storage > Policies:');
    console.log('Policy Name: "Public Access for achievements"');
    console.log('Allowed operation: SELECT');
    console.log('Target roles: public');
    console.log('USING expression: true');
    
  } catch (err) {
    console.error('❌ Setup failed:', err.message);
  }
}

async function uploadSample() {
  // Example of how to upload a file
  console.log('\n📤 To upload files programmatically:');
  console.log(`
const { data, error } = await supabase.storage
  .from('achievements')
  .upload('certificate-name.jpg', file);

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('achievements')
  .getPublicUrl('certificate-name.jpg');
  `);
}

setupStorage();
uploadSample();
