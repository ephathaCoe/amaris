import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

// This function marks notifications as read
Deno.serve(async (req) => {
  try {
    // Parse the request body
    const { notificationId, userId } = await req.json();
    
    // Validate required fields
    if (!notificationId || !userId) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Notification ID and User ID are required" 
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
    
    // Update the notification
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
      .eq('user_id', userId);
    
    if (error) {
      console.error("Error updating notification:", error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Failed to update notification" 
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
        message: "Notification marked as read"
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