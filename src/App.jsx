import "./init";
import { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import pages from "~/pages";
import { EmptyLayout } from "~/layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, fetchShoppingSession } from "./store/userSlice";
import Modal from "~/modal";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    if (user === null) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user === null) return;
    dispatch(fetchShoppingSession(user.id));
  }, [dispatch, user]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {pages.map((page) => {
            const Layout = page.layout || EmptyLayout;
            const Element = <Layout content={page.content} />;
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
        <Modal />
      </BrowserRouter>
    </>
  );
}

export default App;
