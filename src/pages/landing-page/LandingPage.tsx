import React, { useState } from 'react';
import MainForm, { FormData } from '../../components/main-form/MainForm';
import Statistics from '../../components/statistics/Statistics';
import Title from '../../components/title/Title';

const initialFormData = {
  startHour: '',
  monthlyPay: 0,
  payDay: '',
};

const LandingPage = (): JSX.Element => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showStatistics, setShowStatistics] = useState<boolean>(false);

  return (
    <>
      <Title />
      {showStatistics ? (
        <Statistics {...{ formData, setShowStatistics }} />
      ) : (
        <MainForm {...{ setFormData, setShowStatistics }} />
      )}
    </>
  );
};

export default LandingPage;
