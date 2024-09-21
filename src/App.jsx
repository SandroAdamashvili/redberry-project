// import { useState, useEffect } from "react";
// import "./App.css";
// import RealEstateForm from "./components/add_listing_page/RealEstateForm.jsx";
// import Header from "./components/main page/Header.jsx";
// import RealEstates from "./components/main page/RealEstates.jsx";
// import { fetchListing, fetchRealEstates, deleteListing } from "./http.js";
// import ListingPage from "./components/listing_page/ListingPage.jsx";
// import MainPage from "./components/main page/MainPage.jsx";

// function App() {
//   const [listingPageData, setListingPageData] = useState(
//     localStorage.getItem("listingObj")
//       ? JSON.parse(localStorage.getItem("listingObj"))
//       : null
//   );
//   const [realEstateFormOpen, setRealEstateFormOpen] = useState(
//     localStorage.getItem("formIsOpen") ?? false
//   );
//   const [realEstateData, setRealEstateData] = useState([]);

//   // useEffect(() => {
//   async function fetchRealEstateData() {
//     try {
//       const realEstate = await fetchRealEstates();
//       setRealEstateData(realEstate);
//     } catch (error) {
//       console.error("Error fetching real-estates data:", error);
//     }
//   }
//   // fetchRealEstateData();
//   // }, []);

//   async function fetchListingData(id) {
//     try {
//       const listing = await fetchListing(id);
//       setListingPageData(listing);
//       localStorage.setItem("listingObj", JSON.stringify(listing));
//     } catch (error) {
//       console.error("Error fetching real-estate listing data:", error);
//     }
//   }

//   async function deleteRealEstateListing(id) {
//     try {
//       const result = await deleteListing(id);
//       setListingPageData(null);
//       const realEstate = await fetchRealEstates();
//       setRealEstateData(realEstate);
//       if (result) {
//         console.log("Listing deleted successfully");
//       }
//     } catch (error) {
//       console.error("Error deleting real-estate listing:", error);
//     }
//   }

//   // return (
//   //   <>
//   //     <Header />
//   //     {/* <RealEstateForm /> */}
//   //     {realEstateFormOpen ? (
//   //       <RealEstateForm
//   //         onBack={() => {
//   //           setRealEstateFormOpen(false);
//   //           localStorage.clear();
//   //         }}
//   //       />
//   //     ) : listingPageData === null ? (
//   //       <MainPage
//   //         data={realEstateData}
//   //         onSelect={fetchListingData}
//   //         onFormOpen={() => {
//   //           setRealEstateFormOpen(true);
//   //           localStorage.setItem("formIsOpen", true);
//   //         }}
//   //       />
//   //     ) : (
//   //       <ListingPage
//   //         data={listingPageData}
//   //         onBack={() => {
//   //           setListingPageData(null);
//   //           localStorage.removeItem("listingObj");
//   //         }}
//   //         onDelete={deleteRealEstateListing}
//   //         realEstatesData={realEstateData}
//   //         onSelect={fetchListingData}
//   //       />
//   //     )}
//   //   </>
//   // );
// }

// export default App;
