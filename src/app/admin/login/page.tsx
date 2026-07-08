import { redirect } from "next/navigation";

export default function DeprecatedAdminLoginRoute() {
  redirect("/login");
}
