import Layout from "../../../components/Layout";
import DestinationsHeader from "../../../components/DestinationsHeader";
import KenyaHero from "../../../components/destinations/KenyaHero";
import TravelInfo from "./TravelInfo"
//import KenyaSections from "../../../components/destinations/kenya/KenyaSections";
import { useState } from "react";

export default function Kenya() {
  const [activeSection, setActiveSection] = useState("Travel Info");

  return (
    <Layout showHero={false}>
    <DestinationsHeader
        currentCountry="Kenya"
        onSectionChange={setActiveSection}
      />

      <KenyaHero />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-[#F5D547] mb-6">
          Kenya — {activeSection}
        </h1>
        {activeSection === "Travel Info" && <TravelInfo />}
        {activeSection !== "Travel Info" && (
          <p className="text-[#F5D547]">Coming soon...</p>
        )}
      </div>
    </Layout>
  );
}
