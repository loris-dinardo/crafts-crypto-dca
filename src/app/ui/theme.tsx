import {createTheme, ThemeOptions} from '@material-ui/core/styles';

/*********************************************
 * Colors
 ********************************************/
const BLACK = '#333333';
const BLACK_LIGHT = '#555555';
const BLUE = '#3868b0';
const BLUE_LIGHT = '#3868b01a';
const RED = '#C2351E';
const RED_LIGHT = '#de7a7a';
const DARK_GREY = '#333333';
const MEDIUM_GREY = '#666666';
const BUTTON_GREY = '#444444';
const BORDER_GREY = '#dddddd';
const GREY = '#EEEEEE';
const GREY_LIGHT = '#F1F1F1';
const WHITE = '#FFFFFF';

/*********************************************
 * Theme Extension
 ********************************************/
declare module '@material-ui/core/styles/createTheme' {
    interface Theme {
        strategies: {
            header: {
                background: string
            },
            items: {
                background: string,
                border: string,
                borderSelected: string,
            }
        }
    }

    interface ThemeOptions {
        strategies?: {
            header: {
                background: string
            },
            items: {
                background: string,
                border: string,
                borderSelected: string,
            }
        }
    }
}

export default function createCraftCryptoTheme(options: ThemeOptions) {
    return createTheme({
        strategies: {
            header: {
                background: BLUE
            },
            items: {
                background: BLACK_LIGHT,
                border: `0px solid ${BLACK}`,
                borderSelected: `1px solid ${BLUE_LIGHT}`
            }
        },
        ...options,
    })
}

/*********************************************
 * Theme
 ********************************************/
export const theme = createCraftCryptoTheme({
    palette: {
        primary: {
            main: BLUE,
            contrastText: WHITE,
        },
        secondary: {
            main: BLUE_LIGHT,
        },
        error: {
            main: RED,
        },
        background: {
            default: WHITE,
        },
    },
    typography: {
        button: {
            textTransform: 'none'
        }
    },
    overrides: {
        MuiTableRow: {
            root: {
                "&.MuiTableRow-hover:hover": {
                    backgroundColor: WHITE
                }
            }
        }
    }
});
