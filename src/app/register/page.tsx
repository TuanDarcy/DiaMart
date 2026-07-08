import { AuthPage } from "@/features/auth/auth-page";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; code?: string }>;
}) {
  const params = await searchParams;
  return <AuthPage mode="register" status={params.status} code={params.code} />;
}
