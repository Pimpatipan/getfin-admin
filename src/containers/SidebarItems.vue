<script>
export default {
  name: "nav",
  data() {
    return {
      sidebar: {
        _name: "CSidebarNav",
        _children: [
          {
            id: 2,
            _name: "CSidebarNavDropdown",
            name: "เกี่ยวกับเว็บไซต์",
            icon: "cil-list",
            _children: [
              {
                id: 1,
                _name: "CSidebarNavItem",
                name: "จัดการแบนเนอร์",
                to: "/banner",
                icon: "cil-user",
              },
              {
                _name: "CSidebarNavItem",
                name: "จัดการโลโก้",
                to: "/logo",
                icon: "cil-user",
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
                icon: "cil-list",
              },
              {
                _name: "CSidebarNavItem",
                name: "รายการรีวิว",
                to: "/review",
                icon: "cil-list",
              },
              {
                id: 1,
                _name: "CSidebarNavItem",
                name: "รายการข่าวสาร/โปรโมขั่น",
                to: "/news",
                icon: "cil-list",
              },
              {
                id: 1,
                _name: "CSidebarNavItem",
                name: "ข้อตกลงและเงื่อนไขการใช้งาน",
                to: "/term-and-condition",
                icon: "cil-list",
              },
              {
                id: 1,
                _name: "CSidebarNavItem",
                name: "นโยบายความเป็นส่วนตัว",
                to: "/privacy-policy",
                icon: "cil-list",
              },
              {
                id: 1,
                _name: "CSidebarNavItem",
                name: "วิธีการสมัคร",
                to: "/register",
                icon: "cil-list",
              },
              {
                _name: "CSidebarNavItem",
                name: "รายการดีล",
                to: "/bestdeal",
                icon: "cil-list",
              },
              {
                _name: "CSidebarNavItem",
                name: "รายการพาทเนอร์",
                to: "/partner",
                icon: "cil-list",
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
                icon: "cil-list",
                items: [
                  {
                    _name: "CSidebarNavItem",
                    name: "รายการแบนเนอร์ Academy",
                    to: "/academy",
                    icon: "cil-list",
                  },
                  {
                    _name: "CSidebarNavItem",
                    name: "Academy 1",
                    to: "/academy/Academy-01",
                    icon: "cil-list",
                  },
                  {
                    _name: "CSidebarNavItem",
                    name: "Academy 2",
                    to: "/academy/Academy-02",
                    icon: "cil-list",
                  },
                  {
                    _name: "CSidebarNavItem",
                    name: "Academy 3",
                    to: "/academy/Academy-03",
                    icon: "cil-list",
                  },
                  {
                    _name: "CSidebarNavItem",
                    name: "Academy 4",
                    to: "/academy/Academy-04",
                    icon: "cil-list",
                  },
                ],
              },
            ],
          },
          {
            id: 2,
            _name: "CSidebarNavDropdown",
            name: "เกี่ยวกับการขาย",
            icon: "cil-list",
            items: [
              {
                id: 1,
                _name: "CSidebarNavItem",
                name: "สินค้า",
                to: "/product",
                icon: "cil-list",
              },
              {
                id: 1,
                _name: "CSidebarNavItem",
                name: "รายการคำสั่งซื้อ",
                to: "/order",
                icon: "cil-clipboard",
              },
              {
                _name: "CSidebarNavItem",
                name: "รายการรอการตรวจสอบ",
                to: "/order/verify/list",
                icon: "cil-list",
              },
              {
                _name: "CSidebarNavItem",
                name: "รายการคืนสินค้า",
                to: "/return",
                icon: "cil-list",
              },
            ],
          },
          {
            id: 2,
            _name: "CSidebarNavDropdown",
            name: "เกี่ยวกับการเงิน",
            icon: "cil-list",
            items: [
              {
                _name: "CSidebarNavItem",
                name: "คำขอถอนเงิน",
                to: "/withdraw",
                icon: "cil-dollar",
              },
              {
                _name: "CSidebarNavItem",
                name: "รายการเกี่ยวกับการเงิน (คู่ค้า)",
                to: "/finance",
                icon: "cil-dollar",
              },
            ],
          },
          {
            _name: "CSidebarNavItem",
            name: "รายการผู้ขาย",
            to: "/seller",
            icon: "cil-list",
          },
          {
            _name: "CSidebarNavItem",
            name: "รายการตัวแทน",
            to: "/affiliate",
            icon: "cil-list",
          },
          {
            id: 2,
            _name: "CSidebarNavDropdown",
            name: "เกี่ยวกับระบบ",
            icon: "cil-list",
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
                icon: "cil-list",
              },
              {
                _name: "CSidebarNavItem",
                name: "รายการแคมเปญ",
                to: "/campaign",
                icon: "cil-bullhorn",
              },
              {
                _name: "CSidebarNavItem",
                name: "รายการรอการตรวจสอบแคมเปญ",
                to: "/campaign/verify",
                icon: "cil-bullhorn",
              },
              {
                _name: "CSidebarNavItem",
                name: "ตั้งค่าระบบ",
                to: "/settings",
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