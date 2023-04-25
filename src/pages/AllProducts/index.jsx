import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { NewProducts } from "~/components";
import { PersistUser } from "~/providers";

// hooks
import { useClickOutside, useQuery, useTitle } from "~/hook";

import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useCurrentCategory from "~/hook/useCurrentCategory";

let cx = classNames.bind(styles);

const OptionBox = () => {
  const location = useLocation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [value, setValue] = useState("New Products");
  const menuRef = useRef(null);
  const btnRef = useRef(null);
  const query = useQuery();

  const handleSortClick = (e) => {
    setValue(e.target.textContent);
    setIsMenuVisible(false);
  };

  const handleOptionBtnClick = () => {
    setIsMenuVisible((prev) => !prev);
  };

  const getNavObject = (sortType) => {
    query.set("sort", sortType);
    query.sort();
    return {
      pathname: location.pathname,
      search: query.toString(),
    };
  };

  useClickOutside([menuRef, btnRef], () => {
    setIsMenuVisible(false);
  });

  useEffect(() => {
    setValue("New Products");
  }, [location.pathname]);

  return (
    <div className={cx("option-box")}>
      <button className={cx("btn")} ref={btnRef} onClick={handleOptionBtnClick}>
        {value} <span className={cx("caret")}></span>
      </button>
      {isMenuVisible && (
        <div ref={menuRef} className={cx("menu")}>
          <ul>
            <li>
              <NavLink
                to={getNavObject(0)}
                className={cx("item")}
                onClick={handleSortClick}
              >
                New Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to={getNavObject(1)}
                className={cx("item")}
                onClick={handleSortClick}
              >
                From Low To High Price
              </NavLink>
            </li>
            <li>
              <NavLink
                to={getNavObject(2)}
                className={cx("item")}
                onClick={handleSortClick}
              >
                From High To Low Price
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const AllProducts = () => {
  const category = useCurrentCategory();
  const query = useQuery();
  const [title, setTitle] = useState("All Products");
  useTitle(category.name || `Search - ${query.get("query")}`);
  useEffect(() => {
    if (category && category.name) {
      setTitle(category.name);
    }
    if (query.has("query")) {
      setTitle(`Search: ${query.get("query")}`);
    }
  }, [category, query]);

  return (
    <PersistUser requireLoggedIn={false}>
      <div className={cx("container")}>
        <div className={cx("title-wrapper")}>
          <div className={cx("title")}>
            <h4>{title}</h4>
          </div>
        </div>
        <OptionBox />
        <NewProducts category_id={category.id} />
      </div>
    </PersistUser>
  );
};

export default AllProducts;
