import React from 'react'
// Icons
import HowToBookIcon from '@material-ui/icons/FormatListNumbered'
import WhatsIncludedIcon from '@material-ui/icons/Assignment'
import BookIcon from '@material-ui/icons/ExitToApp'

export const navPages = [
    {
        key: 100,
        label: 'Dashboard',
        href: '/',
        id: 'home',
        icon: HowToBookIcon
    },
    {
        key: 200,
        label: 'Sales',
        href: '/sales/',
        id: 'sales',
        icon: WhatsIncludedIcon,
        sub: [
            {
                key: 201,
                label: 'Leads',
                href: 'leads',
                id: 'leads',
                icon: WhatsIncludedIcon,
            },
            {
                key: 202,
                label: 'Quotes',
                href: 'quotes',
                id: 'quotes',
                icon: WhatsIncludedIcon,
            },
        ]
    },
    {
        key: 300,
        label: 'Contracts',
        href: '/contracts/',
        id: 'contracts',
        icon: WhatsIncludedIcon,
        sub: [
            {
                key: 301,
                label: 'Job Offers',
                href: 'operations',
                id: 'operations',
                icon: WhatsIncludedIcon,
            }
        ]

    },
    {
        key: 400,
        label: "Contacts",
        href: "/contacts/",
        id: 'contacts',
        icon: WhatsIncludedIcon
    },
    {
        key: 500,
        label: "Marketing",
        href: "/marketing",
        id: 'marketing',
        icon: WhatsIncludedIcon
    },
    {
        key: 600,
        label: "Teams",
        href: "/teams/",
        id: 'teams',
        icon: WhatsIncludedIcon,
        sub: [
            {
                key: 601,
                label: "Profiles",
                href: "profiles",
                id: 'profiles',
                icon: WhatsIncludedIcon,
            },
            {
                key: 602,
                label: "Availability",
                href: "availability",
                id: 'teamAvailability',
                icon: WhatsIncludedIcon,
            },
            {
                key: 603,
                label: "Payments",
                href: "pay",
                id: 'teamPayments',
                icon: WhatsIncludedIcon,
            },
        ]
    },
    {
        key: 700,
        label: "Services",
        href: "/services/",
        id: 'services',
        icon: WhatsIncludedIcon
    },
    {
        key: 800,
        label: "Website",
        href: "/website/",
        id: 'website',
        icon: WhatsIncludedIcon
    },
    {
        key: 1000,
        label: "Communication",
        href: "/communication/",
        id: 'communication',
        icon: WhatsIncludedIcon
    },
]

export const navActions = [
    {
        key: 1,
        href: "/",
        id: 'logout',
        label: "Log out",
        icon: BookIcon
    }
]
