import { AuthPage } from "@/features/auth/auth-page";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; code?: string }>;
}) {
  const params = await searchParams;
  return <AuthPage mode="login" status={params.status} code={params.code} />;
}
