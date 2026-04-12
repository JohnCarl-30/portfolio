export type JournalismSection =
  | "2nd Year Beat Reporting"
  | "Feature Articles"
  | "Editorial"
  | "3rd Year News Writing"
  | "3rd Year Digital Journalism";

export type ArticleBlock =
  | { type: "paragraph"; content: string }
  | { type: "subheading"; content: string }
  | { type: "quote"; content: string; attribution?: string };

export type Article = {
  slug: string;
  title: string;
  category: string;
  section: JournalismSection;
  date: string;
  excerpt: string;
  body: ArticleBlock[];
  featured: boolean;
  videoUrl?: string;
};

export type ArticleSummary = Omit<Article, "body">;

export type MediaItem = {
  id: string;
  kind: "video" | "audio";
  title: string;
  date: string;
  description: string;
  url: string;
  source: string;
  fileName: string;
  articleSlug?: string;
};

export type TextSample = {
  id: string;
  label: string;
  date: string;
  title: string;
  excerpt: string;
  context: string;
  format?: "prose" | "script";
  articleSlug?: string;
};

export type ProfileConfig = {
  name: string;
  initials: string;
  issueLine: string;
  title: string;
  tagline: string;
  bio: string[];
  beats: string[];
  metaPills: Array<{ label: string; accent?: boolean }>;
  contacts: {
    email?: string;
    linkedin?: string;
    twitter?: string;
  };
};

const p = (content: string): ArticleBlock => ({ type: "paragraph", content });
const h = (content: string): ArticleBlock => ({ type: "subheading", content });
const q = (content: string, attribution?: string): ArticleBlock => ({
  type: "quote",
  content,
  attribution,
});

export const sectionOrder: JournalismSection[] = [
  "2nd Year Beat Reporting",
  "Feature Articles",
  "Editorial",
  "3rd Year News Writing",
  "3rd Year Digital Journalism",
];

export const profile: ProfileConfig = {
  name: "Ma. Laurice D. Austria",
  initials: "LA",
  issueLine: "Portfolio — Vol. I · April 2026",
  title: "Journalism Writer & Multimedia Storyteller",
  tagline:
    "Beat reporting, feature writing, editorials, and multimedia storytelling rooted in Filipino communities.",
  bio: [
    "This portfolio gathers reporting on public affairs, transport, education, justice, campus developments, and community life across print, digital, and broadcast formats.",
    "The archive spans beat reporting, feature writing, editorial work, news writing exercises, digital journalism, and video-driven storytelling built from the supplied compilation document.",
  ],
  beats: [
    "Beat Reporting",
    "Feature Writing",
    "Editorial",
    "Broadcast Script",
    "Digital Journalism",
    "Video Reporting",
  ],
  metaPills: [
    { label: "Published Work", accent: true },
    { label: "Feature & News Writing" },
    { label: "Multimedia Reporting" },
  ],
  contacts: {},
};

export const driveVideoUrls = {
  newsPackage:
    "https://drive.google.com/file/d/1yqDzlN24AAiOkfKIo_qizkGYmVUt67ud/view",
  dangwa:
    "https://drive.google.com/file/d/19FCZjl_GetBLMwr5icd_EvV0nxDvESVN/view",
  manilaNorthCemetery:
    "https://drive.google.com/file/d/14B_sKlNFDGnSfh2n3O-EekH0kS-Ahnkt/view",
  radioReport:
    "https://drive.google.com/file/d/1JFiB10BI9cjT2wSpTSM9i6wbQUEL_97K/view",
} as const;

export const videos: MediaItem[] = [
  {
    id: "news-package-barmm",
    kind: "video",
    title: "1.3 News Package",
    date: "2025",
    description:
      "A television-style news package aligned with the BARMM parliamentary election script sample in the portfolio.",
    url: driveVideoUrls.newsPackage,
    source: "Public Google Drive",
    fileName: "1.3NEWS [AUSTRIA] (1).mp4",
  },
  {
    id: "mojo-dangwa",
    kind: "video",
    title: "MoJo: Dangwa",
    date: "Undas 2025",
    description:
      "Mobile journalism coverage tied to the reporting on rising flower prices and crowd activity in Dangwa.",
    url: driveVideoUrls.dangwa,
    source: "Public Google Drive",
    fileName: "MoJo - Dangwa.mp4",
    articleSlug: "presyo-ng-bulaklak-sa-dangwa-tumaas",
  },
  {
    id: "mojo-manila-north-cemetery",
    kind: "video",
    title: "MoJo: Manila North Cemetery",
    date: "Undas 2025",
    description:
      "Mobile journalism field coverage connected to the Manila North Cemetery Undas story.",
    url: driveVideoUrls.manilaNorthCemetery,
    source: "Public Google Drive",
    fileName: "MoJo - Manila North Cemetery",
    articleSlug: "manila-north-cemetery-handa-sa-undas-2025",
  },
  {
    id: "radio-report",
    kind: "video",
    title: "Radio Report",
    date: "2025",
    description:
      "A broadcast-ready reporting sample that expands the portfolio's multimedia section beyond article writing.",
    url: driveVideoUrls.radioReport,
    source: "Public Google Drive",
    fileName: "Radio Report.mp4",
  },
];

export const audio: MediaItem[] = [];

export const articles: Article[] = [
  {
    slug: "tandang-sora-womens-museum-opens-qc",
    title: "Tandang Sora Women’s Museum, opens in QC",
    category: "Women",
    section: "2nd Year Beat Reporting",
    date: "February 19, 2025",
    excerpt:
      "Quezon City's Tandang Sora Women’s Museum opened as the first museum in the Philippines dedicated to women's history.",
    featured: false,
    body: [
      p(
        "The Tandang Sora Women’s Museum, the first women’s museum in the Philippines, under the Quezon City government, opened on February 19, Tandang Sora’s death anniversary.",
      ),
      p(
        "It is named after Melchora “Tandang Sora” Aquino, who is known as the “Ina ng Rebolusyong Pilipino” and was born in Quezon City.",
      ),
      p(
        "The grand opening was led by Quezon City Mayor Joy Belmonte, and during her speech, she noted that it will preserve and amplify the women’s role in Philippine history.",
      ),
      p(
        "\"This museum is more than just a collection of artifacts—it is a testament to the strength, struggles, and triumphs of Filipino women throughout history,\" Belmonte said.",
      ),
      p(
        "Senator Risa Hontiveros, who helped to fund the museum, was also present during the program.",
      ),
      p(
        "“Sa wakas, the stories of our women now have a home,” Hontiveros said on her Facebook post.",
      ),
      p(
        "The museum is located beside the Tandang Sora Shrine, and admission is free for the public from February (National Arts Month) and March (National Women’s Month) 2025.",
      ),
    ],
  },
  {
    slug: "suspek-sa-nakawan-ng-motor-sa-pandi-patay",
    title: "Suspek sa nakawan ng motor sa Pandi, patay",
    category: "Police",
    section: "2nd Year Beat Reporting",
    date: "2025",
    excerpt:
      "Napatay sa operasyon sa San Jose del Monte ang isa sa apat na suspek sa sunod-sunod na pang-aagaw ng motorsiklo sa Pandi at karatig-bayan.",
    featured: false,
    body: [
      p(
        "Patay matapos mabaril sa operasyon ng mga pulis sa San Jose del Monte ang isa sa apat na suspek ng modus na pang-a-agaw ng motor sa bayan ng Pandi, Balagtas, at San Jose del Monte.",
      ),
      p(
        "Ayon kay PLTCOL Rey M. Apolinario, hepe ng Pandi Municipal Police Station, ang nabaril na suspek ay ang natatanging natutukoy sa apat kaya bumagal muli ang takbo ng kaso.",
      ),
      p(
        "“Mula ng namatay ang isa sa grupo nila, nag-laylo naman yung tatlo pang kasama,” dagdag pa niya.",
      ),
      p(
        "Aniya pa, dahil sa sunod-sunod na nakawan ng motor sa Pandi ay mas naghigpit pagdating sa mga checkpoint at pagpapatrolya ng kapulisan.",
      ),
      p(
        "“Kung hindi mo lalapatan ng intervention, pare-parehas ang mangyayari,” ani pa ni Apolinario.",
      ),
      p(
        "Matapos ang pandemya, mas marami rin ang naitalang nakawan ng cellphone at mga shoplifting sa mga convenience store.",
      ),
      p(
        "“Dahil nag-back to normal, marami nagsilabasan kaya pinipilit namin silang magdemanda para hindi na umulit,” saad muli ni Apolinario.",
      ),
      p(
        "Kaugnay ng papalapit na eleksyon, mayroon namang dalawang nahulihan ng baril sa kabila ng gun-ban sa bansa kaya mas pinag-igting ang ginagawang pagbabantay at checkpoint.",
      ),
    ],
  },
  {
    slug: "icc-nabs-fprrd-upon-arrival-at-naia",
    title: "ICC nabs FPRRD upon arrival at NAIA",
    category: "Justice",
    section: "2nd Year Beat Reporting",
    date: "March 11, 2025",
    excerpt:
      "Former President Rodrigo Duterte was served an ICC warrant upon arriving at NAIA in connection with crimes against humanity allegations tied to the war on drugs.",
    featured: false,
    body: [
      p(
        "Former President Rodrigo Duterte was presented his arrest warrant by the Philippine National Police (PNP) under the order of International Criminal Court (ICC) upon his arrival at Ninoy Aquino International Airport, last Tuesday, March 11.",
      ),
      p(
        "The warrant of arrest issued by the ICC is a case for crimes against humanity which is allegedly done during the war on drugs campaign of his administration.",
      ),
      p(
        "According to Presidential Communications Office’s (PCO) statement, International Criminal Police Organization (INTERPOL) Manila received an official copy of the warrant of arrest from the ICC earlier in the morning.",
      ),
      p(
        "“Sa kaniyang pagdating, inihain ng Prosecutor General ang ICC notification para sa isang arrest warrant sa dating Pangulo para sa krimen laban sa sangkatauhan,” PCO added.",
      ),
      p(
        "FPRRD was previously in Hong Kong before the arrest to campaign for his senatorial bets, PDP-Laban, during the “Pasasalamat kay PRRD with OFWs” event and mentioned on his speech that he already heard that ICC is after him.",
      ),
    ],
  },
  {
    slug: "house-oks-paolo-dutertes-travel-clearance",
    title: "House OKs Paolo Duterte’s travel clearance",
    category: "Legislative",
    section: "2nd Year Beat Reporting",
    date: "March 2025",
    excerpt:
      "The House of Representatives approved Paolo Duterte’s request to travel to Japan and the Netherlands during the chamber’s recess.",
    featured: false,
    body: [
      p(
        "House of Representatives Secretary General Reginald Velasco approved the travel clearance request of Davao City 1st District Representative Paolo “Pulong” Duterte, from March 12 to April 15, 2025, going to Japan and Netherlands.",
      ),
      p(
        "According to the letter of request by Davao Solon Duterte, the trip is a personal one and the expenses would not be shouldered by the government.",
      ),
      p(
        "“The expenditure incurred from this trip are from my personal funds alone,” he mentioned on the letter.",
      ),
      p(
        "His father, Former President Rodrigo Duterte, was arrested by the International Criminal Court which is based on The Hauge, Netherlands, last Tuesday, March 11.",
      ),
      p(
        "Vice-President Sara Duterte, his sister, already left the country heading to Netherlands.",
      ),
      p(
        "House Sec. Velasco granted the request of Davao Solon Duterte through the authority of House Speaker Ferdinand Martin Romualdez.",
      ),
      p("The House is currently on recess until June 2."),
    ],
  },
  {
    slug: "manibela-three-day-strike",
    title: "3 araw na strike, ikinasa ng Manibela",
    category: "Transportation",
    section: "2nd Year Beat Reporting",
    date: "March 24-26, 2025",
    excerpt:
      "Transport group Manibela staged a three-day jeepney strike after disputing LTFRB data on compliance with the PUV modernization program.",
    featured: false,
    body: [
      p(
        "Nagsagawa ang transport group na Manibela ng tatlong araw na tigil-pasada ng mga jeepney mula Marso 24 hanggang 26 dahil sa umano’y maling datos na inilabas ng Land Transportation Franchising and Regulatory Board (LTFRB).",
      ),
      p(
        "Ayon sa pangulo ng Manibela na si Mar Valbuena, nagsinungaling ang LTFRB sa bilang na inilahad nila kay Pangulong Ferdinand “Bongbong” Marcos Jr.",
      ),
      p(
        "\"Hindi sila pwedeng pagkatiwalaan at dapat lang silang sibakin ni DOTr Secretary Vince Dizon,\" saad ni Valbuena.",
      ),
      p(
        "Dagdag pa niya na hiling nila na ibalik ang limang taong prangkisa, payagan silang magpa-rehistro at maka-biyahe ng legal.",
      ),
      p(
        "\"Maya't maya pinag-iinitan kami ng mga enforcers dahil nga hindi kami nakarehistro dahil sa maling datos na ibinigay ng DOTr at LTFRB sa ating pangulo. Sabi niya wala nang extension dahil sapat na yung bilang ng nag-consolidate pero kasinungalingan pala mali pala,\" aniya.",
      ),
      p(
        "Ayon sa naunang pahayag ng LTFRB, na kinondena ng Manibela, umabot na sa 86% ang nag-consolidate at nakapag-comply sa Public Utility Vehicle Modernization Program (PUVMP).",
      ),
      p(
        "Taliwas ito sa panibagong datos na ibinigay ni Department of Transportation (DOTr) Secretary Vince Dizon na nagsasabing 43% lamang ang nakapag-consolidate at ang natitirang 43% ay hindi pa nakapag-comply sa lahat ng kinakailangang dokumento.",
      ),
      p(
        "Kasalukuyan namang humihiling ang DOTr na makipagdayalogo sa grupong Manibela hinggil sa usaping ito.",
      ),
    ],
  },
  {
    slug: "deped-tesda-free-nc-test",
    title: "DepED, TESDA ink free NC test to boost TVL grads' work aptitude",
    category: "Malacañang",
    section: "2nd Year Beat Reporting",
    date: "2025",
    excerpt:
      "DepEd and TESDA rolled out free NC assessment for SHS-TVL learners to increase participation in industry-recognized certification.",
    featured: false,
    body: [
      p(
        "The Department of Education (DepEd) along with Technical Education and Skills Development Authority (TESDA) granted free National Certificate (NC) assessment for Senior High School (SHS) students due to the low number participation from Grade 12 Technical Vocational Livelihood (TVL) track learners from previous school years.",
      ),
      p(
        "According to the DepEd order No. 003 series of 2025, only 25.7% of Grade 12 learners were able to participate for the program during the School Year (SY) 2019-2020 and became lower during SY 2020-2021, with only 6.8%.",
      ),
      p(
        "“These assessment participation rates were attributed to prohibitive cost of National Certificate (NC) assessments. However, the passing or certification rates among those who took the assessments were remarkably high, at 98% in SY 2019-2020 and 97% in SY 2020-2021,” they stated on the order.",
      ),
      p(
        "Through the order, all SHS-TVL track learners currently enrolled in public and private schools for SY 2024-2025 and 2025-2026 will undergo the assessment free of charge.",
      ),
      p(
        "Aside from the free assessments for SHS-TVL students, in lieu of the memorandum, free training, assessment, and accreditation are also provided for public and private schools teaching and non-teaching personnels.",
      ),
      p(
        "Furthermore, TESDA Secretary Jose Francisco “Kiko” Benitez, encouraged SHS learners to join the training to receive NCs that could help them when applying for job after graduation.",
      ),
      p("“Makakakuha na ang ating TVL learners ng industry-recognized qualifications,” he said."),
      p(
        "A graduating student of TVL-Information and Communication Technology (ICT), Regina Ariate, who recently passed the assessment for Animation NC II, mentioned that the program helped her to improve her skills and lead her to discover her intrest in this field.",
      ),
      p(
        "However, she disagrees with TESDA’s claim that they are already fit to work in the industry.",
      ),
      p(
        "“Para sa akin po kasi, need ko pa po ma-enhance yung pasikot-sikot sa mga tool ng Adobe Animation and need po ma-improve yung clean up drawings, hindi po sapat yung limang araw na training,” Ariate mentioned.",
      ),
      p(
        "On the other hand, Department of Labor and Employment (DOLE) had not mentioned any related program or project for SHS-TVL graduates that passed the NC II assessment.",
      ),
    ],
  },
  {
    slug: "strike-of-modernity-traditional-jeepneys",
    title: "Strike of Modernity: The Traditional Jeepneys in the Country",
    category: "Feature",
    section: "Feature Articles",
    date: "2025",
    excerpt:
      "A feature on jeepney modernization examines how policy reform collides with culture, livelihood, and the financial realities facing Filipino drivers.",
    featured: true,
    body: [
      p(
        "Change is the only constant thing in the world, they say, and indeed, it is. Every day, there’s a change that’s happening in each person’s life, and it will be scarier if you don’t experience changes in your life. But in every change that occurs, there will be things that will be hard to let go of and adapt to.",
      ),
      p("Just like with the government’s program—the jeepney modernization."),
      p(
        "For almost eight decades, jeepneys have been in operation in the Philippines—they aren’t called the hari ng kalsada for nothing. They serve as a cultural icon due to their uniqueness. It was originally adapted from the Americans’ purpose vehicles during their occupation of the country; since Filipinos are known for being creative, they modified it to serve as public transportation that charges a small fare for specific routes. The word jeepney is derived from the combination of the words jeep and jitney, which means vehicle that carries passengers, and jeepneys are indeed one of the most affordable and convenient modes of transportation.",
      ),
      p(
        "The Public Utility Vehicle Modernization Program (PUVMP) involves several phases, from phasing out old vehicles that are not roadworthy anymore to reorganizing routes and franchises and replacing the traditional jeepneys with the air-conditioned and Euro-4-powered engine vehicles. Currently, there are few of those seen on roads already, which are commonly known as the e-jeepney. The Department of Trade and Industry’s (DTI) Bureau of Philippine Standards (BPS) together with the Truck Manufacturer’s Association (TMA) had produced this e-jeepney that’s really technologically advanced compared to the traditional ones since it already has CCTV cameras, dash cams, and even an automatic fare collection system. Again, it’s very convenient for the drivers and passengers, but were all of these worth it to sacrifice the jeepney drivers that could be left behind?",
      ),
      p(
        "Change is constant and inevitable but adapting to all those sorts of changes will never be easy for the less fortunate ones.",
      ),
      p(
        "5-6-7-8, the financing package that the government prepared per unit, wherein drivers must initially pay a 5% downpayment, add a 6% interest rate, fully pay the unit for 7 years, and receive an 80,000-peso subsidy per unit. Imagine this is a large sum of money for the ordinary Filipinos who earn just enough to feed the family and provide for their everyday needs. This modernization will just add up to the financial burden of the jeepney drivers and their families.",
      ),
      p(
        "Strikes from different sectors are a cry for help. No one wants to remain stagnant, left behind and tied with the rusty jeepneys that they have to stick with due to financial problems. These drivers do not just oppose the government because they want to; they’re just left with no choice.",
      ),
      p(
        "The goal of the PUVMP is undeniably for the betterment of every Filipino, but it will never be a success without better financial aid from the government. The 13-peso fare won’t be enough to afford a hundred thousand worth of modern jeepneys. Reality check: this is not just about keeping the country’s culture; this will be about the drivers and their families who will have to suffer with the so-called modernization that they want to have.",
      ),
      p(
        "Change is constant, great even most of the time, but the change that the PUVMP aims for will never be possible without the change within the government’s system. Serve the Filipino people truly and in the best way that they deserve to have.",
      ),
    ],
  },
  {
    slug: "my-pillow-soft-cuddly-buddy",
    title: "My Pillow: that Soft Cuddly Buddy that Contains my Sorrows",
    category: "Feature",
    section: "Feature Articles",
    date: "2025",
    excerpt:
      "A first-person feature turns an ordinary pillow into a witness to comfort, vulnerability, and growing up.",
    featured: false,
    body: [
      p(
        "I can make her asleep for 12 hours and we can be together for 24 hours because I am her best friend. We first met after her room’s renovation, it was around April this year, and I was sent as a gift by her aunt – I am magic pillow that was covered by a white cloth and of course, I am very fluffy and huggable!",
      ),
      p(
        "Since I was a newbie that time, she decided to use her favorite pillowcase for me – guess what, I demoted her old pillow that used to be the favorite one. From then on, I was the one who’s beside her most of time but sadly, when she’s already deep asleep she tends to kick me below the bed! That’s so cruel, right? But I still understand her, because I know that she did not mean to hurt me, so I don’t really hold grudge against her.",
      ),
      p(
        "Do you know that it’s hard for her to fell asleep but it’s harder for her to get up? It’s always a battle for her to leave the dreamland especially for her 7 AM classes from Monday to Friday. Despite the insufficient time that we have during weekdays, I never fail to let her take a pause with everything that’s happening with her life. Sometimes, when everything feels so heavy, I let her breakdown and help her to dry her tears.",
      ),
      p(
        "She looks so happy most of the time, so jolly and carefree but there are nights that she just can’t hold it anymore and that’s when I let her feel that she can be as vulnerable as she can be when I am beside her. I always try to let her feel the comfort that I can give out.",
      ),
      p(
        "I have the fluffy stuffings inside me that’s meticulously sewed to keep it inside and the longer she uses me, the seal will slowly be removed, and it will lead to show what’s inside me and I can say that its where we’re so similar. She tends to hide her real feelings to the people she just met and will start to let them see who she really is when she gets to be comfortable and hangout with them.",
      ),
      p(
        "Just like me too, she’s willing to be a pillow for the people that she loves – she’s willing to listen to them and give comfort to them when they need it too.",
      ),
      p(
        "Few years from now, she will buy a new pillow since I’m already worn out. I won’t be able to give her the same comfort that I use to do. I’ll end up being like the dethroned favorite pillow, but I wish that she will never forget how just like me, there were once a pillow for her who gave her comfort and listened to her silent cries.",
      ),
    ],
  },
  {
    slug: "how-to-be-a-good-friend",
    title: "How to be a Good Friend",
    category: "Feature",
    section: "Feature Articles",
    date: "2025",
    excerpt:
      "A reflective piece explores listening, trust, support, and everyday presence as the core of real friendship.",
    featured: false,
    body: [
      q(
        "You can count on me like one, two, three\nI’ll be there\nAnd I know when I need it, I can count on you like four, three, two\nAnd you’ll be there\n‘Cause that’s how friends are supposed to do, oh, yeah",
        "Count on Me by Bruno Mars",
      ),
      p(
        "Everyone can be a friend to someone or even to a pet – just like how a dog is a man’s best friend. But how can we actually be a good one?",
      ),
      p(
        "First and foremost, make sure that you’re a good listener. Not everyone can lend an ear and sometimes, it’s just what your friend needs. Having someone who will be willing to and genuinely care to the stories that they share is a perfect characteristic for a good friend. Being a good listener will help them know that there’s someone whom they can confide things without having second thoughts.",
      ),
      p(
        "With that being said, it will lead as to another trait of a good friend, which is someone who’s trustworthy. Trust is earned and never given out for free. Just like a glass, when you broke someone’s trust, even how hard you try to rebuild it, it will never be the same. For some, it’s easy to earn their trust however not everyone is worth to be trusted. As a good friend, you should be someone whom they can trust not just with their secrets but with how you can always be trusted to be there for them.",
      ),
      p(
        "As you stood by their side as a good friend, you must support them with the things that makes them happy and makes them well. You should be their number one support system, their fallback, and one call away. Even how contradicting it may sound, you should be the one who can tell them that something is not good for them but never push them to do what you want. You will only be there to guide or remind them and not make the decisions for them.",
      ),
      p(
        "You’re just a friend, a good friend, who will never boss them around to follow what you want and what you think is the best for them because at the end of the day, it’s still their life they must maneuver and not yours to recklessly decide where and when to make a turn.",
      ),
      p(
        "A good friend is someone who’s a good listener, trustworthy, supportive and a call away. Be the good friend whom they can count on.",
      ),
      p(
        "Lastly, aside from the characteristics mentioned, you should be the good friend that you wished to have. For sure, you’ll have people who won’t think twice to be there for you as well because that’s how friends are supposed to be.",
      ),
    ],
  },
  {
    slug: "how-to-get-away-with-murder-duterte-version",
    title: "How to Get Away with Murder (Duterte’s Version)",
    category: "Editorial",
    section: "Editorial",
    date: "2025",
    excerpt:
      "An editorial argues that justice remains elusive when state power continues to obstruct accountability for drug war killings.",
    featured: false,
    body: [
      p(
        "The Philippines seemed to be a safety blanket for former President Rodrigo Duterte since International Criminal Court’s (ICC) had been requesting for an investigation repeatedly and it had been rejected and putted on hold every time.",
      ),
      p(
        "This pause just makes it easier for the former president to hide the dirty linens full of bloods that came from the victim of his war on drugs campaign during his term. This anti-illegal-narcotics campaign is a mass extrajudicial killing that left 6,117 people dead – as claimed by the Philippine National Police (PNP).",
      ),
      p(
        "Duterte’s first attempt to avoid this scenario is when the country withdrew from the Rome Statute in March 2019, however, since the alleged crimes started by Nov. 2011, the investigation will push through since the country is still a state party during those time.",
      ),
      h("Running in Circles"),
      p(
        "Duterte still has a great power over this country despite not having a position in the government, it’s disturbing as well how come he still have followers that believes in him. They even urge him to run once again for office.",
      ),
      p(
        "As long as Duterte has an influence over this country, the ICC will continue to end up on the same scenario with the same results.",
      ),
      p(
        "The current Philippine President Ferdinand Marcos stated as well that he will not allow ICC to conduct probes on the country’s war on drugs and it just adds up on the difficulty for the ICC to dived in a thorough investigation with this matter.",
      ),
      p(
        "Even the House of the Representatives had a proposal for the government to cooperate with ICC, but President Marcos do not agree with it. It’s not surprising since just last election, Marcos had a tandem with Duterte’s daughter, the current Vice-President, Sara Duterte.",
      ),
      h("Dragged in the Mud"),
      p(
        "Senator Ronald “Bato” Dela Rosa’s name had been consistently brought up in conversations in relation with this war-on-drug campaign since he was the Chief of PNP during Duterte’s administration and also known as the drug war architect.",
      ),
      p(
        "Dela Rosa is also under ICC’s watch and ignores ICC’s notices regarding this, but the light is once again shed unto him due to the self-confessed drug lord Rolan Eslabon “Kerwin” Espinosa statement during the congressional probe last Oct. 11.",
      ),
      p(
        "According to Espinosa, Dela Rosa forced him to admit that he had an illegal drug trade along with the former Senator Leila De Lima, who’s recently acquitted with this accusation, and businessman Peter Lim.",
      ),
      p(
        "During the probe, Espinosa continued to directly point his finger to Dela Rosa and Dela Rosa once again, denied and insisted that Espinosa is not a credible source.",
      ),
      p(
        "Dela Rosa’s involvement during the war-on-drug campaign could be a way for ICC to slowly uncover all the faulty works and be the lead toward the truth.",
      ),
      h("Bad Publicity is still Publicity"),
      p(
        "Espinosa’s sudden appearance is also suspicious to be a genuine move to prove his and his father’s innocence with all the drug allegations because it is also coinciding with his filling of candidacy.",
      ),
      p(
        "During the first day of filling for candidacy, he filed his Certificate of Candidacy (COC) as Mayor for Albuerta, Leyte, his hometown.",
      ),
      p(
        "This stint is an old song already, it will bring up how he confessed as a drug lord, but people will surely admire him for his heroic did to clear their family’s name along with De Lima and Lim.",
      ),
      p(
        "In the Philippines, publicity is very important for these candidates. It doesn’t matter much if you’re known for good things or the opposite, as long as the people remember you, it will be enough for them to win.",
      ),
      h("Unserved Justice"),
      p(
        "Human rights groups claims that around 30,000 people were killed during this campaign – which is more three times of the numbers that PNP claims.",
      ),
      p(
        "This unhuman campaign killed thousands of innocent victims yet their kins are still craving for justice. They are not just numbers; they are people who have families who yearns for longing for their loved ones who were killed by this trashy war.",
      ),
      p(
        "Justice will remain unserved if the government will keep ICC from digging up and uncovering proofs and the truth.",
      ),
      p("Justice must be served, truth must prevail."),
    ],
  },
  {
    slug: "oh-safe-ka-na-marcoleta-to-jinggoy",
    title: "‘Oh, safe ka na’—Marcoletta to Jinggoy",
    category: "Summary",
    section: "3rd Year News Writing",
    date: "September 8, 2025",
    excerpt:
      "A Senate Blue Ribbon hearing briefly turned tense after Rodante Marcoleta joked to Jinggoy Estrada about being 'safe' from allegations.",
    featured: false,
    body: [
      p(
        "MANILA, Philippines – Senate President Pro Tempore Jinggoy Estrada was teased by Senate Blue Ribbon Committee Chairman Rodante Marcoleta during the hearing on anomalous flood control projects on September 08.",
      ),
      p(
        "During the hearing, Pacifico “Curlee” Discaya was asked by Sen. Estrada if there’s any senator involved with their transactions after naming the Congressmen and Department of Public Works and Highways’ district engineers that are allegedly involved.",
      ),
      p("“Your Honor, wala po” Discaya answered."),
      p(
        "Sen. Marcoletta then joked telling Sen. Estrada, “Oh, safe ka na,” a remark which visibly irked Sen. Estrada.",
      ),
      p("“You know, I resent that statement, Mr. Chair,” Sen. Estrada said."),
      p("Sen. Estrada then moved to strike the statement from the record."),
      p(
        "“Eh, alam mo namang biro lang ‘yon, wala ‘yon, wala ‘yon,” Sen. Marcoletta said, and stood from his seat and tried to console Sen. Estrada with a pat on the back.",
      ),
      p(
        "Sen. Estrada was detained twice for corruption charges during 2001, released by 2003, and again charged in 2014 over the allegations that he embezzled ₱183M from his Priority Development Assistance Fund (PDAF).",
      ),
    ],
  },
  {
    slug: "discaya-names-reps-dpwh-execs-kickback-scheme",
    title: "Discaya names Reps, DPWH execs ‘part’ in kickback scheme",
    category: "Sequence",
    section: "3rd Year News Writing",
    date: "September 8, 2025",
    excerpt:
      "Pacifico and Sarah Discaya detailed a kickback scheme in the Senate Blue Ribbon probe, naming lawmakers and DPWH officials they said asked for cuts.",
    featured: false,
    body: [
      p(
        "MANILA, Philippines – The Senate Blue Ribbon Committee resumed the hearing on the anomalous flood control projects on September 8, chaired by Senator Rodante Marcoleta.",
      ),
      p(
        "Pacifico ‘Curlee’ Discaya and Cezarah ‘Sarah’ Discaya were asked to read their joint sworn statement, in the statement, they mentioned that St. Gerard Construction started by the year 2003.",
      ),
      p(
        "As Sarah Discaya continued, she said “Nagkaroon ng kaunting tagumpay ang St. Gerard Construction, kaya minabuti naming mag-asawa na mag-expand at bumuo ng ibang kumpanya tulad ng Alpha and Omega General Contractor and Development Corporation.”",
      ),
      p(
        "She claimed that district engineer, regional directors of Department of Public Works and Highways (DPWH), and chief of staffs of lawmakers started to offer projects and they were ‘forced’ to comply with the requests for the sake their safety, family, and employees.",
      ),
      p(
        "Subsequently, Curlee Discaya proceeded to read the statement, he read that after winning the biddings, DPWH officials will now ask for their ‘cut’ from the project which usually ranges from 10% to 25% of the budget.",
      ),
      p(
        "He named several officials starting from Former Undersecretary, Office of the Presidential Assistant for the Visayas Terence Calatrava, Representative Roman Romulo of Pasig City, Rep. Jojo Ang of Uswag Ilonggo Party-list, Rep. Nicanor Briones of AGAP Party-list and followed by Rep. Marcy Teodoro of Marikina.",
      ),
      p(
        "Aside from them, San Jose del Monte, Bulacan Rep. Florida Robes, Romblon Rep. Eleandro Jesus Madrona, Occidental Mindoro Rep. Odie Tarriela, Quezon Province Rep. Reynante Arrogancia, Zamboanga Sibugay Rep. Antonieta Yudela, and Caloocan City Rep. Dean Asistio, were all mentioned as well.",
      ),
      p(
        "He also named four of Quezon City representatives, Rep. Patrick Michael Vargas, Rep. Arjo Atayde, Rep. Reynante Arrogancia and Rep. Marvin Rillo.",
      ),
      p(
        "Former Congressmen Benjamin Agarao Jr., Florencio Gabriel Noel, and Teodorico Haresco Jr., were also part of the list of officials that asked for 10% ‘kickback’.",
      ),
      p(
        "“Mayroon ding ilang kinatawan ng ilang mga politiko ang nakikipagtagpo sa amin upang manghingi ng porsyente kapalit ng mga proyekto, ang mga porsyentong ito ay 25%,” Curlee Discaya stated.",
      ),
      p(
        "He said that these names ‘coerced’ them into giving the percentage, Region V Director Virgilio Eduarte, Director Ramon Arriloa III of Unified Project Management Offices, Bulacan 1st DE Henry Alcantara, Undersecretary Robert Bernardo, Metro Manila 1st DE Aristotle Ramos, Bulacan Sub DEO Edgardo Pingol, and Quezon 2nd DEO Michael Rosaria.",
      ),
      p(
        "“Karamihan sa mga kawani ng DPWH na nabanggit sa itaas ay paulit-ulit na sinasabi na ang delivery ng pera ay para kay Zaldy Co, na dapat ay at least 25%,” he added.",
      ),
      p(
        "Additionally, Curlee Discaya continued that Rep. Rillo keeps on mentioning the name of Speaker Martin Romualdez and claimed that he’s a close friend to him and his funds were personally approved by Romualdez.",
      ),
      p(
        "Furthermore, Discayas reiterated that they try to follow specifications as stated on program of works despite the cut on the budget and never engaged in any ghost projects.",
      ),
      p(
        "“Handa po kaming tumestigo ng walang pilit at kusang loob bilang state witness at sabihin ang lahat ng nangyayaring katiwalian ng Kamara, DPWH at iba pang kawani ng gobyerno upang gawin ang tama,” Curlee Discaya",
      ),
      p(
        "Lastly, on their joint statement, they appealed for protection both from the Senate committee and President Ferdinand “Bongbong” Marcos Jr.",
      ),
    ],
  },
  {
    slug: "blue-ribbon-panel-cites-brice-hernandez",
    title: "Blue Ribbon panel cites ex-DPWH Asst Dist Engr Hernadez",
    category: "Wall Street Journal",
    section: "3rd Year News Writing",
    date: "September 8, 2025",
    excerpt:
      "Dismissed assistant district engineer Brice Hernandez was cited in contempt during the Senate probe into anomalous flood control projects.",
    featured: false,
    body: [
      p(
        "MANILA, Philippines – Dismissed Bulacan Assistant District Engineer Brice Hernandez of the Department of Public Works and Highways (DPWH) was cited in contempt by the Senate Blue Ribbon Committee.",
      ),
      p(
        "During the hearing on the anomalous flood control projects on September 8, Committee Chairperson Rodante Marcoleta further pressed Hernandez that he used the alias “Marvin Santos De Guzman” according to the documents from Okada.",
      ),
      p(
        "Committee Vice Chairperson Senator Erwin Tulfo then made the motion to cite Hernandez for contempt after he repeatedly denied owning the ID while keeping on claiming that he only knows his membership number.",
      ),
      p(
        "The motion was then seconded by Senate President Pro Tempore Jinggoy Estrada.",
      ),
      h("Hernandez’s during transactions"),
      p(
        "Wawao Builders Corporation President Mark Allan Arevalo claimed that he was ‘forced’ to let the DPWH officers in Bulacan use his company’s license and added that, according to Sally Santos of SYMS Construction Trading, it was ordered by ‘Chief’ Hernandez.",
      ),
      p(
        "Senator Tulfo then confronted Hernandez with the allegation that he used the license for the said ‘ghost’ projects.",
      ),
      p(
        "“Your Honor, lahat po ng sinasabi nila ay iniutos lang po sa akin ng aking boss, boss Henry Alcantara,” Hernandez said.",
      ),
      p(
        "He added that District Engineer Henry Alcantara ordered him to collect money from Santos, and it will be delivered to his office and then picked up in his office too.",
      ),
      p(
        "“’Di ko na po matandaan kung ilang beses na,” Hernandez said, “’Di ko rin po alam kung magkano kasi dinadala po yung box nakasarado po.”",
      ),
      p("The box, he noted, was “as big as those used for noodles.”"),
      h("Casino buddies"),
      p(
        "As the investigation proceeded, Hernandez admitted that way back in 2023, he played at the casino when he was invited by Alcantara along with the other engineers, namely, Jaypee Mendoza and Arjay Domasig.",
      ),
      p(
        "He also claimed that the money he was using was Alcantara’s money, which Alcantara denied.",
      ),
      p("“Bakit ko naman po ipapahiram, ipapagamit sa kaniya yung pera ko?” Alcantara said."),
      p(
        "Sen. JV Ejercito then confirmed if they play casino even during working hours, which Hernandez denied too.",
      ),
      p(
        "According to the documents from Okada, Alcantara used the alias “Joseph Castro Villegas,” which he confirmed, while Mendoza uses the alias “Peejay Asuncion.”",
      ),
      h("What will happen next?"),
      p("After being cited in contempt, Hernandez was immediately placed under the Senate’s custody."),
      p(
        "Since Sen. Ronald “Bato” Dela Rosa requested that Hernandez remain in the hearing room rather than being transferred to the Senate’s holding area.",
      ),
      p(
        "In the coming days, Hernandez could either remain under the senate’s custody or be transferred to a facility like the Philippine National Police Custodial Center or Pasay City Jail.",
      ),
      p(
        "The Senate Blue Ribbon Committee is then expected to continue its investigation into the alleged anomalies regarding flood control projects.",
      ),
    ],
  },
  {
    slug: "pbbm-sacks-pnp-chief-torre-nartatez-replaces",
    title: "PBBM sacks PNP Chief Torre, Nartatez replaces",
    category: "Action News",
    section: "3rd Year News Writing",
    date: "August 26, 2025",
    excerpt:
      "President Marcos relieved PNP Chief Nicolas Torre III and named Jose Melencio Nartatez Jr. as officer-in-charge.",
    featured: false,
    body: [
      p(
        "MANILA, Philippines – President Ferdinand “Bongbong” Marcos Jr. relieved Philippine National Police (PNP) Chief General Nicolas Torre III on his position and appointed Ilocos Norte Provincial Police Director Jose Melencio C. Nartatez Jr. as the officer-in-charge (OIC) of the PNP.",
      ),
      p(
        "The Department of Interior and Local Government (DILG) Secretary Juanito Victor ‘Jonvic’ Remulla delivered a statement regarding the ‘difficult but necessary’ decision made by PBBM through a press conference in Camp Crame on Tuesday, August 26.",
      ),
      p(
        "“The President was presented with the facts, and he determined that the best course of action is to uphold the role of NAPOLCOM (National Police Commission) as it was intended by law,” said Remulla.",
      ),
      p(
        "Remulla added that Torre has not violated any law or been charged with any violations and it’s simply the choice of PBBM to make the decision for the PNP.",
      ),
      p(
        "Meanwhile, after the press conference, OIC PNP Police Lieutenant General (PLTGEN) Nartatez delivered his message as part of the Assumption of Command, and he mentioned that he’s aiming for a safer and secured country.",
      ),
      p(
        "“Let us forge a path towards a future where the PNP is not just a force of law, but a beacon of hope and integrity,” Nartatez said as he encouraged the whole PNP force to continue the sworn promise to serve and protect.",
      ),
      p(
        "After his message, Nartatez proceeded to took oath of office which was administered by Remulla, and he then officially assumed the position as the OIC in PNP.",
      ),
    ],
  },
  {
    slug: "whats-next-for-ex-pnp-chief-torre",
    title: "What’s next for ex-PNP Chief Torre?",
    category: "Idea News",
    section: "3rd Year News Writing",
    date: "August 26, 2025",
    excerpt:
      "An analysis piece looks at what may come next for Nicolas Torre III after his short-lived tenure as PNP chief ended.",
    featured: false,
    body: [
      p(
        "MANILA, Philippines – Philippine National Police (PNP) Chief General Nicolas Torre III’s power over the PNP was short-lived, after President Ferdinand “Bongbong” Marcos Jr. decided to put an end with his tenure.",
      ),
      p(
        "“He is a presidential appointee who serves at the pleasure of the president and the president has made a decision to go in another direction,” as mentioned by the Secretary of Interior and Local Government (SILG), Juanito Victor ‘Jonvic’ Remulla, during the press briefing at Camp Crame on August 26, 2025.",
      ),
      p(
        "According to Remulla, PBBM still believes in Torre’s capacity due to his experience in the service and he’s considering offering Torre another post in the government.",
      ),
      p(
        "Torre was the first Philippine National Police Academy graduate to badge the PNP’s four-star rank.",
      ),
      p(
        "Recently, Torre made headlines for the high-profile arrests of the fugitive televangelist Apollo Quiboloy and former President Rodrigo Roa Duterte within his 85 days command over the PNP. As well as when he turned the fistfight challenge of the Acting Mayor Sebastian “Baste” Duterte into a charity boxing match.",
      ),
      p(
        "PBBM then replaced Torre days after these stunts, with the Ilocos Norte Provincial Police Director, Jose Melencio C. Nartatez Jr. – a three-star ranking officer from his hometown.",
      ),
      p(
        "Remulla also mentioned that this was a personal decision of PBBM after his ‘careful perusal’ of facts and not a sanction from the National Police Commission.",
      ),
      p("“The president reserves the right to see what is best fit for the PNP,” Remulla added."),
      p(
        "Based with PBBM’s decision, Nartatez is the best option– he could either surpass the 85 days tenure of Torre or beat the record. Torre was already the 4th PNP chief under PBBM’s administration.",
      ),
      p(
        "Currently, Torre’s position after this relief remains uncertain. He could either accept what PBBM will offer him or retire earlier than planned – he’s originally scheduled to retire on March 11, 2027.",
      ),
    ],
  },
  {
    slug: "manila-north-cemetery-handa-sa-undas-2025",
    title: "Manila North Cemetery handa sa Undas 2025",
    category: "Undas Coverage",
    section: "3rd Year News Writing",
    date: "Undas 2025",
    excerpt:
      "Manila North Cemetery rolled out assistance booths, shuttle service, and tighter security measures as millions of visitors were expected for Undas 2025.",
    featured: false,
    videoUrl: driveVideoUrls.manilaNorthCemetery,
    body: [
      p(
        "Iba’t ibang serbisyo ang inilunsad ng Manila North Cemetery (MNC) ngayong Undas 2025, para sa mga dadalaw, tulad na lamang ng puntod finder assistance, wheelchairs para sa mga senior citizen, persons with disabilities (PWD) at mga buntis.",
      ),
      p("Mas pinaigting din ng pamunuan ng sementeryo ang programang wristband tagging para sa mga bata."),
      p(
        "Ayon sa direktor ng MNC na si Daniel Tan, mayroong isang siyam na anyos ang nawala ngunit mabilis ding nahanap dahil sa tagging system at mga CCTV sa buong sementeryo.",
      ),
      p(
        "“Yung nine years old po na bata, bukod sa system at cctv ay nahanap dahil sa tulong na rin po ng ibang mga bumibisita sa mga puntod,” dagdag pa ni Tan.",
      ),
      p("Makikita ang booth ng puntod finder assistance at wristband tagging pagpasok sa MNC."),
      p(
        "Mayroon ding libreng sakay para sa loob ng sementeryo na handog naman ng pamahalaan ng Maynila, binibigyang prayoridad naman na makasakay dito ang mga senior citizens.",
      ),
      p(
        "Kasalukuyang 35 na e-trike units at drayber ang bumabyahe sa loob ng sementeryo at mayroong tig-aapat na oras kada shift.",
      ),
      p(
        "Upang matiyak naman ang seguridad at kaligtasan, mayroong mga nakapwesto sa iba’t ibang bahagi ng sementeryo na kapulisan mula sa Manila Police District.",
      ),
      p("Bukod pa rito, mahigpit din ang isinasagawang pagsilip sa mga dalang gamit bago makapasok sa MNC."),
      p("Inaasahan naman ng pamunuan ng sementeryo na nasa isang milyon ang bibista ngayong Undas 2025."),
    ],
  },
  {
    slug: "parada-ng-mga-santo-sa-pandi-bulacan",
    title: "PCY: Parada ng mga Santo, paraan upang ipakilala ang mga Santo",
    category: "Undas Coverage",
    section: "3rd Year News Writing",
    date: "October 31, 2025",
    excerpt:
      "A youth-led Parade of Saints in Pandi, Bulacan reframed Halloween eve as catechism and cultural formation instead of fear.",
    featured: false,
    body: [
      p(
        "Pumarada at nagbihis bilang santong Pransiskano ang ilang kabataan sa ikalawang taon ng Parada ng mga Santo sa Pandi, Bulacan, ngayong Oktubre 31, bisperas ng araw ng mga Santo.",
      ),
      p(
        "Binubuo ang parada ng mga kabataan mula sa mga baranggay na nasa ilalim ng Inihahandang Parokya ni San Antonio de Padua, at mayroong tig-tatlong representante.",
      ),
      p(
        "Ayon sa Pangulo ng Parish Commission on Youth (PCY), John Oliver Policarpio, inilunsad ito upang sa pamamagitan ng parada ay makilala ng mga bata ang iba’t ibang santo sa halip na mga katatakutan.",
      ),
      p(
        "“Prinopromote natin ito upang mamulat yung mga kabataan, tulad na lamang na kapag nakakita sila ng babaeng santo eh si Mama Mary na kaagad,” paliwanag pa niya.",
      ),
      p(
        "Dagdag pa ni Policarpio, ang kahulugan ng halloween ay night of the holy at ang Araw ng mga Santo naman ay ang araw upang alalahanin ang mga kaluluwa lalo na ang mga nasa porgatoryo.",
      ),
      p(
        "“Ang Parade of Saints ay uri rin ng katekismo sa buhay ng mga santo at hindi basta parada lamang,” ani pa ni Policarpio.",
      ),
      p("Inaasahan namang Mga Santo ng Banal na Rosaryo ang magiging tema ng parada sa susunod na taon."),
    ],
  },
  {
    slug: "presyo-ng-bulaklak-sa-dangwa-tumaas",
    title: "Presyo ng bulaklak sa Dangwa tumaas; mamimili patuloy na dumarami",
    category: "Undas Coverage",
    section: "3rd Year News Writing",
    date: "October 31, 2025",
    excerpt:
      "Flower prices in Dangwa surged ahead of Undas while buyers kept arriving despite shifting weather and tighter security.",
    featured: false,
    videoUrl: driveVideoUrls.dangwa,
    body: [
      p("Patuloy ang paglobo ng presyo ng bulaklak sa Manila Flower Center o Dangwa, isang araw bago ang Undas."),
      p("Sa kabila naman ng pabago-bagong lagay ng panahon, padagsa-dagsa naman ang bilang ng mga mamimili."),
      p(
        "Ayon kay James Aquino, tindero sa Dangwa, kapag ikinumpara ang presyo ng bulaklak tuwing normal na araw at tuwing may okasyon, umaabot hanggang triple ang nadaragdag na presyo ng bulaklak.",
      ),
      p(
        "“Pinakamabenta naman yung radus at mums o malaysian mums na galing Baguio, ito yung pinakamura at pinakamatibay na klase ng bulaklak,” paliwanag ni Aquino.",
      ),
      p(
        "Dagdag pa niya, karaniwang nasa ₱200 ang kada bundle ang mums ngunit kapag peak season ay umaabot ito ng ₱350 hanggang ₱400.",
      ),
      p(
        "Kasabay naman ng pagdami ng mamimili ay ang paghigpit ng seguridad kung kaya nagkalat ang mga traffic enforcer at mga marshal para sa maayos na daloy na trapiko at mapanatiling ligtas ang pamilihan.",
      ),
      p(
        "“Mayroon ding mga salisihan, mga nagbabayad ng pekeng pera o kaya mga nambubudol na hindi naman nagbayad pero humihingi ng sukli,” ani ng isang Dangwa marshal.",
      ),
      p(
        "Nabanggit din niyang mayroong nanakawan ng cellphone noong nakaraang Valentine’s Day kung kaya paulit-ulit ang kanilang pag-papaalala sa mga mamimili.",
      ),
      p(
        "Bahagi na ng tradisyon ng mga Pilipino bukod sa pagtitirik ng kandila ay ang pagdadala ng bulaklak sa kanilang mga mahal sa buhay na yumao na.",
      ),
    ],
  },
  {
    slug: "bulsu-meneses-campus-online-classes-avr-fire",
    title: "BulSU Meneses Campus shifts to Online Classes due to AVR fire",
    category: "SEO Article",
    section: "3rd Year Digital Journalism",
    date: "September 8, 2025",
    excerpt:
      "BulSU Meneses temporarily shifted to online classes after an AVR fire prompted repairs and safety concerns.",
    featured: false,
    body: [
      p(
        "Face-to-face classes at Bulacan State University (BulSU) Meneses Campus have been suspended and have transitioned to online synchronous learning from September 8 to 13, 2025, due to the fire incident at the Audio-Visual Room (AVR), last September 4.",
      ),
      p(
        "This was through the request of Dr. Marita R. Parobrob, Dean of BulSU Meneses campus and was approved by BulSU’s Vice President for Academic Affairs, Dr. Warlito M. Galita.",
      ),
      p(
        "“In order to ensure the safety of the students and faculty members and to avoid disruption in academic activities, we find it necessary to temporarily shift to online modality while the repair works are in progress,” as stated in the letter of request by Dr. Parobrob.",
      ),
      p("As of writing, the authorities have yet to determine the cause of the fire."),
      p(
        "According to a 3rd year student from BulSU Meneses, who was in the room beside AVR, they first thought that the smoke was from the air conditioner in their room and upon checking outside, they then saw that the fire inside the AVR had already intensified.",
      ),
      p(
        "“Pinalabas agad ng campus kaming students ng mga professor at wala namang nadamay na ibang room sa 2nd floor,” [Professors promptly instructed us to leave the campus and no other rooms on the 2nd floor were affected], the student added.",
      ),
      p("There were no recorded injuries from student or BulSU following the fire."),
      p("The AVR is currently undergoing ceiling and electrical repairs."),
    ],
  },
  {
    slug: "just-in-benjamin-magalong-resignation-ici-special-adviser",
    title:
      "JUST IN: Baguio City Mayor Benjamin Magalong has filed his resignation as the Independent Commission for Infrastructure's (ICI) Special Adviser",
    category: "Just In",
    section: "3rd Year Digital Journalism",
    date: "September 26, 2025",
    excerpt:
      "Benjamin Magalong resigned as ICI special adviser effective immediately after questions about a possible conflict of interest.",
    featured: false,
    body: [
      p(
        "JUST IN: Baguio City Mayor Benjamin Magalong has filed his resignation as the Independent Commission for Infrastructure's (ICI) Special Adviser, effective immediately, as confirmed by his staff on September 26, 2025.",
      ),
      p(
        "This is following President Ferdinand \"Bongbong\" Marcos Jr.'s command to the legal team to review the appointment of Magalong after issues of a possible conflict of interest.",
      ),
    ],
  },
  {
    slug: "just-in-zaldy-co-resigns-house-representatives",
    title:
      "JUST IN: Representative Elizaldy \"Zaldy\" S. Co resigns from the House of Representatives",
    category: "Just In",
    section: "3rd Year Digital Journalism",
    date: "September 29, 2025",
    excerpt:
      "Ako Bicol Party-list Representative Zaldy Co resigned, citing an imminent threat to his family's safety.",
    featured: false,
    body: [
      p(
        "JUST IN: Representative Elizaldy \"Zaldy\" S. Co of Ako Bicol Partylist resigned as the member of the House of Representatives today, September 29, 2025.",
      ),
      p(
        "On his resignation letter, he mentioned that his decision was driven by a real, direct, grave, and imminent threat to the safety of his family.",
      ),
      p("\"I wil respond to each of these baseless' accusations,\" he added."),
    ],
  },
  {
    slug: "just-in-kanlaon-volcano-eruption",
    title: "JUST IN: PHILVOCS reports ongoing eruption at Kanlaon Volcano",
    category: "Just In",
    section: "3rd Year Digital Journalism",
    date: "October 24, 2025",
    excerpt:
      "PHILVOCS reported an ongoing eruption at Kanlaon Volcano based on an evening advisory issued on October 24, 2025.",
    featured: false,
    body: [
      p(
        "JUST IN: Philippine Institute of Volcanology and Seismology (PHILVOCS) reports that there's an ongoing eruption at Kanlaon Volcano in the Negros Islands.",
      ),
      p(
        "This is based on their Facebook post made by 8:09 p.m., Friday, October 24, 2025.",
      ),
    ],
  },
  {
    slug: "ed-caluag-different-perspective",
    title: "Ed Caluag from a Different Perspective",
    category: "Feature Profile",
    section: "3rd Year Digital Journalism",
    date: "2025",
    excerpt:
      "A digital feature profile looks beyond Ed Caluag’s paranormal persona to trace his backstory, teaching career, and media presence.",
    featured: false,
    body: [
      p(
        "“May nararamdaman akong kakaiba rito,” one of his very famous lines on the internet. He enters dark rooms confidently, and his community contributions are more valuable than the segment.",
      ),
      p(
        "Some also tag his name on things related to paranormal activities. Since most of the people knew him as a person who’s an expert with things like this, how about knowing who Edgardo “Ed” Caluag is from a different perspective?",
      ),
      h("The Backstory"),
      p(
        "Ever since he was a kid, he’s been fascinated with paranormal activities. He already sees entities that he doesn’t know what to call. His personal experience-built curiosity in his young mind.",
      ),
      p(
        "Caluag is from the City of Malolos; this is where he was born and where he has built a family of his own.",
      ),
      p(
        "However, he experienced discrimination growing up; it was a battle he faced at such an early age due to his capabilities and interest.",
      ),
      p(
        "“Kapag hindi nila nakikita, i-bra-brand ka nilang baliw. ‘Ang pag-aaral ng ganito noon, ang lumalabas para kang kulto,” he shared.",
      ),
      p(
        "[When they do not see it, they will brand you as crazy. The studies of this before, you’ll be viewed like a cult.]",
      ),
      p(
        "In the past, society’s lack of acceptance hindered his ability to express himself more freely. It limits what he could be and even leads to being ashamed of what he is.",
      ),
      h("Sir Ed"),
      p(
        "Before encompassing these worlds, Ed Caluag was an elementary teacher and a graduate of Bulacan State University. He used this profession for 10 years along with being a faith healer.",
      ),
      p(
        "At the last school that he served as a teacher, he was labeled as someone initiating fear with his students, which he denied.",
      ),
      p(
        "He said that there are students who ask him questions that build conflict with him being a teacher and expert.",
      ),
      p(
        "“Sasabihin ko bang wala naman, pagsisinungalingan ko ba yung bata? Kaso baka naman yung bata ay ma-dissapoint at maguluhan siya,” Caluag added.",
      ),
      p(
        "[Will I say that there is none — lying to the kid? But it could disappoint the kid and confuse him more.]",
      ),
      p(
        "But this reached the administrator of the school he’s teaching at, and he said that he shouldn’t encourage the students to be scared.",
      ),
      p("“Hindi ko naman sila tinatakot, explanation lang kung bakit ganoon,” he said."),
      p("[I’m not scaring them, it was just an explanation if why it is like this.]"),
      p(
        "This was one of the reasons why he decided to stop teaching and just focus on exploring the realm of paranormal things.",
      ),
      h("KMJS Discovery"),
      p(
        "Facebook groups where experts and newbies meet led to him being part of different group discussions, and they later formed an activity named “Intramuros Ghost Walk.”",
      ),
      p(
        "During this walk, they will explore certain parts of Intramuros and assess what they encountered and felt during the trip. The community then grew, leading to discovery from different segments.",
      ),
      p(
        "According to Caluag, the segment “Mars” on the TV show with Camille Prats and Suzi Entrata was the first one to have him as a guest, and then the list goes on until he began to be part of Kapuso Mo Jessica Soho’s Gabi ng Lagim 3.",
      ),
      p(
        "From season 3 until this year’s season 13, Caluag became the regular paranormal expert to be invited to the show. This started him being known for his different executions and analysis.",
      ),
      p(
        "Until now, even though people are slowly becoming more accepting of these, Caluag said that bashing and criticism are still rampant, but it does not stop him from continuing his craft.",
      ),
      p(
        "“Alam ko naming totoo eh, I can debunk them and prove it to them. Pero tatantanggapin ko na mali ako, kung madedebunk din nila ako, basta may proof,” he said.",
      ),
      p(
        "[I know that this is true, I can debunk them and prove it to them. But I will accept that I am wrong, if they can debunk me as long as there’s proof.]",
      ),
      p("Caluag said that he uses personal experience, logic, and science for his assessments."),
      p(
        "Things not seen through the naked eye are indeed hard to believe, but respect is what people should practice.",
      ),
      p(
        "It’s normal to be skeptical about believing in this realm, but what isn’t normal is laughing at people who believe in it.",
      ),
    ],
  },
];

export const textSamples: TextSample[] = [
  {
    id: "hard-news-lede",
    label: "Hard News",
    date: "March 11, 2025",
    title: "ICC nabs FPRRD upon arrival at NAIA",
    excerpt:
      "Former President Rodrigo Duterte was presented his arrest warrant by the Philippine National Police (PNP) under the order of International Criminal Court (ICC) upon his arrival at Ninoy Aquino International Airport, last Tuesday, March 11.",
    context:
      "A straight-news lede built around immediate action, legal stakes, and attribution from official government channels.",
    articleSlug: "icc-nabs-fprrd-upon-arrival-at-naia",
  },
  {
    id: "feature-writing",
    label: "Feature Writing",
    date: "2025",
    title: "Strike of Modernity: The Traditional Jeepneys in the Country",
    excerpt:
      "Change is the only constant thing in the world, they say, and indeed, it is. Every day, there’s a change that’s happening in each person’s life, and it will be scarier if you don’t experience changes in your life. But in every change that occurs, there will be things that will be hard to let go of and adapt to.\n\nJust like with the government’s program—the jeepney modernization.",
    context:
      "A reflective feature opening that uses general reflection before narrowing into a distinctly Filipino policy and culture story.",
    articleSlug: "strike-of-modernity-traditional-jeepneys",
  },
  {
    id: "tv-script",
    label: "TV Script",
    date: "2025",
    title: "KAUNA-UNAHANG BARMM PARLIAMENTARY ELECTION, PINAGHAHANDAAN NA NG COMELEC",
    excerpt:
      "GAGANAPIN NA SA DARATING NA A-TRESE NG OKTUBRE NGAYONG TAON / ANG ELEKSYON SA BANGSAMORO AUTONOMOUS REGION IN MUSLIM MINDANAO / O BARMM / KAYA NAMAN KABI-KABILA NA ANG HAKBANG NA ISINASAGAWA\n\nAYON KAY COMMISION ON ELECTIONS CHAIRMAN / GEORGE ERWIN M. GARCIA / NA ANG SOUTH KOREAN PROVIDER NA MIRU SYSTEMS / ANG GAGAMITING MULI SA PINAKA-UNANG BANGSAMORO PARLIAMENTARY ELECTIONS /",
    context:
      "A broadcast-writing sample presented in uppercase teleprompter style to highlight pacing, clarity, and TV delivery rhythm.",
    format: "script",
  },
];

const spotlightSlugs = [
  "deped-tesda-free-nc-test",
  "discaya-names-reps-dpwh-execs-kickback-scheme",
  "bulsu-meneses-campus-online-classes-avr-fire",
  "how-to-get-away-with-murder-duterte-version",
] as const;

const toSummary = ({ body, ...summary }: Article): ArticleSummary => summary;

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getAllArticleSlugs() {
  return articles.map((article) => article.slug);
}

export function getArticleSummaries() {
  return articles.map(toSummary);
}

export function getHomepageData() {
  const summaries = getArticleSummaries();
  const featured =
    summaries.find((article) => article.featured) ?? summaries[0];

  const spotlight = spotlightSlugs
    .map((slug) => summaries.find((article) => article.slug === slug))
    .filter((article): article is ArticleSummary => Boolean(article));

  return {
    profile,
    stats: [
      { label: "Published Pieces", value: articles.length },
      { label: "Video Works", value: videos.length },
      { label: "Portfolio Sections", value: sectionOrder.length },
      { label: "Text Samples", value: textSamples.length },
    ],
    featured,
    spotlight,
    groupedSections: sectionOrder.map((section) => ({
      section,
      articles: summaries.filter((article) => article.section === section),
    })),
    videos,
    textSamples,
  };
}
