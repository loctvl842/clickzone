import styles from "./style.module.scss";
import classNames from "classnames/bind";
import { FormControl } from "~/components";
import { PulseLoader } from "react-spinners";
import { useRef, useState } from "react";

// icons
import { AddAPhoto, Close } from "@mui/icons-material";

let cx = classNames.bind(styles);

const ProductCreationForm = () => {
  const [previewImg, setPreviewImg] = useState("");
  const reader = useRef(); // reference to reader in FileReader
  const handlePreviewImg = (e) => {
    const fileInput = e.target.files[0];
    if (reader.current) reader.current.abort();
    if (fileInput) {
      reader.current = new FileReader();

      reader.current.onload = () => {
        if (reader.current.readyState === 2) {
          setPreviewImg(reader.current.result);
        }
      };
      reader.current.readAsDataURL(fileInput);
      e.target.value = null;
    }
  };

  const handleCancelImgClick = (e) => {
    e.preventDefault();
    setPreviewImg("");
  };

  return (
    <div className={cx("form-wrapper")}>
      <div className={cx("message-wrapper", { visible: false })}>
        <p className={cx("message")}>some message</p>
      </div>
      <div className={cx("card")}>
        <div className={cx("header")}>
          <h2>Add Product</h2>
        </div>
        <form className={cx("form-product-creation")}>
          <div className={cx("form-data")}>
            <div className={cx("choose-img-container")}>
              <div className={cx("square-box")}>
                <div className={cx("choose-img-wrapper")}>
                  <button
                    className={cx("cancel-current-img-btn", { visible: previewImg !== "" })}
                    onClick={handleCancelImgClick}
                  >
                    <Close />
                  </button>
                  <input
                    type="file"
                    id="file"
                    name="post-img"
                    style={{ display: "none" }}
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => handlePreviewImg(e)}
                  />
                  {previewImg !== "" ? (
                    <div className={cx("preview-img-wrapper")}>
                      <img src={previewImg} alt="" />
                    </div>
                  ) : (
                    <label htmlFor="file" className={cx("choose-img-btn")}>
                      <div className={cx("description")}>
                        <div className={cx("icon-wrapper")}>
                          <AddAPhoto />
                        </div>
                        <span className={cx("text-1")}>Add Photos/Videos</span>
                        <span className={cx("text-2")}>or drag and drop</span>
                      </div>
                    </label>
                  )}
                </div>
              </div>
            </div>
            <div className={cx("form-control-group")}>
              <div className={cx("form-control-wrapper")}>
                <FormControl name="product-creation_name" placeholder="Product name" type="text" required={true} />
              </div>
              <div className={cx("form-control-wrapper")}>
                <FormControl name="product-creation_old-price" placeholder="Old Price (if available)" type="text" />
              </div>
              <div className={cx("form-control-wrapper")}>
                <FormControl name="product-creation_price" placeholder="Price" type="text" required={true} />
              </div>
            </div>
          </div>
          <div className={cx("submit-btn-wrapper")}>
            <button type="submit" className={cx("submit-btn")}>
              <span>Create</span>
              <PulseLoader color="#fff" size={5} loading={false} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductCreationForm;
