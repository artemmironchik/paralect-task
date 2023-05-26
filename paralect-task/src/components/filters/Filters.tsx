import { Box, Button, Flex, NumberInput, Select, Text, createStyles } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getCatalogues } from '../../services/CataloguesService';
import { CataloguesResponse } from '../../types/types';
import Arrow from '../svg/arrow/Arrow';
import ClearBtn from '../svg/close/ClearBtn';

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: theme.white,
    maxWidth: 773,
    maxHeight: 368,
    padding: 20,
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.gray[1]}`,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    [theme.fn.smallerThan('lg')]: {
      alignSelf: 'center',
      width: '100%',
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
  label: {
    fontSize: '16px',
    lineHeight: '19px',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
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
    currentCatalogue: number | null;
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
      <Flex justify="space-between" align="center">
        <Text fw={700}>Фильтры</Text>
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
        <Box className={classes.inputContainer}>
          <Text className={classes.label} fw={700}>
            Отрасль
          </Text>
          <Select
            data-elem="industry-select"
            className={classes.select}
            data={catalogues.map((item) => ({
              value: String(item.key),
              label: item.title_trimmed,
            }))}
            value={String(currentCatalogue)}
            placeholder="Выберите отрасль"
            rightSection={<Arrow />}
            rightSectionWidth={50}
            styles={{
              rightSection: {
                pointerEvents: 'none',
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
        </Box>
        <Box className={classes.inputContainer}>
          <Text className={classes.label} fw={700}>
            Оклад
          </Text>
          <NumberInput
            data-elem="salary-from-input"
            classNames={{ control: classes.control, input: classes.numberInput }}
            rightSectionWidth={35}
            placeholder="От"
            value={currentPaymentFrom || ''}
            min={0}
            max={currentPaymentTo || undefined}
            onChange={handlePaymentFromValue}
          />
          <NumberInput
            data-elem="salary-from-input"
            classNames={{ control: classes.control, input: classes.numberInput }}
            rightSectionWidth={35}
            placeholder="До"
            value={currentPaymentTo || ''}
            min={currentPaymentFrom || 0}
            onChange={handlePaymentToValue}
          />
        </Box>
        <Button className={classes.applyBtn} onClick={handleApplyFilters}>
          Применить
        </Button>
      </Flex>
    </Box>
  );
}
