import { createStyles, Flex, Image, Text } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import location from '../../assets/icons/Location.svg';
import { Vacancy } from '../../types/types';
import { getPayment } from '../../utils/getPayment';
import Star from '../svg/star/Star';

type VacancyProps = {
  vacancy: Vacancy;
};

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: theme.white,
    width: '100%',
    maxWidth: 773,
    padding: 24,
    border: `1px solid ${theme.colors.gray[1]}`,
    borderRadius: theme.radius.md,
  },
  link: {
    textDecoration: 'none',
  },
  title: {
    color: theme.colors.blue[1],
    fontSize: 'md',
    lineHeight: '24px',
  },
  paymentContainer: {
    [theme.fn.smallerThan('sm')]: { flexDirection: 'column', gap: 8, alignItems: 'flex-start' },
  },
  paymentText: {
    lineHeight: '20px',
  },

  separator: {
    color: 'gray',
    [theme.fn.smallerThan('sm')]: { display: 'none' },
  },
}));

export default function VacancyCard({ vacancy }: VacancyProps) {
  const { classes } = useStyles();
  const payment = getPayment(vacancy);

  return (
    <Flex
      data-elem={`vacancy-${vacancy.id}`}
      className={classes.container}
      gap={5}
      direction="column"
    >
      <Flex w="100%" justify="space-between" align="center">
        <NavLink to={`${vacancy.id}`} className={classes.link}>
          <Text className={classes.title} fw={600}>
            {vacancy.profession}
          </Text>
        </NavLink>
        <Star vacancy={vacancy} />
      </Flex>
      <Flex className={classes.paymentContainer} gap={12} align="center">
        <Text className={classes.paymentText} fw={600} fz="sm">
          з/п {payment}
        </Text>
        <Text className={classes.separator}>•</Text>
        <Text className={classes.paymentText} fz="sm">
          {vacancy.type_of_work.title}
        </Text>
      </Flex>
      <Flex align="center" gap={7}>
        <Image maw={22} src={location} alt="Location" />
        <Text fz="sm">{vacancy.town.title}</Text>
      </Flex>
    </Flex>
  );
}
