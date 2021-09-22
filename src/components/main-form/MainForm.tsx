import React from 'react';
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FieldErrors,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import './MainForm.css';

export type FormData = {
  startHour: string;
  monthlyPay: number;
  payDay: string;
};

const schema = yup.object({
  startHour: yup.string().required('Start time cannot be empty'),
  payDay: yup.string().required('Pay day cannot be empty'),
  monthlyPay: yup
    .number()
    .required('Monthly pay cannot be empty')
    .typeError('Monthly pay must be a number')
    .positive('Monthly pay must be positive')
    .integer('Monthly pay must be an integer'),
});

type Props = {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setShowStatistics: React.Dispatch<React.SetStateAction<boolean>>;
};

const InputField = ({
  labelName,
  fieldName,
  register,
  errors,
  options,
}: {
  labelName: string;
  fieldName: keyof FormData;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  options?: {
    defaultValue: string | number | readonly string[] | undefined;
  };
}): JSX.Element => (
  <>
    <label>{labelName}</label>
    <input
      {...{ ...register(fieldName), defaultValue: options?.defaultValue }}
    />
    {errors[fieldName] && <p>{errors[fieldName]?.message}</p>}
  </>
);

const MainForm = ({ setFormData, setShowStatistics }: Props): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = data => {
    setFormData(data);
    setShowStatistics(true);
  }; // your form submit function which will invoke after successful validation

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        {...{
          labelName: 'Start Hour',
          fieldName: 'startHour',
          register,
          errors,
          options: { defaultValue: '12' },
        }}
      />
      <InputField
        {...{
          labelName: 'Monthly Pay',
          fieldName: 'monthlyPay',
          register,
          errors,
          options: { defaultValue: 10600 },
        }}
      />
      <InputField
        {...{
          labelName: 'Pay Day',
          fieldName: 'payDay',
          register,
          errors,
          options: { defaultValue: '13' },
        }}
      />
      <input type="submit" />
    </form>
  );
};

export default MainForm;
