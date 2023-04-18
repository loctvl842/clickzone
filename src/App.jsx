import "./init";
import { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";

// pages
import pages from "~/pages";
// layout
import { EmptyLayout } from "~/layout";
// modal
import Modal from "~/modal";
// hook
import { useCurrentUser } from "~/hook";
// store
import { fetchShoppingSession } from "~/store/sessionSlice";

function App() {
  const dispatch = useDispatch();
  const user = useCurrentUser();
  const loading = useSelector((state) => state.user.loading);
  useEffect(() => {
    if (user !== null) dispatch(fetchShoppingSession(user.id));
  }, [user, dispatch]);

  return (
    <>
      {!loading && (
        <BrowserRouter>
          <Routes>
            {pages.map((page) => {
              const Layout = page.layout || EmptyLayout;
              const Element = <Layout content={page.content} />;
              return Array.isArray(page.path) ? (
                <Fragment key={uuidv4()}>
                  {page.path.map((path) => {
                    return (
                      <Route key={uuidv4()} path={path} element={Element} />
                    );
                  })}
                </Fragment>
              ) : (
                <Route key={uuidv4()} path={page.path} element={Element} />
              );
            })}
          </Routes>
          <Modal />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
