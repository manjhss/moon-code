import AuthUserButton from "@/components/auth/user-button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Page() {
  const { userId } = await auth();
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center gap-2">
        {userId ? (
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl font-bold">
              Welcome back! You are logged in.
            </h1>
            <p>
              <Link
                href={"/user-profile"}
                className="text-blue-500 hover:underline"
              >
                Go to your profile
              </Link>
            </p>
            <div className="absolute top-4 right-4">
              <AuthUserButton />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl font-bold">
              Welcome to the app! Please sign in.
            </h1>
            <p>
              <Link href={"/sign-in"} className="text-blue-500 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
