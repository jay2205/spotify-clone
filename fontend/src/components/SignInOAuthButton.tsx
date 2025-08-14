import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButton = () => {
  const { isLoaded, signIn } = useSignIn();
  if (!isLoaded) {
    return null;
  }

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  return (
    <Button
      variant="secondary"
      className="w-full h-11 text-white border-zinc-200"
      onClick={signInWithGoogle}
    >
      Continue with Google
    </Button>
  );
};

export default SignInOAuthButton;
