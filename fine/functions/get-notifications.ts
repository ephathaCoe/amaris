import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

// This function retrieves notifications for a specific user
Deno.serve(async (req) => {
  try {
    // Parse the request body
    const { userId } = await req.json();
    
    // Validate required fields
    if (!userId) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "User ID is required" 
        }),
        { 
          headers: { "Content-Type": "application/json" },
          status: 400
        }
      );
    }
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_KEY");
    
    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Server configuration error" 
        }),
        { 
          headers: { "Content-Type": "application/json" },
          status: 500
        }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get notifications for the user
    const { data: notifications, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (error) {
      console.error("Error fetching notifications:", error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Failed to fetch notifications" 
        }),
        { 
          headers: { "Content-Type": "application/json" },
          status: 500
        }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        notifications
      }),
      { 
        headers: { "Content-Type": "application/json" },
        status: 200
      }
    );
    
  } catch (error) {
    console.error("Server error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Server error" 
      }),
      { 
        headers: { "Content-Type": "application/json" },
        status: 500
      }
    );
  }
});