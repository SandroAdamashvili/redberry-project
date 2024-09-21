import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import MainPage from "./components/main_page/MainPage.jsx";
import RealEstateForm from "./components/add_listing_page/RealEstateForm.jsx";
import { deleteListing, fetchListing, fetchRealEstates } from "./http.js";
import ListingPage from "./components/listing_page/ListingPage.jsx";

const combinedLoader = async ({ params }) => {
  const listingData = await fetchListing(params.id);
  const realEstatesData = await fetchRealEstates();

  return [listingData, realEstatesData]; // Return an object with both datasets
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    loader: fetchRealEstates,
  },
  {
    path: "/realEstate/:id",
    element: <ListingPage />,
    loader: combinedLoader,
  },
  {
    path: "/listingForm",
    element: <RealEstateForm />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
