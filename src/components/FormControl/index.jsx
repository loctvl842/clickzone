import styles from "./style.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const FormControl = ({ label, name, placeholder, type, required }) => {
  return (
    <label htmlFor={name} className={cx("form-control")}>
      <div className={cx("icon")}>{label}</div>
      <input id={name} type={type} name={name} placeholder={placeholder} required={required} />
    </label>
  );
};

export default FormControl;
