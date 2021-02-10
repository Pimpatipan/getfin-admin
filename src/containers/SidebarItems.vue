<script>
export default {
  name: "nav",
  data() {
    return {
      sidebar: {
        _name: "CSidebarNav",
        _children: [
          {
            id: 1,
            _name: "CSidebarNavDropdown",
            name: `ภาพรวม`,
            icon: "cil-bar-chart",
            items: [
              {
                _name: "CSidebarNavItem",
                name: `ภาพรวมสินค้า`,
                to: "/dashboard/productoverview",
                icon: "cil-bar-chart",
              },
              {
                _name: "CSidebarNavItem",
                name: `รายได้สินค้าทั้งหมด`,
                to: "/dashboard/revenueproduct",
                icon: "cil-bar-chart",
              },
              {
                _name: "CSidebarNavItem",
                name: `ภาพรวมของเว็บ`,
                to: "/dashboard/performance",
                icon: "cil-bar-chart",
              },
              {
                _name: "CSidebarNavItem",
                name: `แคมเปญ`,
                to: "/dashboard/campaign",
                icon: "cil-bar-chart",
              },
              {
                _name: "CSidebarNavItem",
                name: `ภาพรวมของสินค้าทั้งหมด`,
                to: "/dashboard/productperformance",
                icon: "cil-bar-chart",
              },
            ],
          },
          {
            id: 2,
            _name: "CSidebarNavDropdown",
            name: "เกี่ยวกับเว็บไซต์",
            icon: "cil-window-maximize",
            _children: [
              {
                id: 1,
                _name: "CSidebarNavItem",
                name: "จัดการแบนเนอร์",
                to: "/banner",
                icon: "cil-image",
              },
              {
                _name: "CSidebarNavItem",
                name: "จัดการโลโก้",
                to: "/logo",
                icon: "cil-image",
              },
              {
                id: 1,
                _name: "CSidebarNavItem",
                name: "เกี่ยวกับเรา",
                to: "/our-story",
                icon: "cil-list",
              },
              {
                _name: "CSidebarNavItem",
                name: "รายการโฆษณา",
                to: "/ads",
                icon: "cil-image",
              },
              {
                _name: "CSidebarNavItem",
                name: "รายการรีวิว",
                to: "/review",
                icon: "cil-comment-bubble",
              },
              {
                id: 1,
                _name: "CSidebarNavItem",
                name: "รายการข่าวสาร/บทความที่น่าสนใจ",
                to: "/news",
                icon: "cil-newspaper",
              },
              {
                id: 1,
                _name: "CSidebarNavItem",
                name: "ข้อตกลงและเงื่อนไขการใช้งาน",
                to: "/term-and-condition",
                icon: "cil-file",
              },

              {
                id: 1,
                _name: "CSidebarNavItem",
                name: "นโยบายความเป็นส่วนตัว",
                to: "/privacy-policy",
                icon: "cil-file",
              },
              {
                id: 2,
                _name: "CSidebarNavDropdown",
                name: "เกี่ยวกับพาร์ทเนอร์",
                icon: "cil-user",
                items: [
                  {
                    id: 1,
                    _name: "CSidebarNavItem",
                    name: "วิธีการสมัคร",
                    to: "/register",
                    icon: "cil-file",
                  },
                  {
                    id: 1,
                    _name: "CSidebarNavItem",
                    name: "ข้อกำหนดการใช้งานพาร์ทเนอร์",
                    to: "/term-and-condition-partner",
                    icon: "cil-file",
                  },
                  {
                    id: 1,
                    _name: "CSidebarNavItem",
                    name: "นโยบายความเป็นส่วนตัวพาร์ทเนอร์",
                    to: "/privacy-policy-partner",
                    icon: "cil-file",
                  },
                  {
                    id: 20,
                    _name: "CSidebarNavItem",
                    name: "คำถามที่พบบ่อยพาร์ทเนอร์",
                    to: "/faq/partner",
                    icon: "cil-comment-bubble",
                  },
                ],
              },
              {
                _name: "CSidebarNavItem",
                name: "รายการดีล",
                to: "/bestdeal",
                icon: "cil-home",
              },
              {
                _name: "CSidebarNavItem",
                name: "รายการพาร์ทเนอร์ของเรา",
                to: "/partner",
                icon: "cil-people",
              },
              {
                id: 20,
                _name: "CSidebarNavItem",
                name: "คำถามที่พบบ่อย",
                to: "/faq",
                icon: "cil-comment-bubble",
              },
              {
                id: 2,
                _name: "CSidebarNavDropdown",
                name: "เกี่ยวกับ Academy",
                icon: "cil-image",
                items: [
                  {
                    _name: "CSidebarNavItem",
                    name: "รายการแบนเนอร์ Academy",
                    to: "/academy",
                    icon: "cil-image",
                  },
                  {
                    _name: "CSidebarNavItem",
                    name: "Academy 1",
                    to: "/academy/Academy-01",
                    icon: "cil-file",
                  },
                  {
                    _name: "CSidebarNavItem",
                    name: "Academy 2",
                    to: "/academy/Academy-02",
                    icon: "cil-file",
                  },
                  {
                    _name: "CSidebarNavItem",
                    name: "Academy 3",
                    to: "/academy/Academy-03",
                    icon: "cil-file",
                  },
                  {
                    _name: "CSidebarNavItem",
                    name: "Academy 4",
                    to: "/academy/Academy-04",
                    icon: "cil-file",
                  },
                ],
              },
            ],
          },
          {
            id: 2,
            _name: "CSidebarNavDropdown",
            name: "เกี่ยวกับการขาย",
            icon: "cil-cash",
            items: [
              {
                id: 1,
                _name: "CSidebarNavItem",
                name: "สินค้า",
                to: "/product",
                icon: "cil-gift",
              },
              {
                id: 1,
                _name: "CSidebarNavItem",
                name: "รายการคำสั่งซื้อ",
                to: "/order",
                icon: "cil-cart",
              },
              {
                id: 1,
                _name: "CSidebarNavItem",
                name: "รีเซนออเดอร์",
                to: "/resendorder",
                icon: "cil-cart",
              },
              {
                _name: "CSidebarNavItem",
                name: "รายการรอการตรวจสอบ",
                to: "/order/verify/list",
                icon: "cil-cart",
              },
              {
                _name: "CSidebarNavItem",
                name: "รายการคืนสินค้า",
                to: "/return",
                icon: "cil-cart",
              },
            ],
          },
          {
            id: 2,
            _name: "CSidebarNavDropdown",
            name: "เกี่ยวกับการเงิน",
            icon: "cil-dollar",
            items: [
              {
                _name: "CSidebarNavItem",
                name: "คำขอถอนเงิน",
                to: "/withdraw",
                icon: "cil-dollar",
              },
              {
                _name: "CSidebarNavItem",
                name: "รายการเกี่ยวกับการเงินพาร์ทเนอร์",
                to: "/finance",
                icon: "cil-dollar",
              },
            ],
          },
          {
            _name: "CSidebarNavItem",
            name: "รายการพาร์ทเนอร์",
            to: "/seller",
            icon: "cil-people",
          },
          {
            _name: "CSidebarNavItem",
            name: "รายการตัวแทน",
            to: "/affiliate",
            icon: "cil-people",
          },
          {
            id: 2,
            _name: "CSidebarNavDropdown",
            name: "เกี่ยวกับระบบ",
            icon: "cil-settings",
            items: [
              {
                _name: "CSidebarNavItem",
                name: "หมวดหมู่",
                to: "/category",
                icon: "cil-list",
              },
              {
                to: "/category/imagelist",
                name: "จัดการรูปหมวดหมู่",
                _name: "CSidebarNavItem",
                icon: "cil-list",
              },
              {
                _name: "CSidebarNavItem",
                name: "รายการวอชเชอร์",
                to: "/voucher",
                icon: "cil-gift",
              },
              {
                _name: "CSidebarNavItem",
                name: "รายการแคมเปญ",
                to: "/campaign",
                icon: "cil-list",
              },
              {
                _name: "CSidebarNavItem",
                name: "รายการรอการตรวจสอบแคมเปญ",
                to: "/campaign/verify",
                icon: "cil-list",
              },
              {
                _name: "CSidebarNavItem",
                name: "ตั้งค่าระบบ",
                to: "/settings",
                icon: "cil-settings",
              },
              {
                _name: "CSidebarNavItem",
                name: "ตั้งค่าระบบการจัดส่ง",
                to: "/settings/cod",
                icon: "cil-settings",
              },
              {
                _name: "CSidebarNavItem",
                name: "ตั้งค่าระบบจัดการบัญชี",
                to: "/settings/tier",
                icon: "cil-settings",
              },
              // {
              //   _name: "CSidebarNavItem",
              //   name: "รายการผู้ดูแลระบบ",
              //   to: "/admin",
              //   icon: "cil-settings",
              // },
            ],
          },
        ],
      },
    };
  },
  computed: {
    sidebarItems() {
      return [this.sidebar];
    },
  },
  created() {
    //this.getPermissionList();
  },
};
</script>