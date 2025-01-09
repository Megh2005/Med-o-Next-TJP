import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import AdminRoot from "./pages/AdminRoot";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import UserRoot from "./pages/UserRoot";
import UserHome from "./pages/UserHome";
import SearchPage from "./pages/SearchPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/Cart";
import Billing from "./pages/BillingAddress";
import PlaceOrder from "./pages/PlaceOrder";
import appStore from "./lib/redux/appStore";
import Home from "./pages/Home";
import OrderSuccess from "./pages/OrderSuccessfull";
import OrderFailure from "./pages/OrderFailure";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/admin",
      element: (
      <ProtectedRoute><AdminRoot /></ProtectedRoute>),
      children: [
        {
          path: "/admin",
          element: <Admin />,
        },
        {
          path: "/admin/add-product",
          element: <AddProduct />,
        },
        {
          path: "/admin/update-product/:productId",
          element: <UpdateProduct />,
        },
      ],
    },
    {
      path: "/u",
      element: (
        <ProtectedRoute>
        <UserRoot />
        </ProtectedRoute>
    ),
      children: [
        {
          path: "/u/home",
          element: <UserHome />,
        },
        {
          path: "/u/search",
          element: <SearchPage />,
        },
        {
          path: "/u/product/:id",
          element: <ProductDetails />,
        },
        {
          path: "/u/cart",
          element: <CartPage />,
        },
        {
          path: "/u/cart/billing",
          element: <Billing />,
        },
        {
          path: "/u/cart/place-order",
          element: <PlaceOrder />,
        },
      ],
    },
    {
      path: "/payment/success",
      element: (
        <ProtectedRoute><OrderSuccess/></ProtectedRoute>),
    },
    {
      path: "/payment/failure",
      element: ( <ProtectedRoute><OrderFailure/></ProtectedRoute>),
    },
  ]);

  return (
    <div>
      <Provider store={appStore}>
        <RouterProvider router={appRouter} />
      </Provider>
      <Toaster />
    </div>
  );
}

export default App;
