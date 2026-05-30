export interface Breed {
  id: string;
  name: string;
  category: "fluffiest" | "pocket-pals" | "gentle-giants" | "energy-bundles" | "super-smarties";
  fluffinessRating: number; // 1-5
  playfulnessRating: number; // 1-5
  images: {
    puppy: string;
    adult: string;
  };
  character: {
    playfulness: string;
    kidFriendly: string;
    personality: string;
  };
  care: {
    bedding: string;
    grooming: string;
    idealOwner: string;
  };
  diet: string;
}

export const CATEGORIES = [
  { id: "all", label: "✨ All Pups", emoji: "🐶", color: "from-pink-100 to-lavender-100" },
  { id: "fluffiest", label: "The Fluffiest!", emoji: "☁️", color: "from-blue-50 to-pink-100" },
  { id: "pocket-pals", label: "Pocket Pals", emoji: "🎒", color: "from-yellow-100 to-pink-100" },
  { id: "gentle-giants", label: "Gentle Giants", emoji: "🦁", color: "from-purple-100 to-pink-100" },
  { id: "energy-bundles", label: "Energy Bundles", emoji: "⚡", color: "from-orange-100 to-yellow-100" },
  { id: "super-smarties", label: "Super Smarties", emoji: "🎓", color: "from-teal-100 to-pink-100" }
];

export const BREEDS: Breed[] = [
  {
    id: "pomeranian",
    name: "Pomeranian",
    category: "fluffiest",
    fluffinessRating: 5,
    playfulnessRating: 4,
    images: {
      puppy: "https://images.unsplash.com/photo-1593134257782-e89fc6f62271?auto=format&fit=crop&q=80&w=800",
      adult: "https://images.unsplash.com/photo-1529429617124-95b109e86bb5?auto=format&fit=crop&q=80&w=800"
    },
    character: {
      playfulness: "Super-duper high!",
      kidFriendly: "Very happy with children who are gentle!",
      personality: "Pomeranians are like living cotton balls! They are tiny but carry a huge personality. They love to spin around, perform little tricks, and follow you around like a bright little shadow."
    },
    care: {
      bedding: "Prefers a super fluffy circular bed that resembles a soft cloud.",
      grooming: "Needs brushing every single day to avoid looking like a static balloon!",
      idealOwner: "Someone who loves grooming fluffy hair and carrying around a tiny friend."
    },
    diet: "Small crunchy kibble with little tiny bites of steamed carrots."
  },
  {
    id: "samoyed",
    name: "Samoyed",
    category: "fluffiest",
    fluffinessRating: 5,
    playfulnessRating: 5,
    images: {
      puppy: "https://images.unsplash.com/photo-1529906920574-628dc1e49f5a?auto=format&fit=crop&q=80&w=800",
      adult: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=800"
    },
    character: {
      playfulness: "Always up for a game in the snow!",
      kidFriendly: "Practically a giant, living teddy bear!",
      personality: "Known as the breed with a permanent smile! Samoyeds look like happy snow clouds. They have a brilliant smiley mouth that naturally curves upwards so they always look delighted to see you."
    },
    care: {
      bedding: "Enjoys cool tiles during summer, or a thick orthopedic mat in a breezy room.",
      grooming: "Requires lots of combing because their white coat is double-layered and incredibly thick.",
      idealOwner: "An active family that enjoys outdoor hikes, cooler weather, and brushing clouds."
    },
    diet: "Mainly wholesome fish-and-kibble mix to keep that white coat shiny and soft."
  },
  {
    id: "chow-chow",
    name: "Chow Chow",
    category: "fluffiest",
    fluffinessRating: 5,
    playfulnessRating: 3,
    images: {
      puppy: "https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?auto=format&fit=crop&q=80&w=800",
      adult: "https://images.unsplash.com/photo-1504826260979-24647fa9ea48?auto=format&fit=crop&q=80&w=800"
    },
    character: {
      playfulness: "Quiet, calm, and prefers watching over playing.",
      kidFriendly: "Loves their own family children very much!",
      personality: "They look like little lions with a thick mane of hair and a super special blue-black tongue! Yes, their tongue is actually purple-blue, which makes them look like they just ate a blueberry popsicle."
    },
    care: {
      bedding: "Prefers a quiet, cool corner of the house with a spacious, soft mat.",
      grooming: "Very heavy brushing to keep their majestic mane from getting tangled.",
      idealOwner: "A calm owner who understands that dogs like their quiet space sometimes."
    },
    diet: "Very high-quality dry kibble with delicious fresh pumpkin purees for digestion."
  },
  {
    id: "bichon-frise",
    name: "Bichon Frise",
    category: "fluffiest",
    fluffinessRating: 5,
    playfulnessRating: 5,
    images: {
      puppy: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=800",
      adult: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80&w=800"
    },
    character: {
      playfulness: "A bundle of pure happiness and bouncy hops!",
      kidFriendly: "10/10 - Absolutely loves playgroups!",
      personality: "A Bichon Frise is basically a cheerful marshmallow on legs! They have a soft, hyper-curly white coat that bouncy-bounces whenever they run. They are natural clowns who live to make people giggle."
    },
    care: {
      bedding: "Enjoys tiny, soft donut beds next to their favorite human's couch.",
      grooming: "Hypoallergenic coat that doesn't shed much, but needs regular trimmings to look like a cotton puff.",
      idealOwner: "Families looking for a playful, hypoallergenic puppy who never gets grumpy."
    },
    diet: "Crunchy puppy kibble mixed with small spoon-bites of fresh sweet potato."
  },
  {
    id: "chihuahua",
    name: "Chihuahua",
    category: "pocket-pals",
    fluffinessRating: 1,
    playfulnessRating: 4,
    images: {
      puppy: "https://images.unsplash.com/photo-1514984879728-be0aff75a6e8?auto=format&fit=crop&q=80&w=800",
      adult: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800"
    },
    character: {
      playfulness: "Feisty, energetic, and very curious!",
      kidFriendly: "Great with calm, older kids who know how to protect tiny friends.",
      personality: "Chihuahuas may be the smallest dog breed in the entire galaxy, but they have the heart of a mighty warrior! They love snuggle sessions under cozy blankets and are super loyal to their owners."
    },
    care: {
      bedding: "They adore burying themselves deep under a warm, soft fleece blanket.",
      grooming: "Very low maintenance - just a wipe with a damp cloth or a quick soft brush.",
      idealOwner: "Perfect for apartments or families who love to carry their tiny pals in a cute travel bag."
    },
    diet: "Teeny-tiny micro-kibbles and some boiled chicken shreds as a treats award."
  },
  {
    id: "french-bulldog",
    name: "French Bulldog",
    category: "pocket-pals",
    fluffinessRating: 1,
    playfulnessRating: 5,
    images: {
      puppy: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800",
      adult: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80&w=800"
    },
    character: {
      playfulness: "A solid couch-potato adventurer!",
      kidFriendly: "Unbelievably friendly, sturdy, and tolerant.",
      personality: "With huge 'bat ears' and a snuggly, wrinkly face, Frenchies are comical and sweet. They make funny snorting sounds when they get excited and love taking short naps followed by silly, jumpy playtime."
    },
    care: {
      bedding: "A memory-foam bolster bed that gives them a soft spot to rest their heavy little chins.",
      grooming: "Simple weekly brushing, but you must gently clean agreements inside their nose wrinkles!",
      idealOwner: "Anyone looking for a low-energy, highly amusing dog who loves cuddling and snoring."
    },
    diet: "Small grain-free meals that help reduce gas (Frenchies can be quite bubbly!)."
  },
  {
    id: "pug",
    name: "Pug",
    category: "pocket-pals",
    fluffinessRating: 2,
    playfulnessRating: 5,
    images: {
      puppy: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&q=80&w=800",
      adult: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=800"
    },
    character: {
      playfulness: "High levels of silliness!",
      kidFriendly: "Absolute champions with children!",
      personality: "Pugs are little clowns wrapped in wrinkly coats! They have big expressive eyes that can look very dramatic, and a curly tail that twists like a perfect cinnamon roll. They love playing hide-and-seek."
    },
    care: {
      bedding: "A plush, warm beanbag bed, or right in the middle of your bed under the duvet.",
      grooming: "They shed surprisingly much for short hair! Needs a soft rubber brush twice a week.",
      idealOwner: "A family who wants a buddy that constantly makes funny expressions and loves hugs."
    },
    diet: "Highly controlled portions (Pugs love eating so much they can get chubby very quickly!)."
  },
  {
    id: "golden-retriever",
    name: "Golden Retriever",
    category: "gentle-giants",
    fluffinessRating: 4,
    playfulnessRating: 5,
    images: {
      puppy: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800",
      adult: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=800"
    },
    character: {
      playfulness: "Super high! They love toys!",
      kidFriendly: "Absolutely loves kids more than anything!",
      personality: "Golden Retrievers are like walking sunshine! They have a heart full of gold and live to retrieve things — whether it's a tennis ball, a stick, or even an old sock they found under your bed."
    },
    care: {
      bedding: "Enjoys a large, soft orthopedic mattress on the floor of your bedroom.",
      grooming: "Regular brushing is needed to keep their beautiful golden coat shiny and knot-free.",
      idealOwner: "Families who love playing fetch in the park and going on fun forest adventures."
    },
    diet: "Healthy large-breed kibble with occasional pieces of safe fruits like fresh apple slices."
  },
  {
    id: "bernese-mountain",
    name: "Bernese Mountain Dog",
    category: "gentle-giants",
    fluffinessRating: 5,
    playfulnessRating: 4,
    images: {
      puppy: "https://images.unsplash.com/photo-1563460716884-18a51776fa21?auto=format&fit=crop&q=80&w=800",
      adult: "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=800"
    },
    character: {
      playfulness: "Playful but operates at a relaxing, gentle pace.",
      kidFriendly: "Extremely protective, patient, and sweet with toddlers.",
      personality: "Bernese are beautiful tri-colored giants from the snowy Swiss Alps. They love cold weather, leaning against your legs like a huge fluffy pillar, and acting like giant lapdogs who forget how massive they are!"
    },
    care: {
      bedding: "A cool gel-infused mattress to help keep their thick black fur comfortably cool.",
      grooming: "Sheds quite a bit! They need a solid deshedding brush once a week.",
      idealOwner: "Someone who lives in a cooler climate and has a big backyard for snowy gallops."
    },
    diet: "Hearty large-breed recipe with joint supplements to keep their strong legs running happily."
  },
  {
    id: "great-dane",
    name: "Great Dane",
    category: "gentle-giants",
    fluffinessRating: 1,
    playfulnessRating: 4,
    images: {
      puppy: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80&w=800",
      adult: "https://images.unsplash.com/photo-1516383274235-5f42d6c6426d?auto=format&fit=crop&q=80&w=800"
    },
    character: {
      playfulness: "Brief bursts of galloping, then lots of sleeping!",
      kidFriendly: "Gentle giants who act like kind grandfathers.",
      personality: "Often called 'the Apollo of dogs' due to their towering height! Great Danes look like elegant horses, but they are incredibly sweet, gentle, and easily startled by tiny things (like a plastic bag floating in the wind)."
    },
    care: {
      bedding: "Usually requires a full-sized human sofa or a giant-sized mattress all to themselves!",
      grooming: "Super easy. Quick wipe down and their sleek coat is ready to shine.",
      idealOwner: "A family with a large house and a very large heart who don't mind some happy tail-wagging slaps."
    },
    diet: "Plenty of high-quality large-breed food, served in an elevated bowl to protect their long necks."
  },
  {
    id: "border-collie",
    name: "Border Collie",
    category: "energy-bundles",
    fluffinessRating: 3,
    playfulnessRating: 5,
    images: {
      puppy: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&q=80&w=800",
      adult: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&q=80&w=800"
    },
    character: {
      playfulness: "Off the charts! They NEVER get tired of playing!",
      kidFriendly: "Fabulous, loves herding groups of children together!",
      personality: "Border Collies are the world champions of smarts and physical energy. They can learn over 100 words and are fantastic at frisbee, agility tricks, and holding super-focused eye contact with you."
    },
    care: {
      bedding: "A comfy bed placed in an active room so they don't miss any of the household action.",
      grooming: "Moderate brushing twice a week to keep their athletic coats clean.",
      idealOwner: "An energetic family who loves teaching complex multi-step tricks and going for morning jogs."
    },
    diet: "High-protein active formulas that refuel their endlessly running batteries."
  },
  {
    id: "labrador-retriever",
    name: "Labrador Retriever",
    category: "energy-bundles",
    fluffinessRating: 2,
    playfulnessRating: 5,
    images: {
      puppy: "https://images.unsplash.com/photo-1598133894002-71faf8809fc9?auto=format&fit=crop&q=80&w=800",
      adult: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&q=80&w=800"
    },
    character: {
      playfulness: "Loves splashing in water and chasing toys!",
      kidFriendly: "The gold standard of child-friendly dog companions.",
      personality: "Labs are incredibly loyal, energetic, and completely obsessed with water! If there's a muddy puddle, a swimming pool, or a garden sprinkler, a Labrador will dive straight in with a happy, goofy grin."
    },
    care: {
      bedding: "A thick waterproof bolster bed is best, especially since they often return damp from swimming!",
      grooming: "Simple brushing to control shedding, and a quick towel-dry after wet adventures.",
      idealOwner: "Active families who love lakes, beaches, throwing tennis balls, and mud puddles."
    },
    diet: "Always hungry! Needs portion tracking to keep them sleek, but they love carrots and green beans as snacks."
  },
  {
    id: "siberian-husky",
    name: "Siberian Husky",
    category: "energy-bundles",
    fluffinessRating: 4,
    playfulnessRating: 5,
    images: {
      puppy: "https://images.unsplash.com/photo-1551841961-d70314cf8729?auto=format&fit=crop&q=80&w=800",
      adult: "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?auto=format&fit=crop&q=80&w=800"
    },
    character: {
      playfulness: "Very energetic and loves expressing opinions in silly song barks!",
      kidFriendly: "Extremely social, welcoming, and fun-loving with kids.",
      personality: "Huskies look like beautiful forest wolves but have the silliness of a cartoon! They have striking blue or multi-colored eyes and are famous for 'talking' or singing dramatic howling songs when excited."
    },
    care: {
      bedding: "Enjoys cool spots near windows or a raised trampoline-style cot bed.",
      grooming: "Sheds very heavy 'snowballs' of fur twice a year! Requires regular deep raking.",
      idealOwner: "An active household that enjoys hiking, running, and dramatic dog chatter."
    },
    diet: "Clean, high-energy formulas rich in salmon and healthy omega oils."
  },
  {
    id: "jack-russell",
    name: "Jack Russell Terrier",
    category: "energy-bundles",
    fluffinessRating: 2,
    playfulnessRating: 5,
    images: {
      puppy: "https://images.unsplash.com/photo-1591946614421-2ef3612bb311?auto=format&fit=crop&q=80&w=800",
      adult: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=800"
    },
    character: {
      playfulness: "A bouncy spring with infinite energy!",
      kidFriendly: "Great with kids who love throwing tennis balls all afternoon.",
      personality: "Jack Russells have spring heels! They can jump unbelievably high and are fearless excavators. They love exploring bushes, digging tunnels, and hunting for squeaky balls around the house."
    },
    care: {
      bedding: "A cozy nest-style bed stuffed with lots of soft toys they can bury.",
      grooming: "Very low upkeep, just occasional brushing to remove loose hair.",
      idealOwner: "An owner with a secure, dig-friendly yard and plenty of time to play fetch."
    },
    diet: "Nutritional, calorie-dense foods that support a high-speed, active metabolism."
  },
  {
    id: "standard-poodle",
    name: "Standard Poodle",
    category: "super-smarties",
    fluffinessRating: 4,
    playfulnessRating: 5,
    images: {
      puppy: "https://images.unsplash.com/photo-1598133893774-ed2bf7d6d9c5?auto=format&fit=crop&q=80&w=800",
      adult: "https://images.unsplash.com/photo-1591768793355-74d75b53d101?auto=format&fit=crop&q=80&w=800"
    },
    character: {
      playfulness: "Elegant but extremely goofy when off duty!",
      kidFriendly: "Super friendly, warm, and highly social.",
      personality: "Don't let their elegant haircuts fool you — Poodles are rocket scientists of the dog world! They can learn complicated tricks in minutes, love retrieving items from lakes, and have a marvelous bouncy gait."
    },
    care: {
      bedding: "A luxurious, elevated warm bed where they can watch the whole room like a king or queen.",
      grooming: "Their tight curly hair doesn't shed at all (perfect for allergies!), but needs professional haircuts.",
      idealOwner: "Someone who enjoys styling hair and loves engaging a clever dog in mind games."
    },
    diet: "A balanced, easily digestible diet using real chicken and sweet green peas."
  },
  {
    id: "german-shepherd",
    name: "German Shepherd",
    category: "super-smarties",
    fluffinessRating: 3,
    playfulnessRating: 4,
    images: {
      puppy: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=800",
      adult: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=800"
    },
    character: {
      playfulness: "Loves task-oriented play and catching Frisbees!",
      kidFriendly: "Incredibly loyal, acting like a brave fairy-tale knight for kids.",
      personality: "German Shepherds are brave, highly disciplined protectors. They are the favorite choice for search-and-rescue teams. They love having a 'job' to do, like checking the house perimeter or carrying their own water bottle."
    },
    care: {
      bedding: "A heavy-duty orthopedic bed where they can rest their muscular, active joints.",
      grooming: "Weekly brushing is standard to manage their double layer 'German Shedder' coat.",
      idealOwner: "An structured, loving family who wants a noble guardian who is eager to learn and protect."
    },
    diet: "High-protein recipes focused on muscle support and active energy replenish."
  },
  {
    id: "shetland-sheepdog",
    name: "Shetland Sheepdog",
    category: "super-smarties",
    fluffinessRating: 5,
    playfulnessRating: 4,
    images: {
      puppy: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80&w=800",
      adult: "https://images.unsplash.com/photo-1514371879740-2e7f2068f771?auto=format&fit=crop&q=80&w=800"
    },
    character: {
      playfulness: "Enjoys tagging along behind you and chasing wind currents.",
      kidFriendly: "Perfectly gentle and cautious, giving warm soft puppy kisses.",
      personality: "Often called the 'Sheltie,' they look like miniature, highly fluffy collies. They are highly alert, whisper-smart, and communicate in tiny friendly yips to let you know they understand absolutely everything."
    },
    care: {
      bedding: "A cuddly cloud bed, preferably placed in a cozy private spot where they feel safe.",
      grooming: "Brushing behind their ears and feather sleeves is key to preventing mats.",
      idealOwner: "Someone who wants an incredibly affectionate, highly responsive companion who excels at learning tricks."
    },
    diet: "Small healthy kibbles with minor additions of sweet cooked green beans."
  }
];
