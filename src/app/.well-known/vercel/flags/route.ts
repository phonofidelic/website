import { NextResponse, type NextRequest } from 'next/server'
import { verifyAccess, version, type ApiData } from 'flags'
import { fetchGateIdsCached } from '../../../../statsig'
import { cache } from 'react'

export async function GET(request: NextRequest) {
  const access = await verifyAccess(request.headers.get('Authorization'))
  if (!access) return NextResponse.json(null, { status: 401 })

  const gateIds = await fetchGateIdsCached() as string[]
  const definitions: Record<string, ReturnType<typeof createGateDefinitionCached>> = {}
  gateIds.forEach((gateId) => {
    definitions[gateId] = createGateDefinitionCached(gateId)
  })

  return NextResponse.json<ApiData>({ definitions }, {
    headers: { 'x-flags-sdk-version': version },
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
