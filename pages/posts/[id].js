import Head from "next/head";
import { getAllPostIds, getPostData } from "../../lib/posts";

import utilStyles from "../../styles/utils.module.css";
import Layout from "../../components/layout";
import Date from "../../components/date";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>

        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

// this time, for dynamic routing, getStaticProps must be combined with getStaticPaths.
// getStaticPaths will get and return a list of possible values for the id

// Important: The returned list is not just an array of strings — it MUST be an array of objects that look like the comment above. Each object must have the params key and contain an object with the id key (because we’re using [id] in the file name).
// Otherwise, getStaticPaths will fail.

// fallback means any paths not inside the list will return 404
export async function getStaticPaths() {
  // contains an array of known paths
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

// IMPT: this time, getStaticProps accepts "params" from getStaticPaths which contains "id" as filename is "[id].js"
// getStaticProps will fetch necessary data for the post with id
export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id

  // since getPostData returns data which depends on an asynchronous task -> remark, we need the "await" keyword here.
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
