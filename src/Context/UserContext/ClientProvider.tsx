import React, { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import axiosInstance from "@/Config/AxiosConfig/axiosConfig";
import { toast } from "react-toastify";
import Client from "@/Interfaces/clientInterface";

interface ClientProviderProps {
  children: React.ReactNode;
}

interface ClientContextType {
  clientDetails: Client;
  setClientDetails: React.Dispatch<React.SetStateAction<Client>>;
}

export const ClientContext = createContext<ClientContextType>({
  clientDetails: {
    clientId: '',
    clientAuthId: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    clientCity: '',
    clientState: '',
    clientZip: '',
    clientCountry: '',
    profileImgUrl: '',
    coverImage:'',
    projects: [],
    companies: [],
  },
  setClientDetails: () => {},
});

export const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const [clientDetails, setClientDetails] = useState<Client>({
    clientId: '',
    clientAuthId: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    clientCity: '',
    clientState: '',
    clientZip: '',
    clientCountry: '',
    profileImgUrl: '',
    coverImage:'',
    projects: [],
    companies: [],
  });

  const user = useSelector((state: RootState) => state.userDetails.user);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const response = await axiosInstance.get(
            `/api/v1/user/getAllInfo?userId=${user.userId}&role=${user.role}`
          );
          if (response.status === 200) {
            setClientDetails(response.data);
          }
        } catch (error: any) {
          console.error("Error:", error);
          if (error.response && error.response.data) {
            toast.error(error.response.data);
          } else {
            toast.error("Something went wrong");
          }
        }
      }
    };
    fetchData();
  }, [user]);

  return (
    <ClientContext.Provider value={{ clientDetails, setClientDetails }}>
      {children}
    </ClientContext.Provider>
  );
};