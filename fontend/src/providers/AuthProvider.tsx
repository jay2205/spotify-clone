import * as React from "react";
import { useAuth } from "@clerk/clerk-react";
import { axiosInstance } from "@/lib/axios";
import { Loader } from "lucide-react";

export type IAuthProviderProps = {
  children: React.ReactNode;
};

function updateApiToken(token: string | null) {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Baerer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
}

export function AuthProvider(props: IAuthProviderProps) {
  const [loading, setLoading] = React.useState<boolean>(true);
  const { getToken } = useAuth();
  const { children } = props;

  React.useEffect(() => {
    const initAuth = async () => {
      console.log("Init of auth provider");
      setLoading(true);
      try {
        const token = await getToken();
        updateApiToken(token);
      } catch (error) {
        updateApiToken(null);
        console.log(`Error while Auth init ${error}`);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, [getToken]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-9 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return <div>{children}</div>;
}
