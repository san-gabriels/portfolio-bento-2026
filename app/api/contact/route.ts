import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // Qui diciamo a Resend cosa fare
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        // Mittente di default di Resend (funziona per i test)
        from: 'Portfolio Contact <onboarding@resend.dev>',
        // DESTINATARIO: Qui arrivano le mail
        to: 'contact@gabrielmihali.com', 
        subject: `Nuovo messaggio da ${name}`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
            <h2>Nuovo messaggio dal tuo Portfolio</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Azienda:</strong> ${company}</p>
            <hr />
            <p><strong>Messaggio:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        `,
      }),
    });

    if (res.ok) {
      return NextResponse.json({ success: true });
    } else {
      const errorData = await res.json();
      console.error('Resend Error:', errorData);
      return NextResponse.json({ error: 'Errore nell\'invio' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Errore del server' }, { status: 500 });
  }
}