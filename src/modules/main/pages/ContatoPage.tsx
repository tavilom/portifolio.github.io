import {
  Box,
  Button,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { pageVariants } from "@/shared/styles/animationStyle";
import PaperBackground from "@/shared/components/PaperBackground";
import { Link as RouterLink } from "react-router-dom";
import { useEffect } from "react";
import VerProjetosGithub from "../components/VerProjetosGithub";

const CodigoPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  useEffect(() => {
    document.title = "Projetos do Github";
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <m.main
        role="main"
        initial={prefersReducedMotion ? false : "initial"}
        animate={prefersReducedMotion ? false : "animate"}
        exit={prefersReducedMotion ? undefined : "exit"}
        transition={prefersReducedMotion ? undefined : { duration: 0.35 }}
        variants={pageVariants}
        style={{
          height: "100vh",
          width: "auto",
        }}
      >
        <PaperBackground>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              p: isMobile ? 2 : 3,
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            {/* Cabeçalho */}
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                alignItems: isMobile ? "flex-start" : "center",
                mb: isMobile ? 2 : 3,
                gap: isMobile ? 1 : 0,
                minWidth: 0,
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontSize: isMobile ? 22 : 28,
                  textAlign: isMobile ? "center" : "left",
                  width: isMobile ? "100%" : "auto",
                }}
              >
                Meios para me contatar
              </Typography>

              <Button
                component={RouterLink}
                to="/"
                startIcon={<ArrowBack />}
                variant="outlined"
                aria-label="Voltar para a página inicial"
                sx={{ alignSelf: isMobile ? "center" : "auto" }}
              >
                Voltar
              </Button>
            </Box>

            <Divider sx={{ mb: isMobile ? 2 : 3 }} />

            {/* Conteúdo principal */}
            <Box
              sx={{
                flexGrow: 1,
                minWidth: 0,
                minHeight: 0,
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              <VerProjetosGithub />
            </Box>
          </Box>
        </PaperBackground>
      </m.main>
    </LazyMotion>
  );
};

export default CodigoPage;
