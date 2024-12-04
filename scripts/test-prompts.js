import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function insertTestPrompts() {
  try {
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    console.log('Creating test prompts for user:', user.id);

    // Create 8 test prompts
    for (let i = 1; i <= 8; i++) {
      const promptData = {
        title: `Test Prompt ${i}`,
        content: `This is test prompt content ${i}`,
        description: `Test description ${i}`,
        user_id: user.id,
        tags: ['test'],
        is_public: false,
        version: 1
      };

      const { data, error } = await supabase
        .from('prompts')
        .insert([promptData])
        .select();

      if (error) {
        console.error(`Error creating prompt ${i}:`, error);
      } else {
        console.log(`Created prompt ${i}:`, data[0].id);
      }
    }

    console.log('Finished creating test prompts');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the script
insertTestPrompts();
