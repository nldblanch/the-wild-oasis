import { useQuery } from "@tanstack/react-query";
import { getAuthenticatedUser } from "../../services/apiAuth";

export function useUser() {
  const {
    isLoading,
    isFetching,
    data: user,
    error
  } = useQuery({
    queryKey: ["user"],
    queryFn: getAuthenticatedUser
  });
  return {
    isLoading: isLoading || isFetching,
    user,
    isAuthenticated: user?.role === "authenticated",
    error
  };
}
