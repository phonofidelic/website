import { NextResponse, type NextRequest } from 'next/server'
import { verifyAccess, type ApiData } from '@vercel/flags'
// @ts-expect-error
import { fetchGateIds, fetchGateIdsCached } from '@/statsig'
import { cache } from 'react'

export async function GET(request: NextRequest) {
  const access = await verifyAccess(request.headers.get('Authorization'))
  if (!access) return NextResponse.json(null, { status: 401 })

  const gateIds = await fetchGateIdsCached()
  let definitions: Record<string, any> = {}
  gateIds.forEach((gateId) => {
    definitions[gateId] = createGateDefinitionCached(gateId)
  })

  return NextResponse.json<ApiData>({
    definitions,
  })
}

const createGateDefinitionCached = cache((gateId: string) => ({
  description: `Controls whether the ${gateId} feature is visible`,
  origin: `https://console.statsig.com/${process.env.STATSIG_PROJECT_ID}/gates/${gateId}`,
  options: [
    { value: false, label: 'Off' },
    { value: true, label: 'On' },
  ],
}))
