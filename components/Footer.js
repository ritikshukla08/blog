import { createStyles, Container, Group, Anchor } from "@mantine/core";
import { MantineLogo } from "@mantine/ds";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export function Footer() {
  const { classes } = useStyles();

  const links = [
    {
      link: "#",
      label: "Contact",
    },
    {
      link: "#",
      label: "Privacy",
    },
    {
      link: "#",
      label: "Blog",
    },
    {
      link: "#",
      label: "Careers",
    },
  ];

  const items = links.map((link, i) => <a key={i}>{link.label}</a>);

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <MantineLogo size={28} />
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}
