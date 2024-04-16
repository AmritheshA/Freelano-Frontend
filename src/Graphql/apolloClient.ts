import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getCookie } from 'typescript-cookie';

const GRAPHQL_ENDPOINT = "http://localhost:8765/graphql";
const httpLink = createHttpLink({ uri: GRAPHQL_ENDPOINT });

const authLink = setContext((_, { headers }) => {
    
    const accessToken = getCookie("AccessToken") ?? '';
    const token = atob(accessToken);

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