import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getRoutes } from '../api';

interface HomeProps {
  links: string[];
}

const Home = (props: HomeProps) => (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

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
);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const response = await getRoutes();

  return {
    props: {
      links: response.data.routes.items.map((route) => route.url),
    },
  };
};

export default Home;
