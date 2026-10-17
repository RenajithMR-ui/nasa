// Comprehensive Historical & Scientific Database of NASA Relics on Moon & Mars
// NASA Space Apps Challenge - Celestial Chronicles

const CELESTIAL_DATA = [
  // ===================== MARS ROVERS & LANDERS =====================
  {
    id: "perseverance-rover",
    name: "Perseverance Rover & Ingenuity",
    target: "Mars",
    type: "Rover",
    status: "Active & Transmitting",
    statusColor: "#00e676",
    launchDate: "July 30, 2020",
    landingDate: "February 18, 2021",
    site: "Jezero Crater, Mars (18.38°N, 77.58°E)",
    lifespan: "Active (1,300+ Sols and counting)",
    distanceTraveled: "29.4+ km (18.3 miles)",
    mass: "1,025 kg (2,260 lbs)",
    powerSource: "Multi-Mission Radioisotope Thermoelectric Generator (MMRTG - Plutonium-238)",
    image: "assets/perseverance_hero.jpg",
    model3dType: "rover_heavy",
    instruments: [
      "Mastcam-Z (Stereoscopic multispectral cameras)",
      "SuperCam (Laser spectroscopy & microphone)",
      "PIXL (Planetary Instrument for X-ray Lithochemistry)",
      "SHERLOC & WATSON (UV Raman spectrometer for organics)",
      "MOXIE (Mars Oxygen ISRU Experiment)",
      "MEDA (Environmental Dynamics Analyzer)",
      "RIMFAX (Radar Imager for Mars' Subsurface)",
      "Ingenuity Mars Helicopter (Autonomous rotorcraft scout)"
    ],
    relicsOnboard: [
      "Microchips etched with 10,932,295 Earth names",
      "COVID-19 Healthcare Worker Tribute Plate (Rod of Asclepius supporting Earth)",
      "Martian meteorite fragment returned back to Mars",
      "NASA 'Explore As One' and Space Apps message plaques",
      "Swatch of fabric from Wright Brothers' 1903 Flyer inside Ingenuity"
    ],
    tagline: "The seeker of ancient martian biosignatures and cached sample architect.",
    story: `Perseverance touched down in Jezero Crater—an ancient 28-mile-wide paleolake basin once flooded with liquid water—executing the most precise landing in planetary exploration history using Terrain-Relative Navigation and the famous rocket-powered Sky Crane. 

Accompanied by the record-breaking Ingenuity helicopter (which completed 72 flights exceeding all expectations), Perseverance has drilled, sealed, and cached pristine geological core samples inside hermetic titanium tubes for the upcoming Mars Sample Return mission. 

Perseverance also successfully produced breathable oxygen from the carbon dioxide Martian atmosphere using the MOXIE instrument, a milestone that will enable human explorers to survive on Mars in the 2030s and beyond.`,
    legacy: "Currently operating on the western delta of Jezero Crater, forging the trail for the first human boots on Mars.",
    finalMessage: "Transmitting daily telemetry, raw photographs, and laser acoustic recordings back to NASA JPL via the Deep Space Network."
  },
  {
    id: "curiosity-rover",
    name: "Curiosity (Mars Science Laboratory)",
    target: "Mars",
    type: "Rover",
    status: "Active & Transmitting",
    statusColor: "#00e676",
    launchDate: "November 26, 2011",
    landingDate: "August 6, 2012",
    site: "Gale Crater & Mount Sharp, Mars (4.5895°S, 137.4417°E)",
    lifespan: "Active (4,300+ Sols and counting - over 12 Earth years)",
    distanceTraveled: "32.6+ km (20.2 miles)",
    mass: "899 kg (1,982 lbs)",
    powerSource: "MMRTG Plutonium-238 decay generator",
    image: "assets/curiosity_rover.jpg",
    model3dType: "rover_heavy",
    instruments: [
      "ChemCam (Laser-Induced Breakdown Spectroscopy)",
      "Mast Camera (Mastcam)",
      "SAM (Sample Analysis at Mars - miniature chemistry lab)",
      "CheMin (Chemistry and Mineralogy X-ray diffraction)",
      "RAD (Radiation Assessment Detector)",
      "DAN (Dynamic Albedo of Neutrons - subsurface hydrogen)",
      "APXS & MAHLI (Robotic arm microscopic imager)"
    ],
    relicsOnboard: [
      "Pennies (1909 Lincoln penny) for camera calibration",
      "Morse code punctures on aluminum tires spelling 'JPL' in wheel tracks",
      "Commemorative plaque honoring ray of international partnership"
    ],
    tagline: "The nuclear-powered rolling laboratory climbing a Martian mountain.",
    story: `On August 6, 2012, Curiosity stunned humanity by executing the world's first 'Seven Minutes of Terror' Sky Crane descent into Gale Crater. Its primary mandate: to determine whether Mars ever offered an environment capable of supporting microbial life.

Within just eight months at Yellowknife Bay, Curiosity analyzed mudstone drills and confirmed Mars was once habitable: sweet, fresh drinkable water with carbon, hydrogen, oxygen, phosphorus, and sulfur. 

For more than a decade, Curiosity has climbed Mount Sharp (Aeolis Mons), a 5-kilometer mountain of sedimentary strata, reading the climatic transitions of Mars like chapters of an open geology book. Its wheels bear puncture wounds from jagged Martian rocks, yet its laser and laboratories continue firing tirelessly.`,
    legacy: "Proved that Mars had long-lived lakes with organic carbon compounds and chemical energy capable of sustaining microbial life.",
    finalMessage: "Continuing its ascent of the Gediz Vallis ridge, relaying weather and rock spectroscopy every single Martian afternoon."
  },
  {
    id: "opportunity-rover",
    name: "Opportunity Rover (MER-B)",
    target: "Mars",
    type: "Rover",
    status: "Mission Completed (Silent Sentinel)",
    statusColor: "#ff9100",
    launchDate: "July 7, 2003",
    landingDate: "January 25, 2004",
    site: "Meridiani Planum, Perseverance Valley, Mars (1.9462°S, 354.4734°E)",
    lifespan: "14 years, 138 days (Designed for 90 days - 55x warranty!)",
    distanceTraveled: "45.16 km (28.06 miles - Extraterrestrial Record)",
    mass: "185 kg (408 lbs)",
    powerSource: "Solar arrays (Triple-junction GaAs cells) + Lithium-ion batteries",
    image: "assets/opportunity_rover.jpg",
    model3dType: "rover_light",
    instruments: [
      "Pancam (Panoramic Camera)",
      "Mini-TES (Miniature Thermal Emission Spectrometer)",
      "Mössbauer Spectrometer",
      "APXS (Alpha Particle X-Ray Spectrometer)",
      "Microscopic Imager",
      "Rock Abrasion Tool (RAT)"
    ],
    relicsOnboard: [
      "World Trade Center Memorial: Aluminum retrieved from the ruins of the Twin Towers shaped into cable guards on both Spirit and Opportunity",
      "Student signatures on DVDs mounted on the lander"
    ],
    tagline: "The bionic explorer that outlived its warranty by 14 years.",
    story: `Opportunity struck the Martian plains inside an airbag cocoon, rolled directly into the tiny Eagle Crater—scoring an interplanetary 'hole-in-one'. Almost immediately, Opportunity discovered microscopic hematite spherules nicknamed 'Martian Blueberries', conclusively proving that acidic groundwater once covered Meridiani Planum.

Expected to survive only 90 Martian days, Opportunity was miraculously saved time and again by spontaneous 'cleaning events'—Martian dust devils that blew dust off its solar arrays. It went on to drive 45 kilometers over craters named Endurance, Victoria, and Endeavour.

In June 2018, a catastrophic planet-encircling dust storm blotted out the Sun. Opportunity's solar panels went dark in Perseverance Valley. On June 10, 2018, it sent its poignant final data: atmospheric tau of 10.8 (pitch darkness) and critically depleted voltage.`,
    legacy: "Drove more than a marathon distance on another planet; forever redefined robotic longevity and discovery in planetary science.",
    finalMessage: "Final radio transmission: 'My battery is low and it's getting dark.' Over 1,000 recovery signals were broadcast by NASA JPL until its mission was officially declared complete on February 13, 2019."
  },
  {
    id: "spirit-rover",
    name: "Spirit Rover (MER-A)",
    target: "Mars",
    type: "Rover",
    status: "Mission Completed (Stationary Landmark)",
    statusColor: "#ff9100",
    launchDate: "June 10, 2003",
    landingDate: "January 4, 2004",
    site: "Gusev Crater, Columbia Hills / 'Troy', Mars (14.5684°S, 175.47263°E)",
    lifespan: "6 years, 77 days (2,210 Sols)",
    distanceTraveled: "7.73 km (4.8 miles)",
    mass: "185 kg (408 lbs)",
    powerSource: "Solar photovoltaic panels",
    image: "assets/opportunity_rover.jpg",
    model3dType: "rover_light",
    instruments: [
      "Pancam & Navcam",
      "Mini-TES",
      "Mössbauer Spectrometer",
      "APXS",
      "Microscopic Imager",
      "Rock Abrasion Tool"
    ],
    relicsOnboard: [
      "Columbia Memorial Plaque dedicated to the lost crew of Space Shuttle Columbia STS-107",
      "9/11 World Trade Center structural recovered metal"
    ],
    tagline: "The gritty twin that climbed mountains and found ancient volcanic hot springs.",
    story: `Spirit landed in Gusev Crater, an impact basin suspected of harboring an ancient lake bed. Initial soil showed pure basaltic lava, but engineers took an audacious gamble: they drove Spirit miles toward the distant Columbia Hills. 

Against steep 30-degree slopes, Spirit climbed Husband Hill, becoming the first robot to summit an extraterrestrial mountain. When Spirit's right-front wheel seized up in 2006, the rover had to drive backward, dragging the dead wheel. 

That dragging wheel unintentionally scraped away the topsoil, uncovering a gleaming white trench of 90% pure silica—the hallmark of ancient hot springs and volcanic fumaroles. This accident proved to be one of the most vital signs of past habitable conditions ever found on Mars. In May 2009, Spirit bogged down in loose sulfate sand at 'Troy'.`,
    legacy: "Stationed forever as a silent monument at 'Troy' in Gusev Crater, its solar panels facing south under the Martian stars.",
    finalMessage: "Last communication received on March 22, 2010. NASA engineers sent over 1,200 commands to revive the pioneer before concluding operations."
  },
  {
    id: "insight-lander",
    name: "InSight Lander (SEIS & HP3)",
    target: "Mars",
    type: "Lander",
    status: "Mission Completed (Silent Sentinel)",
    statusColor: "#ff9100",
    launchDate: "May 5, 2018",
    landingDate: "November 26, 2018",
    site: "Elysium Planitia, Mars (4.502°N, 135.623°E)",
    lifespan: "4 years, 19 days (1,445 Sols)",
    distanceTraveled: "Stationary Geophysical Station",
    mass: "358 kg (789 lbs)",
    powerSource: "Twin 2.2-meter circular UltraFlex solar arrays",
    image: "assets/opportunity_rover.jpg",
    model3dType: "lander_fixed",
    instruments: [
      "SEIS (Seismic Experiment for Interior Structure)",
      "HP3 (Heat Flow and Physical Properties Package - 'The Mole')",
      "RISE (Rotation and Interior Structure Experiment)",
      "TWINS (Temperature and Winds for InSight)",
      "IDC & ICC Cameras"
    ],
    relicsOnboard: [
      "Silicon microchip containing names of 2.4 million space fans",
      "Braille coded inscription on sensor wind dome"
    ],
    tagline: "The extraterrestrial stethoscope that listened to the beating heart of Mars.",
    story: `Unlike rovers that inspect the Martian surface, InSight went deep into the Martian interior. Utilizing an ultra-sensitive French seismometer placed directly onto the ground under a robotic dome, InSight measured more than 1,300 'marsquakes'.

Through these seismic tremors, scientists revealed for the first time the internal anatomy of Mars: a molten liquid metallic core with a radius of roughly 1,830 km, a fractured crust 20 to 72 km thick, and active magma plumes beneath Cerberus Fossae.

InSight's twin circular solar panels were gradually choked by the fine red dust of Elysium Planitia. With power dropping from 5,000 watt-hours to below 300 watt-hours, InSight maintained audio and seismic transmissions until its batteries were depleted.`,
    legacy: "Created the first definitive map of the core, mantle, and crust of another terrestrial planet.",
    finalMessage: "Final transmission on December 15, 2022: 'My power's really low, so this may be the last image I can send. Don't worry about me though: my time here has been both productive and serene.'"
  },
  {
    id: "sojourner-pathfinder",
    name: "Sojourner Rover & Mars Pathfinder",
    target: "Mars",
    type: "Rover",
    status: "Mission Completed (Historic First)",
    statusColor: "#ff9100",
    launchDate: "December 4, 1996",
    landingDate: "July 4, 1997",
    site: "Ares Vallis, Chryse Planitia, Mars (19.33°N, 335.55°E)",
    lifespan: "83 Sols (Designed for 7 Sols)",
    distanceTraveled: "100 meters (330 feet)",
    mass: "11.5 kg (25.4 lbs) - Size of a microwave oven!",
    powerSource: "0.22 m² solar panel (16 Watts max) + 3 non-rechargeable D-cells",
    image: "assets/curiosity_rover.jpg",
    model3dType: "rover_light",
    instruments: [
      "Alpha Proton X-Ray Spectrometer (APXS)",
      "Three monochrome & color cameras",
      "Laser striping obstacle avoidance sensors",
      "Pathfinder lander meteorology mast & IMP stereo camera"
    ],
    relicsOnboard: [
      "Pathfinder Lander renamed the Carl Sagan Memorial Station",
      "Microchip containing names of 1.2 million citizens worldwide"
    ],
    tagline: "The microwave-sized pioneer that proved rovers could drive on Mars.",
    story: `On Independence Day 1997, Mars Pathfinder bounced across the flood-sculpted plains of Ares Vallis wrapped in giant airbags. When the petals unfurled, it revealed Sojourner—named after abolitionist and women's rights activist Sojourner Truth.

Operating with an 8-bit Intel 80C85 processor (slower than a modern digital watch) and rolling on six spiked aluminum wheels, Sojourner drove down ramps and navigated among boulders named 'Barnacle Bill', 'Yogi', and 'Scooby-Doo'. 

The mission captured the imaginations of hundreds of millions of people during the early days of the World Wide Web, generating over 500 million web hits in July 1997. It proved that autonomous robotic mobility was possible in hostile Martian dust.`,
    legacy: "The direct forefather of Spirit, Opportunity, Curiosity, and Perseverance.",
    finalMessage: "Final signal received on September 27, 1997. Sojourner circled the Carl Sagan Memorial Station and rests preserved indefinitely in Ares Vallis."
  },
  {
    id: "viking-1-2",
    name: "Viking 1 & Viking 2 Landers",
    target: "Mars",
    type: "Lander",
    status: "Mission Completed (Pioneering Sentinels)",
    statusColor: "#ff9100",
    launchDate: "August 20 & September 9, 1975",
    landingDate: "July 20, 1976 (Viking 1) & Sept 3, 1976 (Viking 2)",
    site: "Chryse Planitia (V1: 22.48°N, 47.97°W) & Utopia Planitia (V2: 47.97°N, 225.74°W)",
    lifespan: "Viking 1: 2,307 Sols (6+ years); Viking 2: 1,316 Sols",
    distanceTraveled: "Stationary Landers",
    mass: "572 kg (1,261 lbs each)",
    powerSource: "Two SNAP-19 Radioisotope Thermoelectric Generators (RTGs - 30W each)",
    image: "assets/opportunity_rover.jpg",
    model3dType: "lander_fixed",
    instruments: [
      "Biology Experiments (Pyrolytic Release, Labeled Release, Gas Exchange)",
      "Gas Chromatograph - Mass Spectrometer (GCMS)",
      "Facsimile Cameras (Stereo high-resolution color scanners)",
      "Meteorology boom (Wind, pressure, temperature)",
      "Seismometer & Surface Sampler arm"
    ],
    relicsOnboard: [
      "Bicentennial of the United States Commemorative Medallion",
      "American flag plaques on lander chassis"
    ],
    tagline: "The historic Cold-War giants that took the first color photos on Mars.",
    story: `In the bicentennial summer of 1976, NASA did what had never been done: safely touch down on Mars and operate for years. Viking 1 returned the first clear photograph from the Martian surface—revealing rocky reddish soil and a pale salmon-pink sky.

Viking carried three complex biological experiments to sniff for extraterrestrial metabolism. While results were tantalizingly ambiguous due to perchlorates in the soil, the missions revolutionized science by cataloging the atmosphere, recording weather, and monitoring Martian seasons.

Viking 1 was renamed the Thomas A. Mutch Memorial Station in 1982. It ceased transmitting on November 13, 1982, when a flawed software command sent from Earth inadvertently overwrote its high-gain antenna pointing sequence.`,
    legacy: "Held the record for longest Mars surface mission (over 6 years) until Opportunity broke it 28 years later.",
    finalMessage: "Both Viking 1 and 2 rest in pristine condition at Chryse and Utopia Planitia, waiting for future human museums."
  },
  {
    id: "phoenix-lander",
    name: "Phoenix Mars Lander",
    target: "Mars",
    type: "Lander",
    status: "Mission Completed (Martian Arctic)",
    statusColor: "#ff9100",
    launchDate: "August 4, 2007",
    landingDate: "May 25, 2008",
    site: "Green Valley, Vastitas Borealis, Mars (68.22°N, 234.25°E)",
    lifespan: "161 Sols (Exceeded 90-day goal)",
    distanceTraveled: "Stationary Arctic Explorer",
    mass: "350 kg (772 lbs)",
    powerSource: "Twin circular solar panels (400 Watts at noon)",
    image: "assets/curiosity_rover.jpg",
    model3dType: "lander_fixed",
    instruments: [
      "Robotic Arm with trenching scoop",
      "TEGA (Thermal and Evolved-Gas Analyzer)",
      "MECA (Microscopy, Electrochemistry, and Conductivity Analyzer)",
      "Surface Stereo Imager (SSI)",
      "MET (Meteorological Station with Canadian lidar)"
    ],
    relicsOnboard: [
      "The Planetary Society DVD: 'Visions of Mars' containing stories, art, and 250,000 names",
      "Miniature optical and atomic force microscopes"
    ],
    tagline: "The arctic digger that touched pure Martian water ice beneath the soil.",
    story: `Phoenix targeted the high-latitude arctic plains of Mars to verify subsurface ice detected from orbit. Landing smoothly on pulses of twelve hydrazine thrusters, Phoenix extended its 7.7-foot robotic arm and dug into the permafrost.

In a trench named 'Dodo-Goldilocks', the scoop scraped down two inches and exposed bright white dice-sized chunks. Over the next four days, cameras watched those white dice sublimate away directly into gas—conclusively proving they were pure frozen water ice, not salt.

Phoenix also detected atmospheric snow falling from Martian cirrus clouds and discovered calcium carbonate and toxic perchlorate salts. As winter approached, sunlight vanished, and dry ice frost buried the lander.`,
    legacy: "First mission to touch and taste Martian water ice in situ.",
    finalMessage: "Final signal sent on November 2, 2008. During the brutal polar winter, hundreds of kilograms of carbon dioxide ice encased Phoenix, fracturing its solar panels."
  },
  {
    id: "mro-odyssey-maven",
    name: "Mars Reconnaissance Orbiter & Odyssey",
    target: "Mars",
    type: "Orbiter / Satellite",
    status: "Active & Transmitting",
    statusColor: "#00e676",
    launchDate: "2001 (Odyssey) & 2005 (MRO)",
    landingDate: "Permanent Martian Orbit",
    site: "Sun-synchronous Mars Orbit (~300 km altitude)",
    lifespan: "Odyssey: 23+ years; MRO: 19+ years (Longest surviving planetary orbiters)",
    distanceTraveled: "Over 85,000 Martian orbits",
    mass: "2,180 kg (MRO) / 725 kg (Odyssey)",
    powerSource: "Dual high-efficiency solar arrays + NiMH batteries",
    image: "assets/orbiter_satellite.jpg",
    model3dType: "satellite_orbital",
    instruments: [
      "HiRISE (High Resolution Imaging Science Experiment - 30cm/pixel telescope)",
      "CRISM (Compact Reconnaissance Imaging Spectrometer)",
      "SHARAD (Shallow Subsurface Radar)",
      "THEMIS (Thermal Emission Imaging System)",
      "Electra UHF Telemetry Relay"
    ],
    relicsOnboard: [
      "Commemorative plaques with team dedications",
      "Ultra-stable telemetry beacons guiding every rover descent"
    ],
    tagline: "The high-definition orbital eyes and deep-space data pipeline of Mars.",
    story: `Circling Mars every 112 minutes, the Mars Reconnaissance Orbiter (MRO) with its 0.5-meter HiRISE optical telescope can photograph a dinner plate from 300 kilometers above the surface. 

HiRISE captured the iconic real-time photos of Curiosity and Perseverance descending on their parachutes through the Martian sky, as well as tracking tire tracks, dust avalanches, and shifting sand dunes.

Equally vital, Odyssey and MRO serve as the essential interplanetary communications relays. Over 90% of all scientific data, 4K photos, and audio recorded by Perseverance, Curiosity, and InSight were beamed up to MRO at UHF frequencies and then beamed across 200 million miles of space to Earth.`,
    legacy: "Without these orbiters, modern Mars rover surface exploration would be virtually impossible.",
    finalMessage: "Orbiting Mars right now, sending hundreds of gigabits of telemetry every week to NASA's Deep Space Network."
  },

  // ===================== MOON ROVERS, LANDERS & SATELLITES =====================
  {
    id: "apollo-lrv",
    name: "Apollo Lunar Roving Vehicles (LRV-1, LRV-2, LRV-3)",
    target: "Moon",
    type: "Rover",
    status: "Mission Completed (Parked on Moon)",
    statusColor: "#ff9100",
    launchDate: "Apollo 15 (1971), Apollo 16 (1972), Apollo 17 (1972)",
    landingDate: "July 31, 1971 | April 21, 1972 | Dec 11, 1972",
    site: "Hadley Rille (A15), Descartes (A16), Taurus-Littrow (A17)",
    lifespan: "Preserved indefinitely in lunar vacuum (~55+ years)",
    distanceTraveled: "LRV-1: 27.8 km; LRV-2: 26.5 km; LRV-3: 35.9 km",
    mass: "210 kg (462 lbs on Earth / 77 lbs on Moon)",
    powerSource: "Two 36-volt silver-zinc potassium hydroxide batteries (non-rechargeable)",
    image: "assets/apollo_lrv.jpg",
    model3dType: "rover_light",
    instruments: [
      "Color TV Camera with remote zoom operated from Mission Control in Houston",
      "High Gain mesh umbrella antenna",
      "Lunar Communications Relay Unit (LCRU)",
      "Traverse Gravimeter Experiment",
      "Surface Electrical Properties Transmitter",
      "Zinc-coated woven piano-wire mesh wheels with titanium chevrons"
    ],
    relicsOnboard: [
      "LRV-3 parked 100 meters away with TV camera panning up to record Apollo 17 Challenger ascent stage blast-off into lunar orbit",
      "Duct tape and laminated lunar checklist maps used to repair Apollo 17 fender",
      "Astronaut Gene Cernan's initials 'TDC' traced in dust for his daughter Tracy"
    ],
    tagline: "The world's first manned cars driven on another celestial world.",
    story: `Designed and built by Boeing and Delco in an astonishing 17 months, the Lunar Roving Vehicle was an engineering marvel. Folded like origami inside Quad 1 of the Lunar Module descent stage, astronauts pulled two nylon lanyards to let it deploy autonomously onto the regolith.

Driven by a T-shaped hand controller instead of a steering wheel, each wheel had its own independent 0.25-horsepower electric motor. Astronauts David Scott and James Irwin took the first drive at Hadley-Apennine, racing alongside a 1,000-foot deep canyon at speeds up to 13 km/h (8 mph).

On Apollo 17, when an astronaut's hammer snagged and tore off a fender, regolith dust rained down on the battery radiators. The crew fabricated an emergency replacement fender using four laminated checklist maps and gray duct tape—a legendary patch that remains on the Moon today.`,
    legacy: "All three rovers remain exactly where Gene Cernan, John Young, and Dave Scott parked them, their camera lenses aimed at the stars.",
    finalMessage: "Their instrument batteries are depleted, but their aluminum chassis, woven steel tires, and instruments sit preserved in the lunar vacuum for millennia."
  },
  {
    id: "apollo-descent-stages",
    name: "Apollo Lunar Module Descent Stages (Apollo 11-17)",
    target: "Moon",
    type: "Lander",
    status: "Mission Completed (Eternal Historic Monuments)",
    statusColor: "#00e676",
    launchDate: "1969 to 1972 (Six Successful Landings)",
    landingDate: "July 20, 1969 (Apollo 11 Eagle) to Dec 11, 1972 (Apollo 17)",
    site: "Sea of Tranquility, Ocean of Storms, Fra Mauro, Hadley, Descartes, Taurus-Littrow",
    lifespan: "Preserved forever in the cosmic stillness",
    distanceTraveled: "Stationary Launch Platforms",
    mass: "2,034 kg dry (4,484 lbs descent stage structure)",
    powerSource: "Five Silver-Zinc batteries (400 Amp-hours each)",
    image: "assets/apollo_lunar_module.jpg",
    model3dType: "lander_fixed",
    instruments: [
      "Throttleable Lunar Descent Engine (DPS - TRW rocket engine)",
      "Landing Radar & Attitude Control sensors",
      "ALSEP (Apollo Lunar Surface Experiments Package)",
      "Passive Seismic Experiments",
      "Laser Ranging Retroreflectors (still actively pulsed from Earth today!)",
      "Solar Wind Composition foil sheets"
    ],
    relicsOnboard: [
      "Apollo 11 Plaque: 'Here men from the planet Earth first set foot upon the Moon. July 1969 A.D. We came in peace for all mankind.'",
      "Silicon disc with goodwill messages from 73 world leaders",
      "Gold olive branch replica left on the Sea of Tranquility",
      "Astronaut Charlie Duke's family photograph sealed in clear plastic on Descartes Highlands",
      "Commemorative medals honoring fallen cosmonauts Yuri Gagarin & Vladimir Komarov and Apollo 1 astronauts Grissom, White, and Chaffee"
    ],
    tagline: "The golden pedestals that served as humanity's first stepping stones onto another world.",
    story: `When the Apollo Lunar Modules lifted off to return astronauts back to lunar orbit, the upper ascent stages blasted away, leaving the four-legged gold-mylar descent stages permanently on the Moon as launch pads.

On Apollo 11, Neil Armstrong piloted 'Eagle' manually past a boulder-strewn crater, touching down with less than 30 seconds of fuel remaining. On its forward landing gear strut hangs the immortal stainless steel plaque bearing President Richard Nixon's and the crew's signatures.

Six of these iconic golden descent stages remain on the lunar regolith today. Beside them lie retro-reflector prism arrays: scientists on Earth continue firing high-powered lasers at these exact Apollo reflectors today to measure the distance to the Moon down to the millimeter!`,
    legacy: "Humanity's first extraterrestrial archaeological sites, legally designated protected heritage under the U.S. One Small Step to Protect Human Heritage in Space Act.",
    finalMessage: "Standing silently on the airless lunar plains, their gold Kapton foil gleaming beneath the unfiltered sunlight."
  },
  {
    id: "surveyor-program",
    name: "Surveyor Program (Surveyors 1, 3, 5, 6, 7)",
    target: "Moon",
    type: "Lander",
    status: "Mission Completed (Historic Trailblazers)",
    statusColor: "#ff9100",
    launchDate: "1966 – 1968 (7 missions, 5 successful)",
    landingDate: "Surveyor 1 landed June 2, 1966",
    site: "Ocean of Storms (S1 & S3), Sea of Tranquility (S5), Sinus Medii (S6), Tycho Crater (S7)",
    lifespan: "Mission durations: Days to months",
    distanceTraveled: "Surveyor 6 hopped 8 feet across the surface on thrusters",
    mass: "294 kg (648 lbs landed mass)",
    powerSource: "Solar panel generating 85 Watts + Silver-zinc battery",
    image: "assets/orbiter_satellite.jpg",
    model3dType: "lander_fixed",
    instruments: [
      "Television Camera with mirror scanner",
      "Surface Sampler scoop on pantograph arm",
      "Alpha Scattering Instrument for soil chemical composition",
      "Strain gauges on landing leg shock absorbers"
    ],
    relicsOnboard: [
      "Surveyor 3 visited by Apollo 12 astronauts Pete Conrad and Alan Bean in Nov 1969!",
      "Camera and scoop retrieved and brought back to Earth for microbiological examination"
    ],
    tagline: "The robotic pioneers that proved the Moon's surface would not swallow a spacecraft.",
    story: `Before Apollo, prominent astrophysicists feared that the Moon was covered in a deep sea of powdery dust that would immediately swallow any landing spacecraft. Surveyor 1 proved them wrong on June 2, 1966, by executing a gentle radar-guided soft landing in Oceanus Procellarum and sinking only two inches into the soil.

In November 1969, Apollo 12 achieved a pinpoint landing just 600 feet from Surveyor 3. Astronauts Pete Conrad and Alan Bean walked over, photographed the robotic scout, and removed its TV camera and mechanical scoop to bring them home to Earth.

Analysis of the Surveyor 3 camera back in Houston found viable Streptococcus mitis bacteria inside the polyurethane foam—sparking fierce debates over interplanetary contamination and bacterial hardiness in deep space.`,
    legacy: "Provided the vital soil mechanics and thermal data that made Neil Armstrong's walk on the Moon possible.",
    finalMessage: "Surveyor 1, 3, 5, 6, and 7 remain on their respective landing plains on the lunar nearside."
  },
  {
    id: "lro-orbiter",
    name: "Lunar Reconnaissance Orbiter (LRO)",
    target: "Moon",
    type: "Orbiter / Satellite",
    status: "Active & Transmitting",
    statusColor: "#00e676",
    launchDate: "June 18, 2009",
    landingDate: "Permanent Lunar Polar Orbit",
    site: "50 km polar orbit above the Moon",
    lifespan: "Active (15+ years in continuous operation)",
    distanceTraveled: "Over 70,000 lunar orbits",
    mass: "1,916 kg (4,224 lbs)",
    powerSource: "Articulated solar array generating 1,850 Watts + Li-ion battery",
    image: "assets/orbiter_satellite.jpg",
    model3dType: "satellite_orbital",
    instruments: [
      "LROC (Lunar Reconnaissance Orbiter Camera - Narrow & Wide Angle)",
      "LOLA (Lunar Orbiter Laser Altimeter - 4 billion height measurements)",
      "Diviner (Lunar Radiometer Experiment - temperature extremes)",
      "LAMP (Lyman-Alpha Mapping Project - looking into dark craters)",
      "CRaTER (Cosmic Ray Telescope for the Effects of Radiation)",
      "Mini-RF (Synthetic Aperture Radar for water ice)"
    ],
    relicsOnboard: [
      "3D digital topographic library of every Apollo landing site",
      "Names of 1.6 million people inscribed on a microchip"
    ],
    tagline: "The supreme cartographer mapping the Moon down to human footprints.",
    story: `Launched in 2009, LRO revolutionized our understanding of the Moon. Its narrow-angle cameras possess such razor sharpness that they photographed the Apollo 11, 12, 14, 15, 16, and 17 descent stages, rover tracks, ALSEP experiment clusters, and even the dark trails of astronaut footprints left in the regolith.

LRO also mapped the south polar permanently shadowed regions (craters where sunlight has not shone for over two billion years), discovering that these cold traps plummet to -246°C (-410°F)—making them colder than Pluto.

Within these eternal shadows, LRO detected substantial deposits of water ice, pinpointing the exact landing zones designated for NASA's upcoming crewed Artemis missions.`,
    legacy: "Built the highest-resolution topographic and thermal atlas of any celestial body in the solar system.",
    finalMessage: "Transmitting hundreds of petabytes of laser altimetry and photography to NASA Goddard daily."
  },
  {
    id: "lcross-satellite",
    name: "LCROSS & Lunar Prospector (Impact Probes)",
    target: "Moon",
    type: "Impact Satellite",
    status: "Mission Completed (Deliberate Lunar Impact)",
    statusColor: "#ff9100",
    launchDate: "Jan 6, 1998 (Prospector) & June 18, 2009 (LCROSS)",
    landingDate: "July 31, 1999 (Prospector) & Oct 9, 2009 (LCROSS)",
    site: "Cabeus Crater South Pole (LCROSS) & Shoemaker Crater (Prospector)",
    lifespan: "Mission Completed by scientific impact",
    distanceTraveled: "Direct kinetic impact at 9,000 km/h (5,600 mph)",
    mass: "LCROSS Shepherding Spacecraft: 891 kg + Centaur stage: 2,366 kg",
    powerSource: "Solar cells until planned kinetic collision",
    image: "assets/orbiter_satellite.jpg",
    model3dType: "satellite_orbital",
    instruments: [
      "Near-Infrared & Visible Spectrometers",
      "Mid-Infrared Thermal Cameras",
      "Photometer",
      "Gamma-Ray Spectrometer (Lunar Prospector)",
      "Neutron Spectrometer"
    ],
    relicsOnboard: [
      "Lunar Prospector carried a 3-inch brass urn containing 1 ounce of the ashes of legendary astrogeologist Dr. Eugene Shoemaker—the first human buried on the Moon!",
      "LCROSS kinetic impact plume recorded by Hubble, LRO, and telescopes across Earth"
    ],
    tagline: "The audacious probes that slammed into craters to prove water existed on the Moon.",
    story: `For decades, scientists debated whether the Moon was completely dry or held ice hidden in polar shadows. In 2009, NASA launched LCROSS piggybacked onto the Atlas V Centaur upper stage.

On October 9, 2009, NASA intentionally guided the empty 2-ton Centaur rocket into Cabeus crater at 9,000 km/h, excavating a crater 20 meters wide. Four minutes behind it, the LCROSS Shepherding Spacecraft flew directly through the kicked-up debris cloud, measuring its spectral fingerprint before also impacting.

The spectral results were unambiguous: the blast threw up at least 300 pounds of pure water vapor and ice crystals, along with hydroxyl, methane, ammonia, and silver. It was the definitive proof that the Moon holds billions of gallons of life-giving water ice.`,
    legacy: "Conclusively discovered water on the Moon, turning the lunar poles into the premier destination for human colonization.",
    finalMessage: "Their fragments now rest inside Cabeus and Shoemaker craters at the Moon's South Pole, permanently intertwined with lunar water ice."
  },
  {
    id: "ladee-mission",
    name: "LADEE (Lunar Atmosphere and Dust Explorer)",
    target: "Moon",
    type: "Orbiter / Satellite",
    status: "Mission Completed (Lunar Impact)",
    statusColor: "#ff9100",
    launchDate: "September 6, 2013",
    landingDate: "April 18, 2014 (Impact on Farside)",
    site: "Eastern rim of Sundman V crater, lunar farside",
    lifespan: "225 days of science operations",
    distanceTraveled: "Low altitude orbits (12 to 50 km above surface)",
    mass: "383 kg (844 lbs)",
    powerSource: "Body-mounted solar arrays generating 295 Watts",
    image: "assets/orbiter_satellite.jpg",
    model3dType: "satellite_orbital",
    instruments: [
      "LDEX (Lunar Dust Experiment)",
      "NMS (Neutral Mass Spectrometer)",
      "UVS (Ultraviolet and Visible Spectrometer)",
      "LLCD (Lunar Laser Communication Demonstration - historic 622 Mbps laser link to Earth!)"
    ],
    relicsOnboard: [
      "LLCD laser comm system that downloaded data at broadband speeds via pulsed laser beams",
      "Names of aerospace students embedded in memory chip"
    ],
    tagline: "The scout that solved Apollo's mysterious levitating dust streamers.",
    story: `During Apollo 17, astronaut Gene Cernan sketched mysterious glowing streamers and twilight rays along the lunar sunrise horizon. To determine if electrostatically charged dust grains were floating in the lunar vacuum, NASA dispatched LADEE.

Skimming as low as 12 kilometers above jagged lunar mountain peaks, LADEE gathered atmospheric samples and proved that the Moon is enveloped in a tenuous, asymmetric cloud of dust particles constantly kicked up by micrometeorite bombardments.

LADEE also demonstrated the historic Lunar Laser Communication Demonstration (LLCD), transmitting error-free high-definition video across 384,000 kilometers using an infrared laser at 622 Megabits per second—surpassing standard Earth home fiber optics!`,
    legacy: "Proved deep-space laser communications and uncovered the true dynamics of the lunar exosphere.",
    finalMessage: "On April 18, 2014, LADEE made a planned high-speed impact on the lunar farside crater Sundman V at 5,800 km/h."
  }
];

// Planetary stats for the celestial switch bar
const PLANETARY_STATS = {
  Moon: {
    name: "Luna (The Moon)",
    distance: "384,400 km from Earth",
    lightDelay: "1.28 light-seconds",
    gravity: "1.62 m/s² (16.6% of Earth)",
    atmosphere: "Surface Boundary Exosphere (<10⁻¹⁰ Pa)",
    surfaceTemp: "-130°C to +120°C (Polar: -246°C)",
    relicsCount: "9 Historic NASA Artifact Clusters & Orbiters",
    surfaceColor: "#8c92a4",
    accentGlow: "#00b0ff",
    summary: "Earth's companion, preserving humanity's first footsteps, robotic scouts, and parked Apollo rovers untouched by atmospheric erosion for all eternity."
  },
  Mars: {
    name: "Ares (Mars - The Red Planet)",
    distance: "54.6M to 401M km (Avg: 225M km)",
    lightDelay: "3 to 22 light-minutes (Avg: 12.5 min)",
    gravity: "3.72 m/s² (38% of Earth)",
    atmosphere: "95.3% CO₂, 0.6% Earth pressure (610 Pa)",
    surfaceTemp: "-140°C to +20°C (Avg: -63°C)",
    relicsCount: "9 Iconic NASA Rovers, Landers & High-Gain Orbiters",
    surfaceColor: "#e65100",
    accentGlow: "#ff5722",
    summary: "The rust-covered ancient world where NASA's robotic armada hunts for biosignatures, traverses canyons, climbs mountains, and caches rocks for human return."
  }
};
