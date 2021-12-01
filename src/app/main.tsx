import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {App} from "./App";
import {CssBaseline} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core/styles";
import {theme} from "./ui/theme";
import {Provider} from "react-redux";
import {store} from "../core/store";

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Provider store={store}>
            <App/>
        </Provider>
    </ThemeProvider>,
    document.getElementById('root')
)
