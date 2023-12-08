import { MdClose, MdOutlineMenuOpen } from "react-icons/md/index.js";

export const scrollBarStyles =
  "thin-scrollbar scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thumb-dv-900 scrollbar-track-lilac";

export const imitationOverlay = "absolute inset-0 bg-dv-900 opacity-50 z-10";

// ICONS
export const CloseIcon = <MdClose />;
export const MenuIcon = <MdOutlineMenuOpen />;

// IMAGES
export const NavBarLogo = "/images/core/DVchibiLogo.png";
export const DVLogo = "/images/core/DVLogo.png";
export const DVNameLogo = "/images/core/DVNameOnly.png";
export const LittleDV = "/images/core/darkVioletMain.png";
export const violetsLarge = "/images/core/violetsRow.png";
export const violetsSmall = "/images/core/violetsRowSmall.png";
export const violetsTwo = "/images/core/violetsRowTwo.png";

// STYLES
export const cursiveText =
  "font-cursive text-dv-400 text-shadow-dvTextShadow text-[25px]";
export const borderShadow = "border-[1.5px] border-dv-800 shadow-dvShadow";

// CARD COLORS
export const cardColors = [
  "bg-dv-500",
  "bg-dv-600",
  "bg-lilac",
  "bg-dv-300",
  "bg-dv-700",
  "bg-purple",
  "bg-mauve",
];

// ----------------- TEMP VALUES FOR DEV / DESIGN ----------------- //

export const Stories = [
  {
    id: "1",
    title: "The Whispering Woods",
    summary:
      "In a realm where trees communicate secrets, a hidden path reveals itself.",
    content:
      "The adventure begins as Dark Violet stumbles upon a mystical forest, where each tree whispers ancient tales. Guided by the whispers, she navigates through the enigmatic woods, uncovering hidden truths and mystical artifacts.",
    authorId: "MysticScribe001",
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
    tags: ["fantasy", "mystery", "nature"],
  },
  {
    id: "2",
    title: "The Echoes of Infinity",
    summary:
      "A cosmic journey through time and space, exploring the fabric of the universe.",
    content:
      "Dark Violet embarks on a celestial odyssey, traversing through various dimensions and experiencing the echoes of infinity. Along the way, she encounters beings of light and darkness, learning profound cosmic truths.",
    authorId: "CelestialStoryteller002",
    isActive: true,
    createdAt: new Date("2023-01-02"),
    updatedAt: new Date("2023-01-02"),
    tags: ["cosmos", "adventure", "mystical"],
  },
  {
    id: "3",
    title: "The Alchemist's Dream",
    summary:
      "An exploration of transformation and the quest for the Philosopher's Stone.",
    content:
      "In a tale of alchemy and transformation, Dark Violet assists a wise but forgotten alchemist in his quest to create the Philosopher's Stone. Their journey is filled with mystical symbols and transformative experiences.",
    authorId: "SageOfShadows003",
    isActive: true,
    createdAt: new Date("2023-01-03"),
    updatedAt: new Date("2023-01-03"),
    tags: ["alchemy", "transformation", "philosophy"],
  },
  {
    id: "4",
    title: "Shadows of the Mind",
    summary:
      "Delving into the labyrinth of the subconscious, where dreams and reality merge.",
    content:
      "Dark Violet enters the realm of dreams, navigating through the labyrinth of the subconscious. In this world where reality and dreams intertwine, she encounters shadowy figures representing hidden fears and desires.",
    authorId: "Dreamweaver004",
    isActive: true,
    createdAt: new Date("2023-01-04"),
    updatedAt: new Date("2023-01-04"),
    tags: ["subconscious", "dreams", "mystery"],
  },
  {
    id: "5",
    title: "The Dance of Elements",
    summary: "A journey to harmonize the elemental forces of nature.",
    content:
      "Tasked with restoring balance, Dark Violet travels to the elemental kingdoms. She must persuade the embodiments of Earth, Air, Fire, and Water to harmonize, preventing an impending natural catastrophe.",
    authorId: "ElementalEnchanter005",
    isActive: true,
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-01-05"),
    tags: ["nature", "elements", "balance"],
  },
  {
    id: "6",
    title: "Chronicles of the Lost City",
    summary: "Uncovering the mysteries of an ancient, hidden civilization.",
    content:
      "Dark Violet discovers clues leading to a lost city, believed to hold ancient wisdom. As she explores the forgotten ruins, she unravels the city's mysterious past and its connection to her own destiny.",
    authorId: "KeeperOfSecrets006",
    isActive: true,
    createdAt: new Date("2023-01-06"),
    updatedAt: new Date("2023-01-06"),
    tags: ["exploration", "ancient", "mystery"],
  },
  {
    id: "7",
    title: "The Mirror of Souls",
    summary: "A magical mirror that reflects the true essence of one's soul.",
    content:
      "Dark Violet encounters a mystical mirror that reveals the true nature of anyone who looks into it. As she delves deeper, she confronts her own inner truths and helps others face their deepest selves.",
    authorId: "MirrorMage007",
    isActive: true,
    createdAt: new Date("2023-01-07"),
    updatedAt: new Date("2023-01-07"),
    tags: ["self-discovery", "mystery", "magical"],
  },
  {
    id: "8",
    title: "The Labyrinth of Illusions",
    summary: "A test of perception and reality in a maze of deceptions.",
    content:
      "In a maze where reality is distorted, Dark Violet must use her intuition and wisdom to navigate through a series of illusions, puzzles, and hidden truths, challenging her perception of reality.",
    authorId: "MasterOfIllusions008",
    isActive: true,
    createdAt: new Date("2023-01-08"),
    updatedAt: new Date("2023-01-08"),
    tags: ["illusion", "mystery", "challenge"],
  },
  {
    id: "9",
    title: "The Eternal Night",
    summary:
      "A journey to bring back the light in a world enveloped by eternal darkness.",
    content:
      "Dark Violet embarks on a quest to end an unending night that has fallen over the land. She must gather ancient relics and summon the courage to confront the darkness, bringing back the dawn.",
    authorId: "GuardianOfLight009",
    isActive: true,
    createdAt: new Date("2023-01-09"),
    updatedAt: new Date("2023-01-09"),
    tags: ["darkness", "quest", "light"],
  },
  {
    id: "10",
    title: "The Symphony of the Stars",
    summary: "A cosmic event where the harmony of the universe is at stake.",
    content:
      "In a race against time, Dark Violet must unite the celestial musicians to perform the Symphony of the Stars, a musical event that maintains the harmony of the universe and prevents cosmic discord.",
    authorId: "CosmicComposer010",
    isActive: true,
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-10"),
    tags: ["cosmic", "music", "harmony"],
  },
];

export const Characters = [
  {
    id: "character1",
    name: "The Whispering Elder",
    isActive: true,
    storyId: "1",
    rolePlayerId: "playerOne",
    summary:
      "A wise, ancient tree that communicates secrets of the forest to Dark Violet.",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "character2",
    name: "Silent Fox",
    isActive: true,
    storyId: "1",
    rolePlayerId: "playerTwo",
    summary:
      "A mystical fox that guides Dark Violet through the woods with its silent wisdom.",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "character3",
    name: "Mystic Raven",
    isActive: true,
    storyId: "1",
    rolePlayerId: "playerThree",
    summary:
      "A raven with the ability to perceive hidden truths and reveal them to those who listen.",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "character4",
    name: "Orion the Lightbringer",
    isActive: true,
    storyId: "2",
    rolePlayerId: "playerFour",
    summary:
      "A celestial being of light who guides Dark Violet through the cosmos.",
    createdAt: new Date("2023-01-02"),
    updatedAt: new Date("2023-01-02"),
  },
  {
    id: "character5",
    name: "Shadow Weaver",
    isActive: true,
    storyId: "2",
    rolePlayerId: "playerFive",
    summary:
      "A mysterious entity that embodies the darker aspects of the universe.",
    createdAt: new Date("2023-01-02"),
    updatedAt: new Date("2023-01-02"),
  },
  {
    id: "character6",
    name: "Star Whisperer",
    isActive: true,
    storyId: "2",
    rolePlayerId: "playerSix",
    summary:
      "A sage who speaks the ancient language of the stars and shares cosmic knowledge.",
    createdAt: new Date("2023-01-02"),
    updatedAt: new Date("2023-01-02"),
  },
  {
    id: "character7",
    name: "Alaric the Alchemist",
    isActive: true,
    storyId: "3",
    rolePlayerId: "playerSeven",
    summary:
      "A forgotten alchemist seeking the secrets of transmutation and the Philosopher's Stone.",
    createdAt: new Date("2023-01-03"),
    updatedAt: new Date("2023-01-03"),
  },
  // Continuation from previous characters 1-6

  {
    id: "character7",
    name: "Alaric the Alchemist",
    isActive: true,
    storyId: "3",
    rolePlayerId: "playerSeven",
    summary:
      "A forgotten alchemist seeking the secrets of transmutation and the Philosopher's Stone.",
    createdAt: new Date("2023-01-03"),
    updatedAt: new Date("2023-01-03"),
  },
  {
    id: "character8",
    name: "Flame Sprite",
    isActive: true,
    storyId: "3",
    rolePlayerId: "playerEight",
    summary:
      "A playful elemental spirit of fire, aiding in the alchemical processes.",
    createdAt: new Date("2023-01-03"),
    updatedAt: new Date("2023-01-03"),
  },
  {
    id: "character9",
    name: "Ethereal Serpent",
    isActive: true,
    storyId: "3",
    rolePlayerId: "playerNine",
    summary:
      "A mystical serpent that represents wisdom and the transformative power of alchemy.",
    createdAt: new Date("2023-01-03"),
    updatedAt: new Date("2023-01-03"),
  },
  {
    id: "character10",
    name: "Dream Wanderer",
    isActive: true,
    storyId: "4",
    rolePlayerId: "playerTen",
    summary:
      "A nomadic spirit that traverses the dream realm, encountering Dark Violet in her subconscious explorations.",
    createdAt: new Date("2023-01-04"),
    updatedAt: new Date("2023-01-04"),
  },
  {
    id: "character11",
    name: "Nightmare Phantom",
    isActive: true,
    storyId: "4",
    rolePlayerId: "playerEleven",
    summary:
      "An embodiment of fears and nightmares, challenging Dark Violet in the dream world.",
    createdAt: new Date("2023-01-04"),
    updatedAt: new Date("2023-01-04"),
  },
  {
    id: "character12",
    name: "Echo of Truth",
    isActive: true,
    storyId: "4",
    rolePlayerId: "playerTwelve",
    summary:
      "A mysterious figure that represents the hidden truths within the subconscious.",
    createdAt: new Date("2023-01-04"),
    updatedAt: new Date("2023-01-04"),
  },
  {
    id: "character13",
    name: "Terra the Earth Guardian",
    isActive: true,
    storyId: "5",
    rolePlayerId: "playerThirteen",
    summary:
      "The embodiment of Earth, representing strength and stability in the elemental kingdom.",
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-01-05"),
  },
  {
    id: "character14",
    name: "Zephyr the Air Spirit",
    isActive: true,
    storyId: "5",
    rolePlayerId: "playerFourteen",
    summary:
      "A gentle and elusive spirit of the Air, embodying freedom and wisdom.",
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-01-05"),
  },
  {
    id: "character15",
    name: "Blaze the Fire Lord",
    isActive: true,
    storyId: "5",
    rolePlayerId: "playerFifteen",
    summary:
      "A fiery and passionate leader of the Fire element, symbolizing transformation.",
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-01-05"),
  },
  {
    id: "character16",
    name: "Aqua the Water Nymph",
    isActive: true,
    storyId: "5",
    rolePlayerId: "playerSixteen",
    summary:
      "A graceful and flowing nymph of the Water, representing emotion and intuition.",
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-01-05"),
  },
  {
    id: "character17",
    name: "Ancient Librarian",
    isActive: true,
    storyId: "6",
    rolePlayerId: "playerSeventeen",
    summary:
      "A keeper of ancient knowledge in the ruins of the lost city, guiding Dark Violet through its history.",
    createdAt: new Date("2023-01-06"),
    updatedAt: new Date("2023-01-06"),
  },
  {
    id: "character18",
    name: "Guardian of Ruins",
    isActive: true,
    storyId: "6",
    rolePlayerId: "playerEighteen",
    summary:
      "A protector of the lost city's secrets, challenging those who seek its hidden wisdom.",
    createdAt: new Date("2023-01-06"),
    updatedAt: new Date("2023-01-06"),
  },
  {
    id: "character19",
    name: "Echo of the Past",
    isActive: true,
    storyId: "6",
    rolePlayerId: "playerNineteen",
    summary:
      "A spectral figure representing the lost city's past and its connection to Dark Violet.",
    createdAt: new Date("2023-01-06"),
    updatedAt: new Date("2023-01-06"),
  },
  {
    id: "character20",
    name: "Mirror Wraith",
    isActive: true,
    storyId: "7",
    rolePlayerId: "playerTwenty",
    summary:
      "A guardian of the magical mirror, revealing the true nature of those who dare to look.",
    createdAt: new Date("2023-01-07"),
    updatedAt: new Date("2023-01-07"),
  },
  {
    id: "character21",
    name: "Soul Searcher",
    isActive: true,
    storyId: "7",
    rolePlayerId: "playerTwentyOne",
    summary:
      "A seeker of truth and inner wisdom, drawn to the revealing powers of the mirror.",
    createdAt: new Date("2023-01-07"),
    updatedAt: new Date("2023-01-07"),
  },
  {
    id: "character22",
    name: "Reflection of Reality",
    isActive: true,
    storyId: "7",
    rolePlayerId: "playerTwentyTwo",
    summary:
      "An enigmatic presence within the mirror, showing the viewers their deepest realities.",
    createdAt: new Date("2023-01-07"),
    updatedAt: new Date("2023-01-07"),
  },
  {
    id: "character23",
    name: "Illusionist",
    isActive: true,
    storyId: "8",
    rolePlayerId: "playerTwentyThree",
    summary:
      "A master of deception and creator of the maze, testing the perception of all who enter.",
    createdAt: new Date("2023-01-08"),
    updatedAt: new Date("2023-01-08"),
  },
  {
    id: "character24",
    name: "Keeper of Truths",
    isActive: true,
    storyId: "8",
    rolePlayerId: "playerTwentyFour",
    summary:
      "A mystical figure holding the keys to the truths hidden within the labyrinth.",
    createdAt: new Date("2023-01-08"),
    updatedAt: new Date("2023-01-08"),
  },
  {
    id: "character25",
    name: "Maze Master",
    isActive: true,
    storyId: "8",
    rolePlayerId: "playerTwentyFive",
    summary:
      "The overseer of the labyrinth, guiding or misguiding adventurers through its twists and turns.",
    createdAt: new Date("2023-01-08"),
    updatedAt: new Date("2023-01-08"),
  },
  {
    id: "character26",
    name: "Night Walker",
    isActive: true,
    storyId: "9",
    rolePlayerId: "playerTwentySix",
    summary:
      "A mysterious figure who thrives in the darkness of the eternal night, aiding or hindering Dark Violet.",
    createdAt: new Date("2023-01-09"),
    updatedAt: new Date("2023-01-09"),
  },
  {
    id: "character27",
    name: "Dawn Harbinger",
    isActive: true,
    storyId: "9",
    rolePlayerId: "playerTwentySeven",
    summary:
      "A bringer of hope who possesses the knowledge to end the eternal darkness.",
    createdAt: new Date("2023-01-09"),
    updatedAt: new Date("2023-01-09"),
  },
  {
    id: "character28",
    name: "Keeper of Relics",
    isActive: true,
    storyId: "9",
    rolePlayerId: "playerTwentyEight",
    summary:
      "A guardian of ancient relics necessary to bring back the light to the world.",
    createdAt: new Date("2023-01-09"),
    updatedAt: new Date("2023-01-09"),
  },
  {
    id: "character29",
    name: "Star Singer",
    isActive: true,
    storyId: "10",
    rolePlayerId: "playerTwentyNine",
    summary:
      "A celestial being with a voice that harmonizes the stars, essential to the cosmic symphony.",
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-10"),
  },
  {
    id: "character30",
    name: "Celestial Musician",
    isActive: true,
    storyId: "10",
    rolePlayerId: "playerThirty",
    summary:
      "An instrumentalist of the cosmos, playing the music that keeps the universe in balance.",
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-10"),
  },
  {
    id: "character31",
    name: "Harmony Keeper",
    isActive: true,
    storyId: "10",
    rolePlayerId: "playerThirtyOne",
    summary:
      "A custodian of cosmic harmony, working to maintain the balance of the universal forces.",
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-10"),
  },
];
