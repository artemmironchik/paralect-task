import { Button, Container, Flex, Image, Text, createStyles } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import NotFoundImage from '../../assets/NotFound.svg';

const useStyles = createStyles((theme) => ({
  container: {
    paddingTop: '120px',
  },
  text: {
    lineHeight: '29px',
  },
  button: {
    background: theme.colors.blue[5],
    color: theme.colors.blue[0],
    fontSize: '14px',
    lineHeight: '22px',
    transition: 'transform 0.5s ease 0s',

    '&:hover': {
      transform: 'translateY(-5px)',
      backgroundColor: theme.colors.blue[5],
    },

    '&:active': {
      color: theme.white,
      backgroundColor: theme.colors.blue[0],
    },
  },
  buttonText: {
    fontFamily: 'open sans',
  },
}));

type NotFoundProps = {
  withButton?: boolean;
};

export default function NotFound({ withButton }: NotFoundProps) {
  const navigate = useNavigate();
  const { classes } = useStyles();

  return (
    <Container size="md" className={classes.container}>
      <Flex direction="column" justify="space-between" align="center" gap={32}>
        <Image src={NotFoundImage} maw={240} />
        <Text className={classes.text} size={24} weight={700} align="center">
          Упс, здесь еще ничего нет!
        </Text>
        {withButton && (
          <Button className={classes.button} size="md" onClick={() => navigate('/vacancies')}>
            <Text className={classes.buttonText} fw={600}>
              Поиск Вакансий
            </Text>
          </Button>
        )}
      </Flex>
    </Container>
  );
}
