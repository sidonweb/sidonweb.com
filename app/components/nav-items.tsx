import {
  LayoutGrid,
  Briefcase,
  Layers,
  User,
  Mail,
  PenLine,
  type LucideIcon,
} from "lucide-react";

export type IconKey =
  | "overview"
  | "work"
  | "stack"
  | "about"
  | "contact"
  | "blogs";

export type NavItem = {
  id: string;
  label: string;
  icon: IconKey;
  key: string;
};

export const navItems: NavItem[] = [
  { id: "intro", label: "Overview", icon: "overview", key: "01" },
  { id: "work", label: "Work", icon: "work", key: "02" },
  { id: "stack", label: "Stack", icon: "stack", key: "03" },
  { id: "about", label: "About", icon: "about", key: "04" },
  { id: "contact", label: "Contact", icon: "contact", key: "05" },
];

// Standalone page, kept apart from the scroll sections above.
export const blogsNav = { id: "blogs", label: "Blogs", icon: "blogs" as IconKey, href: "/blogs" };

export const SECTION_IDS = navItems.map((n) => n.id);

const ICONS: Record<IconKey, LucideIcon> = {
  overview: LayoutGrid,
  work: Briefcase,
  stack: Layers,
  about: User,
  contact: Mail,
  blogs: PenLine,
};

export function NavIcon({
  name,
  className,
}: {
  name: IconKey;
  className?: string;
}) {
  const Icon = ICONS[name];
  return <Icon className={className} />;
}
