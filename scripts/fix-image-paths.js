// Script untuk memperbaiki path gambar yang salah di database
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

function normalizeImagePath(imagePath) {
  if (!imagePath) return null;
  
  // If it's already a relative path or URL, use as is
  if (imagePath.startsWith("/") || imagePath.startsWith("http")) {
    return imagePath;
  }
  
  // If it's an absolute Windows path, convert to relative
  if (imagePath.includes("public\\images") || imagePath.includes("public/images")) {
    const pathParts = imagePath.split(/[\\\/]/);
    const publicIndex = pathParts.findIndex(part => part === "public");
    if (publicIndex !== -1) {
      return "/" + pathParts.slice(publicIndex + 1).join("/");
    }
  }
  
  return imagePath;
}

async function fixImagePaths() {
  try {
    // Get all achievements with image paths
    const { data: achievements, error: fetchError } = await supabase
      .from('achievements')
      .select('id, image');

    if (fetchError) {
      console.error('❌ Error fetching achievements:', fetchError.message);
      return;
    }

    console.log(`🔍 Found ${achievements.length} achievements to check`);

    // Fix each path
    for (const achievement of achievements) {
      const originalPath = achievement.image;
      const normalizedPath = normalizeImagePath(originalPath);

      if (originalPath !== normalizedPath) {
        console.log(`📝 Fixing: ${originalPath} → ${normalizedPath}`);

        const { error: updateError } = await supabase
          .from('achievements')
          .update({ image: normalizedPath })
          .eq('id', achievement.id);

        if (updateError) {
          console.error(`❌ Error updating achievement ${achievement.id}:`, updateError.message);
        } else {
          console.log(`✅ Updated achievement ${achievement.id}`);
        }
      }
    }

    console.log('🎉 Image path normalization complete!');

  } catch (err) {
    console.error('❌ Failed to fix image paths:', err.message);
  }
}

fixImagePaths();
