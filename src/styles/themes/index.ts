import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#008c50'
        },
        secondary: {
            main: '#efefef'
        },
        info: {
            main: '#ffffff',
            dark: '#efefef',
            contrastText: '#008c50',
        }
    },
})