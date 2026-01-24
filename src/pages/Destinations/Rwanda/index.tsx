import Layout from "../../../components/Layout";
import DestinationsHeader from "../../../components/DestinationsHeader/index";
// import TravelInfo from "./TravelInfo"
import { Routes, Route, Navigate } from "react-router-dom";
import Safaris from "./Safaris/Safaris";
import ScrollToTopFAB from "../../../components/ScrollToTopFAB";
import RwandaParks from "./NationalParks";



export default function Rwanda() {
  return (
    <Layout showHero={false}>
      <DestinationsHeader currentCountry="Rwanda" />

      <div className="mx-auto mt-16">
        <Routes>
          <Route index element={<Navigate to="safaris/" replace />} />
          <Route path="safaris/*" element={<Safaris />} />
          <Route path="national-parks" element={<RwandaParks/>}/>
        </Routes>
      </div>

      <ScrollToTopFAB />
    </Layout>
  );
}
