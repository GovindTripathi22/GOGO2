import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { getAdminFromRequest } from '@/lib/auth';
import { cookies } from 'next/headers';

// GET: List all admin users
export async function GET() {
    try {
        const cookieStore = await cookies();
        const adminEmail = await getAdminFromRequest(cookieStore);

        if (!adminEmail) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const result = await query(
            `SELECT id, email, role, created_at FROM admin_users ORDER BY created_at DESC`
        );

        return NextResponse.json({ users: result.rows });
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST: Create a new admin user
export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const adminEmail = await getAdminFromRequest(cookieStore);

        if (!adminEmail) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        // Validate password length
        if (password.length < 8) {
            return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
        }

        // Check availability
        const check = await query(`SELECT id FROM admin_users WHERE email = $1`, [email]);
        if (check.rows.length > 0) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }

        const hashedPassword = await hashPassword(password);

        await query(
            `INSERT INTO admin_users (email, password_hash, role) VALUES ($1, $2, 'admin')`,
            [email, hashedPassword]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to create user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
