import Login from "./components/Login";
import { useAuthContext } from "./store/AuthProvider";

function App() {
  const { isLoggedIn } = useAuthContext();
  return <div>{isLoggedIn ? <p>LoggedIn</p> : <Login />}</div>;
}

export default App;
