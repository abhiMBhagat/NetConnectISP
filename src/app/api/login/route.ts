import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
  try {
    const { email, password, role } = await req.json();
    
    // Hardcoded credentials for development
    const validCredentials = [
      { email: 'customer@test.com', password: 'password', role: 'customer' },
      { email: 'staff@test.com', password: 'password', role: 'staff' },
      { email: 'admin', password: 'admin', role: 'staff' },
      { email: 'test', password: 'test', role: 'customer' }
    ];

    const user = validCredentials.find(
      cred => cred.email === email && cred.password === password && cred.role === role
    );

    if (user) {
      // Create session cookie
      const sessionCookie = serialize('session', JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      });

      const response = NextResponse.json({ 
        message: 'Login successful',
        user: { email: user.email, role: user.role }
      });
      
      response.headers.set('Set-Cookie', sessionCookie);
      return response;
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
