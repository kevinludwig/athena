import React from 'react';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {blue, pink} from '@material-ui/core/colors/';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: pink
    }
});
export default (props) => {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
}
