import {useRoutes} from "react-router-dom";
import {HomePage, Page404} from "./pages";

function App() {
  const routes = useRoutes([
    { path: '/', element: <HomePage/> },
    { path: '*', element: <Page404/> },
  ]);

  return routes;
}

export default App
