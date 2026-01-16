import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendResetEmailRequest {
  email: string;
  resetLink: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, resetLink }: SendResetEmailRequest = await request.json();

    if (!email || !resetLink) {
      return NextResponse.json(
        { error: 'Email y resetLink son requeridos' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Charmastery <mailer@charmastery.com>',
      to: email,
      subject: 'Restablecer tu contraseña - Charmastery',
      html: `
        <!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #0A0A0B;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0A0A0B; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #1A1A1F; border-radius: 16px; border: 1px solid rgba(201, 162, 39, 0.3); overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                      <td style="padding: 40px 40px 20px 40px; text-align: center; border-bottom: 1px solid rgba(201, 162, 39, 0.2);">
                        <h1 style="margin: 0; color: #C9A227; font-size: 28px; font-weight: 600; letter-spacing: 2px;">
                          ✨ CHARMASTERY
                        </h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px;">
                        <h2 style="margin: 0 0 20px 0; color: #F5F5F5; font-size: 24px; font-weight: 500;">
                          ¡Hola!
                        </h2>
                        
                        <p style="margin: 0 0 20px 0; color: #8A8A8E; font-size: 16px; line-height: 1.6;">
                          Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en Charmastery.
                        </p>
                        
                        <p style="margin: 0 0 30px 0; color: #8A8A8E; font-size: 16px; line-height: 1.6;">
                          Haz clic en el siguiente botón para crear una nueva contraseña:
                        </p>
                        
                        <!-- Button -->
                        <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto 30px auto;">
                          <tr>
                            <td style="border-radius: 8px; background-color: #C9A227;">
                              <a href="${resetLink}" target="_blank" style="display: inline-block; padding: 16px 32px; color: #0A0A0B; text-decoration: none; font-size: 16px; font-weight: 600; letter-spacing: 1px;">
                                RESTABLECER CONTRASEÑA
                              </a>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="margin: 0 0 10px 0; color: #5A5A5E; font-size: 14px; line-height: 1.6;">
                          Este enlace expirará en <strong style="color: #C9A227;">1 hora</strong>.
                        </p>
                        
                        <p style="margin: 0 0 20px 0; color: #5A5A5E; font-size: 14px; line-height: 1.6;">
                          Si no solicitaste restablecer tu contraseña, puedes ignorar este correo. Tu cuenta permanecerá segura.
                        </p>
                        
                        <!-- Divider -->
                        <hr style="border: none; border-top: 1px solid rgba(201, 162, 39, 0.2); margin: 30px 0;" />
                        
                        <p style="margin: 0; color: #5A5A5E; font-size: 12px; line-height: 1.6;">
                          Si el botón no funciona, copia y pega este enlace en tu navegador:
                        </p>
                        <p style="margin: 10px 0 0 0; word-break: break-all;">
                          <a href="${resetLink}" style="color: #C9A227; font-size: 12px; text-decoration: underline;">
                            ${resetLink}
                          </a>
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px 40px; background-color: #121214; text-align: center; border-top: 1px solid rgba(201, 162, 39, 0.2);">
                        <p style="margin: 0 0 10px 0; color: #5A5A5E; font-size: 12px;">
                          Este es un correo automático de Charmastery.
                        </p>
                        <p style="margin: 0; color: #5A5A5E; font-size: 12px;">
                          Por favor no respondas a este mensaje.
                        </p>
                        <p style="margin: 15px 0 0 0; color: #C9A227; font-size: 11px; letter-spacing: 1px;">
                          © 2026 Charmastery. Todos los derechos reservados.
                        </p>
                      </td>
                    </tr>
                    
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Error al enviar el correo' },
        { status: 500 }
      );
    }

    console.log('✅ Password reset email sent to:', email, 'Message ID:', data?.id);

    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (error) {
    console.error('Send reset email error:', error);
    const message = error instanceof Error ? error.message : 'Error interno del servidor';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
