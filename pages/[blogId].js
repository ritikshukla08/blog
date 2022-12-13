import { useRouter } from "next/router";
import React from "react";
import classes from "../styles/Blog.module.css";
import Layout from "../components/Layout";

const BlogDetail = ({ blogContent }) => {
  const router = useRouter();

  return (
    <Layout>
      <div className={classes.colsWrapper}>
        <div className={classes.content}>
          <h1 className={classes.heading}>{blogContent[0].title.rendered}</h1>
          <div className={classes.user}>
            <img src={blogContent[0]._embedded.author[0].avatar_urls[48]} />
            <div>
              <span className={classes.name}>
                @{blogContent[0]._embedded.author[0].name}
              </span>
              <span className={classes.date}>
                {new Date(blogContent[0].date).toDateString()}
              </span>
            </div>
          </div>
          <img
            src={blogContent[0]._embedded["wp:featuredmedia"][0].source_url}
            width={600}
          />
          <div
            className={classes.paragraph}
            dangerouslySetInnerHTML={{
              __html: blogContent[0].content.rendered,
            }}
          />
        </div>
        <div className={classes.sidebar}>
          <p>this is sidebar</p>
        </div>
      </div>
    </Layout>
  );
};

// http://tss.local/wp-json/wp/v2/posts?pages=1&per_page=6

export async function getStaticProps(context) {
  const { blogId } = context.params;

  let data = await fetch(
    `http://tss.local/wp-json/wp/v2/posts?slug=${blogId}&_embed`
  );
  let blogContent = await data.json();

  return { props: { blogContent } };
}

export async function getStaticPaths() {
  const response = await fetch("http://tss.local/wp-json/wp/v2/posts?_embed");
  const data = await response.json();

  const paths = data.map((blog) => {
    return {
      params: {
        blogId: `${blog.slug}`,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export default BlogDetail;
