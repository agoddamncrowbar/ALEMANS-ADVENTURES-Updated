export interface ParkSubsection {
  subheader: string;
  content: string;
}

export interface ParkSection {
  id: string;
  image?: string;
  gallery?: string[];
  header: string;
  content: string;
  subsections: ParkSubsection[];
}

export const rwandaParksData: ParkSection[] = [
  {
    id: "volcanoes",
    image: "/images/rwanda/volcanoes.jpg",
    gallery: [
      "/images/rwanda/volcanoes1.jpg",
      "/images/rwanda/volcanoes2.jpg",
      "/images/rwanda/volcanoes3.jpg"
    ],
    header: "Volcanoes National Park",
    content: `Volcanoes National Park Rwanda is home to the endangered mountain gorillas found in the northern part of Rwanda covering an area of 160 sq km of varying vegetation zones from lowland forests to the afro alpine forests between 2,400 meters to 4,500 meters above sea level. The park marks the Rwandan section of the greater Virunga Mountains shared by three countries of Rwanda, Uganda and the Democratic Republic of Congo.`,
    subsections: [
      {
        subheader: "Wildlife & Biodiversity",
        content: "The Virunga massif is the only place in the world with the last surviving population of mountain gorillas, of which over 500 gorilla species are found in Volcanoes national park, making Rwanda perhaps the best tracking safari destination in Africa. Apart from the mountain gorillas, the forest is a habitat to a variety of mammals that include forest elephants which are infrequently encountered, bush pigs, forest buffalos, black fronted duiker, bush bucks, spotted hyenas and the giant forest hog. Other primates present in the forest include golden monkeys."
      },
      {
        subheader: "Birdlife",
        content: "The Park is famous for the Albertine rift endemic species of birds with 178 birds recorded in the park, 29 of them are restricted to the Albertine rift region. Virunga's location in the Albertine and its thick forests create a unique environment for eco tourists."
      },
      {
        subheader: "History & Conservation",
        content: "Primarily the forest was gazetted in 1925 as a small area surrounded by densely populated areas of Karisimbi, Visoke and Mikeno to protect the endangered mountain gorillas that were facing a threat of extinction from poachers. Later in 1967 the park became a foundation for the renowned American naturalist Dian Fossey who set up a gorilla research center at Karisimbi. Despite the conservation efforts to protect mountain gorillas, the park became a theatre of war during the Rwandan civil war in the 1990's which left the park abandoned by tourists following the massive massacres that critically reduced the gorilla population."
      },
      {
        subheader: "Rebirth of Tourism",
        content: "All activities in the park were stopped until 1999 when the park was declared safe for travelers under the control of the Rwandan army, marking the rebirth of gorilla tourism in Rwanda. In 2005, Rwanda began the yearly gorilla naming ceremony for baby gorillas branded as 'Kwita Iziina' which has seen enormous results of increased gorilla numbers in Volcanoes National Park."
      },
      {
        subheader: "Location & Access",
        content: "Volcanoes national park is found in a small village of Musanze, formerly called Ruhengeri. It can be easily accessed by public transportation from Kigali Rwanda or Gisenyi town. The park is about 2 hours drive from Kigali or Gisenyi, thus time bound visitors have a chance to track gorillas and drive back to Kigali on the same day. Treks start very early in the morning at 6:00 am from the park headquarters at Kinigi."
      },
      {
        subheader: "Activities & Attractions",
        content: "Even without mountain gorillas, the park could still be attractive. Its altitude ranging from 2,500 to 4,500 m above sea level with Karisimbi as the highest peak, resulting in extensive bamboo forests and rare plants such as giant lobelias and groundsels. The park offers an opportunity for primate lovers to track secretive Golden monkeys in the bamboo forests, hiking Karisimbi volcano, visiting the celebrated Dian Fossey tomb, and visits to the twin lakes of Ruhondo and Bulera can be arranged."
      }
    ]
  },
  {
    id: "akagera",
    image: "/images/rwanda/akagera.jpg",
    gallery: [
      "/images/rwanda/akagera1.jpg",
      "/images/rwanda/akagera2.jpg",
      "/images/rwanda/akagera3.jpg"
    ],
    header: "Akagera National Park",
    content: `Sprawling across the north eastern side of Rwanda along the border with Tanzania, Akagera National Park is a network of forest fringed lakes, papyrus swamps, savannah plains, and rolling hills that offers wildlife enthusiasts a thrilling opportunity to experience Rwanda's biodiversity. Founded in 1934, the park was later reduced from 25,000 sq km to its apparent size of 1,122 sq km. What's left of Akagera National Park is the most varied and beautiful landscape in East and Central Africa.`,
    subsections: [
      {
        subheader: "The Akagera River & Wetlands",
        content: "The park was named after the Akagera River that streams along its eastern boundary into the several lakes tangled with papyrus swamps that make up a third of the park, making it one of the largest protected wetlands in Africa. The steep sided shores and small undulating rolling hills dotted with papyrus swamps and savannah plains make it Rwanda's most developing wetland safari destination."
      },
      {
        subheader: "Large Mammals",
        content: "Home to a variety of big game mammals, such as buffaloes, elephants, giraffes, zebras, waterbucks, and many species of antelope including roan antelope, the elusive eland, topi, duikers, oribi, klipspringer, bush buck and the handsome chestnut-coated impalas. Swamp endemic species of sitatunga are present as well, inhabiting the water-logged, forest fringed lakes along the meandering Akagera river."
      },
      {
        subheader: "Birdlife & Primates",
        content: "Due to the park's exceptional levels of biodiversity, Akagera National Park is an important birders paradise with over 500 species of birds, among which are the rare swamp endemic species such as shoebill stork, papyrus Gonelek and other dense populations of water birds in the wetland. Primates can also be seen such as the mysterious blue monkeys, olive baboons, vervets which can be seen during the day, with bush babies visible during night game drives."
      },
      {
        subheader: "Big Five Restoration",
        content: "In an attempt to restore Akagera's big five status, Transvaal lions have been reintroduced from South Africa, being the first lions of its kind in the last 15 years. Other resident predators include leopards, side striped jackals, and spotted hyenas. There is an ongoing project to bring back the Black rhinos which were once poached to the brink of extinction."
      },
      {
        subheader: "Aquatic Life Experience",
        content: "Along the shores of forest fringed lakes duetting with a pair of connecting marshes, one can encounter pods of over 50 hippos, gape-mouthed crocodiles silently watching prey. Lining the lakes are some of the monarchs of African waterways – the African Fish eagles magically toning apart the sky, an unforgettable experience while enjoying the lakeside eye-catching views on a boat trip."
      },
      {
        subheader: "Landscape & Scenery",
        content: "The park features typical African savannah landscape of acacia woodlands intercepted by mesmerizing tracts of thorn acacia woodlands and open savannah teemed with herds of elephants, buffalos and antelope. In the north and north east lies the Mutara, a natural and historic region where traces of long pastoral occupation can be seen. The gentle slopes and depressions dotted with lakes, permanent rivers, floating vegetation, and a mosaic of diverse fertile soils combine to make Akagera national park amongst the most scenic reserves with exceptional levels of biodiversity in Africa."
      }
    ]
  },
  {
    id: "nyungwe",
    image: "/images/rwanda/nyungwe.jpg",
    gallery: [
      "/images/rwanda/nyungwe1.jpg",
      "/images/rwanda/nyungwe2.jpg",
      "/images/rwanda/nyungwe3.jpg"
    ],
    header: "Nyungwe Forest National Park",
    content: `Nyungwe Forest National Park is located in the southwest corner of Rwanda covering over 1,020km2 of untouched rain forest and is regarded as one of the remaining pristine mountain rain forests staying ever green with a high dense canopy in Africa. In 2004, when Rwanda wanted to boost her tourism beyond the famous mountain gorillas, Nyungwe forest received a national park status and became the largest protected area with high altitude rain forest.`,
    subsections: [
      {
        subheader: "Water Reservoir & Location",
        content: "The forest is the biggest water reservoir for Rwanda because of the vast magnificent biodiversity associated with the Albertine rift montane forests. Scenically dominated by a series of mountain chains, originating from the Lendu plateau in the Democratic Republic of Congo, running through the Rwenzori mountains to the southern shores of Lake Tanganyika, Nyungwe is Africa's most endemic rich eco-region."
      },
      {
        subheader: "Forest Landscape",
        content: "Deep in the heart of the rain forest is like an endless scenery of quiet myth with over 200 forest species. One can see Africa's oldest and tallest species of trees such as mahoganies and ebonies covered by giant tree ferns, lobelias, everlasting flowers, orchids and various climbing species of plants towering above the sky up to 50 meters. Walking quietly under the cool forest, encountering the beautiful colored butterflies will reward you with the exciting definitive real sound of Africa's dense equatorial rain forest teemed with various species of birds."
      },
      {
        subheader: "Primates",
        content: "The forest is home to more than 500 chimpanzees, man's closest cousin. Monkeys are exceptionally well represented in Nyungwe Forest National Park with 13 species recorded, representing 25% of the African primate checklist. It is the only place where more than 300 troops of colobus monkeys have been seen, making it Africa's primatologist dream destination. The forest boasts the greatest primate variety and density in East Africa, with five or six species likely to be observed over one afternoon walk."
      },
      {
        subheader: "Notable Primate Species",
        content: "Of particular interest are the most handsome L'Hoest monkeys, delightful acrobatic colobus monkeys often seen from the forest trails, grey cheeked mangabey, red tailed monkeys and olive baboons, just a glimpse of the primate species found here."
      },
      {
        subheader: "Birdlife",
        content: "Bird life is prolific throughout Rwanda, but for dedicated ornithologists the prime attraction in the forest is the presence of over 300 species of birds with about 27 Albertine rift endemics, making it a complete birding destination. Specialist birding tours throughout the forest's extensive network of hiking trails that take you through various spots of waterfalls offer you an opportunity to watch the alluring list of forest specialists including the iridescent sun birds, the psychedelic Rwenzori Turaco, forest buzzards, olive pigeon, and wood hoopoes."
      }
    ]
  }
];