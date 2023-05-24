/* eslint-disable @typescript-eslint/no-shadow */
import { Flex, Pagination, createStyles } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchInput from '../../components/searchInput/SearchInput';
import VacanciesList from '../../components/vacanciesList/VacanciesList';
import { getVacancies } from '../../services/VacanciesService';
import { VacanciesResponse } from '../../types/types';
import Filters from '../../components/filters/Filters';

const useStyles = createStyles((theme) => ({
  container: {
    paddingTop: '40px',
    maxWidth: '71.25rem',

    [theme.fn.smallerThan('lg')]: {
      flexDirection: 'column',
    },
  },
  itemsContainer: {
    paddingBottom: '40px',
    flexGrow: 1,
  },
  control: {
    border: `1px solid ${theme.colors.gray[1]}`,
    fontSize: '16px',
    [theme.fn.smallerThan('lg')]: {
      minWidth: '1rem',
    },
  },
  pagination: {
    [theme.fn.smallerThan('xs')]: {
      gap: '4px',
    },
  },
}));

const initialPageValue: VacanciesResponse = {
  objects: [],
  total: 0,
  currentPage: 0,
  totalPages: 0,
};

export default function Main() {
  const { classes } = useStyles();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState(localStorage.getItem('keyword') || '');
  const [currentValue, setCurrentValue] = useState(localStorage.getItem('keyword') || '');
  const [catalogue, setCatalogue] = useState(localStorage.getItem('catalogue') || null);
  const [currentCatalogue, setCurrentCatalogue] = useState(
    localStorage.getItem('catalogue') || null
  );
  const [paymentFrom, setPaymentFrom] = useState(
    Number(localStorage.getItem('paymentFrom')) || undefined
  );
  const [currentPaymentFrom, setCurrentPaymentFrom] = useState(
    Number(localStorage.getItem('paymentFrom')) || undefined
  );
  const [paymentTo, setPaymentTo] = useState(
    Number(localStorage.getItem('paymentTo')) || undefined
  );
  const [currentPaymentTo, setCurrentPaymentTo] = useState(
    Number(localStorage.getItem('paymentTo')) || undefined
  );
  const [page, setPage] = useState<VacanciesResponse>(initialPageValue);
  const [pageNum, setPageNum] = useState(Number(localStorage.getItem('page')) || 1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPage = async () => {
      setIsLoading(true);
      const currentPage = await getVacancies({
        page: pageNum - 1,
        count: 4,
        keyword: searchValue,
        payment_from: String(paymentFrom) || '',
        payment_to: String(paymentTo) || '',
        catalogues: Number(catalogue) || 0,
      });
      setPage(currentPage);
      setIsLoading(false);
    };
    getPage();
  }, [catalogue, pageNum, paymentFrom, paymentTo, searchValue]);

  const handleSearch = () => {
    const params: {
      keyword?: string;
    } = {};
    setSearchValue(currentValue);
    setPageNum(1);
    localStorage.setItem('keyword', currentValue);
    localStorage.setItem('page', '1');

    if (currentValue) params.keyword = currentValue;
    else searchParams.delete('keyword');

    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...params,
      page: '0',
    });
  };

  const handleSearchValue = (value: string) => {
    setCurrentValue(value);
  };
  const handleSelectValue = (value: string) => {
    setCurrentCatalogue(value || null);
  };
  const handlePaymentFromValue = (value: number) => {
    setCurrentPaymentFrom(value || undefined);
  };
  const handlePaymentToValue = (value: number) => {
    setCurrentPaymentTo(value || undefined);
  };

  const handleClickPage = (value: number) => {
    const params: {
      page?: number;
    } = {};
    localStorage.setItem('page', `${value}`);
    setPageNum(value);

    params.page = value - 1;

    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...params,
    });
  };

  const handleApplyFilters = () => {
    const params: {
      catalogues?: string;
      payment_from?: string;
      payment_to?: string;
    } = {};
    setCatalogue(currentCatalogue);
    setPaymentFrom(currentPaymentFrom);
    setPaymentTo(currentPaymentTo);

    localStorage.setItem('catalogue', JSON.stringify(catalogue));
    localStorage.setItem('paymentFrom', JSON.stringify(paymentFrom));
    localStorage.setItem('paymentTo', JSON.stringify(paymentTo));
    localStorage.setItem('page', '1');

    if (currentCatalogue) params.catalogues = currentCatalogue;
    else searchParams.delete('catalogues');

    if (currentPaymentFrom) params.payment_from = String(currentPaymentFrom);
    else searchParams.delete('payment_from');

    if (currentPaymentTo) params.payment_to = String(currentPaymentTo);
    else searchParams.delete('payment_to');

    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...params,
      page: '0',
    });
  };
  const handleClearFilters = () => {
    setSearchValue('');
    setCatalogue(null);
    setPaymentFrom(undefined);
    setPaymentTo(undefined);
    setPageNum(1);
    localStorage.setItem('keyword', '');
    localStorage.setItem('page', '1');
    localStorage.setItem('catalogue', JSON.stringify(null));
    localStorage.setItem('paymentFrom', JSON.stringify(undefined));
    localStorage.setItem('paymentTo', JSON.stringify(undefined));
  };
  const handlers = {
    handleClearFilters,
    handleApplyFilters,
    handlePaymentFromValue,
    handlePaymentToValue,
    handleSelectValue,
  };
  const values = {
    currentCatalogue,
    currentPaymentFrom,
    currentPaymentTo,
  };
  return (
    <Flex className={classes.container} justify="center" gap={28}>
      <Filters handlers={handlers} values={values} />
      <Flex className={classes.itemsContainer} direction="column" align="center" gap={16}>
        <SearchInput
          value={currentValue}
          handleSearchValue={handleSearchValue}
          handleSearch={handleSearch}
        />
        <VacanciesList page={page} isLoading={isLoading} />
        {!isLoading && (
          <Pagination
            total={page.totalPages || 0}
            radius="sm"
            value={pageNum}
            onChange={handleClickPage}
            spacing="sm"
            classNames={{ control: classes.control }}
            className={classes.pagination}
          />
        )}
      </Flex>
    </Flex>
  );
}
