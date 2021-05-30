import Head from "next/head";
import Link from "next/link";

import Layout, { siteTitle } from "../components/layout";
import Date from "../components/date";

import { getSortedPostsData } from "../lib/posts";

import utilStyles from "../styles/utils.module.css";

export default function Home({ allPostsData }) {
  // only the index page will have 'home' passed as a prop into the Layout Component
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello, my name is <strong>Jacob</strong>. I'm a software engineer and
          a film enthusiast. You can find me on{" "}
          <a href="https://twitter.com">Twitter</a>.
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      {/* added section after the getStaticProps() is called to load data using SSG */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

// This is possible because getStaticProps only runs on the server-side.
// It will never run on the client-side.
// It won’t even be included in the JS bundle for the browser.
// That means you can write code such as direct database queries without them being sent to browsers.
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  // the getStaticProps async function is always exported from within the componenet where it is going to be called.
  // the props that it returns is passed into the Home Component as a prop
  return {
    props: {
      allPostsData,
    },
  };
}
