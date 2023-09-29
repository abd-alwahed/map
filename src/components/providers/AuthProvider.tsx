import { User } from "../../types/Auth";
import { axios } from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { BEARER } from "../../utils/constant";
import { getToken } from "../../utils/helper";

type Props = {
  children?: React.ReactNode;
};
const AuthProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchLoggedInUser = async (token: string) => {
    try {
      const { data } = await axios.get(`/start_auth`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });

      setUserData(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUser = (user: User) => {
    setUserData(user);
  };

  useEffect(() => {
    const authToken = getToken();
    if (authToken) {
      axios.defaults.headers.common["Authorization"] = `${BEARER} ${authToken}`;
      fetchLoggedInUser(authToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: userData,
        setUser: handleUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
