import { Pagination, createStyles } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchInput from '../../components/searchInput/SearchInput';
import VacanciesList from '../../components/vacanciesList/VacanciesList';
import { getVacancies } from '../../services/VacanciesService';
import { VacanciesResponse } from '../../types/types';

const useStyles = createStyles((theme) => ({}));

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
  const [page, setPage] = useState<VacanciesResponse>(initialPageValue);
  const [pageNum, setPageNum] = useState(Number(localStorage.getItem('page')) || 0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPage = async () => {
      setIsLoading(true);
      const currentPage = await getVacancies({ page: pageNum - 1, count: 4, keyword: searchValue });
      setPage(currentPage);
      setIsLoading(false);
    };
    getPage();
  }, [pageNum, searchValue]);

  const handleSearch = (): void => {
    const params: {
      keyword?: string;
    } = {};
    setSearchValue(currentValue);
    localStorage.setItem('keyword', currentValue);

    if (currentValue) params.keyword = currentValue;
    else searchParams.delete('keyword');

    setSearchParams({
      ...params,
      ...searchParams,
      page: '0',
    });
  };

  const handleSearchValue = (value: string) => {
    setCurrentValue(value);
  };
  return (
    <>
      <SearchInput
        value={currentValue}
        handleSearchValue={handleSearchValue}
        handleSearch={handleSearch}
      />
      <VacanciesList page={page} isLoading={isLoading} />
      <Pagination
        total={page.totalPages || 0}
        radius="sm"
        value={pageNum}
        onChange={setPageNum}
        spacing="sm"
      />
    </>
  );
}
