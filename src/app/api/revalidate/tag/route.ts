import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(request: NextRequest) {
  try {
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return new Response('Missing environment variable', { status: 500 })
    }

    const { isValidSignature, body } = await parseBody<{ tags: string[] }>(
      // @ts-expect-error react-dom version mismatch?
      request,
      process.env.SANITY_REVALIDATE_SECRET,
      true,
    )

    if (!isValidSignature) {
      const message = 'Invalid signature'
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      })
    } else if (!Array.isArray(body?.tags) || !body.tags.length) {
      const message = 'Bad Request'
      return new Response(JSON.stringify({ message, body }), { status: 400 })
    }

    body.tags.forEach((tag) => {
      revalidateTag(tag)
    })

    return NextResponse.json({ body })
  } catch (err) {
    console.error(err)
    return new Response((err as Error).message, { status: 500 })
  }
}
