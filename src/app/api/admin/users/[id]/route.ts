import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { getAdminFromRequest } from '@/lib/auth';
import { cookies } from 'next/headers';

// DELETE: Remove an admin user
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> } // Match Next.js 15 async params
) {
    try {
        const cookieStore = await cookies();
        const adminEmail = await getAdminFromRequest(cookieStore);

        if (!adminEmail) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        // Prevent self-deletion
        const currentUser = await query(`SELECT id FROM admin_users WHERE email = $1`, [adminEmail]);
        if (currentUser.rows.length > 0 && currentUser.rows[0].id === id) {
            return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 403 });
        }

        await query(`DELETE FROM admin_users WHERE id = $1`, [id]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// PATCH: Update password
export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const cookieStore = await cookies();
        const adminEmail = await getAdminFromRequest(cookieStore);

        if (!adminEmail) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();
        const { password } = body;

        if (!password || password.length < 8) {
            return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
        }

        const hashedPassword = await hashPassword(password);

        await query(
            `UPDATE admin_users SET password_hash = $1 WHERE id = $2`,
            [hashedPassword, id]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update password:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
