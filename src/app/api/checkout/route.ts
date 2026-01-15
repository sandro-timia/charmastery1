import { NextRequest, NextResponse } from 'next/server';

// Check if we have real Stripe keys configured
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const IS_DEMO_MODE = !STRIPE_SECRET_KEY || STRIPE_SECRET_KEY === 'sk_test_YOUR_SECRET_KEY_HERE';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customerEmail } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No hay items en el carrito' },
        { status: 400 }
      );
    }

    // Get the origin for redirect URLs
    const origin = request.headers.get('origin') || 'http://localhost:3000';

    // Demo mode: redirect to simulated payment page
    if (IS_DEMO_MODE) {
      const demoSessionId = `demo_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      const totalAmount = items.reduce((sum: number, item: { price: number }) => sum + item.price, 0);
      
      // Redirect to demo payment page
      const demoUrl = `${origin}/checkout/demo?session_id=${demoSessionId}&amount=${totalAmount}&email=${encodeURIComponent(customerEmail || '')}`;
      
      return NextResponse.json({ url: demoUrl, sessionId: demoSessionId, demo: true });
    }

    // Production mode: use real Stripe
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
    });

    // Create line items for Stripe
    const lineItems = items.map((item: { name: string; price: number; description?: string }) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: item.description || undefined,
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses cents
      },
      quantity: 1,
    }));

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      customer_email: customerEmail || undefined,
      metadata: {
        source: 'charmastery',
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Error al crear la sesión de pago' },
      { status: 500 }
    );
  }
}
