import { useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";

const BreadCrumb = () => {
  const location = useLocation();
  const breadCrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    const breadcrumbItems = [
      {
        href: "/",
        title: "Ana Sayfa",
      },
    ];
    pathnames.forEach((name, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
      const isLast = index === pathnames.length - 1;
      const item = {
        href: routeTo,
        title: capitalize(name),
      };
      if (isLast) {
        item.title = capitalize(name);
      }
      breadcrumbItems.push(item);
    });

    return (
      <div>
        <Breadcrumb items={breadcrumbItems} />
      </div>
    );
  };

  return <>{breadCrumbView()}</>;
};

export default BreadCrumb;