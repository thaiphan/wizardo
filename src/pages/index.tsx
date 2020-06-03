import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getHomePageData } from '../api';
import { Header } from '../components/Header';
import styles from './index.module.css';

interface HomeProps {
  links: string[];
  translations: { id: string; href: string; name: string }[];
}

const Home = (props: HomeProps) => (
  <>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header translations={props.translations} />

    <div className={styles.container}>
      <ul>
        {props.links.map((link) => (
          <li key={link}>
            <Link href={link}>
              <a>{link}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </>
);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const response = await getHomePageData();

  return {
    props: {
      links: response.data.routes.items.map((route) => route.url),
      translations: response.data.languages.map((language) => {
        let href = '/';
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

export default Home;
