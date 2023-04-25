import styles from "./style.module.scss";
import classNames from "classnames/bind";

// icons
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";

import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { usePageCount, useQuery } from "~/hook";

const NUM_PAGE = 7;

let cx = classNames.bind(styles);

const generateNumberArray = (currentPage) => {
  return Array.from(
    { length: NUM_PAGE },
    (_, i) => currentPage - (NUM_PAGE - 1) / 2 + i
  );
};

const Paginator = () => {
  const location = useLocation();
  const [params] = useSearchParams();
  const pageCount = usePageCount();
  const [currentPage, setCurrentPage] = useState(0);
  const query = useQuery();

  const getNavObject = (pageNumber) => {
    query.set("page", pageNumber);
    query.sort();
    return {
      pathname:
        location.pathname === "/" || location.pathname === "/home"
          ? "/all-products"
          : location.pathname,
      search: query.toString(),
    };
  };

  useEffect(() => {
    const page = params.get("page");
    setCurrentPage(parseInt(page) || 0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [params]);

  return (
    <div className={cx("pagination-wrapper", { disappear: pageCount <= 1 })}>
      <ul className={cx("pagination")}>
        <li className={cx({ disappear: currentPage < 2 })}>
          <NavLink to={getNavObject(0)}>
            <span>
              <KeyboardDoubleArrowLeft fontSize="small" />
            </span>
          </NavLink>
        </li>
        <li className={cx({ disappear: currentPage <= 0 })}>
          <NavLink to={getNavObject(currentPage - 1)}>
            <span>
              <KeyboardArrowLeft fontSize="small" />
            </span>
          </NavLink>
        </li>
        {generateNumberArray(currentPage).map((page) => (
          <li
            key={uuidv4()}
            className={cx({
              disappear: page < 0 || page + 1 > pageCount,
              active: page === currentPage,
            })}
          >
            <NavLink to={getNavObject(page)}>
              <span>{page + 1}</span>
            </NavLink>
          </li>
        ))}
        <li className={cx({ disappear: currentPage >= pageCount - 1 })}>
          <NavLink to={getNavObject(currentPage + 1)}>
            <span>
              <KeyboardArrowRight fontSize="small" />
            </span>
          </NavLink>
        </li>
        <li className={cx({ disappear: currentPage > pageCount - 1 - 2 })}>
          <NavLink to={getNavObject(pageCount - 1)}>
            <span>
              <KeyboardDoubleArrowRight fontSize="small" />
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Paginator;
