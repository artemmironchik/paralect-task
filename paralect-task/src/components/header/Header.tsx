import { NavLink } from 'react-router-dom';
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Image,
  Text,
  rem,
  Flex,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import logo from '../../assets/icons/Union.svg';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
    borderBottom: 'none',
  },

  dropdown: {
    position: 'absolute',
    top: rem(60),
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'initial',
    alignItems: 'center',
    height: '100%',
    maxWidth: '69rem',
  },

  logoContainer: {
    display: 'flex',
    justifyContent: 'initial',
    alignItems: 'center',
    marginRight: '265px',
  },

  logoImg: {},

  logoName: {
    fontFamily: 'poppins',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '36px',
    letterSpacing: '-0.02em',
  },

  links: {
    gap: '38px',
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: '20px',
    padding: `${rem(8)} ${rem(12)}`,
    textDecoration: 'none',
    color: theme.black,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    [theme.fn.smallerThan('sm')]: {
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    color: theme.colors.blue[1],
  },
}));

interface HeaderResponsiveProps {
  links: { link: string; label: string }[];
}

export function HeaderResponsive({ links }: HeaderResponsiveProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  const setActive = ({ isActive }: { isActive: boolean }): string =>
    isActive ? [classes.link, classes.linkActive].join(' ') : classes.link;

  const items = links.map((link) => (
    <NavLink
      key={link.link}
      to={link.link}
      className={setActive}
      // onClick={() =>
      //   dispatch(
      //     setParamsState({
      //       page: undefined,
      //       count: "4",
      //       keyword: undefined,
      //       catalogues: undefined,
      //       payment_from: undefined,
      //       payment_to: undefined,
      //       published: "1",
      //     }),
      //   )
      // }
    >
      {link.label}
    </NavLink>
  ));

  return (
    <Header height={rem(85)} mb={120} className={classes.root}>
      <Container className={classes.header}>
        <Flex gap="sm" className={classes.logoContainer}>
          <Image src={logo} className={classes.logoImg} />
          <Text className={classes.logoName}>Jobored</Text>
        </Flex>
        <Group className={classes.links}>{items}</Group>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
