export interface SafariSection {
  id: string;
  header: string;
  content: string;
  image?: string;
  gallery?: string[];
  subsection?: string;
  category?: "Nairobi" | "Mombasa"; // for grouping
}

export const kenyaExcursionsData: SafariSection[] = [
  // -----------------------------
  // N A I R O B I  E X C U R S I O N S
  // -----------------------------
  {
    id: "kaa01",
    header: "Nairobi City Tour (3 Hours)",
    category: "Nairobi",
    content: `Take a guided tour of Nairobi visiting key landmarks including:
• Capitol Hill  
• National Museum and its Paleontology Hall  
• Snake Park  
• Railway Museum  
• City Market  

A perfect introduction to Kenya’s capital.`,
  },

  {
    id: "kaa02",
    header: "Karen Blixen, Giraffe Manor & Ostrich Park (4 Hours)",
    category: "Nairobi",
    content: `Visit the home of former coffee farmer ,Karen Blixen, now preserved as a museum. Proceed to the Giraffe Manor where you can feed rare Rothschild giraffe. End the tour with a visit to the Ostrich Park.  

`,
  },

  {
    id: "kaa03",
    header: "Bomas of Kenya (3 Hours) — Upon Request",
    category: "Nairobi",
    content: `Enjoy a cross-section of folk dances from various tribes in the country. Experience the culture as depicted by the recreated African villages with the chance to buy local handicrafts.`,
  },

  {
    id: "kaa04",
    header: "Nairobi National Park (4 Hours)",
    category: "Nairobi",
    content: `Approximately 8 kilometers from the city Centre, enter the Nairobi National Park to view a variety of game including lions, cheetahs, buffaloes, impala, giraffes and ostriches, roaming in untouched savannah and indigenous forest.`,
  },

  {
    id: "kaa05",
    header: "Nairobi by Night",
    category: "Nairobi",
    content: `Dinner at a Brazilian style restaurant offering you exotic grilled meat such as crocodile, zebra and chicken dishes, all roasted on a huge wood fire. Dance away at one of our night clubs or try your luck at an International Casino. You may wish to extend your time after midnight and make your own way to the hotel.`,
  },

  {
    id: "kaa06",
    header: "Carnivore Experience",
    category: "Nairobi",
    content: `Guaranteed daily at 12.30pm and 7.00pm. Nairobi has numerous restaurants offering a variety of exotic and African cuisines. Carnivore is unique. it is for carnivores. This is the only place you can have a variety of  meat served in one meal. The succulent means and barbeque dishes will impart a lifetime experience in your tour. Few if any, have resisted the temptation to go back to Carnivore.`,
  },

  {
    id: "kaa07",
    header: "Lake Naivasha & Crescent Island (1 Day)",
    category: "Nairobi",
    content: `1 Day. Your drive takes you down the escarpment and along the floor of the Rift Valley to the Lake Naivasha. Here successful vineyards produce much of Kenya’s wine, have been established. After a guided tour, a buffet lunch consisting of local produce and wine beside the lake, a two hour boat ride takes you to a nearby island where you walk amongst the plains game and enjoy the bird life. Return to Nairobi after tea arriving in the early evening.`,
  },

  {
    id: "kaa08",
    header: "Lake Nakuru National Park (1 Day)",
    category: "Nairobi",
    content: `1 Day. The great Rift Valley stretches from Ethiopia across Kenya to Tanzania. I chain of eight lakes, Lake Nakuru being one of the most famous The Lake is only a few kilometers away from Nakuru, Kenya's 3d largest town 160 km west of Nairobi. you will descend the escarpment into the dramatic landscape of the scenic Rift. You will be treated to an extensive tour of the park, with lunch being served in the park. The tour will focus on the bewildering spectacle of a million flamingos and the variety of wildlife with which the park abounds. Here, you will be treated o a melody of songs from a wide variety of birds. Drive back to Nairobi.`,
  },

  {
    id: "kaa09",
    header: "Solio Ranch — Rhino Sanctuary (1.5 Days)",
    category: "Nairobi",
    content: `1 1/2 DAYS. Leaving Nairobi after lunch, you will drive through the rolling Kikuyu agricultural country to reach the Outspan/ Aberdare country club/ Mt Kenya Guest House in the early evening in time for a shower before dinner. Early in the morning, you drive a short distance to Solio Ranch. This unique cattle and wildlife ranch lies in a valley with the superb views of the Aberdare Range and Mount Kenya. The day is spent in the protected wildlife area of the ranch viewing black and white rhino's, as well as the lion, cheetah, multitudes of game and possibly even the shy leopard. A site has been specially selected for your picnic lunch, and you drive back to Nairobi in the early evening.`,
  },

  // -----------------------------
  // M O M B A S A  C I T Y  &  E X C U R S I O N S
  // -----------------------------
  {
    id: "mombasa00",
    header: "Mombasa City — Overview",
    category: "Mombasa",
    content: `Mombasa, is  historical and the second largest city in Kenya with a population of 1 million. Lying on the Indian Ocean, it’s a major sea port with an international airport. This is the centre of the coastal tourism industry. Mombasa city is a small Island separated from the main land by 2 creeks. The port serves both Kenya and neighboring land locked countries, linking them to the ocean.
Places of interest around Mombasa city.
a.	Fort Jesus – overlooking the old port and built in 1593 to protect the port trade.
b.	Bombolulu Workshops – founded by, and supporting the physically disabled.
c.	Bamburi Nature trails – Haller Park. Largest animal sanctuary in Mombasa.
d.	The Mombasa Tusks – Built to commemorate princess Margaret visit in 1956.
e.	Mamba Village – Feed, feel and feed on crocodile delicacies.
f.	Mombasa Marine Park.
g.	Mombasa Old Town.
h.	Rabai museum – Christianity and modern learning built 1846 by missionaries.
`,
  },

  {
    id: "kaa10",
    header: "Mombasa City Tour (1 Day)",
    category: "Mombasa",
    content: `Take a guided city tour to visit principal Landmarks including, Akamba wood carving Village, a Hindu temple, Fort Jesus Museum, Old Town, Vegetable market and Biashara Street far shopping. `,
  },

  {
    id: "kaa11",
    header: "Shimba Hills Tour (1 Day)",
    category: "Mombasa",
    content: `Situated 40 Kms from Mombasa drive past coconut, cashew nut and other plantations to Shimba Hills Reserve to view , amongst other animals, the rare sable and roan antelope. Lunch at a magnificent Lodge. `,
  },

  {
    id: "kaa12",
    header: "Malindi & Gedi Ruins (1 Day)",
    category: "Mombasa",
    content: `Drive across the new Mtwapa and Kilifi bridges to visit the Gedi ruins. Continue to Malindi and view Marine life in a glass bottom boat at the Marine Park. After lunch in a local restaurant visit the snake farm and the falconry. En route to Mombasa have an optional stop at a local village. `,
  },

  {
    id: "kaa13",
    header: "Tamarind Dhow Dinner",
    category: "Mombasa",
    content: `A romantic Dhow Sundowner Cruise along the picturesque Island of Mombasa starts off an enchanting evening no to be missed. As darkness sets in, we dock at our private jetty and proceed to Fort Jesus. “Arab and Portuguese men" bearing fire torches, guard the Entrance of the Fort, constructed by the Portuguese in the 16th Century- the venue for a sound- and light presentation of the turbulent History of the East African Coast. A Candle lit setting creates the atmosphere for a unique Dinner served within the fortress by waiters in Portuguese attire. Following this feast you are returned to your hotel.`,
  },

  {
    id: "kaa14",
    header: "Tsavo National Park (1 Day)",
    category: "Mombasa",
    content: `Early morning drive a 100 Km inward to Tsavo East National Park. Enter the park and start viewing game, stop at Aruba Dam en route to a lodge where you have lunch.  After another game drive, return to Mombasa.`,
  },

  {
    id: "kaa15",
    header: "Tsavo East (2 Days)",
    category: "Mombasa",
    content: ` Day 1 Taita Hills -Morning drive to Bachuma Gate. Enter Tsavo East Park and view game enroute to Voi Safari Lodge/ Sentrim/Ngulia /Aruba Ashnil for lunch, (165 Kms).
Day 2 Mombasa - Early morning game drive. Relax and return to Mombasa after lunch. (210 Kms).
`,
  },

  {
    id: "kaa16",
    header: "Tsavo East & West + Amboseli (3 Days)",
    category: "Mombasa",
    content: `Day 1 Tsavo -Drive 100 Kms east to Tsavo east/ West  Park, home to the Red Elephant. Viewing game enroute to Ngulia / Kilaguni/ Sentrim  for lunch, dinner and overnight. Afternoon game drive. ( 165 Kms )
Day 2 Amboseli-Proceed to Amboseli Park arriving in time for lunch at Kibo/ Sentrim/Serena. Afternoon game drives in this swampy park with Natural Springs which attract wildlife. We have chances to see the snow capped top of Mt Kilimanjaro and also the  Plains animals. Dinner and overnight at the Lodge, (240 Kms ).Accommodation at Kibo or sentrim Amboseli.
Day 3 Mombasa- Early morning game drives before Breakfast. After breakfast drive back to Mombasa. (135 Kms ).
`,
  },

  {
    id: "kaa17",
    header: "Kiwayuu / Kipungani Islands (2 Days)",
    category: "Mombasa",
    content: `2 Days. A choice of two get-away-from-it-all beach hide ways. Both are small and intimate with personalized service and excellent cuisine. Access is by air only from Nairobi or Mombasa. Full board at Kiwayuu Lodge.`,
  },

  {
    id: "kaa18",
    header: "Lamu Island (2 Days)",
    category: "Mombasa",
    content: `2 Days.This is Kenya s oldest living town and little has changed in appearance and character. Access is by boat or from an airstrip in nearby Mada Island. The streets are far too narrow and winding to accommodate any vehicles except pedestrians and donkeys. Places of interest in Lamu are Swahili house Museum, Lamu fort, Donkey sanctuary, The beach,  Matondoni Village,  Shela Village, Dhow trips. Accomodation options upon request.`,
  },

  {
    id: "kaa19",
    header: "Zanzibar Island (3 Days)",
    category: "Mombasa",
    content: ` Lying 38 Km off East African Coast, Zanzibar has in the past come under the influence of Sumerians, Assyrians, Hindus, Egyptians, Portuguese and Arabs. It was from this Island that great African explorers, like Burton, Speke, Grant and Livingston, set out on their journeys of discovery. In the 18th Century the Island was a focus of the slave trade. The Stone Town' is Steeped in history and one the north of the Island there are many support beaches.Known as the Spice Island, it was the cloves that were Particular prized and Vasco da Gama took cargo back to Portugal after his voyage. Outside the town there are many places of interest to visit including the Maruhubi Palace - formerly the Sultan's harem, the Kidichi baths, Mangapwani Village, the former site of the notorious slave pits and Kizimkazi with its recently renovated 12th Century Persian Mosque. Access to Zanzibar is by air fro Nairobi and Mombasa or by Hydrofoil from Dar es Salaam.
Day 1
Fly via Mombasa to land the 'Clove Island' of Zanzibar where you will be met and traditional hotel in the 'Stone Town'. In the afternoon the spice tour visiting the plantations of cloves and other spices of which Zanzibar is renowned.
Day 2 
The next morning tour the fascinating 'Stone Town' with visit to the market, Sultan's Palace and Museum, followed by lunch. In the afternoon a boat trip to an island for swimming and snorkeling.
Day 3
The next morning there is time for for a guided shopping trip before transfer to the airport to catch the departing flight. 
NB. Accommodations upon request.
`,
  },
];
