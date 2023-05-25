import { Flex, Loader, createStyles } from '@mantine/core';
import VacancyCard from '../vacancyCard/VacancyCard';
import { Vacancy } from '../../types/types';
import NotFound from '../../routes/404/NotFound';

const useStyles = createStyles((theme) => ({
  flex: {
    width: '100%',
    maxWidth: 773,
    minHeight: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    gap: '16px',

    [theme.fn.smallerThan('xl')]: {
      justifyContent: 'center',
      minWidth: 'auto',
    },
  },
  paginator: {
    paddingTop: 24,
    button: {
      fontSize: theme.fontSizes.sm,
    },
  },
  input: {
    input: { height: '48px' },
    '&:hover': {
      input: {
        border: `1px solid ${theme.colors.blue[1]}`,
      },
    },
  },
}));

type VacanciesListProps = {
  page: Vacancy[] | null;
  isLoading?: boolean;
  handleIconClick: (vacancy: Vacancy) => void;
};

export default function VacanciesList({ page, isLoading, handleIconClick }: VacanciesListProps) {
  const { classes } = useStyles();

  return (
    <Flex className={classes.flex}>
      {isLoading && <Loader variant="dots" />}
      {!isLoading && page && !page.length && <NotFound />}
      {!isLoading &&
        page &&
        !!page.length &&
        page.map((vacancy) => (
          <VacancyCard key={vacancy.id} vacancy={vacancy} handleIconClick={handleIconClick} />
        ))}
    </Flex>
  );
}
