This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). 

* [Sanity](https://www.sanity.io) is used for a content management system. 
* [Statsig](https://www.statsig.com) is used to gate new features. 
* [Sentry](https://sentry.io) is used for error tracking.
* [Vercel](https://vercel.com) is used for hosting.

## Local development

### Environment variables

The following environment variables are required in `.env.local`:
```
FLAGS_SECRET
NEXT_PUBLIC_ENV
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_STATSIG_CLIENT_KEY
SANITY_API_DATASET
SANITY_API_READ_TOKEN
SANITY_API_WRITE_TOKEN
SANITY_STUDIO_API_DATASET
SANITY_STUDIO_API_PROJECT_ID
SENTRY_AUTH_TOKEN
SENTRY_DNS
STATSIG_CONSOLE_API_KEY
STATSIG_PROJECT_ID
STATSIG_SERVER_SECRET_KEY
```

Install dependencies and run the development server:

```bash
pnpm install

pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

