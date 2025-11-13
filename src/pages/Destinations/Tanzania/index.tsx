import Layout from "../../../components/Layout";
import DestinationsHeader from "../../../components/DestinationsHeader";
import TzHero from "../../../components/destinations/TzHero";
import TravelInfo from "./TravelInfo"
//import TzSections from "../../../components/destinations/Tz/TzSections";
import { useState } from "react";

export default function Tanzania() {
  const [activeSection, setActiveSection] = useState("Travel Info");
  const renderSection = () => {
    switch (activeSection) {
      case "Travel Info":
        return <TravelInfo />;
      // case "National Parks":
      //   return <TzNationalParks />;
      // case "Safaris":
      //   return <TzSafaris />;
      default:
        return <p className="text-[#F5D547]">Coming soon...</p>;
    }
  };

  return (
    <Layout showHero={false}>
      <DestinationsHeader
        currentCountry="Tanzania"
        onSectionChange={(section) => setActiveSection(section)}
      />

      <TzHero />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-[#F5D547] mb-6">
          Tz – {activeSection}
        </h1>
        {renderSection()}
      </div>
    </Layout>
  );
}
