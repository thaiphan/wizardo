import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { getRoutes, getRouteBySlug } from "../api";

interface PageProps {
  title: string;
  type: string;
}

const Page = (props: PageProps) => (
  <div className="container">
    <Head>
      <title>{props.title}</title>
    </Head>
    <h1>{props.title}</h1>
  </div>
);

type PageParsedUrlQuery = {
  slug: string[];
};

export const getStaticProps: GetStaticProps<
  PageProps,
  PageParsedUrlQuery
> = async (context) => {
  const response = await getRouteBySlug(context.params.slug.join("/"));

  return {
    props: {
      title: response.data.route.title,
      type: response.data.route.__typename,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await getRoutes();

  return {
    paths: response.data.routes.items.map((route) => route.url),
    fallback: false,
  };
};

export default Page;
