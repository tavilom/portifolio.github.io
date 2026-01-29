import { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  useMediaQuery,
  useTheme,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

type FigmaScreen = {
  title: string;
  description?: string;
  url: string;
};

const FIGMA_SCREENS: FigmaScreen[] = [
  {
    title: "Sistema UniService",
    description: "Protótipo de sistema pensado para integrar todos os demais sistema utilizados. Visão do Administrador.",
    url: "https://www.figma.com/proto/Yr12PfEGdeRbbHJpeFA6T1/Unimed?node-id=319-1140&starting-point-node-id=319%3A1140&t=yUKUjoVNyhIk2ryN-1",
  },
  {
    title: "Sistema UniService",
    description: "Protótipo de sistema pensado para integrar todos os demais sistema utilizados. Visão do Supervisor.",
    url: "https://www.figma.com/proto/Yr12PfEGdeRbbHJpeFA6T1/Unimed?node-id=190-354&starting-point-node-id=190%3A354&t=QXCU5D4k85nZMc7g-1",
  },
  {
    title: "Sistema UniService",
    description: "Protótipo de sistema pensado para integrar todos os demais sistema utilizados. Visão do Colaborador.",
    url: "https://www.figma.com/proto/Yr12PfEGdeRbbHJpeFA6T1/Unimed?node-id=1-2&starting-point-node-id=1%3A2&t=KfXzFHBL3dkQRBdr-1",
  },
  {
    title: "Sistema Oportunidade",
    description: "Protótipo de sistema pensado para susbtituir o uso do portal de vagas Gupy. Versão do Cliente.",
    url: "https://www.figma.com/proto/Yr12PfEGdeRbbHJpeFA6T1/Unimed?node-id=495-1379&starting-point-node-id=495%3A1379&t=po3RebMk9Tj5Quiy-1",
  },
  {
    title: "Sistema Escalante",
    description: "Protótipo de sistema Utilizado para Trabalho de Conclução de Curso. O sistema foi pensado para facilitar na organização de escalas de serviço.",
    url: "https://www.figma.com/proto/Ey8jhPWuIR6ND3QCdB9mZ7/Projeto-Escalante?node-id=88-4&starting-point-node-id=138%3A2&scaling=scale-down-width&content-scaling=fixed&t=MVcZ4rfHVX813YwW-1",
  },
  {
    title: "Sistema RecicLAR - Portótipo base de telas",
    description: "Protótipo inicial das telas base do Sistema recicLAR. O sistema foi pensado para facilitar na gestão de empresas de reciclagem e com compisibilidade de escalar para atender demais esquemas de negócios.",
    url: "https://www.figma.com/proto/mwMfjtmCpz5jQn9NGlsShX/Untitled?node-id=3-76&p=f&t=QgZ3ViWIDj3K4zP7-1&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=3%3A76",
  },
];

function isFigmaUrl(rawUrl: string) {
  return /https?:\/\/(www\.)?figma\.com\//i.test((rawUrl || "").trim());
}


function enhanceFigmaUrl(rawUrl: string) {
  const trimmed = (rawUrl || "").trim();
  if (!trimmed) return "";

  try {
    const u = new URL(trimmed);

    const isProto = /\/proto\//i.test(u.pathname);
    if (isProto) {
      if (!u.searchParams.has("hide-ui")) u.searchParams.set("hide-ui", "1");
      if (!u.searchParams.has("scaling")) u.searchParams.set("scaling", "scale-down");
    }

    return u.toString();
  } catch {
    return trimmed;
  }
}

function toFigmaEmbedUrl(rawUrl: string) {
  const base = enhanceFigmaUrl(rawUrl);
  const trimmed = (base || "").trim();
  if (!trimmed) return "";

  if (trimmed.startsWith("https://www.figma.com/embed")) return trimmed;

  try {
    const u = new URL(trimmed);
    if (!u.hostname.includes("figma.com")) return "";
  } catch {
    return "";
  }

  return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(trimmed)}`;
}

type PreviewMode = "fit" | "mobile" | "tablet" | "desktop";

export default function VerProjeto() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<FigmaScreen | null>(null);
  const [mode, setMode] = useState<PreviewMode>("fit");
  const [iframeLoading, setIframeLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const selectedEmbed = useMemo(() => {
    if (!selected?.url) return "";
    return toFigmaEmbedUrl(selected.url);
  }, [selected]);

  const canPreview = !!selected && !!selectedEmbed && isFigmaUrl(selected.url);

  const handleOpen = (screen: FigmaScreen) => {
    setSelected(screen);
    setMode(isMobile ? "mobile" : "fit");
    setIframeLoading(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
    setIframeLoading(false);
  };

  const frameSize = useMemo(() => {
    if (mode === "mobile") return { w: 390, h: 844 };
    if (mode === "tablet") return { w: 820, h: 1180 };
    if (mode === "desktop") return { w: 1280, h: 720 };
    return null; // fit
  }, [mode]);

  const copyLink = async () => {
    if (!selected?.url) return;
    try {
      await navigator.clipboard.writeText(selected.url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = selected.url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  };

  return (
    <Box sx={{ width: "100%", px: isMobile ? 1 : 3, py: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: isMobile ? "center" : "left" }}>
        Apresentação dos Cards
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "stretch",
        }}
      >
        {FIGMA_SCREENS.map((screen) => {
          const valid = isFigmaUrl(screen.url);
          return (
            <Box
              key={screen.title}
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
                  <Typography variant="h6">{screen.title}</Typography>
                  {screen.description ? (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {screen.description}
                    </Typography>
                  ) : null}

                  {!valid ? (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      Link inválido do Figma nesse item.
                    </Alert>
                  ) : null}
                </CardContent>

                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Button variant="contained" onClick={() => handleOpen(screen)} disabled={!valid}>
                    Ver preview
                  </Button>
                </CardActions>
              </Card>
            </Box>
          );
        })}
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xl"
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            alignItems={{ xs: "stretch", sm: "center" }}
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h6">{selected?.title ?? "Preview"}</Typography>
              {selected?.description ? (
                <Typography variant="body2" color="text.secondary">
                  {selected.description}
                </Typography>
              ) : null}
            </Box>

            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Tooltip title="Copiar link">
                <IconButton onClick={copyLink} disabled={!selected?.url}>
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Abrir em nova aba">
                <span>
                  <IconButton
                    onClick={() =>
                      selected?.url
                        ? window.open(selected.url, "_blank", "noopener,noreferrer")
                        : null
                    }
                    disabled={!selected?.url}
                  >
                    <OpenInNewIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </Stack>
          </Stack>
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            // altura responsiva do conteúdo do dialog
            // dvh funciona melhor em mobile moderno
            height: isMobile ? "calc(100dvh - 160px)" : "82dvh",
            p: 2,
          }}
        >
          <Stack spacing={2} sx={{ height: "100%" }}>

            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={1.5}
              alignItems={{ xs: "stretch", md: "center" }}
              justifyContent="space-between"
            >
              <Typography variant="body2" color="text.secondary">
                Modo de visualização
              </Typography>

              <ToggleButtonGroup
                size="small"
                value={mode}
                exclusive
                onChange={(_, v) => v && setMode(v)}
                aria-label="modo preview"
              >
                <ToggleButton value="fit">Fit</ToggleButton>
                <ToggleButton value="mobile">Mobile</ToggleButton>
                <ToggleButton value="tablet">Tablet</ToggleButton>
                <ToggleButton value="desktop">Desktop</ToggleButton>
              </ToggleButtonGroup>
            </Stack>

            <Box
              sx={{
                position: "relative",
                flex: 1,
                minHeight: 0,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                overflow: "hidden",
                bgcolor: "background.default",
              }}
            >
              {!canPreview ? (
                <Box sx={{ p: 2 }}>
                  <Alert severity="warning">Não foi possível montar o embed desse link.</Alert>
                </Box>
              ) : (
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                    bgcolor: "background.default",
                  }}
                >
                  {/* “frame” centralizado (ou fit total) */}
                  <Box
                    sx={{
                      position: "relative",
                      width: frameSize
                        ? { xs: "100%", md: frameSize.w }
                        : "100%",
                      height: frameSize
                        ? { xs: "100%", md: frameSize.h }
                        : "100%",
                      maxWidth: "100%",
                      maxHeight: "100%",
                      borderRadius: 2,
                      overflow: "hidden",
                      border: frameSize ? "1px solid" : "none",
                      borderColor: "divider",
                      boxShadow: frameSize ? 3 : 0,
                      bgcolor: "background.paper",
                    }}
                  >
                    {iframeLoading && (
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "rgba(255,255,255,0.6)",
                          zIndex: 2,
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    )}

                    <iframe
                      title={`Figma - ${selected?.title ?? "Preview"}`}
                      src={selectedEmbed}
                      style={{ width: "100%", height: "100%", border: 0 }}
                      allowFullScreen
                      sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                      onLoad={() => setIframeLoading(false)}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
