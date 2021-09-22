import { FormData } from '../main-form/MainForm';

export type Props = {
  formData: FormData;
  setShowStatistics: React.Dispatch<React.SetStateAction<boolean>>;
};

export type MoneyStatistics = {
  perSecond: string;
  perHour: string;
  perYear: string;
  moneySoFar: string;
  moneyLeft: string;
  daysUntil: string;
};

export interface StaticMoneyCard {
  _tag: 'static';
  id: string;
  title: string;
  value: string;
  styles: {
    gridColumn: string;
    gridRow: string;
  };
}

export interface DynamicMoneyCard {
  _tag: 'dynamic';
  id: string;
  title: string;
  value: string;
  styles: {
    gridColumn: string;
    gridRow: string;
  };
  update: () => string;
}

export type MoneyCard = StaticMoneyCard | DynamicMoneyCard;

type GridPosition = [number, number];

interface StaticCardLayout {
  _tag: 'static';
  title: string;
  position: GridPosition;
}

interface DynamicCardLayout {
  _tag: 'dynamic';
  title: string;
  position: GridPosition;
  update: (props: FormData) => string;
}

export type MoneyCardLayout = {
  perSecond: StaticCardLayout;
  perHour: StaticCardLayout;
  perYear: StaticCardLayout;
  moneySoFar: DynamicCardLayout;
  moneyLeft: DynamicCardLayout;
  daysUntil: StaticCardLayout;
};
