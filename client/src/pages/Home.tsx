import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation(undefined, { keyPrefix: "pages.home" });

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{t("title")}</h1>

        <p className="text-xl text-gray-600">{t("description")}</p>
      </div>

      <div className="flex gap-2 justify-center">
        <Button
          variant="contained"
          onClick={() => {
            navigate("/login");
          }}
        >
          {t("buttons.login")}
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          {t("buttons.dashboard")}
        </Button>
      </div>
    </div>
  );
}
