import { useState, useEffect } from "react";
import "./App.css";
import RealEstateForm from "./components/add listing page/RealEstateForm.jsx";
import Filter from "./components/main page/Filter.jsx";
import Header from "./components/main page/Header.jsx";
import RealEstates from "./components/main page/RealEstates.jsx";
import { fetchListing, fetchRealEstates, deleteListing } from "./http.js";
import ListingPage from "./components/listing page/ListingPage.jsx";

function App() {
  const [listingPageData, setListingPageData] = useState(null);
  const [realEstateData, setRealEstateData] = useState([]);

  useEffect(() => {
    async function fetchRealEstateData() {
      try {
        const realEstate = await fetchRealEstates();
        setRealEstateData(realEstate);
      } catch (error) {
        console.error("Error fetching real-estates data:", error);
      }
    }
    fetchRealEstateData();
  }, []);

  async function fetchListingData(id) {
    try {
      const listing = await fetchListing(id);
      setListingPageData(listing);
    } catch (error) {
      console.error("Error fetching real-estate listing data:", error);
    }
  }

  async function deleteRealEstateListing(id) {
    try {
      const result = await deleteListing(id);
      setListingPageData(null);
      const realEstate = await fetchRealEstates();
      setRealEstateData(realEstate);
      if (result) {
        console.log("Listing deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting real-estate listing:", error);
    }
  }

  return (
    <>
      <Header />
      {/* <RealEstateForm /> */}
      {listingPageData === null ? (
        <div>
          <Filter />
          <RealEstates data={realEstateData} onSelect={fetchListingData} />
        </div>
      ) : (
        <ListingPage
          data={listingPageData}
          onBack={() => setListingPageData(null)}
          onDelete={deleteRealEstateListing}
        />
      )}
    </>
  );
}

export default App;
