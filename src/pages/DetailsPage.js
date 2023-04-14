import React, { useEffect } from "react";
import Header from "parts/Header";
import PageDetailTitle from "parts/PageDetailTitle";
import FeaturedImage from "parts/FeaturedImage";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from "parts/Footer";
import Testimony from "parts/Testimony";
import Activities from "parts/Activities";
import { Fade } from "react-reveal";
import PageDetailDescription from "parts/PageDetailDescription";
import { useCallback } from "react";
import { fetchPage } from "store/actions/page";
import BookingForm from "parts/BookingForm";

function DetailsPage() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  const { id } = useParams();

  const breadcrumb = [
    { pageTitle: "Home", pageHref: "/" },
    { pageTitle: "House Details", pageHref: "" },
  ];

  const fnLoadPage = useCallback(
    async (id) => {
      if (!page[id]) {
        const response = await dispatch(fetchPage(`/detail-page/${id}`, id));

        document.title = `Staycation | ${response.title}`;
      }
    },
    [dispatch, page]
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    fnLoadPage(id);
  }, [id, fnLoadPage]);

  if (!page[id]) return null;

  return (
    <>
      <Header />
      <PageDetailTitle breadcrumb={breadcrumb} />
      <FeaturedImage />
      <section className="container">
        <div className="row">
          <div className="col-12 col-lg-7 pr-5">
            <Fade bottom>
              <PageDetailDescription data={page[id]} />
            </Fade>
          </div>
          <div className="col-12 col-lg-5">
            <Fade bottom>
              <BookingForm />
            </Fade>
          </div>
        </div>
      </section>

      <Activities data={page[id].activityId} />
      <Testimony data={page[id].testimonial} />

      <Footer />
    </>
  );
}

export default DetailsPage;
