import type { NextPageWithLayout } from './_app';
import { ReactElement } from 'react';
import LandingAnimation from '@/components/common-ui/lading-animation';
import Logo from '@/components/features/home/logo';
import MessageSection from '@/components/features/home/section';
import Nav from '@/components/features/home/nav';
import { Layout } from '@/components/features/home/layout';
import Head from 'next/head';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>오놀 | 오늘 뭐하고 놀지?</title>
        <meta
          name="description"
          content="오늘 뭐하고 놀지 고민 되나요? 오놀이 랜덤으로 추천 해줄게요!"
        />
        <meta
          name="keywords"
          content="주변 놀거리 추천, 데이트 장소 추천, 오늘 뭐하고 놀지, 오놀"
        />
        <meta
          name="google-site-verification"
          content="-MvQb0jWvNxZW5yrI9BSiaapIq6JMSd5pRIiNhWp8Qc"
        />
      </Head>

      <Logo />
      <MessageSection />
      <Nav />
      <LandingAnimation />
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Home;
