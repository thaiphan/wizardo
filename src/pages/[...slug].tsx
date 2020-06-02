import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { getRoutes, getPageData } from "../api";
import Link from "next/link";

interface PageProps {
  title: string;
  description: string;
  translations: { id: string; href: string; name: string }[];
}

const Page = (props: PageProps) => (
  <div className="container">
    <Head>
      <title>{props.title}</title>
    </Head>

    <Link href="/">
      <a>Wizardo</a>
    </Link>

    {props.translations.length > 1 ? (
      <ul>
        {props.translations.map((language) => (
          <li key={language.id}>
            <Link href={language.href}>
              <a>{language.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    ) : null}

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
  let slug = context.params.slug;

  const response = await getPageData(slug.join("/"));

  const [prefix, ...restOfSlug] = context.params.slug;
  if (response.data.languages.some((language) => language.id === prefix)) {
    slug = restOfSlug;
  }

  return {
    props: {
      title: response.data.route.title,
      description: response.data.route.description,
      translations: response.data.languages.map((language) => {
        let url = `/${slug.join("/")}`;
        if (language.id !== "en") {
          url = `/${language.id}` + url;
        }

        return {
          id: language.id,
          name: language.name,
          href: url,
        };
      }),
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
