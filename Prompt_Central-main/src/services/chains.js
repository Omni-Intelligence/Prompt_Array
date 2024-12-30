import { supabase } from '@/lib/supabase';
import { toast } from "sonner";
import { queryClient } from '@/lib/react-query';

// Create a new chain
export const createChain = async (chainData) => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      toast.error('Please sign in to create chains');
      throw new Error('Authentication required');
    }

    // Insert the chain
    const { data: chain, error: chainError } = await supabase
      .from('chains')
      .insert({
        title: chainData.title,
        description: chainData.description,
        user_id: user.id
      })
      .select()
      .single();

    if (chainError) {
      toast.error(`Failed to create chain: ${chainError.message}`);
      throw chainError;
    }

    // If prompts were provided, add them to the chain
    if (chainData.prompts?.length > 0) {
      const chainPrompts = chainData.prompts.map((promptId, index) => ({
        chain_id: chain.id,
        prompt_id: promptId,
        sequence_order: index + 1
      }));

      const { error: promptsError } = await supabase
        .from('chain_prompts')
        .insert(chainPrompts);

      if (promptsError) {
        // If adding prompts fails, delete the chain to maintain consistency
        await supabase.from('chains').delete().eq('id', chain.id);
        toast.error(`Failed to add prompts to chain: ${promptsError.message}`);
        throw promptsError;
      }
    }

    queryClient.invalidateQueries(['chains']);
    return chain;
  } catch (error) {
    throw error;
  }
};

// Get all chains for the current user
export const getChains = async () => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('Authentication required');
    }

    const { data: chains, error } = await supabase
      .from('chains')
      .select(`
        *,
        chain_prompts!inner (
          id,
          sequence_order,
          prompt:prompts!inner (
            id,
            title,
            content
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching chains:', error);
      throw error;
    }

    // Transform the data structure to match the expected format
    const transformedChains = chains.map(chain => ({
      ...chain,
      prompts: chain.chain_prompts
        .sort((a, b) => a.sequence_order - b.sequence_order)
        .map(cp => cp.prompt)
    }));

    return transformedChains;
  } catch (error) {
    console.error('Error in getChains:', error);
    throw error;
  }
};

// Get a single chain by ID
export const getChain = async (chainId) => {
  try {
    const { data: chain, error } = await supabase
      .from('chains')
      .select(`
        *,
        chain_prompts (
          sequence_order,
          prompts (
            id,
            title,
            description,
            content,
            created_at,
            updated_at
          )
        )
      `)
      .eq('id', chainId)
      .single();

    if (error) {
      console.error('Error fetching chain:', error);
      throw error;
    }

    // Transform the data structure to match the expected format
    const transformedChain = {
      ...chain,
      prompts: chain.chain_prompts
        .sort((a, b) => a.sequence_order - b.sequence_order)
        .map(cp => ({
          ...cp.prompts,
          sequence_order: cp.sequence_order
        }))
    };

    return transformedChain;
  } catch (error) {
    console.error('Error in getChain:', error);
    throw error;
  }
};

// Update a chain
export const updateChain = async (chainId, chainData) => {
  try {
    if (!chainId) {
      throw new Error('Chain ID is required for updates');
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      toast.error('Please sign in to update chains');
      throw new Error('Authentication required');
    }

    // Update chain metadata
    const { error: chainError } = await supabase
      .from('chains')
      .update({
        title: chainData.title,
        description: chainData.description,
        updated_at: new Date().toISOString()
      })
      .eq('id', chainId);

    if (chainError) {
      toast.error(`Failed to update chain: ${chainError.message}`);
      throw chainError;
    }

    // Delete existing prompt associations
    const { error: deleteError } = await supabase
      .from('chain_prompts')
      .delete()
      .eq('chain_id', chainId);

    if (deleteError) {
      console.error('Error deleting existing prompts:', deleteError);
      throw deleteError;
    }

    // Add new prompt associations
    if (chainData.prompts?.length > 0) {
      const chainPrompts = chainData.prompts.map((promptId, index) => ({
        chain_id: chainId,
        prompt_id: promptId,
        sequence_order: index + 1
      }));

      const { error: insertError } = await supabase
        .from('chain_prompts')
        .insert(chainPrompts);

      if (insertError) {
        console.error('Error adding new prompts:', insertError);
        throw insertError;
      }
    }

    queryClient.invalidateQueries(['chains']);
    queryClient.invalidateQueries(['chain', chainId]);
    toast.success('Chain updated successfully!');
  } catch (error) {
    console.error('Error in updateChain:', error);
    throw error;
  }
};

// Delete a chain
export const deleteChain = async (chainId) => {
  try {
    const { error } = await supabase
      .from('chains')
      .delete()
      .eq('id', chainId);

    if (error) {
      toast.error(`Failed to delete chain: ${error.message}`);
      throw error;
    }

    queryClient.invalidateQueries(['chains']);
    toast.success('Chain deleted successfully!');
  } catch (error) {
    console.error('Error in deleteChain:', error);
    throw error;
  }
};
