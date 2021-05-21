import * as React from 'react';
import {useStyletron} from 'baseui';
import {Grid, Cell} from 'baseui/layout-grid';
export default function Gridlayout() {
    return (
        <Outer>
            <Grid>
                <Cell>
                    <Inner>1</Inner>
                </Cell>
                <Cell>
                    <Inner>2</Inner>
                </Cell>
                <Cell>
                    <Inner>3</Inner>
                </Cell>
                <Cell>
                    <Inner>4</Inner>
                </Cell>
                <Cell>
                    <Inner>5</Inner>
                </Cell>
                <Cell>
                    <Inner>6</Inner>
                </Cell>
                <Cell>
                    <Inner>7</Inner>
                </Cell>
                <Cell>
                    <Inner>8</Inner>
                </Cell>
                <Cell>
                    <Inner>9</Inner>
                </Cell>
                <Cell>
                    <Inner>10</Inner>
                </Cell>
                <Cell>
                    <Inner>11</Inner>
                </Cell>
                <Cell>
                    <Inner>12</Inner>
                </Cell>


            </Grid>
        </Outer>
    );
}
const Outer = ({children}) => {
    const [css, theme] = useStyletron();
    return (
        <div
            className={css({
                background: theme.colors.positive,
            })}
        >
            {children}
        </div>
    );
};
const Inner = ({children}) => {
    const [css, theme] = useStyletron();
    return (
        <div
            className={css({
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: theme.colors.positive,
                // color: theme.colors.positive,
                padding: '20rem',
                color:'white',
                text:'white'
            })}
        >
            {children}
        </div>
    );
};