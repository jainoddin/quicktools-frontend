import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    if (token !== process.env.INTERNAL_API_SECRET) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { courseSlug, lessonSlug } = body;

    if (!courseSlug || !lessonSlug) {
      return NextResponse.json({ error: 'Missing courseSlug or lessonSlug' }, { status: 400 });
    }

    // Revalidate relevant paths
    revalidatePath('/learn');
    revalidatePath(`/learn/${courseSlug}`);
    revalidatePath(`/learn/${courseSlug}/${lessonSlug}`);
    
    // Also revalidate sitemap if tags are used, or general layout
    revalidateTag('learn-content');

    return NextResponse.json({ success: true, message: `Revalidated /learn/${courseSlug}/${lessonSlug}` });
  } catch (err: any) {
    console.error('Revalidation error:', err);
    return NextResponse.json({ error: 'Internal Server Error', details: err.message }, { status: 500 });
  }
}
