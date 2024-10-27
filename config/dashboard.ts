import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Dashboard",
      href: "/",
    },
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "guage",
    },
    {
      title: "Categories",
      href: "/dashboard/categories",
      icon: "categories",
    },
    {
      title: "Articles",
      href: "/dashboard/articles",
      icon: "post",
    },
    {
      title: "Quizzes",
      href: "/dashboard/quizzes",
      icon: "quiz",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
