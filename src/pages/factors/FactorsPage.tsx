import React from 'react';
import FactorsContent from "../../features/factors/FactorsContent/index";
import HomeContent from "../../features/home/HomeContent/index";
import PageLayout from "../../layouts/PageLayout/index";

const FactorsPage = () => {
  return (
    <PageLayout title={'Факторы'}>
      <FactorsContent />
    </PageLayout>
  );
};

export default FactorsPage;
