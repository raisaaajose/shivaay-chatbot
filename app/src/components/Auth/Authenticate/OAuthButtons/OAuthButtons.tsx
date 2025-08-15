import { FcGoogle } from "react-icons/fc";
import { AnimatedButton } from "../../../ui";

type OAuthButtonsProps = {
  googleLogin: () => void;
  oauthLoading: boolean;
};

export default function OAuthButtons({
  googleLogin,
  oauthLoading,
}: OAuthButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
      <AnimatedButton
        onClick={googleLogin}
        disabled={oauthLoading}
        variant="secondary"
        size="lg"
        icon={<FcGoogle className="w-5 h-5" />}
        iconPosition="left"
        className="w-full sm:w-auto"
      >
        <span className="hidden sm:inline">Google</span>
      </AnimatedButton>
    </div>
  );
}
