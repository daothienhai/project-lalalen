import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const Breadcrumb = ({ title, category }) => {
  const routes = [
    { path: "/:category", breadcrumb: category },
    { path: "/", breadcrumb: "Home" },
    { path: "/:category/:pid/:title", breadcrumb: title },
  ];
  const breadcrumb = useBreadcrumbs(routes);
  return (
    <div className="gap-1 text-sm flex items-center">
      {breadcrumb
        ?.filter((el) => !el.match.route === false)
        .map(({ match, breadcrumb }, index, self) => (
          <Link
            className="flex items-center hover:text-main"
            key={match.pathname}
            to={match.pathname}
          >
            <span className="capitalize">{breadcrumb}</span>
            {index !== self.length - 1 && <IoIosArrowForward />}
          </Link>
        ))}
    </div>
  );
};

export default Breadcrumb;
