"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Fragment, useCallback } from "react";
import Link from "next/link";

const BreadCrumbsComp = () => {
  const path = usePathname();

  const crumbs = useCallback(() => {
    const paths = path.split("/").slice(1);

    if (paths.length > 0) {
      const page = paths.at(-1);
      paths.pop();

      return {
        page,
        paths,
      };
    }
  }, [path]);

  return (
    <Breadcrumb className="hidden md:block">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {crumbs()?.paths?.map((cr, index) => (
          <Fragment key={`crumb-${index}`}>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link
                  href={`/${crumbs()
                    ?.paths.slice(0, index + 1)
                    .join("/")}`}
                >
                  {cr}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}
        {crumbs()?.page && (
          <BreadcrumbItem>
            <BreadcrumbPage>{crumbs()?.page}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbsComp;
