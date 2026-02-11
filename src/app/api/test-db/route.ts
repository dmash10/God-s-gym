import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function GET() {
    try {
        console.log('--- DB TEST STARTED ---');
        const supabase = await createClient();

        console.log('Testing sites table...');
        const { data: sites, error: sitesError } = await supabase
            .from('sites')
            .select('id, slug');

        if (sitesError) {
            console.error('Sites error:', sitesError);
            return NextResponse.json({ error: 'Database access failed', details: sitesError }, { status: 500 });
        }

        console.log('Testing auth...');
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        return NextResponse.json({
            success: true,
            sites,
            auth: {
                user: user ? { email: user.email, id: user.id } : null,
                error: authError
            }
        });
    } catch (error: any) {
        console.error('Fatal test error:', error);
        return NextResponse.json({ error: 'Fatal error', details: error.message }, { status: 500 });
    }
}
