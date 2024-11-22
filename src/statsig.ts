import Statsig, { StatsigUser } from 'statsig-node'
import { unstable_after as after } from 'next/server'
import { cookies } from 'next/headers'

const initStatsig = async () => {
  await Statsig.initialize(process.env.STATSIG_SERVER_SECRET_KEY!, {
    environment: { tier: process.env.NEXT_PUBLIC_ENV },
  })

  after(() => Statsig.flush(500))
}

const getStatsigUser = async (): Promise<StatsigUser> => {
  const serverCookies = await cookies()
  const ajsAnonymousId = serverCookies.get('ajs_anonymous_id')?.value ?? ''
  const override = serverCookies.get('override')?.value ?? ''

  return {
    userID: ajsAnonymousId,
    custom: {
      override,
    },
  }
}

export async function checkGate(gateName: string) {
  await initStatsig()

  return Statsig.checkGate(await getStatsigUser(), gateName)
}

export async function fetchGateIds() {
  try {
    const consoleGatesResponse = await fetch(
      `https://statsigapi.net/console/v1/gates`,
      {
        headers: {
          'STATSIG-API-KEY': process.env.STATSIG_CONSOLE_API_KEY ?? '',
        },
      },
    )
    const consoleGatesData = await consoleGatesResponse.json()
    return consoleGatesData.data.map((gate: { id: string }) => gate.id)
  } catch (error) {
    throw error
  }
}
