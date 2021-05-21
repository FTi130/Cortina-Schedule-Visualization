import * as React from 'react';
import {
    HeaderNavigation,
    ALIGN,
    StyledNavigationItem as NavigationItem,
    StyledNavigationList as NavigationList,
} from 'baseui/header-navigation';
import {StyledLink as Link} from 'baseui/link';
import {Button} from 'baseui/button';
import {colors} from "baseui/tokens";
export default function Header() {
    return (
        <HeaderNavigation>
            <NavigationList $align={ALIGN.left}>
                <NavigationItem>Uber</NavigationItem>
            </NavigationList>
            <NavigationList $align={ALIGN.center} />
            <NavigationList $align={ALIGN.right}>
                <NavigationItem>
                    <Link href="https://ya.ru/">Tab Link One</Link>
                </NavigationItem>
                <NavigationItem>

                    <Link href="https://google.com/">Tab Link Two</Link>
                </NavigationItem>
            </NavigationList>
            <NavigationList $align={ALIGN.right}>
                <NavigationItem>
                    <Button>Get started</Button>
                </NavigationItem>
            </NavigationList>
            <div>
                <p style={colors}>Hello world</p>
            </div>
        </HeaderNavigation>
    );
}