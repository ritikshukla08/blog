import { createStyles, Header, Autocomplete, Group } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { MantineLogo } from "@mantine/ds";
import style from "../styles/HeaderSearch.module.css";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

let init = true;
export default function HeaderSearch() {
  const { classes } = useStyles();
  const [showDropDown, setShowDropDown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [dataSrch, setDataSrch] = useState([]);

  useEffect(() => {
    if (init) {
      init = false;
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(
        `http://tss.local/wp-json/wp/v2/posts?search=${searchValue}&_embed`
      );
      const data = await response.json();
      setDataSrch(data);
      setLoading(false);
    };

    const mytimeout = setTimeout(fetchData, 500);

    return () => {
      clearTimeout(mytimeout);
    };
  }, [searchValue]);

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const onFocusHandler = () => {
    setShowDropDown(true);
  };

  const onBlurHandler = () => {
    setShowDropDown(false);
  };

  const links = [
    {
      link: "/about",
      label: "Features",
    },
    {
      link: "/pricing",
      label: "Pricing",
    },
    {
      link: "/learn",
      label: "Learn",
    },
    {
      link: "/community",
      label: "Community",
    },
  ];

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));

  return (
    <Header height={56} className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Link href="/">
            <MantineLogo size={28} />
          </Link>
        </Group>

        <Group>
          <div className={style.searchBar}>
            <div className={style.searchIcon}>
              <IconSearch className={style.icon} size={16} stroke={1.5} />
            </div>
            <input
              placeholder="Search"
              className={style.search}
              value={searchValue}
              onFocus={onFocusHandler}
              // onBlur={onBlurHandler}
              onChange={searchHandler}
              type="text"
            />
            {showDropDown && (
              <ul className={style.suggestions}>
                {loading && <h4>Loading...</h4>}
                {!loading &&
                  dataSrch?.map((blog, i) => {
                    {
                      console.log(blog[0]);
                    }
                    return (
                      <Link key={i} href={`/${blog.slug}`}>
                        <li className={style.searchList}>
                          <img
                            src={
                              blog?._embedded["wp:featuredmedia"][0]?.source_url
                            }
                            alt={blog.title.rendered}
                            width={66}
                            height={33}
                          />
                          <p>{blog.title.rendered}</p>
                        </li>
                      </Link>
                    );
                  })}
              </ul>
            )}
          </div>
        </Group>
        <Group ml={50} spacing={5} className={classes.links}>
          {items}
        </Group>
      </div>
    </Header>
  );
}
