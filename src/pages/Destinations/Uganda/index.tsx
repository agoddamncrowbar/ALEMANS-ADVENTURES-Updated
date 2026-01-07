import Layout from "../../../components/Layout";
import DestinationsHeader from "../../../components/DestinationsHeader/index";
import TravelInfo from "./TravelInfo"
import { Routes, Route, Navigate } from "react-router-dom";
import Safaris from "./Safaris/Safaris";
//import TzSections from "../../../components/destinations/Tz/TzSections";

import ScrollToTopFAB from "../../../components/ScrollToTopFAB";
export default function Uganda() {
  

  return (
    <Layout showHero={false}>
      <DestinationsHeader currentCountry="Uganda" />

      <div className="mx-auto mt-16">
        <Routes>
            <Route index element={<Navigate to="safaris/" replace />} />
            <Route path="travel-info" element={<TravelInfo />} />
            <Route path="safaris/*" element={<Safaris />} />
        </Routes>
      </div>

      <ScrollToTopFAB />
    </Layout>
  );
}
