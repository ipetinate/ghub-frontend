import type { AppProps } from 'next/app'

import { useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Head from 'next/head'
import Layout from './_layout'

import '@/styles/globals.css'
import '@/styles/tailwind.css'

export default function App({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: false,
                        refetchOnWindowFocus: false
                    }
                }
            })
    )

    return (
        <QueryClientProvider client={queryClient}>
            <Head>
                <title>GHub</title>

                <meta name='description' content='GitHub api consumer' />

                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />

                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Layout>
                <Component {...pageProps} />
            </Layout>
        </QueryClientProvider>
    )
}
