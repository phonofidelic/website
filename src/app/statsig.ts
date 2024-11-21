import Statsig from 'statsig-node'
import { unstable_after as after } from 'next/server'
import { cookies } from 'next/headers'

const initStatsig = async () => {
  await Statsig.initialize(process.env.STATSIG_SERVER_SECRET_KEY!, {
    environment: { tier: process.env.NEXT_PUBLIC_ENV },
  })

  after(() => Statsig.flush(500))
}

const getStatsigUser = async () => {
  const serverCookies = await cookies()
  const ajsAnonymousId = serverCookies.get('ajs_anonymous_id')

  return { userID: ajsAnonymousId?.value ?? 'not_set' }
}

export async function checkGate(gateName: string): Promise<boolean> {
  await initStatsig()

  return Statsig.checkGate(await getStatsigUser(), gateName)
}
