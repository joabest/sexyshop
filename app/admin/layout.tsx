import { redirect } from "next/navigation";
import { adminAuthConfigured, isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!adminAuthConfigured()) redirect("/admin-login");
  if (!(await isAdminAuthenticated())) redirect("/admin-login");
  return children;
}
