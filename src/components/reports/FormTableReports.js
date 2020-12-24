export default [{
        path: "barcode",
        titleTab: "Barcode/QRCode",
        tableHeaders: [{
                key: "idCard",
                label: "ID Card"
            },
            {
                key: "transactionDate",
                label: "Transaction Date"
            },
            {
                key: "customerName",
                label: "Customer Name",
                class: "columnCustomerName"
            },
            {
                key: "lineName",
                label: "Line Name"
            },
            {
                key: "contractNo",
                label: "Contract No."
            },
            {
                key: "ipAddress",
                label: "IP Address"
            }
        ],
        search: "Customer Name, ID Card, Contract No.",
        items: [],
        filter: {
            userId: null,
            startFilterDate: "",
            endFilterDate: "",
            page: 1,
            pageSize: 10
        },
        totalRowMessage: ""
    },
    {
        path: "installment",
        titleTab: "Installment Information",
        tableHeaders: [{
                key: "idCard",
                label: "ID Card"
            },
            {
                key: "transactionDate",
                label: "Transaction Date"
            },
            {
                key: "customerName",
                label: " Customer Name",
                class: "columnCustomerName"
            },
            {
                key: "lineName",
                label: "Line Name"
            },
            {
                key: "contractNo",
                label: "Contract No."
            },
            {
                key: "totalOutstandingBalance",
                label: "Total Outstanding Balance"
            },
            {
                key: "nextPaymentAmount",
                label: "Next Payment Amount"
            },
            {
                key: "nextPaymentDueDate",
                label: "Next Payment Due Date"
            },
            {
                key: "overdueAmount",
                label: "Overdue Amount"
            },
            {
                key: "overdueDueDate",
                label: "Overdue Due Date"
            },
            {
                key: "overduePeriod",
                label: "Overdue Period"
            },
            {
                key: "amount",
                label: "Amount"
            },
            {
                key: "penaltyAmt",
                label: "Penalty Amt."
            },
            {
                key: "callCharge",
                label: "Call Charge"
            },
            {
                key: "taxPaymentAmount",
                label: "Tax Payment Amount"
            },
            {
                key: "transferPaymentDueDate",
                label: "Transfer Payment Due Date"
            },
            {
                key: "riPaymentAmount",
                label: "Ri Payment Amount"
            },
            {
                key: "riPaymentDueDate",
                label: "Ri Payment DueDate"
            },
            {
                key: "transferPaymentAmount",
                label: "Transfer Payment Amount"
            },
            {
                key: "asOfDate",
                label: "As Of Date"
            },
            {
                key: "ipAddress",
                label: "IP Address"
            }
        ],
        search: "Customer Name, ID Card, Contract No.",
        items: [],
        filter: {
            userId: null,
            startFilterDate: "",
            endFilterDate: "",
            page: 1,
            pageSize: 10
        },
        totalRowMessage: ""
    },
    {
        path: "onlinePayment",
        titleTab: "Online Payment",
        tableHeaders: [{
                key: "idCard",
                label: "ID Card"
            },
            {
                key: "transactionDate",
                label: "Transaction Date"
            },
            {
                key: "customerName",
                label: " Customer Name",
                class: "columnCustomerName"
            },
            {
                key: "lineName",
                label: "Line Name"
            },
            {
                key: "contractNo",
                label: "Contract No."
            },
            {
                key: "ref1",
                label: "Ref1"
            },
            {
                key: "bankName",
                label: "Bank Name"
            },
            {
                key: "amount",
                label: "Amount"
            },
            {
                key: "transactionNo",
                label: "Transaction No."
            },
            {
                key: "ipAddress",
                label: "IP Address"
            }
        ],
        search: "Customer Name, ID Card, Contract No.",
        items: [],
        filter: {
            userId: null,
            startFilterDate: "",
            endFilterDate: "",
            page: 1,
            pageSize: 10
        },
        totalRowMessage: ""
    },
    {
        path: "register",
        titleTab: "Register Line Connect",
        tableHeaders: [{
                key: "idCard",
                label: "ID Card"
            },
            {
                key: "registerDate",
                label: "Transaction Date"
            },
            {
                key: "contractUnderId",
                label: "Contract Under ID"
            },
            {
                key: "customerName",
                label: "Customer Name",
                class: "columnCustomerName"
            },
            {
                key: "lineName",
                label: "Line Name"
            },
            {
                key: "mobileNo",
                label: "Mobile No."
            },
            {
                key: "contractDigit",
                label: "Contract No."
            },
            {
                key: "statusName",
                label: "Status"
            },
            {
                key: "ipAddress",
                label: "IP Address"
            }
        ],
        search: "Customer Name, ID Card, Contract No.",
        items: [],
        filter: {
            userId: null,
            startFilterDate: "",
            endFilterDate: "",
            page: 1,
            pageSize: 10
        },
        totalRowMessage: ""
    },
    {
        path: "unregister",
        titleTab: "Unregister",
        tableHeaders: [{
                key: "idCard",
                label: "ID Card"
            },
            {
                key: "unregisterDate",
                label: "Transaction Date"
            },
            {
                key: "contractUnderId",
                label: "Contract Under ID"
            },
            {
                key: "customerName",
                label: "Customer Name",
                class: "columnCustomerName"
            },
            {
                key: "lineName",
                label: "Line Name"
            },
            {
                key: "mobileNo",
                label: "Mobile No."
            },
            {
                key: "ipAddress",
                label: "IP Address"
            }
        ],
        search: "Customer Name",
        items: [],
        filter: {
            userId: null,
            startFilterDate: "",
            endFilterDate: "",
            page: 1,
            pageSize: 10
        },
        totalRowMessage: ""
    },
    {
        path: "otp",
        titleTab: "OTP",
        tableHeaders: [{
                key: "idCard",
                label: "ID Card"
            },
            {
                key: "transactionDate",
                label: "Transaction Date"
            },
            {
                key: "telephone",
                label: "Telephone"
            },
            {
                key: "otpCode",
                label: "OTP Code"
            },
            {
                key: "otpTypeDetail",
                label: "OTP Type Detail"
            },
            {
                key: "ipAddress",
                label: "IP Address"
            },

        ],
        search: "ID Card",
        items: [],
        filter: {
            userId: null,
            startFilterDate: "",
            endFilterDate: "",
            page: 1,
            pageSize: 10
        },
        totalRowMessage: ""
    },
    {
        path: "contractInfomation",
        titleTab: "Contract Infomation",
        tableHeaders: [{
                key: "idCard",
                label: "ID Card"
            },
            {
                key: "transactionDate",
                label: "Transaction Date"
            },
            {
                key: "customerName",
                label: "Customer Name",
                class: "columnCustomerName"
            },
            {
                key: "lineName",
                label: "Line Name"
            },
            {
                key: "contractNo",
                label: "Contract No."
            },
            {
                key: "asOfDate",
                label: "As Of Date"
            },
            {
                key: "ipAddress",
                label: "IP Address"
            },
        ],
        search: "Customer Name, ID Card, Contract No.",
        items: [],
        filter: {
            userId: null,
            startFilterDate: "",
            endFilterDate: "",
            page: 1,
            pageSize: 10
        },
        totalRowMessage: ""
    },
    {
        path: "requestContract",
        titleTab: "Request Contract",
        tableHeaders: [{
                key: "idCard",
                label: "ID Card"
            },
            {
                key: "transactionDate",
                label: "Transaction Date"
            },
            {
                key: "customerName",
                label: "Customer Name",
                class: "columnCustomerName"
            },
            {
                key: "lineName",
                label: "Line Name"
            },
            {
                key: "contractNo",
                label: "Contract No."
            },
            {
                key: "type",
                label: "Type"
            },
            {
                key: "ipAddress",
                label: "IP Address"
            },
        ],
        search: "Customer Name, ID Card, Contract No.",
        items: [],
        filter: {
            userId: null,
            startFilterDate: "",
            endFilterDate: "",
            page: 1,
            pageSize: 10
        },
        totalRowMessage: ""
    },
    {
        path: "notiInstallment",
        titleTab: "Notification Installment",
        tableHeaders: [{
                key: "identificatiotionNo",
                label: "ID Card"
            },
            {
                key: "customerName",
                label: "Customer Name",
                class: "columnCustomerName"
            },
            {
                key: "lineName",
                label: "Line Name"
            },
            {
                key: "contractNo",
                label: "Contract No."
            },
            {
                key: "mobileNo",
                label: "Mobile No."
            },
            {
                key: "amount",
                label: "Amount"
            },
            {
                key: "dueDate",
                label: "Due Date"
            },
            {
                key: "status",
                label: "Status"
            },
            {
                key: "notificationSendDate",
                label: "Notification Send Date"
            },
        ],
        search: "Customer Name, ID Card, Contract No.",
        items: [],
        filter: {
            userId: null,
            startFilterDate: "",
            endFilterDate: "",
            page: 1,
            pageSize: 10
        },
        totalRowMessage: ""
    },
    {
        path: "notiOverdue",
        titleTab: "Notification Overdue",
        tableHeaders: [{
                key: "identificatiotionNo",
                label: "ID Card"
            },
            {
                key: "customerName",
                label: " Customer Name",
                class: "columnCustomerName"
            },
            {
                key: "lineName",
                label: "Line Name"
            },
            {
                key: "contractNo",
                label: "Contract No."
            },
            {
                key: "mobileNo",
                label: "Mobile No."
            },
            {
                key: "amount",
                label: "Amount"
            },
            {
                key: "status",
                label: "Status"
            },
            {
                key: "notificationSendDate",
                label: "Notification Send Date"
            },
        ],
        search: "Customer Name, ID Card, Contract No.",
        items: [],
        filter: {
            userId: null,
            startFilterDate: "",
            endFilterDate: "",
            page: 1,
            pageSize: 10
        },
        totalRowMessage: ""
    },
    {
        path: "notiOverdue1",
        titleTab: "Notification Overdue 1",
        tableHeaders: [{
                key: "identificatiotionNo",
                label: "ID Card"
            },
            {
                key: "customerName",
                label: "Customer Name",
                class: "columnCustomerName"
            },
            {
                key: "lineName",
                label: "Line Name"
            },
            {
                key: "contractNo",
                label: "Contract No."
            },
            {
                key: "mobileNo",
                label: "Mobile No."
            },
            {
                key: "status",
                label: "Status"
            },
            {
                key: "notificationSendDate",
                label: "Notification Send Date"
            },
        ],
        search: "Customer Name, ID Card, Contract No.",
        items: [],
        filter: {
            userId: null,
            startFilterDate: "",
            endFilterDate: "",
            page: 1,
            pageSize: 10
        },
        totalRowMessage: ""
    },
    {
        path: "notiReceipt",
        titleTab: "Notification Receipt",
        tableHeaders: [{
                key: "identificatiotionNo",
                label: "ID Card"
            },
            {
                key: "customerName",
                label: "Customer Name",
                class: "columnCustomerName"
            },
            {
                key: "lineName",
                label: "Line Name"
            },
            {
                key: "contractNo",
                label: "Contract No."
            },
            {
                key: "mobileNo",
                label: "Mobile No."
            },
            {
                key: "recieptDate",
                label: "Receipt Date"
            },
            {
                key: "amount",
                label: "Amount"
            },
            {
                key: "status",
                label: "Status"
            },
            {
                key: "notificationSendDate",
                label: "Notification Send Date"
            },
        ],
        search: "Customer Name, ID Card, Contract No.",
        items: [],
        filter: {
            userId: null,
            startFilterDate: "",
            endFilterDate: "",
            page: 1,
            pageSize: 10
        },
        totalRowMessage: ""
    },
    {
        path: "notiReceiptCancel",
        titleTab: "Notification Receipt Cancel",
        tableHeaders: [{
                key: "identificatiotionNo",
                label: "ID Card"
            },
            {
                key: "customerName",
                label: " Customer Name",
                class: "columnCustomerName"
            },
            {
                key: "lineName",
                label: "Line Name"
            },
            {
                key: "contractNo",
                label: "Contract No."
            },
            {
                key: "mobileNo",
                label: "Mobile No."
            },
            {
                key: "amount",
                label: "Amount"
            },
            {
                key: "recieptCancelDate",
                label: "Receipt Cancel Date"
            },
            // {
            //     key: "status",
            //     label: "Status"
            // },
            {
                key: "notificationSendDate",
                label: "Notification Send Date"
            },
        ],
        search: "Customer Name, ID Card, Contract No.",
        items: [],
        filter: {
            userId: null,
            startFilterDate: "",
            endFilterDate: "",
            page: 1,
            pageSize: 10
        },
        totalRowMessage: ""
    },
    {
        path: "notiReturnCash",
        titleTab: "Notification Return Cash",
        tableHeaders: [{
                key: "identificatiotionNo",
                label: "ID Card"
            },
            {
                key: "customerName",
                label: " Customer Name",
                class: "columnCustomerName"
            },
            {
                key: "lineName",
                label: "Line Name"
            },
            {
                key: "contractNo",
                label: "Contract No."
            }, {
                key: "mobileNo",
                label: "Mobile No."
            },
            {
                key: "returnCashDate",
                label: "Return Cash Date"
            },
            {
                key: "amount",
                label: "Amount"
            },
            {
                key: "bankName",
                label: "Bank Name"
            },
            {
                key: "accountName",
                label: "Account Name"
            },
            // {
            //     key: "status",
            //     label: "Status"
            // },
            {
                key: "notificationSendDate",
                label: "Notification Send Date"
            },
        ],
        search: "Customer Name, ID Card, Contract No.",
        items: [],
        filter: {
            userId: null,
            startFilterDate: "",
            endFilterDate: "",
            page: 1,
            pageSize: 10
        },
        totalRowMessage: ""
    },
    {
        path: "notiRi",
        titleTab: "Notification RI",
        tableHeaders: [{
                key: "identificatiotionNo",
                label: "ID Card"
            },
            {
                key: "customerName",
                label: " Customer Name",
                class: "columnCustomerName"
            },
            {
                key: "lineName",
                label: "Line Name"
            },

            {
                key: "contractNo",
                label: "Contract No."
            }, {
                key: "mobileNo",
                label: "Mobile No."
            },
            {
                key: "dueDate",
                label: "Due Date"
            },
            {
                key: "amount",
                label: "Amount"
            },
            {
                key: "status",
                label: "Status"
            },
            {
                key: "notificationSendDate",
                label: "Notification Send Date"
            },
        ],
        search: "Customer Name, ID Card, Contract No.",
        items: [],
        filter: {
            userId: null,
            startFilterDate: "",
            endFilterDate: "",
            page: 1,
            pageSize: 10
        },
        totalRowMessage: ""
    },
    {
        path: "notiTax",
        titleTab: "Notification Tax",
        tableHeaders: [{
                key: "identificatiotionNo",
                label: "ID Card"
            },
            {
                key: "customerName",
                label: " Customer Name",
                class: "columnCustomerName"
            },
            {
                key: "lineName",
                label: "Line Name"
            },
            {
                key: "contractNo",
                label: "Contract No."
            },
            {
                key: "mobileNo",
                label: "Mobile No."
            },
            {
                key: "dueDate",
                label: "Due Date"
            },
            {
                key: "amount",
                label: "Amount"
            },
            {
                key: "status",
                label: "Status"
            },
            {
                key: "notificationSendDate",
                label: "Notification Send Date"
            },
        ],
        search: "Customer Name, ID Card, Contract No.",
        items: [],
        filter: {
            userId: null,
            startFilterDate: "",
            endFilterDate: "",
            page: 1,
            pageSize: 10
        },
        totalRowMessage: ""
    },
    {
        path: "map",
        titleTab: "Map",
        tableHeaders: [{
                key: "transactionDate",
                label: "Transaction Date"
            },
            {
                key: "idCard",
                label: " ID card",
            },
            {
                key: "lineName",
                label: "Line Name"
            },
            {
                key: "contract",
                label: "Contract"
            },
            {
                key: "aDorSKL",
                label: "AD or SKL"
            },
            {
                key: "location",
                label: "Location"
            },
            {
                key: "ipAddress",
                label: "IP address"
            },
        ],
        search: "Name, Line, ID card",
        items: [],
        filter: {
            userId: null,
            startFilterDate: "",
            endFilterDate: "",
            page: 1,
            pageSize: 10,
            AdOrSKl: [],
            searchText: "",
        },
        totalRowMessage: ""
    },
    {
        path: "checkapp",
        titleTab: "Check App",
        tableHeaders: [{
                key: "transactionDate",
                label: "Transaction Date"
            },
            {
                key: "idCard",
                label: " ID card",
            },
            {
                key: "customerName",
                label: "Customer Name"
            },
            {
                key: "lineName",
                label: "Line Name"
            },
            {
                key: "appNo",
                label: "App No."
            },
            {
                key: "statusAppName",
                label: "Status App"
            },
            {
                key: "asOfDate",
                label: "As of Date"
            },
            {
                key: "ipAddress",
                label: "IP address"
            },
        ],
        search: "Name, Line, ID card",
        items: [],
        filter: {
            userId: null,
            startFilterDate: "",
            endFilterDate: "",
            page: 1,
            pageSize: 10,
            statusApp: [],
            searchText: "",
        },
        totalRowMessage: ""
    },
    {
        path: "calculator",
        titleTab: "Calculator",
        tableHeaders: [{
                key: "transactionDate",
                label: "Transaction Date"
            },
            {
                key: "customerName",
                label: "Line Name",
            },
            {
                key: "lineName",
                label: "Contract"
            },
            {
                key: "ipAddress",
                label: "IP address"
            }
        ],
        search: "Name",
        items: [],
        filter: {
            userId: null,
            startFilterDate: "",
            endFilterDate: "",
            page: 1,
            pageSize: 10,
            searchText: "",
        },
        totalRowMessage: ""
    },
    {
        path: "notiPoint",
        titleTab: "Notification Point",
        tableHeaders: [{
                key: "IDCard",
                label: "ID Card",
                class: "w-100px text-nowrap",
            },
            {
                key: "customerName",
                label: "Customer Name",
                class: "w-100px text-nowrap",
            },
            {
                key: "lineName",
                label: "Line Name",
                class: "w-100px text-nowrap",
            },
            {
                key: "MobileNo",
                label: "Mobile No.",
                class: "w-100px text-nowrap",
            },
            {
                key: "contractNo",
                label: "Contract No.",
                class: "w-100px text-nowrap",
            },
            {
                key: "sklPoint",
                label: "Point",
                class: "w-100px text-nowrap",
            },
            {
                key: "expireDate",
                label: "Expire Date",
            },
            {
                key: "notificationSendDate",
                label: "Notification Send Date",
            },
        ],
        search: "",
        items: [],
        filter: {
            startFilterDate: "",
            endFilterDate: "",
            searchText: "",
            page: 1,
            pageSize: 10
        },
        totalRowMessage: ""
    },
]