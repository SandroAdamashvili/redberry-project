import "./App.css";
import RealEstateForm from "./components/add listing page/RealEstateForm.jsx";
import Filter from "./components/main page/Filter.jsx";
import Header from "./components/main page/Header.jsx";
import RealEstates from "./components/main page/RealEstates.jsx";

function App() {
  return (
    <>
      <Header />
      <RealEstateForm />
      {/* <Filter />
      <RealEstates /> */}
    </>
  );
}

export default App;
