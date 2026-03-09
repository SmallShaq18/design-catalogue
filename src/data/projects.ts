import type { DesignProject } from "../types/DesignProject";

const cdn = (path: string) =>
  `https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/${path}`;

export const projects: DesignProject[] = [
  // ── 01 ──────────────────────────────────────────────────────────────────────
  {
    id: "1",
    slug: "turinex-branding",
    title: "TURINEX Branding Series",
    category: "branding",
    coverImage: cdn("v1765805043/TURINEX_2_sngo9a.jpg"),
    gallery: [
      cdn("v1765805025/TURINEX_1_aesky2.png"),
      cdn("v1765805024/TURINEX_1_jvmpmf.jpg"),
      cdn("v1765805030/TURINEX_2_gv1asr.png"),
      cdn("v1765805043/TURINEX_2_sngo9a.jpg"),
      cdn("v1765805032/TURINEX_3_ubsccw.jpg"),
      cdn("v1765805032/TURINEX_3_b0zfg8.png"),
      cdn("v1765805036/TURINEX_4_mu12qr.jpg"),
      cdn("v1765805035/TURINEX_4_gqfoao.png"),
      cdn("v1765805042/TURINEX_5_ddgw5k.jpg"),
    ],
    description: "A comprehensive branding identity system for TURINEX. Clean typography, modern colour palette, and versatile design applications.",
    year: 2024,
    tools: ["Adobe Photoshop", "Illustrator"],
    tags: ["branding", "logo", "corporate", "identity"],
    featured: true,
  },

  // ── 02 ──────────────────────────────────────────────────────────────────────
  {
    id: "2",
    slug: "movie-poster",
    title: "Movie Posters",
    category: "poster",
    coverImage: cdn("v1765804465/CHUCKY_POSTER_tv6qss.png"),
    gallery: [
      cdn("v1765805058/WHISPERS_MOVIE_POSTER_ypjw8m.jpg"),
      cdn("v1765804465/CHUCKY_POSTER_tv6qss.png"),
    ],
    description: "Dramatic movie poster with bold composition and a cinematic, intriguing aesthetic.",
    year: 2023,
    tools: ["Photoshop", "Illustrator"],
    tags: ["poster", "cinema", "entertainment"],
  },

  // ── 03 ──────────────────────────────────────────────────────────────────────
  {
    id: "3",
    slug: "trifold-brochure",
    title: "Trifold Brochure Design",
    category: "print",
    coverImage: cdn("v1765805044/Trifold_Brochure_Design_xmgwis.jpg"),
    gallery: [
      cdn("v1765805044/Trifold_Brochure_Design_xmgwis.jpg"),
      cdn("v1765805023/Trifold_Brochure_Design_Front_qb1l5g.jpg"),
      cdn("v1765805023/Trifold_Brochure_Design_Back_agqitv.jpg"),
    ],
    description: "Professional trifold brochure with balanced layout and engaging copy across three panels.",
    year: 2023,
    tools: ["Illustrator", "Photoshop"],
    tags: ["brochure", "print", "marketing"],
  },

  // ── 04 ──────────────────────────────────────────────────────────────────────
  {
    id: "4",
    slug: "rolfy-branding-collection",
    title: "ROLFY Branding Collection",
    category: "branding",
    coverImage: cdn("v1765804939/ROLFY_9_jqayzp.jpg"),
    gallery: [
      cdn("v1765804941/ROLFY_mgo6rx.jpg"),
      cdn("v1765804923/ROLFY_2_drbhk8.png"),
      cdn("v1765804921/ROLFY_2_wlrzda.jpg"),
      cdn("v1765804926/ROLFY_3_g39qwi.png"),
      cdn("v1765804926/ROLFY_3_up4aeh.jpg"),
      cdn("v1765804928/ROLFY_4_cmwatt.png"),
      cdn("v1765804934/ROLFY_5_qysbyv.png"),
      cdn("v1765804933/ROLFY_6_j3jhij.jpg"),
      cdn("v1765804934/ROLFY_7_mebzzj.jpg"),
      cdn("v1765804937/ROLFY_8_p5lv3n.jpg"),
      cdn("v1765804939/ROLFY_9_jqayzp.jpg"),
    ],
    description: "Extensive branding showcasing diverse creative directions and visual concepts.",
    year: 2024,
    tools: ["Illustrator", "Photoshop"],
    tags: ["branding"],
  },

  // ── 05 ──────────────────────────────────────────────────────────────────────
  {
    id: "5",
    slug: "smartphone-ui-designs",
    title: "Smartphone UI Design Series",
    category: "flyer",
    coverImage: cdn("v1765804920/sm_5_yf5i4y.png"),
    gallery: [
      cdn("v1765804953/sm_1_ovb7vy.png"),
      cdn("v1765804956/sm_2_uxf1j0.png"),
      cdn("v1765804943/sm_2_ia0cps.jpg"),
      cdn("v1765804916/sm_3_jouthw.png"),
      cdn("v1765804944/sm_4_hep0gv.png"),
      cdn("v1765804920/sm_5_yf5i4y.png"),
      cdn("v1765805015/sm_6_cwms0p.png"),
      cdn("v1765805019/sm_7_rc6wka.jpg"),
      cdn("v1765805016/sm_8_kgxpm2.jpg"),
      cdn("v1765805018/sm_9_zherbe.jpg"),
    ],
    description: "Collection of smartphone interface designs exploring layout, typography, and visual hierarchy.",
    year: 2024,
    tools: ["Pixelab", "Canva"],
    tags: ["ui", "mobile", "ux"],
  },

  // ── 06 ──────────────────────────────────────────────────────────────────────
  {
    id: "6",
    slug: "wedding-stationery",
    title: "Wedding Stationery Collection",
    category: "print",
    coverImage: cdn("v1765805007/wedding_card_stguaf.jpg"),
    gallery: [
      cdn("v1765805007/wedding_card_stguaf.jpg"),
      cdn("v1765805010/WEDDING_I.V_pdptkc.jpg"),
      cdn("v1765805012/WEDDING_order_of_events_gsujdg.jpg"),
    ],
    description: "Elegant wedding stationery featuring cohesive design across invitation, order of events, and thank-you cards.",
    year: 2023,
    tools: ["Illustrator", "Photoshop"],
    tags: ["wedding", "stationery", "print"],
  },

  // ── 07 ──────────────────────────────────────────────────────────────────────
  {
    id: "7",
    slug: "quenchil-branding",
    title: "QUENCHIL Brand Identity",
    category: "branding",
    coverImage: cdn("v1765804850/QUENCHIL_1_xaouph.jpg"),
    gallery: [
      cdn("v1765804850/QUENCHIL_1_xaouph.jpg"),
      cdn("v1765804851/QUENCHIL_1_lqwkfh.png"),
      cdn("v1765804852/QUENCHIL_2_jvlsia.jpg"),
      cdn("v1765804855/QUENCHIL_2_lfp2pr.png"),
      cdn("v1765804857/QUENCHIL_3_rpyjhn.jpg"),
      cdn("v1765804832/QUENCHIL_3_bqwjvv.png"),
      cdn("v1765804831/QUENCHIL_4_ifb98t.jpg"),
      cdn("v1765804832/QUENCHIL_4_zdhc0k.png"),
      cdn("v1765804833/QUENCHIL_5_hyt4ge.jpg"),
      cdn("v1765804833/QUENCHIL_5_fmznjv.png"),
      cdn("v1765804836/QUENCHIL_6_yowpol.jpg"),
      cdn("v1765804838/QUENCHIL_7_leu2rs.jpg"),
      cdn("v1765804839/QUENCHIL_8_z2jrw4.jpg"),
      cdn("v1765804838/QUENCHIL_9_lr9phd.jpg"),
      cdn("v1765804840/QUENCHIL_10_pnzs1p.jpg"),
      cdn("v1765804840/QUENCHIL_11_epvwty.jpg"),
      cdn("v1765804841/QUENCHIL_12_ockeym.jpg"),
      cdn("v1765804843/QUENCHIL_13_sgrdeb.jpg"),
    ],
    description: "Complete brand identity for QUENCHIL including logo variations, colour applications, and marketing materials across 13 pieces.",
    client: "QUENCHIL Ltd",
    year: 2024,
    tools: ["Illustrator", "Photoshop"],
    tags: ["branding", "logo", "identity"],
  },

  // ── 08 ──────────────────────────────────────────────────────────────────────
  {
    id: "8",
    slug: "pizza-restaurant-marketing",
    title: "Pizza Restaurant Marketing Suite",
    category: "flyer",
    coverImage: "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804852/PIZZA_FLYER_cphaol.jpg",
    gallery: [
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804852/PIZZA_FLYER_cphaol.jpg",
      cdn("v1765804850/PIZZA_MENU_sha7dp.jpg"),
    ],
    description: "Marketing collateral featuring eye-catching flyer and menu designs with appetising imagery.",
    client: "Pizza Restaurant",
    year: 2023,
    tools: ["Photoshop", "Illustrator"],
    tags: ["flyer", "menu", "food"],
  },

  // ── 09 ──────────────────────────────────────────────────────────────────────
  {
    id: "9",
    slug: "evrus-branding",
    title: "EVRUS Complete Branding",
    category: "branding",
    coverImage: cdn("v1765804693/EVRUS_vkyiyv.jpg"),
    gallery: [
      cdn("v1765804693/EVRUS_vkyiyv.jpg"),
      cdn("v1765804707/EVRUS_1_ck0zl9.jpg"),
      cdn("v1765804688/EVRUS_1_zde54q.png"),
      cdn("v1765804698/EVRUS_2_bx1m93.jpg"),
      cdn("v1765804688/EVRUS_2_alybnr.png"),
      cdn("v1765804688/EVRUS_3_t4mxb9.jpg"),
      cdn("v1765804699/EVRUS_4_kjns3j.jpg"),
      cdn("v1765804698/EVRUS_5_plljk3.jpg"),
      cdn("v1765804692/EVRUS_6_qchja7.jpg"),
      cdn("v1765804691/EVRUS_7_jm3f5j.jpg"),
      cdn("v1765804696/EVRUS_8_t93em9.jpg"),
    ],
    description: "Complete EVRUS branding system with consistent visual language across all applications.",
    year: 2024,
    tools: ["Illustrator", "Photoshop"],
    tags: ["branding", "corporate", "identity"],
  },

  // ── 10 ──────────────────────────────────────────────────────────────────────
  {
    id: "10",
    slug: "chichi-brand-system",
    title: "CHICHI Brand System",
    category: "branding",
    coverImage: cdn("v1765804458/CHICHI_z7dqzm.jpg"),
    gallery: [
      cdn("v1765804452/CHICHI_1_hsi9gx.jpg"),
      cdn("v1765804427/CHICHI_1_p7hcsi.png"),
      cdn("v1765804452/CHICHI_2_ogitg4.jpg"),
      cdn("v1765804440/CHICHI_3_jhjokk.jpg"),
      cdn("v1765804461/CHICHI_4_vhwzmm.jpg"),
      cdn("v1765804440/CHICHI_5_fmrioq.jpg"),
      cdn("v1765804454/CHICHI_6_priuaa.jpg"),
      cdn("v1765804459/CHICHI_7_own11t.jpg"),
      cdn("v1765804458/CHICHI_8_pot0ic.jpg"),
      cdn("v1765804454/CHICHI_9_lfwt6w.jpg"),
    ],
    description: "Cohesive brand visual system for CHICHI with diverse applications and consistent styling across 9 pieces.",
    year: 2024,
    tools: ["Illustrator", "Photoshop"],
    tags: ["branding", "design system", "identity"],
    featured: true,
  },

  // ── 11 — NEW ────────────────────────────────────────────────────────────────
  {
    id: "11",
    slug: "juanita-branding",
    title: "Juanita Brand Illustration",
    category: "branding",
    coverImage: cdn("v1765804682/juanita_dbgdub.png"),
    gallery: [
      cdn("v1765804682/juanita_dbgdub.png"),
      cdn("v1765804681/juanita_motzwv.jpg"),
      cdn("v1765804467/Business_card_pjide7.jpg"),
    ],
    description: "Character-driven brand illustration for Juanita, paired with supporting business card design.",
    year: 2023,
    tools: ["Illustrator", "Photoshop"],
    tags: ["branding", "illustration", "character"],
  },

  // ── 12 — NEW ────────────────────────────────────────────────────────────────
  {
    id: "12",
    slug: "fantasy-illustrations",
    title: "Fantasy Illustration Series",
    category: "others",
    coverImage: cdn("v1765804736/FANTASY_4_wcstie.png"),
    gallery: [
      cdn("v1765804728/FANTASY_ulsmks.png"),
      cdn("v1765804710/FANTASY_2.1_dizixn.png"),
      cdn("v1765804714/FANTASY_3_ultdgx.png"),
      cdn("v1765804736/FANTASY_4_wcstie.png"),
      cdn("v1765887551/FANTASY_1_pultpu.jpg"),
      cdn("v1765804961/shards_pic_o_gxb5ln.png"),
      cdn("v1765804960/shards_pic_t4nowq.png"),
      cdn("v1765804462/cracked_mirror_image_j5ig9y.png"),
    ],
    description: "Imaginative fantasy and surreal digital illustration series exploring texture, light, and fragmentation.",
    year: 2024,
    tools: ["Photoshop"],
    tags: ["illustration", "fantasy", "digital art", "surreal"],
    featured: true,
  },

  // ── 13 — NEW ────────────────────────────────────────────────────────────────
  {
    id: "13",
    slug: "double-exposure-series",
    title: "Double Exposure Series",
    category: "others",
    coverImage: cdn("v1765804688/double_exposure_effect_5_akgzwr.jpg"),
    gallery: [
      cdn("v1765804684/double_exposure_effect_3_etsxzy.jpg"),
      cdn("v1765804684/double_exposure_effect_4_okweut.jpg"),
      cdn("v1765804688/double_exposure_effect_5_akgzwr.jpg"), 
    ],
    description: "Photo manipulation series using double exposure techniques.",
    year: 2023,
    tools: ["Photoshop"],
    tags: ["photo manipulation", "double exposure", "vintage"],
  },

  // ── 14 — NEW ────────────────────────────────────────────────────────────────
  {
    id: "14",
    slug: "packaging-design",
    title: "Packaging Design Collection",
    category: "print",
    coverImage: cdn("v1765804735/FRUIT_JUICE_PACKAGING_muivyp.png"),
    gallery: [
      cdn("v1765804735/FRUIT_JUICE_PACKAGING_muivyp.png"),
      cdn("v1765804736/MILK_BOX_2_suboom.png"),
      cdn("v1765887545/MILK_BOX_lvsb3s.jpg"),
      cdn("v1765887545/BODY_CREAM_PACKAGING_gct7py.jpg"),
    ],
    description: "Consumer product packaging designs for fruit juice, milk, and body care — balancing shelf appeal with brand clarity.",
    year: 2024,
    tools: ["Illustrator", "Photoshop"],
    tags: ["packaging", "print", "product design"],
    featured: true,
  },

  // ── 15 — NEW ────────────────────────────────────────────────────────────────
  {
    id: "15",
    slug: "infographics",
    title: "Infographics & Data Design",
    category: "poster",
    coverImage: cdn("v1765804682/INFOGRAPHICS_f70nee.png"),
    gallery: [
      cdn("v1765804682/INFOGRAPHICS_f70nee.png"),
      cdn("v1765804682/INFOGRAPHICS_2_jw5ark.jpg"),
      cdn("v1765804684/INFOGRAPHICS_uynuxq.jpg"),
    ],
    description: "Visual communication pieces including infographics, data layouts, and promotional banners.",
    year: 2023,
    tools: ["Illustrator", "Photoshop", "Canva"],
    tags: ["infographic", "data", "poster", "banner"],
  },

  // ── 16 — NEW ────────────────────────────────────────────────────────────────
  {
    id: "16",
    slug: "book-covers",
    title: "Book Cover Designs",
    category: "print",
    coverImage: cdn("v1765805057/YOU_BOOK_COVER_fqozra.png"),
    gallery: [
      cdn("v1765805057/YOU_BOOK_COVER_fqozra.png"),
      cdn("v1765805056/YOU_BOOK_COVER_Mockup_vjzm1s.png"),
      cdn("v1765804504/BOOK_COVER_w66abb.png"),
      cdn("v1765887545/BOOK_COVER_2_ttotob.jpg"),
    ],
    description: "Standalone book cover concepts exploring type hierarchy and visual tension.",
    year: 2023,
    tools: ["Photoshop", "Illustrator"],
    tags: ["book design", "print", "typography"],
  },

  // ── 17 — NEW ────────────────────────────────────────────────────────────────
  {
    id: "17",
    slug: "event-flyers",
    title: "Event & Business Flyers",
    category: "flyer",
    coverImage: cdn("v1765804469/business_flyer_dsx4yj.jpg"),
    gallery: [
      cdn("v1765804469/business_flyer_dsx4yj.jpg"),
      cdn("v1765804468/BIRTHDAY_jdmowr.jpg"),
      cdn("v1765804480/CAKE_FLYER_aomah_u76max.png"),
      cdn("v1765804466/CAKE_FLYER_xjv9cv.jpg"),
      cdn("v1765804469/aomah_ktmoxs.png"),
      cdn("v1765804699/DIGITAL_MARKETING_AGENCY_cvrq2x.jpg"),
      cdn("v1765804463/CREATIVE_MARKETING_AGENCY_ah9tub.jpg"),
      cdn("v1765804848/photography_vm2nze.jpg"),
    ],
    description: "Diverse flyer designs for birthdays, business promotions, bakery launches, and marketing agencies.",
    year: 2023,
    tools: ["Photoshop", "Illustrator"],
    tags: ["flyer", "event", "marketing"],
  },

  // ── 18 — NEW ────────────────────────────────────────────────────────────────
  {
    id: "18",
    slug: "magazine-covers",
    title: "Magazine Covers",
    category: "poster",
    coverImage: cdn("v1765804703/MAGAZINE_COVER_tkgb9h.jpg"),
    gallery: [
      cdn("v1765804703/MAGAZINE_COVER_tkgb9h.jpg"),
    ],
    description: "Editorial poster work including a magazine cover.",
    year: 2023,
    tools: ["Photoshop", "Illustrator"],
    tags: ["editorial", "magazine"],
  },

  // ── 19 — NEW ────────────────────────────────────────────────────────────────
  {
    id: "19",
    slug: "vehicle-mockup",
    title: "Vehicle & Environmental mockup",
    category: "others",
    coverImage: cdn("v1765804468/CARGO_VAN_ISHIDOE_FRONT-SIDE_onyecp.jpg"),
    gallery: [
      cdn("v1765804468/CARGO_VAN_ISHIDOE_FRONT-SIDE_onyecp.jpg"),
      cdn("v1765804468/CARGO_VAN_ISHIDOE_BACK-SIDE_tg43kz.jpg"),
      cdn("v1765804439/CARGO_VAN_ISHIDOE_ovuifr.jpg"),
    ],
    description: "Full vehicle wrap design for Ishidoe cargo van — front, back, and three-quarter views.",
    year: 2024,
    tools: ["Illustrator", "Photoshop"],
    tags: ["vehicle branding", "wrap", "environmental"],
  },

  // ── 20 — NEW (TURINEX 6-11 were missing from gallery) ───────────────────────
  {
    id: "20",
    slug: "turinex-extended",
    title: "TURINEX Extended Series",
    category: "branding",
    coverImage: cdn("v1765805006/TURINEX_11_ysuixd.jpg"),
    gallery: [
      cdn("v1765804997/TURINEX_6_vcamnk.jpg"),
      cdn("v1765805000/TURINEX_7_bzkeyp.jpg"),
      cdn("v1765805000/TURINEX_8_cf6kup.jpg"),
      cdn("v1765805003/TURINEX_9_u45yta.jpg"),
      cdn("v1765805002/TURINEX_10_pyvy7m.jpg"),
      cdn("v1765805006/TURINEX_11_ysuixd.jpg"),
    ],
    description: "Continuation of the TURINEX identity — pieces 6 through 11 expanding the visual system.",
    year: 2024,
    tools: ["Illustrator", "Photoshop"],
    tags: ["branding", "logo", "corporate"],
  },

  //21 ── 21 — NEW OLD PHOTOS ────────────────────────────────────────────────
  {
    id: "21",
    slug: "old-photo-series",
    title: "Old Photo Series",
    category: "others",
    coverImage: cdn("v1765887556/OLD_PHOTO_2_nsyozp.jpg"),
    gallery: [
      cdn("v1765887556/OLD_PHOTO_2_nsyozp.jpg"),
      cdn("v1765887565/OLD_PHOTO_3_z6gpym.jpg"),
    ],
    description: "Photo manipulation series using vintage restoration techniques.",
    year: 2023,
    tools: ["Photoshop"],
    tags: ["photo manipulation", "double exposure", "vintage"],
  },

  {
    id: "22",
    slug: "fashion-banners",
    title: "Fashion banners Collection",
    category: "print",
    coverImage: cdn("v1765887544/BANNER_mtptzf.jpg"),
    gallery: [
      cdn("v1765887544/BANNER_mtptzf.jpg"),
    ],
    description: "Elegant fashion banners.",
    year: 2023,
    tools: ["Illustrator", "Photoshop"],
    tags: ["fashion", "banners", "print"],
  },

  {
    id: "23",
    slug: "calendar",
    title: "Calendar Collection",
    category: "print",
    coverImage: cdn("v1765804499/Calendar_Design_rgayzi.png"),
    gallery: [
      cdn("v1765804499/Calendar_Design_rgayzi.png"),
    ],
    description: "Elegant Calendar design.",
    year: 2023,
    tools: ["Illustrator", "Photoshop"],
    tags: ["calendar", "print"],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const getProjectBySlug = (slug: string): DesignProject | undefined =>
  projects.find((p) => p.slug === slug);

export const getProjectsByCategory = (category: string): DesignProject[] =>
  projects.filter((p) => p.category === category);

export const getFeaturedProjects = (): DesignProject[] =>
  projects.filter((p) => p.featured);

export const getAllCategories = (): string[] =>
  Array.from(new Set(projects.map((p) => p.category))).sort();

export const searchProjects = (query: string): DesignProject[] => {
  const q = query.toLowerCase();
  return projects.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q))
  );
};

/*import type { DesignProject } from "../types/DesignProject";

export const projects: DesignProject[] = [
  {
    id: "1",
    slug: "turinex-branding",
    title: "TURINEX Branding Series",
    category: "branding",
    coverImage: "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805043/TURINEX_2_sngo9a.jpg",
    gallery: [
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805025/TURINEX_1_aesky2.png",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805024/TURINEX_1_jvmpmf.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805030/TURINEX_2_gv1asr.png",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805043/TURINEX_2_sngo9a.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805032/TURINEX_3_ubsccw.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805032/TURINEX_3_b0zfg8.png",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805036/TURINEX_4_mu12qr.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805035/TURINEX_4_gqfoao.png",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805042/TURINEX_5_ddgw5k.jpg",
    ],
    description: "A comprehensive branding identity system for TURINEX. Featuring clean typography, modern color palette, and versatile design applications.",
    year: 2024,
    tools: ["Adobe XD", "Figma", "Illustrator"],
    tags: ["branding", "logo", "corporate", "identity"],
    featured: true,
  },
  {
    id: "2",
    slug: "you-book-cover",
    title: "YOU Book Cover Design",
    category: "print",
    coverImage: "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805057/YOU_BOOK_COVER_fqozra.png",
    gallery: [
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805057/YOU_BOOK_COVER_fqozra.png",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805056/YOU_BOOK_COVER_Mockup_vjzm1s.png",
    ],
    description: "Elegant book cover design featuring sophisticated typography and compelling visual hierarchy. Includes cover design and realistic mockup.",
    client: "Book Publisher",
    year: 2023,
    tools: ["Photoshop", "InDesign"],
    tags: ["book design", "print", "typography"],
    featured: true,
  },
  {
    id: "3",
    slug: "whispers-movie-poster",
    title: "Whispers Movie Poster",
    category: "poster",
    coverImage: "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805058/WHISPERS_MOVIE_POSTER_ypjw8m.jpg",
    gallery: [
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805058/WHISPERS_MOVIE_POSTER_ypjw8m.jpg",
    ],
    description: "Dramatic movie poster with bold composition creating an intriguing and cinematic aesthetic.",
    year: 2023,
    tools: ["Photoshop", "Illustrator"],
    tags: ["poster", "cinema", "entertainment"],
  },
  {
    id: "4",
    slug: "trifold-brochure",
    title: "Trifold Brochure Design",
    category: "print",
    coverImage: "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805044/Trifold_Brochure_Design_xmgwis.jpg",
    gallery: [
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805044/Trifold_Brochure_Design_xmgwis.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805023/Trifold_Brochure_Design_Front_qb1l5g.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805023/Trifold_Brochure_Design_Back_agqitv.jpg",
    ],
    description: "Professional trifold brochure with balanced layout and engaging copy across three panels.",
    year: 2023,
    tools: ["InDesign", "Photoshop"],
    tags: ["brochure", "print", "marketing"],
  },
  {
    id: "5",
    slug: "rolfy-poster-collection",
    title: "ROLFY Poster Collection",
    category: "poster",
    coverImage: "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804939/ROLFY_9_jqayzp.jpg",
    gallery: [
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804941/ROLFY_mgo6rx.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804923/ROLFY_2_drbhk8.png",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804921/ROLFY_2_wlrzda.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804926/ROLFY_3_g39qwi.png",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804926/ROLFY_3_up4aeh.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804928/ROLFY_4_cmwatt.png",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804934/ROLFY_5_qysbyv.png",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804933/ROLFY_6_j3jhij.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804934/ROLFY_7_mebzzj.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804937/ROLFY_8_p5lv3n.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804939/ROLFY_9_jqayzp.jpg",
    ],
    description: "Extensive poster series showcasing diverse creative directions and visual concepts.",
    year: 2024,
    tools: ["Illustrator", "Photoshop"],
    tags: ["poster", "series", "branding"],
    featured: true,
  },
  {
    id: "6",
    slug: "smartphone-ui-designs",
    title: "Smartphone UI Design Series",
    category: "flyer",
    coverImage: "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804953/sm_1_ovb7vy.png",
    gallery: [
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804953/sm_1_ovb7vy.png",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804956/sm_2_uxf1j0.png",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804943/sm_2_ia0cps.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804916/sm_3_jouthw.png",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804944/sm_4_hep0gv.png",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804920/sm_5_yf5i4y.png",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805019/sm_7_rc6wka.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805016/sm_8_kgxpm2.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805018/sm_9_zherbe.jpg",
    ],
    description: "Collection of smartphone interface designs exploring layout, typography, and interaction patterns.",
    year: 2024,
    tools: ["Figma", "Adobe XD"],
    tags: ["ui", "mobile", "ux"],
    featured: true,
  },
  {
    id: "7",
    slug: "wedding-stationery",
    title: "Wedding Stationery Collection",
    category: "print",
    coverImage: "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805007/wedding_card_stguaf.jpg",
    gallery: [
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805007/wedding_card_stguaf.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805010/WEDDING_I.V_pdptkc.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765805012/WEDDING_order_of_events_gsujdg.jpg",
    ],
    description: "Elegant wedding stationery featuring cohesive design across invitation, order of events, and thank-you cards.",
    year: 2023,
    tools: ["InDesign", "Photoshop"],
    tags: ["wedding", "stationery"],
  },
  {
    id: "8",
    slug: "quenchil-branding",
    title: "QUENCHIL Brand Identity",
    category: "branding",
    coverImage: "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804850/QUENCHIL_1_xaouph.jpg",
    gallery: [
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804850/QUENCHIL_1_xaouph.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804851/QUENCHIL_1_lqwkfh.png",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804852/QUENCHIL_2_jvlsia.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804855/QUENCHIL_2_lfp2pr.png",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804857/QUENCHIL_3_rpyjhn.jpg",
    ],
    description: "Complete brand identity for QUENCHIL including logo variations, color applications, and marketing materials.",
    client: "QUENCHIL Ltd",
    year: 2024,
    tools: ["Illustrator", "InDesign"],
    tags: ["branding", "logo"],
  },
  {
    id: "9",
    slug: "pizza-restaurant-marketing",
    title: "Pizza Restaurant Marketing Suite",
    category: "flyer",
    coverImage: "https://res.cloudinary.com/dlu8ltbx1/image/upload/v1765804852/PIZZA_FLYER_cphaol.jpg",
    gallery: [
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/v1765804852/PIZZA_FLYER_cphaol.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804850/PIZZA_MENU_sha7dp.jpg",
    ],
    description: "Marketing collateral featuring eye-catching flyer and menu designs with appetizing imagery.",
    client: "Pizza Restaurant",
    year: 2023,
    tools: ["Photoshop", "InDesign"],
    tags: ["flyer", "menu", "food"],
  },
  {
    id: "10",
    slug: "evrus-branding",
    title: "EVRUS Complete Branding",
    category: "branding",
    coverImage: "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804693/EVRUS_vkyiyv.jpg",
    gallery: [
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804693/EVRUS_vkyiyv.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804707/EVRUS_1_ck0zl9.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804688/EVRUS_1_zde54q.png",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804698/EVRUS_2_bx1m93.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804688/EVRUS_2_alybnr.png",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804699/EVRUS_4_kjns3j.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804692/EVRUS_6_qchja7.jpg",
    ],
    description: "Complete EVRUS branding system with consistent visual language across all applications.",
    year: 2024,
    tools: ["Illustrator", "Photoshop"],
    tags: ["branding", "corporate"],
    featured: true,
  },
  {
    id: "11",
    slug: "chichi-brand-system",
    title: "CHICHI Brand System",
    category: "branding",
    coverImage: "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804458/CHICHI_z7dqzm.jpg",
    gallery: [
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804458/CHICHI_z7dqzm.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804461/CHICHI_4_vhwzmm.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804454/CHICHI_6_priuaa.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804459/CHICHI_7_own11t.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804458/CHICHI_8_pot0ic.jpg",
      "https://res.cloudinary.com/dlu8ltbx1/image/upload/w_1000,f_auto,q_auto/v1765804454/CHICHI_9_lfwt6w.jpg",
    ],
    description: "Cohesive brand visual system for CHICHI with diverse applications and consistent styling.",
    year: 2024,
    tools: ["Illustrator", "Photoshop"],
    tags: ["branding", "design system"],
    featured: true,
  },
];

export const getProjectBySlug = (slug: string): DesignProject | undefined => {
  return projects.find((p) => p.slug === slug);
};

export const getProjectsByCategory = (category: string): DesignProject[] => {
  return projects.filter((p) => p.category === category);
};

export const getFeaturedProjects = (): DesignProject[] => {
  return projects.filter((p) => p.featured);
};

export const getAllCategories = (): string[] => {
  const categories = new Set(projects.map((p) => p.category));
  return Array.from(categories).sort();
};

export const searchProjects = (query: string): DesignProject[] => {
  const lowerQuery = query.toLowerCase();
  return projects.filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description?.toLowerCase().includes(lowerQuery) ||
      p.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
};
*/