import {
  createStyles,
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
} from "@mantine/core";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { blogActions } from "../store/blogSlice";
import style from "../styles/blogs.module.css";

const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  blogTitle: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
    textAlign: "center",
    textTransform: "uppercase",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
    color: "black",
  },
}));

export function ArticlesCardsGrid({ data, total, loading, cur }) {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const curPage = useSelector((state) => state.blog.curPage);

  const changePageHandler = (i) => {
    dispatch(blogActions.navigatePage(i));
  };

  const prevHandler = () => {
    dispatch(blogActions.prevPage());
  };

  const nextHandler = () => {
    if (curPage < total.length) dispatch(blogActions.nextPage());
  };

  return (
    <Container py="xl">
      <h2 className={classes.blogTitle}>Blogs</h2>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {loading && <h2>loading...</h2>}
        {!loading &&
          data?.map((article) => (
            <Card
              key={article.id}
              p="md"
              radius="md"
              component={Link}
              href={`/${article.slug}`}
              className={classes.card}
            >
              <AspectRatio ratio={1920 / 1080}>
                <Image
                  src={article._embedded["wp:featuredmedia"][0].source_url}
                  sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                />
              </AspectRatio>
              <Text
                color="dimmed"
                size="xs"
                transform="uppercase"
                weight={700}
                mt="md"
                textDecoration="none"
              >
                {new Date(article.date).toDateString()}
              </Text>
              <Text className={classes.title} mt={5}>
                {article.title.rendered}
              </Text>
            </Card>
          ))}
      </SimpleGrid>
      <div className={style.pagination}>
        <Link href={`/?page=${cur - 1}`}>
          <button
            className={style.span}
            onClick={prevHandler}
            disabled={cur === 1}
          >
            {"<"}
          </button>
        </Link>
        {total?.map((_, i) => (
          <Link key={i} href={`/?page=${i + 1}`}>
            <button
              onClick={() => {
                changePageHandler(i + 1);
              }}
              className={cur === i + 1 ? style.active : style.span}
            >
              {i + 1}
            </button>
          </Link>
        ))}
        <Link href={`/?page=${cur + 1}`}>
          <button
            className={style.span}
            onClick={nextHandler}
            disabled={cur === total?.length}
          >
            {">"}
          </button>
        </Link>
      </div>
    </Container>
  );
}
