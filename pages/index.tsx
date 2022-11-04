import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { supabase } from '../lib/supabase'

type Post = { date: string, title: string, id: string }

export async function getStaticProps() {
  const { data } = await supabase.from('posts').select()

  const allPosts = (data as any[]).map((datum: any) => {
    return {
      id: datum.id,
      date: datum.created_at,
      title: datum.title
    }
  })

  return {
    props: {
      allPosts
    }
  }
}

export default function Home({ allPosts }: { allPosts: Post[] }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section>
        <h2>Blog</h2>
        <ul>
          {allPosts.map(({ id, date, title }) => (
            <li key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
