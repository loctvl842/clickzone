import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { PulseLoader } from "react-spinners";
import { useState } from "react";
import axios from "axios";

// components
import { FormControl, TextEditor } from "~/components";

// icons
import { AddAPhoto, Close } from "@mui/icons-material";
import { usePreviewImage } from "~/hook";

import { uploadImage } from "~/s3";

let cx = classNames.bind(styles);

const ProductCreationForm = ({ onNotCreatingProduct }) => {
  const [productImgFile, setProductImgFile] = useState(null);
  const previewImg = usePreviewImage(productImgFile);

  const handleCancelBtnClick = (e) => {
    e.preventDefault();
    setProductImgFile(null);
  };

  const handleImgDrop = (e) => {
    e.preventDefault();
    setProductImgFile(e.dataTransfer.files[0]);
  };

  const handleProductImgChange = (e) => {
    setProductImgFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataArray = [...formData];
    const data = Object.fromEntries(dataArray);

    try {
      const imageUrl = await uploadImage(data["product-creation_imgFile"]);
      await axios.post("/api/product/create.php", {
        name: data["product-creation_name"],
        image_url: imageUrl,
        price: data["product-creation_price"],
        old_price: data["product-creation_old-price"],
        description: document.querySelector(".ql-editor").innerHTML,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={cx("form-wrapper")}>
      <div className={cx("message-wrapper", { visible: false })}>
        <p className={cx("message")}>some message</p>
      </div>
      <div className={cx("card")}>
        <div className={cx("header")}>
          <h2>Add Product</h2>
          <button className={cx("close-btn-wrapper")} onClick={onNotCreatingProduct}>
            <Close />
          </button>
        </div>
        <form onSubmit={handleSubmit} className={cx("form-product-creation")}>
          <div className={cx("form-data")}>
            <div className={cx("row-1")}>
              <div className={cx("col-5")}>
                <div className={cx("square-box")}>
                  <div className={cx("choose-img-wrapper")}>
                    <button
                      className={cx("cancel-current-img-btn", { visible: previewImg !== "" })}
                      onClick={handleCancelBtnClick}
                    >
                      <Close />
                    </button>
                    <input
                      type="file"
                      id="file"
                      name="product-creation_imgFile"
                      style={{ display: "none" }}
                      accept=".png, .jpg, .jpeg"
                      onChange={handleProductImgChange}
                    />
                    {previewImg !== "" ? (
                      <div className={cx("preview-img-wrapper")}>
                        <img src={previewImg} alt="" />
                      </div>
                    ) : (
                      <label
                        htmlFor="file"
                        className={cx("choose-img-btn")}
                        onDrop={handleImgDrop}
                        onDragOver={(e) => e.preventDefault()}
                      >
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
              <div className={cx("col-7")}>
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
            <div className={cx("row-2")}>
              <div className={cx("col-12")}>
                <TextEditor />
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
