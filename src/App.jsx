import "./init";
import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// pages
import pages from "~/pages";
// layout
import { EmptyLayout } from "~/layout";
// modal
import Modal from "~/modal";
import { ShoppingSession, CartItems } from "~/providers";

function App() {
  return (
    <ShoppingSession>
      <CartItems>
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
        </BrowserRouter>
      </CartItems>
    </ShoppingSession>
  );
}

export default App;
