import { createMuiTheme } from "@material-ui/core/styles";

export default (type, color = "#1B2A50", secondary = "#EE6C4D") => {
    let theme = {
        palette: {
            type: type,
            primary: {
                main: color,
                contrastText: "#fff"
            },
            secondary: {
                main: "#EE6C4D"
            },
            green: {
                main: "#5fcc57"
            },
            error: {
                main: "#f50057"
            }
        },
        typography: {
            fontFamily: ["Lato", "sans-serif"].join(","),
            fontWeightMedium: 700,
            fontWeightBold: 900
        }
    };

    if (type === "light") {
        theme.palette.background = {
            default: "#e8eaed"
        };
    }
    return createMuiTheme(theme);
};
