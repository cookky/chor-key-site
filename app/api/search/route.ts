// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('q') || ''

  if (!query.trim()) {
    return NextResponse.json({ results: [] })
  }

  // Full-text fuzzy search (Postgres)
  const { data, error } = await supabase
    .from('songs')
    .select('id, title, artist, slug')
    .or(`title.ilike.%${query}%,artist.ilike.%${query}%`)
    .order('title')

  if (error) {
    return NextResponse.json({ results: [], error: error.message }, { status: 500 })
  }

  return NextResponse.json({ results: data })
}
