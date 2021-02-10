import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () =>
    import('@/containers/TheContainer')

// Views
// const Welcome = () => import('@/views/pages/Welcome')
const ProductIndex = () =>
    import('@/views/pages/product/Index')
const QuestionIndex = () =>
    import('@/views/pages/question/Index')
const BannerIndex = () =>
    import('@/views/pages/banner/Index')
const BannerDetails = () =>
    import('@/views/pages/banner/Details')
const NewsIndex = () =>
    import('@/views/pages/news/Index')
const NewsDetails = () =>
    import('@/views/pages/news/Details')
const PromotionIndex = () =>
    import('@/views/pages/promotion/Index')
const PromotionDetails = () =>
    import('@/views/pages/promotion/Details')
const OrderIndex = () =>
    import('@/views/pages/order/Index')
const OrderDetails = () =>
    import('@/views/pages/order/Details')
const OrderVerifyList = () =>
    import('@/views/pages/order/VerifyList')
const OrderVerifyDetails = () =>
    import('@/views/pages/order/VerifyDetails')
const AboutUs = () =>
    import('@/views/pages/aboutus/Index')
const TermAndCondition = () =>
    import('@/views/pages/termandcondition/Index')
const Privacypolicy = () =>
    import('@/views/pages/privacypolicy/Index')
const FaqIndex = () =>
    import('@/views/pages/faq/Index')
const FaqDetails = () =>
    import('@/views/pages/faq/Details')
const FaqQuestionDetails = () =>
    import('@/views/pages/faq/QuestionDetails')
const CategoryIndex = () =>
    import('@/views/pages/category/Index')
const SellerIndex = () =>
    import('@/views/pages/seller/Index')
const SellerDetails = () =>
    import('@/views/pages/seller/Details')
const SellerProfileDetails = () =>
    import('@/views/pages/seller/SellerDetails')
const ReviewIndex = () =>
    import('@/views/pages/review/Index')
const ReviewDetails = () =>
    import('@/views/pages/review/Details')
const ReviewsDetails = () =>
    import('@/views/pages/review/ReviewDetails')
const BestDealIndex = () =>
    import('@/views/pages/bestdeal/Index')
const PartnerIndex = () =>
    import('@/views/pages/partner/Index')
const WithdrawIndex = () =>
    import('@/views/pages/withdraw/Index')
const WithdrawDetails = () =>
    import('@/views/pages/withdraw/Details')
const SettingsIndex = () =>
    import('@/views/pages/settings/Index')
const Cod = () =>
    import('@/views/pages/settings/Cod')
const Tier = () =>
    import('@/views/pages/settings/Tier')
const AdminIndex = () =>
    import('@/views/pages/admin/Index')
const AdminDetails = () =>
    import('@/views/pages/admin/Details')
const FinanceIndex = () =>
    import('@/views/pages/finance/Index')
const FinanceDetails = () =>
    import('@/views/pages/finance/Details')
const Logo = () =>
    import('@/views/pages/logo/Index')
const CampaignIndex = () =>
    import('@/views/pages/campaign/Index')
const CampaignDetails = () =>
    import('@/views/pages/campaign/Details')
const CampaignVerify = () =>
    import('@/views/pages/campaign/Verify')
const CampaignPartnerList = () =>
    import('@/views/pages/campaign/PartnerList')
const CampaignProductList = () =>
    import('@/views/pages/campaign/ProductList')
const ReturnIndex = () =>
    import('@/views/pages/return/Index')
const ReturnDetails = () =>
    import('@/views/pages/return/Details')
const RewardIndex = () =>
    import('@/views/pages/rewards/Index')
const RewardDetails = () =>
    import('@/views/pages/rewards/Details')
const AffiliateIndex = () =>
    import('@/views/pages/affiliate/Index')
const AffiliateDetails = () =>
    import('@/views/pages/affiliate/Details')
const AffiliateBankAccountDetails = () =>
    import('@/views/pages/affiliate/BankAccountDetails')
const AffiliateLog = () =>
    import('@/views/pages/affiliate/Log')
const AdsIndex = () =>
    import('@/views/pages/ads/Index')
const AdsDetails = () =>
    import('@/views/pages/ads/Details')
const AcademyIndex = () =>
    import('@/views/pages/academy/Index')
const AcademyDetails = () =>
    import('@/views/pages/academy/Details')
const AcademyStaticPage1 = () =>
    import('@/views/pages/academy/staticpage/StaticPage1')
const AcademyStaticPage2 = () =>
    import('@/views/pages/academy/staticpage/StaticPage2')
const AcademyStaticPage3 = () =>
    import('@/views/pages/academy/staticpage/StaticPage3')
const AcademyStaticPage4 = () =>
    import('@/views/pages/academy/staticpage/StaticPage4')
const RegisterIndex = () =>
    import('@/views/pages/register/Index')
const TermAndConPartner = () =>
    import('@/views/pages/termandcondition/Partner')
const PrivacyPolicyPartner = () =>
    import('@/views/pages/privacypolicy/Partner')
const CategoryList = () =>
    import('@/views/pages/category/List')
const ResendOrderIndex = () => import("@/views/pages/resendorder/Index");
const ResendOrderDetails = () => import("@/views/pages/resendorder/Details");
const Dashboard = () => import("@/views/pages/dashboard/Index");
const RevenueProduct = () => import("@/views/pages/dashboard/RevenueProduct");
const DashboardTable = () => import("@/views/pages/dashboard/TableList");

const Page404 = () =>
    import('@/views/pages/Page404')
const Page500 = () =>
    import('@/views/pages/Page500')
const Login = () =>
    import('@/views/pages/Login')

Vue.use(Router)

export default new Router({
    mode: 'history',
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [{
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresIsLogin: true }
    },
    {
        path: '/',
        redirect: '/dashboard/productoverview',
        name: 'หน้าแรก',
        component: TheContainer,
        meta: { requiresAuth: true },
        children: [
            // {
            //   path: '/',
            //   name: 'Welcome',
            //   component: Welcome,
            //   meta: { requiresAuth: true },
            // },
            {
                path: "/dashboard/productoverview",
                name: "ภาพรวมสินค้า",
                component: Dashboard,
                meta: { requiresAuth: true }
            },
            {
                path: "/dashboard/revenueproduct",
                name: "รายได้สินค้าทั้งหมด",
                component: RevenueProduct,
                meta: { requiresAuth: true }
            },
            {
                path: "/dashboard/performance",
                name: "ภาพรวมของเว็บ",
                component: DashboardTable,
                meta: { requiresAuth: true }
            },
            {
                path: "/dashboard/campaign",
                name: "แคมเปญ",
                component: DashboardTable,
                meta: { requiresAuth: true }
            },
            {
                path: "/dashboard/productperformance",
                name: "ภาพรวมของสินค้าทั้งหมด",
                component: DashboardTable,
                meta: { requiresAuth: true }
            },
            {
                path: '/product',
                name: 'รายการสินค้าในระบบ',
                component: ProductIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/question',
                name: 'Question',
                component: QuestionIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/banner',
                name: 'แบนเนอร์',
                component: BannerIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/banner/details/:id',
                name: 'รายละเอียดแบนเนอร์',
                component: BannerDetails,
                meta: { requiresAuth: true }
            },
            {
                path: '/news',
                name: 'ข่าวสาร',
                component: NewsIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/news/details/:id',
                name: 'รายละเอียดข่าวสาร',
                component: NewsDetails,
                meta: { requiresAuth: true }
            },
            {
                path: '/promotion',
                name: 'โปรโมชั่น',
                component: PromotionIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/promotion/details/:id',
                name: 'รายละเอียดโปรโมชั่น',
                component: PromotionDetails,
                meta: { requiresAuth: true }
            },
            {
                path: '/order',
                name: 'รายการคำสั่งซื้อ',
                component: OrderIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/order/details/:id',
                name: 'รายละเอียดรายการคำสั่งซื้อ',
                component: OrderDetails,
                meta: { requiresAuth: true }
            },
            {
                path: "/resendorder",
                name: "รีเซนออเดอร์",
                component: ResendOrderIndex,
                meta: { requiresAuth: true }
            },
            {
                path: "/resendorder/details/:id",
                name: "รีเซนออเดอร์",
                component: ResendOrderDetails,
                meta: { requiresAuth: true }
            },
            {
                path: '/order/verify/list',
                name: 'รายการรอการตรวจสอบ',
                component: OrderVerifyList,
                meta: { requiresAuth: true },
            },
            {
                path: '/order/verify/details/:id',
                name: 'รายละเอียดรายการรอการตรวจสอบ',
                component: OrderVerifyDetails,
                meta: { requiresAuth: true }
            },
            {
                path: '/our-story',
                name: 'เกี่ยวกับเรา',
                component: AboutUs,
                meta: { requiresAuth: true },
            },
            {
                path: '/term-and-condition',
                name: 'ข้อตกลงและเงื่อนไขการใช้งาน',
                component: TermAndCondition,
                meta: { requiresAuth: true },
            },
            {
                path: '/privacy-policy',
                name: 'นโยบายความเป็นส่วนตัว',
                component: Privacypolicy,
                meta: { requiresAuth: true },
            },
            {
                path: '/faq',
                name: 'จัดการคำถามที่พบบ่อย',
                component: FaqIndex,
                meta: { requiresAuth: true }
            },
            {
                path: '/faq/details/:id',
                name: 'จัดการคำถามที่พบบ่อย',
                component: FaqDetails,
                meta: { requiresAuth: true }
            },
            {
                path: '/faq/details/question/:id',
                name: 'จัดการคำถามที่พบบ่อย',
                component: FaqQuestionDetails,
                meta: { requiresAuth: true }
            },
            {
                path: '/faq/partner',
                name: 'จัดการคำถามที่พบบ่อยพาร์ทเนอร์',
                component: FaqIndex,
                meta: { requiresAuth: true }
            },
            {
                path: '/faq/partner/details/:id',
                name: 'จัดการคำถามที่พบบ่อย',
                component: FaqDetails,
                meta: { requiresAuth: true }
            },
            {
                path: '/faq/partner/details/question/:id',
                name: 'จัดการคำถามที่พบบ่อย',
                component: FaqQuestionDetails,
                meta: { requiresAuth: true }
            },
            {
                path: '/category',
                name: 'จัดการหมวดหมู่',
                component: CategoryIndex,
                meta: { requiresAuth: true }
            },
            {
                path: '/seller',
                name: 'รายการพาร์ทเนอร์',
                component: SellerIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/seller/details/:id',
                name: 'รายละเอียดผู้ขาย',
                component: SellerDetails,
                meta: { requiresAuth: true }
            },
            {
                path: '/seller/details/profile/:id',
                name: 'รายละเอียดผู้ขาย',
                component: SellerProfileDetails,
                meta: { requiresAuth: true }
            },
            {
                path: '/review',
                name: 'รายการรีวิว',
                component: ReviewIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/review/details/:id',
                name: 'รายละเอียดรีวิว',
                component: ReviewDetails,
                meta: { requiresAuth: true }
            },
            {
                path: '/review/details/reviews/:id',
                name: 'รายละเอียดรายการรีวิว',
                component: ReviewsDetails,
                meta: { requiresAuth: true }
            },
            {
                path: '/bestdeal',
                name: 'รายการดีล',
                component: BestDealIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/partner',
                name: 'รายการพาร์ทเนอร์ของเรา',
                component: PartnerIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/withdraw',
                name: 'คำขอถอนเงิน',
                component: WithdrawIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/withdraw/details/:id',
                name: 'รายละเอียดคำขอถอนเงิน',
                component: WithdrawDetails,
                meta: { requiresAuth: true }
            },
            {
                path: '/settings',
                name: 'ตั้งค่าระบบ',
                component: SettingsIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/settings/cod',
                name: 'ตั้งค่าระบบการจัดส่ง',
                component: Cod,
                meta: { requiresAuth: true },
            },
            {
                path: '/settings/tier',
                name: 'ตั้งค่าระบบจัดการบัญชี',
                component: Tier,
                meta: { requiresAuth: true },
            },
            {
                path: '/admin',
                name: 'รายการผู้ดูแลระบบ',
                component: AdminIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/admin/details/:id',
                name: 'รายละเอียดผู้ดูแลระบบ',
                component: AdminDetails,
                meta: { requiresAuth: true }
            },
            {
                path: '/finance',
                name: 'รายการเกี่ยวกับการเงินพาร์ทเนอร์',
                component: FinanceIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/finance/details/:id',
                name: 'รายละเอียดรายการเกี่ยวกับการเงิน',
                component: FinanceDetails,
                meta: { requiresAuth: true }
            },
            {
                path: '/logo',
                name: 'จัดการโลโก้',
                component: Logo,
                meta: { requiresAuth: true },
            },
            {
                path: '/campaign',
                name: 'รายการแคมเปญ',
                component: CampaignIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/campaign/details/:id',
                name: 'รายละเอียดแคมเปญ',
                component: CampaignDetails,
                meta: { requiresAuth: true }
            },
            {
                path: '/campaign/verify',
                name: 'รายการรอการตรวจสอบแคมเปญ',
                component: CampaignVerify,
                meta: { requiresAuth: true }
            },
            {
                path: '/campaign/verify/partnerlist/:id',
                name: 'รายชื่อพาร์ทเนอร์',
                component: CampaignPartnerList,
                meta: { requiresAuth: true }
            },
            {
                path: '/campaign/verify/productlist/:campid/:sellerid',
                name: 'รายการสินค้าของพาร์ทเนอร์',
                component: CampaignProductList,
                meta: { requiresAuth: true }
            },
            {
                path: '/return',
                name: 'รายการคืนสินค้า',
                component: ReturnIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/return/details/:id',
                name: 'รายละเอียดการคืนสินค้า',
                component: ReturnDetails,
                meta: { requiresAuth: true }
            },
            {
                path: '/voucher',
                name: 'รายการวอชเชอร์',
                component: RewardIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/voucher/details/:id',
                name: 'รายละเอียดวอชเชอร์',
                component: RewardDetails,
                meta: { requiresAuth: true }
            },
            {
                path: '/affiliate',
                name: 'รายการตัวแทน',
                component: AffiliateIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/affiliate/details/:id',
                name: 'รายละเอียดตัวแทน',
                component: AffiliateDetails,
                meta: { requiresAuth: true }
            },
            {
                path: '/affiliate/bankaccount/details/:id',
                name: 'รายละเอียดบัญชี',
                component: AffiliateBankAccountDetails,
                meta: { requiresAuth: true }
            },
            {
                path: '/affiliate/log/:id',
                name: 'ประวัติ',
                component: AffiliateLog,
                meta: { requiresAuth: true }
            },
            {
                path: '/ads',
                name: 'รายการโฆษณา',
                component: AdsIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/ads/details/:id',
                name: 'รายละเอียดโฆษณา',
                component: AdsDetails,
                meta: { requiresAuth: true }
            },
            {
                path: '/academy',
                name: 'รายการ Academy',
                component: AcademyIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/academy/details/:id',
                name: 'รายละเอียด Academy',
                component: AcademyDetails,
                meta: { requiresAuth: true }
            },
            {
                path: '/academy/details/:id',
                name: 'รายละเอียด Academy',
                component: AcademyDetails,
                meta: { requiresAuth: true }
            },
            {
                path: '/academy/Academy-01',
                name: 'จัดการ Academy',
                component: AcademyStaticPage1,
                meta: { requiresAuth: true }
            },
            {
                path: '/academy/Academy-02',
                name: 'จัดการ Academy',
                component: AcademyStaticPage2,
                meta: { requiresAuth: true }
            },
            {
                path: '/academy/Academy-03',
                name: 'จัดการ Academy',
                component: AcademyStaticPage3,
                meta: { requiresAuth: true }
            },
            {
                path: '/academy/Academy-04',
                name: 'จัดการ Academy',
                component: AcademyStaticPage4,
                meta: { requiresAuth: true }
            },
            {
                path: '/register',
                name: 'วิธีการสมัคร',
                component: RegisterIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/term-and-condition-partner',
                name: 'ข้อกำหนดการใช้งานของพาร์ทเนอร์',
                component: TermAndConPartner,
                meta: { requiresAuth: true },
            },
            {
                path: '/category/imagelist',
                name: 'จัดการรูปหมวดหมู่',
                component: CategoryList,
                meta: { requiresAuth: true }
            },
            {
                path: '/privacy-policy-partner',
                name: 'นโยบายความเป็นส่วนตัวของพาร์ทเนอร์',
                component: PrivacyPolicyPartner,
                meta: { requiresAuth: true },
            },
            // {
            //   path: '/',
            //   redirect: '/',
            //   name: 'Theme',
            //   component: {
            //     render(c) { return c('router-view') }
            //   },
            //   children: [
            //     {
            //       path: '/',
            //       name: 'Home',
            //       component: Home
            //     },
            //   ]
            // },
            //{ path: '*', redirect: '/'},
            {
                path: '404',
                name: 'Page404',
                component: Page404
            },
            {
                path: '500',
                name: 'Page500',
                component: Page500
            },
        ]
    },
    ]
})

// function configRoutes() {
//     return [{
//             path: '/login',
//             name: 'Login',
//             component: Login,
//             meta: { requiresIsLogin: true }
//         },
//         {
//             path: '/',
//             redirect: '/product',
//             name: 'หน้าแรก',
//             component: TheContainer,
//             meta: { requiresAuth: true },
//             children: [
//                 // {
//                 //   path: '/',
//                 //   name: 'Welcome',
//                 //   component: Welcome,
//                 //   meta: { requiresAuth: true },
//                 // },
//                 {
//                     path: '/product',
//                     name: 'รายการสินค้าในระบบ',
//                     component: ProductIndex,
//                     meta: { requiresAuth: true },
//                 },
//                 {
//                     path: '/question',
//                     name: 'Question',
//                     component: QuestionIndex,
//                     meta: { requiresAuth: true },
//                 },
//                 {
//                     path: '/banner',
//                     name: 'แบนเนอร์',
//                     component: BannerIndex,
//                     meta: { requiresAuth: true },
//                 },
//                 {
//                     path: '/banner/details/:id',
//                     name: 'รายละเอียดแบนเนอร์',
//                     component: BannerDetails,
//                     meta: { requiresAuth: true }
//                 },
//                 {
//                     path: '/news',
//                     name: 'ข่าวสาร',
//                     component: NewsIndex,
//                     meta: { requiresAuth: true },
//                 },
//                 {
//                     path: '/news/details/:id',
//                     name: 'รายละเอียดข่าวสาร',
//                     component: NewsDetails,
//                     meta: { requiresAuth: true }
//                 },
//                 {
//                     path: '/promotion',
//                     name: 'โปรโมชั่น',
//                     component: PromotionIndex,
//                     meta: { requiresAuth: true },
//                 },
//                 {
//                     path: '/promotion/details/:id',
//                     name: 'รายละเอียดโปรโมชั่น',
//                     component: PromotionDetails,
//                     meta: { requiresAuth: true }
//                 },
//                 {
//                     path: '/order',
//                     name: 'รายการคำสั่งซื้อ',
//                     component: OrderIndex,
//                     meta: { requiresAuth: true },
//                 },
//                 {
//                     path: '/order/details/:id',
//                     name: 'รายละเอียดรายการคำสั่งซื้อ',
//                     component: OrderDetails,
//                     meta: { requiresAuth: true }
//                 },
//                 {
//                     path: '/aboutus',
//                     name: 'เกี่ยวกับเรา',
//                     component: AboutUs,
//                     meta: { requiresAuth: true },
//                 },
//                 {
//                     path: '/termandcondition',
//                     name: 'ข้อตกลงและเงื่อนไขการใช้งาน',
//                     component: TermAndCondition,
//                     meta: { requiresAuth: true },
//                 },
//                 {
//                     path: '/privacypolicy',
//                     name: 'นโยบายความเป็นส่วนตัว',
//                     component: Privacypolicy,
//                     meta: { requiresAuth: true },
//                 },
//                 {
//                     path: '/faq',
//                     name: 'จัดการคำถามที่พบบ่อย',
//                     component: FaqIndex,
//                     meta: { requiresAuth: true }
//                 },
//                 {
//                     path: '/faq/details/:id',
//                     name: 'จัดการคำถามที่พบบ่อย',
//                     component: FaqDetails,
//                     meta: { requiresAuth: true }
//                 },
//                 {
//                     path: '/faq/details/question/:id',
//                     name: 'จัดการคำถามที่พบบ่อย',
//                     component: FaqQuestionDetails,
//                     meta: { requiresAuth: true }
//                 },
//                 {
//                     path: '/category',
//                     name: 'จัดการหมวดหมู่',
//                     component: CategoryIndex,
//                     meta: { requiresAuth: true }
//                 },
//                 {
//                     path: '/seller',
//                     name: 'รายการผู้ขาย',
//                     component: SellerIndex,
//                     meta: { requiresAuth: true },
//                 },
//                 {
//                     path: '/seller/details/:id',
//                     name: 'รายละเอียดผู้ขาย',
//                     component: SellerDetails,
//                     meta: { requiresAuth: true }
//                 },
//                 {
//                     path: '/seller/details/profile/:id',
//                     name: 'รายละเอียดผู้ขาย',
//                     component: SellerProfileDetails,
//                     meta: { requiresAuth: true }
//                 },
//                 {
//                     path: '/review',
//                     name: 'รายการรีวิว',
//                     component: ReviewIndex,
//                     meta: { requiresAuth: true },
//                 },
//                 {
//                     path: '/bestdeal',
//                     name: 'รายการดีล',
//                     component: BestDealIndex,
//                     meta: { requiresAuth: true },
//                 },
//                 {
//                     path: '/partner',
//                     name: 'รายการพาทเนอร์',
//                     component: PartnerIndex,
//                     meta: { requiresAuth: true },
//                 },
//                 {
//                     path: '/withdraw',
//                     name: 'คำขอถอนเงิน',
//                     component: WithdrawIndex,
//                     meta: { requiresAuth: true },
//                 },
//                 {
//                     path: '/withdraw/details/:id',
//                     name: 'รายละเอียดคำขอถอนเงิน',
//                     component: WithdrawDetails,
//                     meta: { requiresAuth: true }
//                 },
//                 // {
//                 //   path: '/',
//                 //   redirect: '/',
//                 //   name: 'Theme',
//                 //   component: {
//                 //     render(c) { return c('router-view') }
//                 //   },
//                 //   children: [
//                 //     {
//                 //       path: '/',
//                 //       name: 'Home',
//                 //       component: Home
//                 //     },
//                 //   ]
//                 // },
//                 {
//                     path: '404',
//                     name: 'Page404',
//                     component: Page404
//                 },
//                 {
//                     path: '500',
//                     name: 'Page500',
//                     component: Page500
//                 },
//                 {
//                     path: '*',
//                     name: 'Page-404',
//                     component: Page404
//                 },
//             ]
//         },
//     ]
// }