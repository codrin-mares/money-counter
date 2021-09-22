import moment from 'moment';

import { FormData } from '../main-form/MainForm';
import { MoneyCard, MoneyCardLayout, MoneyStatistics } from './types';

const DEFAULT_CURRENCY = 'RON';

const hoursPerMonth = 8 * 22;

const addCurrency = (value: number, currency = DEFAULT_CURRENCY): string =>
  `${value} ${currency}`;

const precise = (value: number, precision?: number): number =>
  Number(value.toFixed(precision || 2));

const computeTimeStatistics = (
  startHour: string,
  monthlyPay: number,
): { moneySoFar: number; moneyLeft: number } => {
  const startTime = moment(startHour, 'HH');
  const currentTime = moment();
  const endTime = moment(startTime).add(8, 'hours');
  const moneyPerDay = monthlyPay / 22;

  if (currentTime.isAfter(endTime)) {
    return {
      moneySoFar: moneyPerDay,
      moneyLeft: 0,
    };
  }

  if (currentTime.isBefore(startTime)) {
    return {
      moneySoFar: 0,
      moneyLeft: moneyPerDay,
    };
  }

  const totalDayTime = endTime.diff(startTime, 'milliseconds', true);
  const timeSoFar = currentTime.diff(startTime, 'milliseconds', true);

  const moneySoFar = (timeSoFar * moneyPerDay) / totalDayTime;

  return {
    moneySoFar,
    moneyLeft: moneyPerDay - moneySoFar,
  };
};

const cardsLayout: MoneyCardLayout = {
  perSecond: {
    _tag: 'static',
    title: 'Money Per Second',
    position: [1, 1],
  },
  perHour: {
    _tag: 'static',
    title: 'Money Per Hour',
    position: [2, 1],
  },
  perYear: {
    _tag: 'static',
    title: 'Money Per Year',
    position: [3, 1],
  },
  moneySoFar: {
    _tag: 'dynamic',
    title: 'Money So Far Today',
    position: [1, 2],
    update: ({ startHour, monthlyPay }: FormData): string =>
      addCurrency(
        precise(computeTimeStatistics(startHour, monthlyPay).moneySoFar, 3),
      ),
  },
  moneyLeft: {
    _tag: 'dynamic',
    title: 'Money Left Today',
    position: [2, 2],
    update: ({ startHour, monthlyPay }: FormData): string =>
      addCurrency(
        precise(computeTimeStatistics(startHour, monthlyPay).moneyLeft, 3),
      ),
  },
  daysUntil: {
    _tag: 'static',
    title: 'Days Until Pay Day',
    position: [3, 2],
  },
};

export const computeDaysUntil = (payday: string): number => {
  const currentTime = moment();
  const paydayTime = moment(payday, 'DD');

  if (currentTime.date() > paydayTime.date()) {
    paydayTime.add(1, 'months');
  }

  return paydayTime.diff(currentTime, 'days');
};

export const computeStatistics = ({
  startHour,
  monthlyPay,
  payDay,
}: FormData): MoneyStatistics => {
  const { moneySoFar, moneyLeft } = computeTimeStatistics(
    startHour,
    monthlyPay,
  );

  return {
    perSecond: addCurrency(precise(monthlyPay / (hoursPerMonth * 3600), 5)),
    perHour: addCurrency(precise(monthlyPay / hoursPerMonth)),
    perYear: addCurrency(precise(monthlyPay * 12)),
    moneySoFar: addCurrency(precise(moneySoFar, 3)),
    moneyLeft: addCurrency(precise(moneyLeft, 3)),
    daysUntil: `${computeDaysUntil(payDay)} Days`,
  };
};

export const hydrateValues = (
  statistics: MoneyStatistics,
  formData: FormData,
): MoneyCard[] =>
  Object.entries(statistics).map(([key, value]) => {
    const layout = cardsLayout[key as keyof MoneyStatistics];
    const {
      _tag,
      title,
      position: [row, column],
    } = layout;
    const isDynamic = _tag === 'dynamic';

    return {
      _tag,
      id: key,
      title,
      value,
      styles: {
        gridRow: `${row} / span 1`,
        gridColumn: `${column} / span 1`,
      },
      ...{
        update: isDynamic ? () => layout.update(formData) : () => '',
      },
    };
  });
