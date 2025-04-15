import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

// This function handles quote request submissions and sends notifications
Deno.serve(async (req) => {
  try {
    // Parse the request body
    const { customerInfo, products } = await req.json();
    
    // Validate required fields
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !products || products.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Missing required fields" 
        }),
        { 
          headers: { "Content-Type": "application/json" },
          status: 400
        }
      );
    }
    
    // Initialize Supabase client
    // In a real implementation, these would be environment variables
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
    
    // Start a transaction to ensure data consistency
    // In a real implementation, this would use a proper transaction
    
    // 1. Create the quote request
    const { data: quoteRequest, error: quoteError } = await supabase
      .from('quote_requests')
      .insert({
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        company_name: customerInfo.company || null,
        message: customerInfo.message || null,
        status: 'pending'
      })
      .select()
      .single();
    
    if (quoteError) {
      console.error("Error creating quote request:", quoteError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Failed to create quote request" 
        }),
        { 
          headers: { "Content-Type": "application/json" },
          status: 500
        }
      );
    }
    
    // 2. Add the products to the quote request
    const quoteItems = products.map(product => ({
      quote_request_id: quoteRequest.id,
      product_id: product.id
    }));
    
    const { error: itemsError } = await supabase
      .from('quote_request_items')
      .insert(quoteItems);
    
    if (itemsError) {
      console.error("Error adding quote items:", itemsError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Failed to add products to quote request" 
        }),
        { 
          headers: { "Content-Type": "application/json" },
          status: 500
        }
      );
    }
    
    // 3. Create notifications for sales team
    // Get all sales users
    const { data: salesUsers } = await supabase
      .from('users')
      .select('id')
      .eq('role', 'sales')
      .eq('active', true);
    
    if (salesUsers && salesUsers.length > 0) {
      const notifications = salesUsers.map(user => ({
        user_id: user.id,
        title: "New Quote Request",
        message: `New quote request from ${customerInfo.name} for ${products.length} product(s)`,
        related_to: 'quote_request',
        related_id: quoteRequest.id
      }));
      
      await supabase
        .from('notifications')
        .insert(notifications);
    }
    
    // 4. Send email notification (in a real implementation)
    // This would integrate with an email service like SendGrid, Mailgun, etc.
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Quote request submitted successfully",
        quoteId: quoteRequest.id
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