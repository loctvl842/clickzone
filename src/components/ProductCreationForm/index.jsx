import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { PulseLoader } from "react-spinners";
import { useCallback, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

// components
import { FormControl } from "~/components";

// icons
import { AddAPhoto, Close } from "@mui/icons-material";

let cx = classNames.bind(styles);

const ProductCreationForm = ({ onNotCreatingProduct }) => {
  const [quill, setQuill] = useState(null);
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

  const quillRef = useCallback((quill) => {
    if (quill === null) return;
    quill.innerHTML = "";
    const editor = document.createElement("div");
    quill.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
    });
    setQuill(q);
  }, []);

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
        <form className={cx("form-product-creation")}>
          <div className={cx("form-data")}>
            <div className={cx("col-5")}>
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
            <div className={cx("col-12")}>
              <div id="quill-container" ref={quillRef} className={cx("quill-container")}></div>
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
