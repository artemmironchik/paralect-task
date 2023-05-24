/* eslint-disable react/no-danger */
import { Container, Flex, Image, Loader, Text, createStyles } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import location from '../../assets/icons/Location.svg';
import Star from '../../components/svg/star/Star';
import { getVacancyById } from '../../services/VacanciesService';
import { Vacancy } from '../../types/types';
import { getPayment } from '../../utils/getPayment';

const emptyVacancy = {
  id: '',
  profession: '',
  favorite: false,
  payment_from: 0,
  payment_to: 0,
  town: {
    id: '',
    title: '',
  },
  type_of_work: {
    id: '',
    title: '',
  },
  currency: '',
  vacancyRichText: '',
};

const useStyles = createStyles((theme) => ({
  container: {
    paddingTop: '40px',
    paddingBottom: '51px',
    maxWidth: 773,
    marginLeft: 'auto',
    marginRight: 'auto',
    minHeight: '100vh',
  },
  profileContainer: {
    backgroundColor: theme.white,
    width: '100%',
    padding: 24,
    border: `1px solid ${theme.colors.gray[1]}`,
    borderRadius: theme.radius.md,
  },
  link: {
    textDecoration: 'none',
  },
  title: {
    fontSize: '28px',
    lineHeight: '34px',
  },
  paymentContainer: {
    [theme.fn.smallerThan('sm')]: { flexDirection: 'column', gap: 8, alignItems: 'flex-start' },
  },
  paymentText: {
    fontSize: '20px',
    lineHeight: '20px',
  },
  separator: {
    color: 'gray',
    [theme.fn.smallerThan('sm')]: { display: 'none' },
  },
  description: {
    backgroundColor: theme.white,
    border: `1px solid ${theme.colors.gray[1]}`,
    borderRadius: theme.radius.md,
    fontSize: '16px',
    lineHeight: '22px',
    b: {
      fontSize: '20px',
      lineHeight: '20px',
    },
  },
}));

export default function DetailsPage() {
  const { id } = useParams();
  const { classes } = useStyles();
  const [vacancy, setVacancy] = useState<Vacancy | null>(emptyVacancy);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getVacancy = async () => {
      setIsLoading(true);
      setIsError(false);
      if (Number.isNaN(Number(id))) {
        setIsError(true);
        return;
      }
      const response = await getVacancyById(Number(id));

      if (!response) setIsError(true);

      setVacancy(response);
      setIsLoading(false);
    };

    getVacancy();
  }, [id]);

  const payment = vacancy ? getPayment(vacancy) : '';

  return (
    <>
      {isError && <Navigate to="../vacancies" />}
      {!isError && vacancy && (
        <Flex
          className={classes.container}
          direction="column"
          gap={20}
          align="center"
          justify="center"
        >
          {isLoading && <Loader variant="dots" />}
          {!isLoading && vacancy && (
            <>
              <Flex
                data-elem={`vacancy-${vacancy.id}`}
                className={classes.profileContainer}
                gap={5}
                direction="column"
              >
                <Flex w="100%" justify="space-between" align="center">
                  <Text className={classes.title} fw={700}>
                    {vacancy.profession}
                  </Text>
                  <Star vacancy={vacancy} />
                </Flex>
                <Flex className={classes.paymentContainer} gap={12} align="center">
                  <Text className={classes.paymentText} fw={700} fz="sm">
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
              <Container className={classes.description}>
                <div dangerouslySetInnerHTML={{ __html: vacancy.vacancyRichText }} />
              </Container>
            </>
          )}
        </Flex>
      )}
    </>
  );
}
