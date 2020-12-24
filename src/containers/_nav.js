export default [{
    _name: 'CSidebarNav',
    _children: [
        // {
        //   _name: 'CSidebarNavItem',
        //   name: 'Welcome',
        //   to: '/',
        //   icon: 'cil-star',
        // },
        {
            _name: 'CSidebarNavItem',
            name: 'Product',
            to: '/',
            icon: 'cil-user',
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Payment Channel',
            to: '/paymentchannel',
            icon: 'cib-cc-mastercard',
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Bank',
            to: '/bank',
            icon: 'cil-bank',
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Line Message Management',
            to: '/linemessage',
            icon: 'cil-chat-bubble',
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Document',
            to: '/document',
            icon: 'cil-file',
        },
        {
            _name: 'CSidebarNavDropdown',
            name: 'Feedback',
            route: '/Feedback',
            icon: 'cil-list',
            items: [{
                    _name: 'CSidebarNavItem',
                    name: 'Feedback List',
                    to: '/feedback',
                    icon: 'cil-comment-bubble'
                },
                {
                    _name: 'CSidebarNavItem',
                    name: 'Edit Question/Answer',
                    to: '/feedback/editfeedbackquestion',
                    icon: 'cil-comment-bubble'
                }
            ]
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Notification Settings',
            to: '/notification/settings',
            icon: 'cil-list'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Notification Point',
            to: '/notification/point',
            icon: 'cil-bell'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Promotion',
            to: '/promotion',
            icon: 'cil-bullhorn'
        },
        {
            _name: 'CSidebarNavDropdown',
            name: 'Report',
            route: '/report',
            icon: 'cil-list',
            items: [{
                    _name: 'CSidebarNavItem',
                    name: 'Barcode/QRCode',
                    to: '/report/barcode',
                    icon: 'cil-file'
                },
                {
                    name: 'Installment Information',
                    to: '/report/installment',
                    icon: 'cil-file'
                },
                {
                    name: 'Online Payment',
                    to: '/report/onlinePayment',
                    icon: 'cil-file'
                },
                {
                    name: 'Register Line Connect',
                    to: '/report/register',
                    icon: 'cil-file'
                },
                {
                    name: 'Map',
                    to: '/report/map',
                    icon: 'cil-file'
                },
                {
                    name: 'Check App',
                    to: '/report/checkapp',
                    icon: 'cil-file'
                },
                {
                    name: 'Calculator',
                    to: '/report/calculator',
                    icon: 'cil-file'
                },
                {
                    name: 'Unregister',
                    to: '/report/unregister',
                    icon: 'cil-file'
                },
                {
                    name: 'OTP',
                    to: '/report/otp',
                    icon: 'cil-file'
                },
                {
                    name: 'Contract Infomation',
                    to: '/report/contractInfomation',
                    icon: 'cil-file'
                },
                {
                    name: 'Request Contract',
                    to: '/report/requestContract',
                    icon: 'cil-file'
                },
                //--------------------------------------
                {
                    name: 'Notification Installment',
                    to: '/report/notiInstallment',
                    icon: 'cil-file'
                },
                {
                    name: 'Notification Overdue',
                    to: '/report/notiOverdue',
                    icon: 'cil-file'
                },
                {
                    name: 'Notification Overdue 1',
                    to: '/report/notiOverdue1',
                    icon: 'cil-file'
                },
                {
                    name: 'Notification Receipt',
                    to: '/report/notiReceipt',
                    icon: 'cil-file'
                },
                {
                    name: 'Notification Receipt Cancel',
                    to: '/report/notiReceiptCancel',
                    icon: 'cil-file'
                },
                {
                    name: 'Notification Return Cash',
                    to: '/report/notiReturnCash',
                    icon: 'cil-file'
                },
                {
                    name: 'Notification RI',
                    to: '/report/notiRi',
                    icon: 'cil-file'
                },
                {
                    name: 'Notification Tax',
                    to: '/report/notiTax',
                    icon: 'cil-file'
                },
            ]
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Admin',
            to: '/admin',
            icon: 'cil-star',
        },
        // {
        //   _name: 'CSidebarNavDivider',
        //   _class: 'm-2'
        // },
        // {
        //   _name: 'CSidebarNavTitle',
        //   _children: ['Examples Navbar']
        // },
        // {
        //   _name: 'CSidebarNavDropdown',
        //   name: 'Icons',
        //   route: '/icons',
        //   icon: 'cil-star',
        //   items: [
        //     {
        //       name: 'CoreUI Icons',
        //       to: '/icons/coreui-icons',
        //       icon: 'cil-star',
        //       badge: {
        //         color: 'info',
        //         text: 'NEW'
        //       }
        //     },
        //     {
        //       name: 'Brands',
        //       to: '/icons/brands',
        //       icon: 'cil-star'
        //     },
        //     {
        //       name: 'Flags',
        //       to: '/icons/flags',
        //       icon: 'cil-star'
        //     }
        //   ]
        // },
        // {
        //   _name: 'CSidebarNavItem',
        //   name: 'Widgets',
        //   to: '/widgets',
        //   icon: 'cil-calculator',
        //   badge: {
        //     color: 'primary',
        //     text: 'NEW',
        //     shape: 'pill'
        //   }
        // },
        // {
        //   _name: 'CSidebarNavItem',
        //   name: 'Download CoreUI',
        //   href: 'http://coreui.io/vue/',
        //   icon: { name: 'cil-cloud-download', class: 'text-white' },
        //   _class: 'bg-success text-white',
        //   target: '_blank'
        // },
    ]
}]