import { useState } from "react";
import "./App.css";
import RealEstateForm from "./components/add listing page/RealEstateForm.jsx";
import Filter from "./components/main page/Filter.jsx";
import Header from "./components/main page/Header.jsx";
import RealEstates from "./components/main page/RealEstates.jsx";
import { fetchListing } from "./http.js";
import ListingPage from "./components/listing page/ListingPage.jsx";

function App() {
  const [listingPageData, setListingPageData] = useState(null);

  async function fetchListingData(id) {
    try {
      const listing = await fetchListing(id);
      setListingPageData(listing);
    } catch (error) {
      console.error("Error fetching real-estate listing data:", error);
    }
  }

  return (
    <>
      <Header />
      {/* <RealEstateForm /> */}
      {listingPageData === null ? (
        <div>
          {" "}
          <Filter />
          <RealEstates onSelect={fetchListingData} />
        </div>
      ) : (
        <ListingPage
          data={listingPageData}
          onBack={() => setListingPageData(null)}
        />
      )}
    </>
  );
}

export default App;
