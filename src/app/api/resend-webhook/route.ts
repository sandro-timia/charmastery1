import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ResendWebhookEvent {
  type: string;
  data: {
    from: string;
    subject: string;
    email_id: string;
    to: string[];
  };
}

interface EmailData {
  html?: string;
  text?: string;
}

export async function POST(request: NextRequest) {
  try {
    const event: ResendWebhookEvent = await request.json();

    if (event.type === 'email.received') {
      const { from, subject, email_id, to } = event.data;
      
      console.log('📧 Email received from:', from);
      console.log('Original To:', to);
      
      // Fetch the full email content
      const response = await fetch(`https://api.resend.com/emails/${email_id}`, {
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
        }
      });
      
      const emailData: EmailData = await response.json();
      
      // Forward to your personal email
      await resend.emails.send({
        from: 'Charmastery Support <support@charmastery.com>',
        to: 'sandro.calzada@gmail.com',
        subject: `[Forwarded] ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif;">
            <div style="padding: 20px; background: #1A1A1F; color: #F5F5F5; margin-bottom: 20px; border-radius: 8px; border-left: 4px solid #C9A227;">
              <h3 style="color: #C9A227; margin-top: 0;">📧 Forwarded Email from Charmastery</h3>
              <p style="margin: 8px 0;"><strong style="color: #8A8A8E;">From:</strong> <span style="color: #F5F5F5;">${from}</span></p>
              <p style="margin: 8px 0;"><strong style="color: #8A8A8E;">To:</strong> <span style="color: #F5F5F5;">${to.join(', ')}</span></p>
              <p style="margin: 8px 0;"><strong style="color: #8A8A8E;">Subject:</strong> <span style="color: #F5F5F5;">${subject}</span></p>
            </div>
            <hr style="border: none; border-top: 1px solid #333; margin: 20px 0;" />
            <div style="padding: 20px; background: #ffffff; border-radius: 8px;">
              ${emailData.html || emailData.text || '<p style="color: #666;">No content</p>'}
            </div>
          </div>
        `,
        replyTo: from // So you can reply directly to the sender
      });
      
      console.log('✅ Email forwarded to sandro.calzada@gmail.com');
      
      return NextResponse.json({ success: true, forwarded: true });
    }

    // Handle other webhook events
    console.log('📬 Resend webhook event:', event.type);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Optionally handle GET for webhook verification
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    message: 'Resend webhook endpoint is active' 
  });
}
