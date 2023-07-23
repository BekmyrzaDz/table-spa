import {useRoutes} from "react-router-dom";
import {Layout, HomePage, Page404} from "./pages";

function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Layout/>,
      children: [
        {index: true, element: <HomePage/>},
        {path: '*', element: <Page404/>},
      ]
    },
  ]);

  return routes;
}

export default App
