import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { motion } from "framer-motion";
import { pageVariants } from "@/shared/styles/animationStyle";

type ContactCard = {
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: React.ReactNode;
  kind: "external" | "copyEmail";
};

const EMAIL = "taviobraga@hotmail.com";

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

const CONTACTS: ContactCard[] = [
  {
    title: "LinkedIn",
    description: "Veja meu perfil profissional, experiências e projetos.",
    cta: "Abrir LinkedIn",
    // TROQUE pelo seu link real
    href: "https://www.linkedin.com/in/otavio-mastrantonio/",
    icon: <LinkedInIcon fontSize="large" />,
    kind: "external",
  },
  {
    title: "E-mail",
    description: "Clique para copiar meu e-mail e me enviar uma mensagem.",
    cta: "Enviar e-mail",
    href: EMAIL,
    icon: <EmailIcon fontSize="large" />,
    kind: "copyEmail",
  },
  {
    title: "WhatsApp",
    description: "Fale comigo pelo WhatsApp para um contato rápido.",
    cta: "Chamar no WhatsApp",
    // TROQUE 55DDDNÚMERO pelo seu número (55 + DDD + número, sem espaços)
    href: "https://wa.me/5553981142527?text=Ol%C3%A1%21%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar.",
    icon: <WhatsAppIcon fontSize="large" />,
    kind: "external",
  },
];

export default function FazerContato() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("E-mail copiado para a área de transferência!");
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error">("success");

  const handleAction = async (c: ContactCard) => {
    if (c.kind === "copyEmail") {
      const ok = await copyToClipboard(EMAIL);

      if (ok) {
        setSnackSeverity("success");
        setSnackMsg("E-mail copiado para a área de transferência!");
      } else {
        setSnackSeverity("error");
        setSnackMsg("Não foi possível copiar automaticamente. Selecione e copie: " + EMAIL);
      }

      setSnackOpen(true);
      return;
    }

    openExternal(c.href);
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
      variants={pageVariants}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          px: isMobile ? 1 : 3,
          py: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 1, textAlign: isMobile ? "center" : "left" }}
        >
          Fazer contato
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: isMobile ? "center" : "left" }}
        >
          Escolha o canal que preferir para falar comigo.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "stretch",
            mt: 1,
          }}
        >
          {CONTACTS.map((c) => (
            <Box
              key={c.title}
              sx={{
                width: {
                  xs: "100%",
                  sm: "calc(50% - 8px)",
                  lg: "calc(33.333% - 10.7px)",
                },
                minWidth: 280,
                display: "flex",
              }}
            >
              <Card
                variant="outlined"
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": { boxShadow: 6, transform: "translateY(-2px)" },
                }}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{ display: "flex", alignItems: "center" }}>{c.icon}</Box>
                    <Box>
                      <Typography variant="h6">{c.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {c.description}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>

                <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
                  <Button variant="contained" onClick={() => handleAction(c)}>
                    {c.cta}
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>

        <Snackbar
          open={snackOpen}
          autoHideDuration={2500}
          onClose={() => setSnackOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackOpen(false)}
            severity={snackSeverity}
            sx={{ width: "100%" }}
          >
            {snackMsg}
          </Alert>
        </Snackbar>
      </Box>
    </motion.div>
  );
}
