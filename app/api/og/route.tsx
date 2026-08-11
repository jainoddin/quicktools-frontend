import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const cleanTitle = (value: string | null) => {
  const title = (value || 'QuickTools.ai').replace(/[<>]/g, '').trim();
  return title.slice(0, 90) || 'QuickTools.ai';
};

export function GET(request: NextRequest) {
  const title = cleanTitle(request.nextUrl.searchParams.get('title'));
  const type = cleanTitle(request.nextUrl.searchParams.get('type') || 'AI tool');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 82px',
          color: '#111827',
          background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 58%, #ede9fe 100%)',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, fontSize: 38, fontWeight: 800 }}>
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              background: 'linear-gradient(135deg, #6d5ef8, #2563eb)',
              fontSize: 44,
            }}
          >
            ⚡
          </div>
          QuickTools.ai
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 1040 }}>
          <div style={{ color: '#5b4cf6', fontSize: 25, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase' }}>
            {type}
          </div>
          <div style={{ fontSize: title.length > 58 ? 58 : 68, lineHeight: 1.08, fontWeight: 900 }}>
            {title}
          </div>
          <div style={{ color: '#475569', fontSize: 28 }}>
            Practical AI tools for focused, useful results.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: 24 }}>
          <span>100+ AI tools in one place</span>
          <span>quicktool.space</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    },
  );
}
