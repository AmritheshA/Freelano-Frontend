import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getCookie } from 'typescript-cookie';

const GRAPHQL_ENDPOINT = "https://amrithesh.shop/graphql";
const httpLink = createHttpLink({ uri: GRAPHQL_ENDPOINT });

const authLink = setContext((_, { headers }) => {
    
    const accessToken = getCookie("AccessToken") ?? '';    
    const localToken = localStorage.getItem("token");
    const token = atob(accessToken) || localToken;

    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
});

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});