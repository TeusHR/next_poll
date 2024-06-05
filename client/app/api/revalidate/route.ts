import { NextRequest, NextResponse } from 'next/server';
import revalidateFetch from '@/services/revalidateFetch';

export async function GET(_req: NextRequest) {
    try {
        const tags = [
            'researchWork',
            'cooperation',
            'innovation',
            'conference',
            'international',
            'science',
            'laboratory',
            'activity',
            'consulting',
            'training',
            'digam',
            'studentScience',
        ];

        for (const tag of tags) {
            await revalidateFetch(tag);
        }

        return NextResponse.json({ revalidated: true }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: 'Error revalidating' }, { status: 500 });
    }
}
