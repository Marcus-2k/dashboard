import { Sidebar } from "@features/sidebar";
import { useMediaQuery } from "@mui/material";
import { PageWrapper } from "@pages";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  const isTablet = useMediaQuery("(min-width: 1025px)");

  const contentTemplate = (
    <PageWrapper>
      <Outlet />
    </PageWrapper>
  );

  return (
    <>{isTablet ? <Sidebar>{contentTemplate}</Sidebar> : contentTemplate}</>
  );
}
