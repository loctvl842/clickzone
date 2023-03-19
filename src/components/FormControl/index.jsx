import styles from "./style.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const FormControl = ({ label, name, placeholder, type }) => {
  return (
    <label htmlFor="email" className={cx("form-control")}>
      <div className={cx("icon")}>{label}</div>
      <input id={name} type={type} name={name} placeholder={placeholder} />
    </label>
  );
};

export default FormControl;
