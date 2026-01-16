export interface TravelTableRow {
  area: string;
  altitude: string;
  rain: string;
  temperature: string;
}

export interface TravelSubsection {
  subheader: string;
  content?: string;
  table?: TravelTableRow[];
}

export interface TravelSection {
  header: string;
  content: string;
  subsections: TravelSubsection[];
}

export const rwandaTravelInfoData: TravelSection[] = [
  {
    header: "Visa Requirements",
    content: `All travelers will need a passport valid for at least 90 days following your departure date from Rwanda. However, we strongly recommend traveling with 6 months validity on your passport at all times. In view of the bilateral agreements, nationals of the following countries may visit Rwanda without visa for a period up to 90 days: USA, UK, Germany, Canada, Uganda, Tanzania, Kenya, Burundi, Democratic Republic of Congo, Sweden, Mauritius, South Africa and Hong Kong`,
    subsections: []
  },
  {
    header: "Getting to Rwanda",
    content: `One can fly to Rwanda with SN Brussels, Alliance Express/Alliance Air, Ethiopian Airlines, Kenya Airways, Air Tanzania and Air Burundi. All international flights land at Kanombe Airport which is 10kms away from central Kigali.`,
    subsections: []
  },
  {
    header: "Safety and Health",
    content: `A certificate of yellow-fever vaccination is required. Much of Rwanda lies at too high an elevation for malaria to be a major concern, but the disease is present and prophylactic drugs are strongly recommended. It is advisable not to drink tap water. Bottled mineral water can be bought in all towns. Hospitals are located in all major towns.`,
    subsections: []
  },
  {
    header: "Wildlife",
    content: `Rwanda is home to the vast spectrum of East African wildlife, as well as both classic safariscapes and verdant equatorial rainforest.`,
    subsections: []
  },
  {
    header: "Money",
    content: `The Franc is the official currency of Rwanda. 1 Franc (RWF) = 100 centime. The Rwandan currency is available in both paper Notes and Coins. Foreign currencies and traveler's cheques can be exchanged at banks, bureaux de change and airports, railway stations, ports & major hotels in Rwanda at the official exchange rates.`,
    subsections: [
      {
        subheader: "Credit & Debit Cards",
        content: "American Express, Diners Club, Master Card and Visa are widely accepted in Rwanda. Check with your credit or debit Card Company for details of merchant acceptability in Rwanda. ATMs are widely available."
      },
      {
        subheader: "Traveler Cheques",
        content: "International traveler's cheques in Sterling Pounds, Euro, and US Dollars are widely accepted."
      }
    ]
  },
  {
    header: "Electricity",
    content: `240 volts AC, 50Hz.`,
    subsections: []
  },
  {
    header: "When to visit",
    content: `Rwanda can be visited throughout the year. Gorilla trekking and other forest walks are less demanding during the drier months. The European winter is the best time for birds, as Palaearctic migrants supplement resident species.`,
    subsections: []
  },
  {
    header: "What to wear",
    content: `Dress codes are informal. Daytime temperatures are generally warm, so bring lots of light clothing, supplemented by light sweaters for the cool evenings and heavier clothing for the Parc des Volcans and Nyungwe. When tracking gorillas, wear sturdier clothing to protect against stinging nettles, and solid walking shoes. A hat and sunglasses provide protection against the sun, and a waterproof jacket may come in handy in the moist mountains.`,
    subsections: []
  },
  {
    header: "What to bring",
    content: `Binoculars will greatly enhance game drives and forest walks, as will a good field guide to East African birds. Bring a camera and an adequate stock of film. Print film is available but transparency film is not. Toiletries and other essentials can be bought in the cities.`,
    subsections: []
  },
  {
    header: "Gorilla sightings",
    content: `Though not formally guaranteed, are extremely likely in all cases. Gorilla permits cost $500 per person per day and should be applied for well in advance, especially if you plan on travelling during the high tourist season (July and August or over the Christmas holidays).`,
    subsections: []
  },
  {
    header: "Area",
    content: `23,338 square Kilometers`,
    subsections: []
  },
  {
    header: "Capital City",
    content: `Kigali`,
    subsections: []
  },
  {
    header: "Language",
    content: `French, English`,
    subsections: []
  },
  {
    header: "Currency",
    content: `Rwandan Franc`,
    subsections: []
  },
  {
    header: "Time Zone",
    content: `2 hrs ahead of GMT.`,
    subsections: []
  },
  {
    header: "Climate",
    content: `Rwanda has a temperate tropical highland climate. Rwanda's altitude ranges from 1500 – 2500 meters on the average. Rwanda enjoys warm climates that vary depending on regions. There are two rainy seasons: from February to June and from September to December.`,
    subsections: []
  },
  {
    header: "Hotels and Restaurants",
    content: `Hotels and restaurants are abundant in Rwanda. However its advisable to hotel reservations in advance. Credit cards are usually only accepted at the major hotels in Kigali.`,
    subsections: []
  },
  {
    header: "ATM'S",
    content: `One can withdraw a limited amount of money per day using ATM card. However the ATM'S do not accept international cards. Payments are made mainly in cash.`,
    subsections: []
  },
  {
    header: "Calling code",
    content: `The international calling card for Rwanda is + 250`,
    subsections: []
  },
  {
    header: "Transport",
    content: `Rwanda's international airport in Kigari provides both domestic and international flights. It is 10 Kms from the c city center. Also available in all major centers are local and luxury bus services as well as air charter services offered anywhere in the country. Driving is on the right hand side. An international driving license is mandatory.`,
    subsections: []
  },
  {
    header: "Communication",
    content: `Rwanda has a superb cell phone network that covers neary the entire country thereby easing both local and international phone calls. Appropriate sim cards for the network are plenteous throughout the country and cell phones can be purchased or rented from major shops in Kigari. Also accessible are internet cafes and computer centers.`,
    subsections: []
  },
  {
    header: "Entry Requirements",
    content: `Passport is required by all. Check with your current embassy for Visa requirements. Entry tourist visa is issued upon arrival at Kigari Airport to all citizens with valid passport of more than 6 months from the expiry date.`,
    subsections: []
  },
  {
    header: "Health",
    content: `There is no compulsory vaccination for travelling to Rwanda. It is advisable for a travelor to update vaccinations like cholera,tetanus, hepatitis A and menengities.`,
    subsections: []
  },
  {
    header: "Gorilla tours in Rwanda and Uganda",
    content: `Gorilla tours in Rwanda and Uganda enable visitors meet endangered mountain gorillas face-to-face in their natural habitat. A well-organised gorilla safari will get you in touch with one of the habituated gorilla families in either Bwindi impenetrable national park in Uganda or Volcanoes national park in Rwanda. Unlike other wildlife experiences, gorilla trekking is only available in these two destinations in the whole world. This is because mountain gorillas can only be found here and have not survived in any other place across the globe.`,
    subsections: []
  }
];