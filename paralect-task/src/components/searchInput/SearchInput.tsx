import { Button, Image, Input, createStyles } from '@mantine/core';
import { useCallback } from 'react';
import search from '../../assets/icons/Search.svg';

const useStyles = createStyles((theme) => ({
  input: {
    maxWidth: '770px',
    width: '100%',
    input: {
      border: `1px solid ${theme.colors.gray[1]}`,
      height: '48px',
      '&::placeholder': {
        color: theme.colors.gray[3],
      },
    },
    '&:hover': {
      input: {
        border: `1px solid ${theme.colors.blue[1]}`,
      },
    },
  },
  searchIcon: {
    minWidth: '1rem',
    marginLeft: '14px',
    marginRight: '9px',
    zIndex: 0,
  },
  searchBtn: {
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '21px',
    padding: '5.5px 20px',
    height: 'initial',
    '&:hover': {
      background: theme.colors.blue[2],
    },
    '&:active': {
      background: theme.colors.blue[0],
    },
  },
}));

type SearchInputProps = {
  value: string;
  handleSearchValue: (value: string) => void;
  handleSearch: () => void;
};

export default function SearchInput({ value, handleSearchValue, handleSearch }: SearchInputProps) {
  const { classes } = useStyles();
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => handleSearchValue(e.target.value),
    [handleSearchValue]
  );
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <Input
      data-elem="search-input"
      className={classes.input}
      icon={<Image src={search} className={classes.searchIcon} alt="Search" />}
      radius="sm"
      rightSection={
        <Button
          data-elem="search-button"
          className={classes.searchBtn}
          radius="sm"
          onClick={handleSearch}
        >
          Поиск
        </Button>
      }
      rightSectionWidth={100}
      value={value}
      placeholder="Введите название вакансии"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}
