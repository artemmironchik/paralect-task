import { Flex, Pagination, createStyles } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Filters from '../../components/filters/Filters';
import SearchInput from '../../components/searchInput/SearchInput';
import VacanciesList from '../../components/vacanciesList/VacanciesList';
import { addFavorite, removeFavorite } from '../../services/FavoritesService';
import { getVacancies } from '../../services/VacanciesService';
import { VacanciesResponse, Vacancy } from '../../types/types';

const useStyles = createStyles((theme) => ({
  container: {
    paddingTop: '40px',
    maxWidth: '71.25rem',
    flexGrow: 1,

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
  const [catalogue, setCatalogue] = useState(Number(localStorage.getItem('catalogue')) || null);
  const [currentCatalogue, setCurrentCatalogue] = useState(
    Number(localStorage.getItem('catalogue')) || null
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

  const handleSearchValue = (value: string) => {
    setCurrentValue(value);
  };
  const handleSelectValue = (value: string) => {
    setCurrentCatalogue(Number(value) || null);
  };
  const handlePaymentFromValue = (value: number) => {
    setCurrentPaymentFrom(value || undefined);
  };
  const handlePaymentToValue = (value: number) => {
    setCurrentPaymentTo(value || undefined);
  };
  const handleIconClick = (vacancy: Vacancy) => {
    if (vacancy.favorite) removeFavorite(vacancy);
    else addFavorite(vacancy);
  };

  const handleClickPage = (value: number) => {
    const params: {
      page?: string;
    } = {};
    localStorage.setItem('page', `${value}`);
    setPageNum(value);

    params.page = String(value);

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
      keyword?: string;
    } = {};
    setSearchValue(currentValue);
    setPageNum(1);
    setCatalogue(currentCatalogue);
    setPaymentFrom(currentPaymentFrom);
    setPaymentTo(currentPaymentTo);

    localStorage.setItem('keyword', currentValue);
    localStorage.setItem('catalogue', JSON.stringify(currentCatalogue));
    localStorage.setItem('paymentFrom', JSON.stringify(currentPaymentFrom));
    localStorage.setItem('paymentTo', JSON.stringify(currentPaymentTo));
    localStorage.setItem('page', '1');

    if (currentValue) params.keyword = currentValue;
    else searchParams.delete('keyword');

    if (currentCatalogue) params.catalogues = String(currentCatalogue);
    else searchParams.delete('catalogues');

    if (currentPaymentFrom) params.payment_from = String(currentPaymentFrom);
    else searchParams.delete('payment_from');

    if (currentPaymentTo) params.payment_to = String(currentPaymentTo);
    else searchParams.delete('payment_to');

    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...params,
      page: '1',
    });
  };
  const handleClearFilters = () => {
    setSearchValue('');
    setCurrentValue('');
    setCatalogue(null);
    setCurrentCatalogue(null);
    setPaymentFrom(undefined);
    setCurrentPaymentFrom(undefined);
    setPaymentTo(undefined);
    setCurrentPaymentTo(undefined);
    setPageNum(1);
    localStorage.setItem('keyword', '');
    localStorage.setItem('page', '1');
    localStorage.setItem('catalogue', JSON.stringify(null));
    localStorage.setItem('paymentFrom', JSON.stringify(undefined));
    localStorage.setItem('paymentTo', JSON.stringify(undefined));
    setSearchParams({
      page: '1',
    });
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
          handleSearch={handleApplyFilters}
        />
        <VacanciesList
          page={page.objects}
          isLoading={isLoading}
          handleIconClick={handleIconClick}
        />
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
