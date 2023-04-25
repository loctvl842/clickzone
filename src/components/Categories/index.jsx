import styles from "./style.module.scss";
import classNames from "classnames/bind";
import { useCategories } from "~/hook";
import { v4 as uuidv4 } from "uuid";
import { NavLink } from "react-router-dom";
import { NavigateNext } from "@mui/icons-material";
import { slugify } from "~/util";

let cx = classNames.bind(styles);

const Categories = () => {
  const categories = useCategories();

  return (
    <div className={cx("container")}>
      <ul>
        {categories.map((category) => (
          <li key={uuidv4()}>
            <NavLink
              to={`/${slugify(category.name)}/c/${category.id}`}
              className={cx("item-0")}
            >
              <span className={cx("active-bar")}></span>
              <span>{category.name}</span>
              {category.categories && (
                <div className={cx("nav-icon")}>
                  <NavigateNext fontSize="small" />
                </div>
              )}
            </NavLink>
            {category.categories && (
              <div className={cx("menu-1")}>
                <ul>
                  {category.categories.map((category) => (
                    <li key={uuidv4()}>
                      <NavLink
                        to={`/${slugify(category.name)}/c/${category.id}`}
                        className={cx("item-1")}
                      >
                        <span>{category.name}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
