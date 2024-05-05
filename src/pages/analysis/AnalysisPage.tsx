import React from 'react';
import PageLayout from "../../layouts/PageLayout/index";
import AnalysisContent from "../../features/analysis/AnalysisContent/index";

const AnalysisPage = () => {
  return (
    <PageLayout title={'Методы анализа'}>
      <AnalysisContent />
    </PageLayout>
  );
};

export default AnalysisPage;
