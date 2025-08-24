// Script untuk menambahkan sample data achievements
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

const sampleData = [
  {
    name: "React Developer Certification",
    category: "certification",
    description: "Advanced React development course completion",
    is_show: true,
    issuing_organization: "Meta",
    issue_date: "2024-01-15",
    image: "/images/achievements/react-cert.jpg",
    url_credential: "https://coursera.org/verify/react-cert",
    credential_id: "REACT-2024-001"
  },
  {
    name: "JavaScript Algorithms",
    category: "programming", 
    description: "Data structures and algorithms mastery",
    is_show: true,
    issuing_organization: "FreeCodeCamp",
    issue_date: "2023-12-10",
    image: "/images/achievements/js-algo.jpg",
    url_credential: "https://freecodecamp.org/certification/js-algo",
    credential_id: "JS-ALGO-2023"
  },
  {
    name: "Web Design Award",
    category: "design",
    description: "Excellence in modern web design",
    is_show: true,
    issuing_organization: "Design Institute",
    issue_date: "2024-03-20",
    image: "/images/achievements/design-award.jpg", 
    url_credential: "https://designinstitute.com/awards/web-2024",
    credential_id: "WD-2024-AWARD"
  }
];

async function addSampleData() {
  try {
    // First, let's see current structure
    const { data: currentData } = await supabase
      .from('achievements')
      .select('*')
      .limit(1);
      
    console.log('Current table structure:', currentData);
    
    // Add sample data
    const { data, error } = await supabase
      .from('achievements')
      .insert(sampleData)
      .select();

    if (error) {
      console.error('❌ Error adding sample data:', error.message);
      console.log('\n💡 You may need to add missing columns to your table first:');
      console.log('ALTER TABLE achievements ADD COLUMN issuing_organization TEXT;');
      console.log('ALTER TABLE achievements ADD COLUMN issue_date DATE;');
      console.log('ALTER TABLE achievements ADD COLUMN image TEXT;');
      console.log('ALTER TABLE achievements ADD COLUMN url_credential TEXT;');
      console.log('ALTER TABLE achievements ADD COLUMN credential_id TEXT;');
      return;
    }

    console.log('✅ Sample data added successfully!');
    console.log(`📝 Added ${data.length} records`);
    
  } catch (err) {
    console.error('❌ Failed to add sample data:', err.message);
  }
}

addSampleData();
