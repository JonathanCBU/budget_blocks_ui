import {
  TagsOutlined,
  DashboardOutlined,
  // Add more antd icons here as you add pages
} from "@ant-design/icons";
import type { ComponentType } from "react";

export interface NavItem {
  key: string; // unique route key & URL path segment
  label: string; // sidebar label
  icon: ComponentType;
  path: string;
}

// ── Add new pages here ───────────────────────────────────────────
export const navItems: NavItem[] = [
  {
    key: "tags",
    label: "Tags",
    icon: TagsOutlined,
    path: "/tags",
  },
  // Example of how to add a future page:
  // {
  //   key: 'dashboard',
  //   label: 'Dashboard',
  //   icon: DashboardOutlined,
  //   path: '/dashboard',
  // },
];
// ────────────────────────────────────────────────────────────────

export const DEFAULT_PATH = "/tags";
