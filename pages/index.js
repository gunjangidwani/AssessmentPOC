import Head from 'next/head';
import styled from 'styled-components';
import api from '../api';
import CreateForm from '../components/CreateForm';
import Link from "next/link";
import Test from './takeTest';

export default function Home({ launches }) {
  return (
    <div>
      <Head>
        <title>Formative Assessment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <Link href="/">
          <a>Prepare</a>
        </Link>
        <Link href="/takeTest">
          <a>Test</a>
        </Link>
      </nav>
      <main>
        <h2 style={{ padding: '10px' }}>Create Formative Assessment</h2>
        <AppContainer>
          <CreateForm />
        </AppContainer>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { launch_year, launch_success, land_success } = context.query;
  const res = await api.getLaunchData(
    launch_year,
    launch_success,
    land_success
  );
  return { props: { launches: res } };
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 700px) {
    flex-direction: row;
  }
`;


const CardContainer = styled.div`
  text-align: center;
  margin: auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  max-width: 900px;
  .card-wrapper {
    width: 100%;
    margin: 0 20px;
  }

  @media (min-width: 700px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    .card-wrapper {
      width: 40%;
    }
  }

  @media (min-width: 1024px) {
    .card-wrapper {
      width: 20%;
      margin: 0 10px;
    }
  }
`;
