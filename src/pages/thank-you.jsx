import Head from 'next/head'

import { SimpleLayout } from '@/components/SimpleLayout'

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>Message sent - Marty Markenson</title>
        <meta
          name="description"
          content="Thanks for reaching out. I'll get back to you soon."
        />
      </Head>
      <SimpleLayout
        title="Thanks for your message."
        intro="I've received your message and will get back to you within 24 hours. I'm looking forward to discussing your project and how I can help bring your ideas to life."
      />
    </>
  )
}
