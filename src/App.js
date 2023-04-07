import { } from "./main.scss";
import { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import pages from "~/pages";
import { EmptyLayout } from "~/layout";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./store/userSlice";
import Modal from "~/modal";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {pages.map((page) => {
            const Layout = page.layout;
            const Element = page.layout ? (
              <Layout components={page.components} />
            ) : (
              <EmptyLayout components={page.components} />
            );
            return Array.isArray(page.path) ? (
              <Fragment key={uuidv4()}>
                {page.path.map((path) => {
                  return <Route key={uuidv4()} path={path} element={Element} />;
                })}
              </Fragment>
            ) : (
              <Route key={uuidv4()} path={page.path} element={Element} />
            );
          })}
        </Routes>
      </BrowserRouter>
      <Modal />
    </>
  );
}

export default App;
