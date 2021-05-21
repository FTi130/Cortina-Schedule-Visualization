import * as React from 'react';
import {Button} from 'baseui/button';
export default function ButtonExit() {
    return (
        <React.Fragment>
            <Button $as="a" href="https://styletron.org" target="_blank">
                Back
            </Button>
        </React.Fragment>
    );
}