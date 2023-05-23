import { Box, Button, Flex, NumberInput, Select, Text, createStyles } from '@mantine/core';
import { useEffect, useState } from 'react';
import ClearBtn from '../svg/close/ClearBtn';
import { getCatalogues } from '../../services/CataloguesService';
import { CataloguesResponse } from '../../types/types';
import Arrow from '../svg/arrow/Arrow';

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: theme.white,
    maxWidth: 773,
    width: '100%',
    maxHeight: 320,
    padding: 20,
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.gray[1]}`,

    [theme.fn.smallerThan('lg')]: {
      alignSelf: 'center',
    },

    [theme.fn.smallerThan('md')]: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  clearBtn: {
    backgroundColor: theme.white,
    color: theme.colors.gray[3],
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '20px',
    padding: 0,
    '&:hover': {
      backgroundColor: 'initial',
      color: theme.colors.blue[2],
      line: {
        stroke: theme.colors.blue[2],
      },
    },
    '&:active': {
      backgroundColor: 'initial',
      color: theme.colors.blue[1],
      line: {
        stroke: theme.colors.blue[1],
      },
    },
  },
  select: {
    width: '100%',
    minWidth: 275,
    borderRadius: '0.5rem',
    input: { height: '42px' },
    [theme.fn.smallerThan('md')]: {
      minWidth: 'auto',
    },
  },
  numberInput: {
    color: theme.black,
    fontSize: 'xs',
    fontWeight: 'normal',
    lineHeight: '20px',
    '&::placeholder': {
      color: theme.colors.gray[3],
    },
  },
  control: {
    border: 0,
    path: { stroke: theme.colors.gray[3] },
    width: '12px',
    height: '12px',
    '&:not(:disabled):hover': {
      backgroundColor: 'initial',
      path: {
        stroke: theme.colors.blue[2],
      },
    },
    '&:not(:disabled):active': {
      backgroundColor: 'initial',
      path: {
        stroke: theme.colors.blue[1],
      },
    },
  },
  applyBtn: {
    width: '100%',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '21px',
    padding: '9.5px 0',
    height: 'initial',
    '&:hover': {
      background: theme.colors.blue[2],
    },
    '&:active': {
      background: theme.colors.blue[0],
    },
  },
}));

type FiltersProps = {
  handlers: {
    handleApplyFilters: () => void;
    handleClearFilters: () => void;
    handleSelectValue: (value: string) => void;
    handlePaymentFromValue: (value: number) => void;
    handlePaymentToValue: (value: number) => void;
  };
  values: {
    currentCatalogue: string | null;
    currentPaymentFrom: number | undefined;
    currentPaymentTo: number | undefined;
  };
};

export default function Filters({ handlers, values }: FiltersProps) {
  const { classes } = useStyles();
  const {
    handleApplyFilters,
    handleClearFilters,
    handleSelectValue,
    handlePaymentFromValue,
    handlePaymentToValue,
  } = handlers;
  const { currentCatalogue, currentPaymentFrom, currentPaymentTo } = values;
  const [catalogues, setCatalogues] = useState<CataloguesResponse[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const getOptions = async () => {
      const fetchedCatalogues = await getCatalogues();
      setCatalogues(fetchedCatalogues);
    };
    getOptions();
  }, []);
  return (
    <Box className={classes.container}>
      <Flex justify="space-between" align="center" gap={32}>
        <Text fw={600}>Фильтры</Text>
        <Button
          className={classes.clearBtn}
          rightIcon={<ClearBtn />}
          size="md"
          onClick={handleClearFilters}
        >
          Сбросить все
        </Button>
      </Flex>
      <Flex direction="column" gap={20}>
        <Text />
        <Select
          data-elem="industry-select"
          className={classes.select}
          data={catalogues.map((item) => ({
            value: item.key,
            label: item.title_trimmed,
          }))}
          value={currentCatalogue}
          placeholder="Выберите отрасль"
          rightSection={<Arrow />}
          rightSectionWidth={50}
          styles={{
            rightSection: {
              transform: `${isOpen ? 'rotate(-180deg)' : ''}`,
              marginBottom: `${isOpen ? '2px' : ''}`,
              path: { stroke: `${isOpen ? '#5E96FC' : ''}` },
            },
            item: {
              '&[data-hovered]': { background: '#DEECFF' },
              '&[data-selected]': { background: '#5E96FC' },
            },
          }}
          onDropdownOpen={() => setIsOpen(true)}
          onDropdownClose={() => setIsOpen(false)}
          onChange={handleSelectValue}
        />
        <NumberInput
          data-elem="salary-from-input"
          classNames={{ control: classes.control, input: classes.numberInput }}
          rightSectionWidth={35}
          placeholder="От"
          min={0}
          max={Number(currentPaymentTo) || undefined}
          onChange={handlePaymentFromValue}
        />
        <NumberInput
          data-elem="salary-from-input"
          classNames={{ control: classes.control, input: classes.numberInput }}
          rightSectionWidth={35}
          placeholder="До"
          min={Number(currentPaymentFrom) || 0}
          onChange={handlePaymentToValue}
        />
        <Button className={classes.applyBtn} onClick={handleApplyFilters}>
          Применить
        </Button>
      </Flex>
    </Box>
  );
}
