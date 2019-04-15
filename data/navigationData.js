// Icons
import HowToBookIcon from '@material-ui/icons/FormatListNumbered'
import WhatsIncludedIcon from '@material-ui/icons/Assignment'
import SettingsIcon from '@material-ui/icons/Settings'
import EmailIcon from '@material-ui/icons/Email'

const domain = '/admin'

export const navPages = [
    {
        key: 100,
        label: 'Dashboard',
        href: `${domain}/`,
        id: 'home',
        icon: HowToBookIcon
    },
    // {
    //     key: 200,
    //     label: 'Services',
    //     href: '/services/',
    //     id: 'services',
    //     icon: WhatsIncludedIcon,
    //     sub: [
    //         {
    //             key: 201,
    //             label: 'Profiles',
    //             href: 'services',
    //             id: 'profiles',
    //             icon: WhatsIncludedIcon,
    //         },
    //         {
    //             key: 202,
    //             label: 'Availability',
    //             href: 'availability',
    //             id: 'teamAvailability',
    //             icon: WhatsIncludedIcon,
    //         },
    //     ]
    // },
    {
        key: 300,
        label: 'Teams',
        href: `${domain}/teams/`,
        id: 'teams',
        icon: WhatsIncludedIcon,
        sub: [
            {
                key: 301,
                label: 'Profiles',
                href: 'profiles',
                id: 'profiles',
                icon: WhatsIncludedIcon,
            },
            // {
            //     key: 302,
            //     label: 'Availability',
            //     href: 'availability',
            //     id: 'teamAvailability',
            //     icon: WhatsIncludedIcon,
            // },
        ]
    },
]

export const navActions = [
    {
        key: 100,
        href: `${domain}/settings/`,
        id: 'settings',
        label: 'Settings',
        icon: SettingsIcon,
        sub: [
            {
                key: 101,
                label: 'Email',
                href: 'email',
                id: 'email',
                icon: EmailIcon,
            },
        ]
    }
]
