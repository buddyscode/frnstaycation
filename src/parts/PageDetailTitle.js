import React from "react";
import Fade from "react-reveal/Fade";

import Breadcrumb from "elements/Breadcrumb";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function PageDetailTitle({ breadcrumb }) {
  const page = useSelector((state) => state.page);
  const { id } = useParams();

  const data = page?.[id] || {};

  return (
    <section className="container spacing-sm">
      <Fade Bottom>
        <div className="row align-items-center">
          <div className="col-12 col-lg">
            <Breadcrumb data={breadcrumb} />
          </div>
          <div className="col-12 col-lg-auto text-center">
            <h1 className="h2">{data.title}</h1>
            <span className="text-gray-400">
              {data.city}, {data.country}
            </span>
          </div>
          <div className="col-12 col-lg"></div>
        </div>
      </Fade>
    </section>
  );
}
