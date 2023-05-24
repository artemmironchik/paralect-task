/* eslint-disable @typescript-eslint/naming-convention */
import { Vacancy } from '../types/types';

export const getPayment = (vacancy: Vacancy): string => {
  const { payment_from, payment_to, currency, agreement } = vacancy;

  if (!payment_from && !payment_to) return agreement ? `по договоренности` : `не указана`;

  if (!payment_from && payment_to) return `до ${payment_to} ${currency}`;
  if (payment_from && !payment_to) return `от ${payment_from} ${currency}`;

  if (payment_from && payment_to) {
    return payment_from === payment_to
      ? `${payment_to} ${currency}`
      : `${payment_from} - ${payment_to} ${currency}`;
  }

  return '';
};
