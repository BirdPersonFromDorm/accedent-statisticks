import React, { FC } from 'react';
import HomeContent from "../../features/home/HomeContent/index";
import PageLayout from "../../layouts/PageLayout/index";

const HomePage: FC = () => {

  return (
    <PageLayout title={'Главная'}>
      <HomeContent />
    </PageLayout>
  );
};

export default HomePage;
