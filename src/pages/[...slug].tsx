import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { getRoutes, getPageData } from '../api';
import Link from 'next/link';
import parse from 'html-react-parser';
import { Header } from '../components/Header';
import styles from './[...slug].module.css';

interface PageProps {
  title: string;
  description: string;
  translations: { id: string; href: string; name: string }[];
}

const Page = (props: PageProps) => (
  <>
    <Head>
      <title>{props.title}</title>
    </Head>

    <Header translations={props.translations} />

    <div className={styles.container}>
      <h1>{props.title}</h1>
      {parse(props.description)}
    </div>
  </>
);

type PageParsedUrlQuery = {
  slug: string[];
};

export const getStaticProps: GetStaticProps<
  PageProps,
  PageParsedUrlQuery
> = async (context) => {
  let slug = context.params.slug;

  const response = await getPageData(slug.join('/'));

  const [prefix, ...restOfSlug] = context.params.slug;
  if (response.data.languages.some((language) => language.id === prefix)) {
    slug = restOfSlug;
  }

  return {
    props: {
      title: response.data.route.title,
      description: response.data.route.description,
      translations: response.data.languages.map((language) => {
        let href = `/${slug.join('/')}`;
        if (language.id !== 'en') {
          href = `/${language.id}` + href;
        }

        return {
          id: language.id,
          name: language.name,
          href,
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
