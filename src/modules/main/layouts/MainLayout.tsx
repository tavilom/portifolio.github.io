import React, { useMemo, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Paper,
  Drawer,
  Divider,
  useTheme,
  useMediaQuery,
  Stack,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import CodeIcon from "@mui/icons-material/Code";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { LazyMotion, m } from "framer-motion";


// import PROFILE_PHOTO from "@/assets/minha-foto.jpg";

// ------------------------------
// Tipos
// ------------------------------
type Tile = {
  key: string;
  title: string;
  icon: React.ReactNode;
};

type Skill = {
  title: string;
  description: string;
};

// ------------------------------
// Sidebar
// ------------------------------
const TILES: Tile[] = [
  { key: "projetos", title: "Protótipos do Figma", icon: <DesignServicesIcon /> },
  { key: "codigos", title: "Projetos do GitHub", icon: <CodeIcon /> },
  { key: "contato", title: "Contato", icon: <ContactMailIcon /> },
];

// ------------------------------
// Home - Skills
// ------------------------------
const LANGUAGES: Skill[] = [
  { title: "JavaScript", description: "ES6+, Async/Await, APIs REST" },
  { title: "TypeScript", description: "Tipagem estática e organização" },
  {
    title: "Python",
    description: "Automação, backend, Machine Learning, Análise de Dados e Dashboards",
  },
];

const FRAMEWORKS: Skill[] = [
  { title: "React", description: "Hooks, SPA e componentização" },
  { title: "Next.js", description: "SSR e performance" },
  { title: "Node.js", description: "APIs REST" },
  { title: "NestJS", description: "Arquitetura modular" },
];

const SKILLS: Skill[] = [
  { title: "Arquitetura", description: "Separação de responsabilidades" },
  { title: "Banco de Dados", description: "MySQL, Prisma, JSON Server" },
  { title: "Versionamento", description: "Git, GitHub e GitLab" },
];

// ------------------------------
// Constantes
// ------------------------------
const SIDEBAR_WIDTH = 280;

const loadFeatures = () => import("framer-motion").then((res) => res.domAnimation);

// ------------------------------
// Componente
// ------------------------------
const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const tiles = useMemo(() => TILES, []);

  const handleOpen = (key: string) => {
    navigate(`/${key}`);
    if (isMobile) setDrawerOpen(false);
  };

  const isSelected = (key: string) => pathname === `/${key}`;

  // ------------------------------
  // Sidebar
  // ------------------------------
  const SidebarContent = (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ✅ Header com foto + nome */}
      <Box sx={{ p: 2 }}>
        <Stack spacing={1.25} alignItems="center">
          <Avatar
            // src={PROFILE_PHOTO}
            alt="Otávio Mastrantonio"
            sx={{
              width: 84,
              height: 84,
              fontWeight: 800,
              boxShadow: 2,
              border: "2px solid",
              borderColor: "divider",
            }}
          >
            OM
          </Avatar>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ lineHeight: 1.2 }}>
              Otávio Mastrantonio
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Desenvolvedor FullStack Jr | UI/UX | Desenvolvedor ML JR
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Divider />

      <List>
        {tiles.map((t) => (
          <ListItemButton
            key={t.key}
            selected={isSelected(t.key)}
            onClick={() => handleOpen(t.key)}
            sx={{ mx: 1, my: 0.5, borderRadius: 1.5 }}
          >
            <ListItemIcon sx={{ minWidth: 44 }}>{t.icon}</ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" fontWeight={700}>
                  {t.title}
                </Typography>
              }
            />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />

      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          © Todos os direitor reservados a Otávio Mastrantonio
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: theme.palette.background.default }}>
      {/* Topbar */}
      <AppBar position="static" elevation={2}>
        <Toolbar>
          {isMobile && (
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" fontWeight={700} ml={isMobile ? 1 : 0}>
            Meu Portfólio
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Body */}
      <Box sx={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
        {!isMobile && (
          <Paper square elevation={2} sx={{ width: SIDEBAR_WIDTH }}>
            {SidebarContent}
          </Paper>
        )}

        {isMobile && (
          <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            {SidebarContent}
          </Drawer>
        )}

        {/* Conteúdo principal */}
        <Paper square elevation={0} sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
          <LazyMotion features={loadFeatures}>
            <m.main
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {pathname === "/" ? (
                <Stack spacing={4}>
                  {[
                    { title: "Linguagens", data: LANGUAGES },
                    { title: "Frameworks", data: FRAMEWORKS },
                    { title: "Skills", data: SKILLS },
                  ].map((section) => (
                    <Box key={section.title}>
                      <Typography variant="h6" fontWeight={700} mb={2}>
                        {section.title}
                      </Typography>

                      <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                        {section.data.map((skill) => (
                          <Card
                            key={skill.title}
                            elevation={2}
                            sx={{ width: { xs: "100%", sm: "48%", md: "30%" } }}
                          >
                            <CardContent>
                              <Typography fontWeight={700}>{skill.title}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                {skill.description}
                              </Typography>
                            </CardContent>
                          </Card>
                        ))}
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              ) : (
                <Outlet />
              )}
            </m.main>
          </LazyMotion>
        </Paper>
      </Box>
    </Box>
  );
};

export default MainLayout;
