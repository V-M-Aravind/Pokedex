import Home from "./components/Home";
import Login from "./components/Login";
import { useAuthContext } from "./store/AuthProvider";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8080/api",
  cache: new InMemoryCache(),
});
// const client = ...

// client
//   .query({
//     query: gql`
//       query GetLocations {
//         listPokemons {
//           id
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));
function App() {
  const { isLoggedIn } = useAuthContext();
  return (
    <ApolloProvider client={client}>
      <div>{isLoggedIn ? <Home /> : <Login />}</div>
    </ApolloProvider>
  );
}

export default App;
