import { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Card,
  CardContent,
  CardActions,
  useMediaQuery,
  useTheme,
  Stack,
  Chip,
  Tooltip,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { motion } from "framer-motion";
import { pageVariants } from "@/shared/styles/animationStyle";

type Repo = {
  id: string; // usado apenas como key interna
  nome: string;
  descricao?: string;
  stack?: string[];
  repoUrl: string;
  demoUrl?: string;
};

const REPOS: Repo[] = [
  {
    id: "1",
    nome: "Termometro do Humor",
    descricao:
      "Realziar o mapeamento do estado psicológico dos colaboradores através de um sistema com uma interface intuitiva e amistosa ao usuário",
    stack: ["React", "TypeScript", "MUI", "NestJS", "Prisma ORM", "MySQL"],
    repoUrl: "https://github.com/tavilom/Termomedo-do-humor",
  },
  {
    id: "2",
    nome: "Caixinha do bem-estar",
    descricao:
      "Promover o bem-estar e fortalecer a cultura de reconhecimento na empresa por meio de uma experiência lúdica e rápida: ao abrir uma dentre quatro caixinhas vistuais, o colaborador recebe uma mensagem curta de afeto/apreciação, criando micro-momentos de incentivo que reduzem estresse, aumentando a sensação de pertencimento que estimulam interações mais empáticas no dia a dias",
    stack: ["React", "TypeScript", "MUI", "NestJS", "Prisma ORM", "MySQL"],
    repoUrl: "https://github.com/tavilom/Caixinha-do-bem-estar",
  },
  {
    id: "3",
    nome: "Faq Tasy",
    descricao:
      "Auxiliar na tomada de decisões dos usuários da ferramenta Tasy em determinadas situações. Conta também com um chatbot com uma pequena LLM interna",
    stack: [
      "React",
      "TypeScript",
      "MUI",
      "NestJS",
      "Prisma ORM",
      "MySQL",
      "Python",
      "FastAPI",
      "PyDantic",
      "NumPy",
      "XGBoost",
    ],
    repoUrl: "https://github.com/tavilom/faq-tasy",
  },
  {
    id: "4",
    nome: "RecicLAR",
    descricao:
      "O sistema foi pensado para facilitar na gestão de empresas de reciclagem e com compisibilidade de escalar para atender demais esquemas de negócios.",
    stack: ["React", "TypeScript", "MUI", "NestJS", "Prisma ORM", "MySQL"],
    repoUrl: "https://github.com/tavilom/recicLAR-TS",
  },
  {
    id: "5",
    nome: "Na Feira",
    descricao:
      "O sistema foi pensado para facilitar na gestão de empresas de feirantes, facilitando nas vendas.",
    stack: ["React", "TypeScript", "MUI", "NestJS", "Prisma ORM", "MySQL"],
    repoUrl: "https://github.com/tavilom/Na-Feira",
  },
  {
    id: "6",
    nome: "UniServices",
    descricao:
      "Sistema que seja um organizador de tarefas com credibilidade, transparência e inovação. Centralizando todos os sistemas utilizados atualmente pela corporativa em um lugar só.",
    stack: ["React", "TypeScript", "MUI", "NestJS", "Prisma ORM", "MySQL"],
    repoUrl: "https://github.com/tavilom/UniService",
  },
  {
    id: "7",
    nome: "Dashboard PET & Logística",
    descricao:
      "Streamlit que lê um CSV com PySpark, faz limpeza/tipagem e exibe análises e projeções com Plotly e statsmodels.",
    stack: ["Python", "PySpark", "Streamlit", "Plotly", "statsmodels"],
    repoUrl: "https://github.com/tavilom/big-data",
  },
  {
    id: "8",
    nome: "Oportunidades",
    descricao:
      "Protótipo de sistema pensado para susbtituir o uso do portal de vagas Gupy. Versão do Cliente.",
    stack: ["React", "TypeScript", "MUI", "NestJS", "Prisma ORM", "MySQL"],
    repoUrl: "https://github.com/tavilom/Oportunidades---Unimed",
  },
];

const ClampWithTooltip = ({
  text,
  lines = 2,
  typographyVariant = "body2",
  color,
  sx,
}: {
  text: string;
  lines?: number;
  typographyVariant?: "body2" | "body1" | "subtitle2" | "caption";
  color?: any;
  sx?: any;
}) => {
  if (!text) return null;

  return (
    <Tooltip title={text} placement="top" arrow enterDelay={300} leaveDelay={100}>
      <Typography
        variant={typographyVariant}
        color={color}
        sx={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: lines,
          overflow: "hidden",
          textOverflow: "ellipsis",
          wordBreak: "break-word",
          ...sx,
        }}
      >
        {text}
      </Typography>
    </Tooltip>
  );
};

/**
 * Coluna "Stack" organizada:
 * - limita visual a 2 linhas (clamp)
 * - mostra todas as techs no tooltip
 */
const StackChipsClamp = ({
  items,
  lines = 2,
  maxVisible = 8,
}: {
  items?: string[];
  lines?: number;
  maxVisible?: number;
}) => {
  if (!items || items.length === 0) return <Typography variant="body2">-</Typography>;

  const visible = items.slice(0, maxVisible);
  const remaining = items.length - visible.length;

  const tooltipContent = (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, maxWidth: 420, p: 0.5 }}>
      {items.map((t) => (
        <Chip key={t} label={t} size="small" />
      ))}
    </Box>
  );

  return (
    <Tooltip title={tooltipContent} placement="top" arrow enterDelay={250}>
      <Box
        sx={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: lines,
          overflow: "hidden",
          textOverflow: "ellipsis",
          lineHeight: 1.3,
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
          {visible.map((t) => (
            <Chip key={t} label={t} size="small" />
          ))}
          {remaining > 0 ? <Chip label={`+${remaining}`} size="small" /> : null}
        </Box>
      </Box>
    </Tooltip>
  );
};

export default function VerProjetosGithub() {
  const [search, setSearch] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const filteredRepos = useMemo(() => {
    if (!search) return REPOS;
    const s = search.toLowerCase();

    return REPOS.filter((r) => {
      const hay = [
        r.nome,
        r.descricao ?? "",
        (r.stack ?? []).join(" "),
        r.repoUrl,
        r.demoUrl ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return hay.includes(s);
    });
  }, [search]);

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
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, textAlign: isMobile ? "center" : "left" }}>
          Meus Repositórios (GitHub)
        </Typography>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Pesquisar por nome, stack, descrição..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
          />
        </Box>

        {filteredRepos.length === 0 ? (
          <Typography align="center">Nenhum repositório encontrado.</Typography>
        ) : isMobile ? (
          // MOBILE: cards sem botão visualizar (só abrir no GitHub)
          <Box display="flex" flexDirection="column" gap={2}>
            {filteredRepos.map((r) => (
              <Card
                key={r.id}
                variant="outlined"
                sx={{
                  transition: "all 0.2s ease-in-out",
                  cursor: "pointer",
                  "&:hover": { boxShadow: 6, transform: "translateY(-2px)" },
                }}
              >
                <CardContent>
                  <Typography variant="h6">{r.nome}</Typography>

                  {r.descricao ? (
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {r.descricao}
                    </Typography>
                  ) : null}

                  {!!r.stack?.length ? (
                    <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
                      {r.stack.map((t) => (
                        <Chip key={t} label={t} size="small" />
                      ))}
                    </Stack>
                  ) : null}
                </CardContent>

                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <IconButton
                    onClick={() => window.open(r.repoUrl, "_blank", "noopener,noreferrer")}
                    color="primary"
                  >
                    <OpenInNewIcon fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </Box>
        ) : (
          // DESKTOP: remove coluna "Repositório" e remove botão "Visualizar"
          <TableContainer
            component={Paper}
            sx={{
              width: "100%",
              flex: 1,
              overflow: "visible",
              boxShadow: "none",
            }}
          >
            <Table size="medium" sx={{ width: "100%", tableLayout: "auto" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Projeto</TableCell>
                  <TableCell sx={{ width: 360 }}>Stack</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredRepos.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
                      <Typography fontWeight={600}>{r.nome}</Typography>

                      {r.descricao ? (
                        <ClampWithTooltip
                          text={r.descricao}
                          lines={2}
                          typographyVariant="body2"
                          color="text.secondary"
                          sx={{ mt: 0.5 }}
                        />
                      ) : null}
                    </TableCell>

                    <TableCell sx={{ verticalAlign: "top" }}>
                      <StackChipsClamp items={r.stack} lines={2} maxVisible={8} />
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => window.open(r.repoUrl, "_blank", "noopener,noreferrer")}
                      >
                        <OpenInNewIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </motion.div>
  );
}
