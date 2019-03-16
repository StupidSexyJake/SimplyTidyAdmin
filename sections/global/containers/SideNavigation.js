import React, { useContext } from 'react'
// Next.js
import { withRouter } from 'next/router'
// State
import { Store } from '../../../state/store'
// Actions
import { handleClick } from '../../../state/actions'
// Data
import {
    navPages,
    navActions
} from '../../../data/navigationData'
// Layouts
import SideNavigation, { ActiveLink } from '../layouts/SideNavigation'

// Navigation links
function ActiveLinkContainer({ router, href, link }) {
    // Get state contexts
    const { state, dispatch } = useContext(Store)
    // Check if active page
    const isActivePage = (useHref) => router.pathname === useHref
    // Check if parent link has sub (child) links
    const hasSubs = link.sub
    // Set navigation state on mount to ensure sub link items are not collapsed on page load
    React.useEffect(() => {
        if (!state.navigation.hasOwnProperty(link.id) && router.pathname.startsWith(href)) {
            dispatch(handleClick('navigation', link.id, true))
        }
    })
    return (
        <ActiveLink
            link={link}
            href={href}
            hasSubs={hasSubs}
            onClickParent={() => hasSubs && dispatch(handleClick('navigation', link.id, !state.navigation[link.id]))}
            linkState={state.navigation[link.id]}
            isActivePage={isActivePage}
        />
    )
}
export const NavLink = withRouter(ActiveLinkContainer)


export default function SideNavigationContainer(props) {
    return (
        <SideNavigation
            drawerWidth={props.drawerWidth}
            navPages={navPages}
            navActions={navActions}
            navLink={NavLink}
        />
    )
}