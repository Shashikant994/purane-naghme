/**
 * Purane Naghme — Song Data Model
 * 100 evergreen Bollywood tracks across 5 eras (1950 – 2010).
 * `youtubeId` values are verified, embeddable YouTube videos (oEmbed-validated)
 * used exclusively as the invisible audio source via the YouTube IFrame API.
 */

export type EraId =
  | "1950-1969"
  | "1970-1979"
  | "1980-1989"
  | "1990-1999"
  | "2000-2010";

export interface Song {
  id: string;
  title: string;
  movie: string;
  year: number;
  eraId: EraId;
  eraName: string;
  youtubeId: string;
  coverUrl?: string;
}

export interface Era {
  id: EraId;
  eraName: string;
  period: string;
  tag: string;
  description: string;
  coverUrl: string;
  accent: string;
}

export const ERAS: Era[] = [
  {
    id: "1950-1969",
    eraName: "Golden Era",
    period: "1950 – 1969",
    tag: "50s-60s",
    description:
      "The foundational age of Hindi cinema music led by Mohammed Rafi, Lata Mangeshkar, Kishore Kumar, Asha Bhosle, Mukesh, Shankar-Jaikishan, and S.D. Burman.",
    coverUrl: "/covers/golden.png",
    accent: "#f5b942",
  },
  {
    id: "1970-1979",
    eraName: "Classic Retro Era",
    period: "1970 – 1979",
    tag: "70s",
    description:
      "Defined by R.D. Burman's innovative arrangements, Kishore Kumar's golden vocals, Rajesh Khanna's stardom, and soulful ghazals & action soundtracks.",
    coverUrl: "/covers/retro70s.png",
    accent: "#f0643c",
  },
  {
    id: "1980-1989",
    eraName: "Synth, Disco & Romance Era",
    period: "1980 – 1989",
    tag: "80s",
    description:
      "A dynamic decade transitioning from disco beats and synth pop to full-throated orchestral melodramas and classic romantic revivals.",
    coverUrl: "/covers/disco80s.png",
    accent: "#c86bfa",
  },
  {
    id: "1990-1999",
    eraName: "The Melodious Nineties",
    period: "1990 – 1999",
    tag: "90s",
    description:
      "The golden age of cassette sales dominated by Nadeem-Shravan, Jatin-Lalit, A.R. Rahman, Kumar Sanu, Udit Narayan, Alka Yagnik, and Kavita Krishnamurthy.",
    coverUrl: "/covers/nineties.png",
    accent: "#4fd1c5",
  },
  {
    id: "2000-2010",
    eraName: "Modern Millennium Classics",
    period: "2000 – 2010",
    tag: "00s",
    description:
      "An era of sonic diversity featuring fusion, modern ballads, and pop masterpieces by A.R. Rahman, Pritam, Shankar-Ehsaan-Loy, Sonu Nigam, and Shreya Ghoshal.",
    coverUrl: "/covers/millennium.png",
    accent: "#34d399",
  },
];

const s = (
  title: string,
  movie: string,
  year: number,
  eraId: EraId,
  youtubeId: string,
): Song => ({
  id: `${eraId}-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`,
  title,
  movie,
  year,
  eraId,
  eraName: ERAS.find((e) => e.id === eraId)!.eraName,
  youtubeId,
});

const GOLDEN: EraId = "1950-1969";
const RETRO: EraId = "1970-1979";
const DISCO: EraId = "1980-1989";
const NINETIES: EraId = "1990-1999";
const MILLENNIUM: EraId = "2000-2010";

export const SONGS: Song[] = [
  // ─── Golden Era (1950 – 1969) ─────────────────────────────────────────
  s("Awaara Hoon", "Awaara", 1951, GOLDEN, "Q3Sy8rdD_3Y"),
  s("Pyar Hua Ikrar Hua", "Shree 420", 1955, GOLDEN, "xkl1QwNEuYs"),
  s("Jane Woh Kaise Log The", "Pyaasa", 1957, GOLDEN, "VDUwFJGdmQk"),
  s("Aap Ki Nazron Ne Samjha", "Anpadh", 1962, GOLDEN, "LbVI1fVvf8A"),
  s("Chaudhvin Ka Chand Ho", "Chaudhvin Ka Chand", 1960, GOLDEN, "3z8yyUkDO-Y"),
  s("Kabhi Kabhie Mere Dil Mein", "Kabhi Kabhie", 1976, GOLDEN, "-W2dagktUp0"),
  s("Lag Jaa Gale", "Woh Kaun Thi?", 1964, GOLDEN, "br6C4U3Dyfo"),
  s("Tere Mere Sapne Ab Ek Rang Hain", "Guide", 1965, GOLDEN, "EmnaGEh3dKE"),
  s("Roop Tera Mastana", "Aradhana", 1969, GOLDEN, "q3fBTU5Waeo"),
  s("Mere Sapno Ki Rani", "Aradhana", 1969, GOLDEN, "Nw7lcCNSYy8"),
  s("Yeh Dosti Hum Nahi Todenge", "Sholay", 1975, GOLDEN, "T1fUIovCRAo"),
  s("Aaja Sanam Madhur Chandni Mein", "Chori Chori", 1956, GOLDEN, "vXyIFan2x0Y"),
  s("Eena Meena Deeka", "Asha", 1957, GOLDEN, "Y2XXeon6Vo4"),
  s("Kali Ghata Chhaye Mora Jiya", "Sujata", 1959, GOLDEN, "yZMyPcef_ws"),
  s("Aayega Aane Wala", "Mahal", 1949, GOLDEN, "ksgwsHJ-tds"),
  s("Pukarta Chala Hoon Main", "Mere Sanam", 1965, GOLDEN, "gLKBwutnPwA"),
  s("Ghar Aaya Mera Pardesi", "Awaara", 1951, GOLDEN, "Bt00ux2cggo"),
  s("Yeh Raaten Yeh Mausam", "Dilli Ka Thug", 1958, GOLDEN, "ouNb2s33ioQ"),
  s("Dil Tadap Tadap Ke", "Madhumati", 1958, GOLDEN, "o184v83-gkk"),
  s("O Haseena Zulfonwali", "Teesri Manzil", 1966, GOLDEN, "TfTpZVgc05o"),

  // ─── Classic Retro Era (1970 – 1979) ──────────────────────────────────
  s("Zindagi Ek Safar Hai Suhana", "Andaz", 1971, RETRO, "LlvoY4v5zm0"),
  s("Dum Maro Dum", "Hare Rama Hare Krishna", 1971, RETRO, "_YzYm_jyQ6E"),
  s("Chura Liya Hai Tumne Jo Dil Ko", "Yaadon Ki Baaraat", 1973, RETRO, "V-K6haaZJr8"),
  s("Pal Pal Dil Ke Paas", "Blackmail", 1973, RETRO, "AMuRRXCuy-4"),
  s("Tere Bina Zindagi Se", "Aandhi", 1975, RETRO, "-xcna3K80tA"),
  s("Kabhi Kabhie Mere Dil Mein", "Kabhi Kabhie", 1976, RETRO, "-W2dagktUp0"),
  s("Kya Hua Tera Wada", "Hum Kisise Kum Naheen", 1977, RETRO, "W6dKaCV-mJQ"),
  s("Aap Ki Ankhon Mein Kuch", "Ghar", 1978, RETRO, "dmm5lM9BR8o"),
  s("O Saathi Re", "Muqaddar Ka Sikandar", 1978, RETRO, "HBAuj9GghZ4"),
  s("Khaike Paan Banaraswala", "Don", 1978, RETRO, "Q3EisUe0CAM"),
  s("Yeh Mera Dil Yaar Ka Diwana", "Don", 1978, RETRO, "AZNTJ-X0m38"),
  s("Ek Ajnabee Haseena Se", "Ajanabee", 1974, RETRO, "0HqHruwzusM"),
  s("Aane Wala Pal Jane Wala Hai", "Gol Maal", 1979, RETRO, "4xcZvqCh-ic"),
  s("Yeh Shaam Mastani", "Kati Patang", 1971, RETRO, "tNrpDUn9vxI"),
  s("Pyaar Deewana Hota Hai", "Kati Patang", 1971, RETRO, "nGAtsNHwzms"),
  s("Musafir Hoon Yaaro", "Parichay", 1972, RETRO, "Yd62azPw4hI"),
  s("Karvane Guzar Gaya", "Naya Din Nai Raat", 1974, RETRO, "WGVWuj-55KU"),
  s("Badi Sooni Sooni Hai", "Mili", 1975, RETRO, "Sg49wfzCOuk"),
  s("Tere Chehre Se Nazar Nahin", "Kabhi Kabhie", 1976, RETRO, "gejKrLu9N9c"),
  s("Dil Kya Kare Jab Kisi Se", "Julie", 1975, RETRO, "iaaBqrQrtUM"),

  // ─── Synth, Disco & Romance Era (1980 – 1989) ─────────────────────────
  s("Aap Jaisa Koi", "Qurbani", 1980, DISCO, "hFuvEW_rKyI"),
  s("Dard-E-Dil Dard-E-Jigar", "Karz", 1980, DISCO, "uMWRl5c1brI"),
  s("Om Shanti Om", "Karz", 1980, DISCO, "I_iIY81069o"),
  s("Dekha Ek Khwab", "Silsila", 1981, DISCO, "7dO_MS9tZ5E"),
  s("Dil Cheez Kya Hai", "Umrao Jaan", 1981, DISCO, "eFcs3p1moMA"),
  s("In Ankhon Ki Masti", "Umrao Jaan", 1981, DISCO, "KjJWcs3uo6k"),
  s("Tere Mere Beech Mein", "Ek Duuje Ke Liye", 1981, DISCO, "djX5akV9la8"),
  s("Pag Ghungroo Bandh", "Namak Halaal", 1982, DISCO, "cTvUrpSr9ck"),
  s("I Am a Disco Dancer", "Disco Dancer", 1982, DISCO, "d89cCzUIxpQ"),
  s("Jab Hum Jawan Honge", "Betaab", 1983, DISCO, "iihDX0bN0qY"),
  s("Shayad Meri Shaadi Ka Khayal", "Souten", 1983, DISCO, "RFa9RQB7BEw"),
  s("Saagar Kinare", "Saagar", 1985, DISCO, "gLS9iuAocRQ"),
  s("Sun Sahiba Sun", "Ram Teri Ganga Maili", 1985, DISCO, "lMSbXOYtDI4"),
  s("Chitthi Aayi Hai", "Naam", 1986, DISCO, "yexZf8g_dJw"),
  s("Hawa Hawai", "Mr. India", 1987, DISCO, "bYk-bX-kGl8"),
  s("Papa Kehte Hain", "Qayamat Se Qayamat Tak", 1988, DISCO, "ngBEVUKnhgY"),
  s("Ek Do Teen", "Tezaab", 1988, DISCO, "JzFemLoFkN4"),
  s("Dil Deewana", "Maine Pyar Kiya", 1989, DISCO, "6Pq4tBP3VV8"),
  s("Mere Rang Mein Rangne Waali", "Maine Pyar Kiya", 1989, DISCO, "BkLOBuTAtS0"),
  s("Lagi Aaj Sawan Ki Chandni", "Chandni", 1989, DISCO, "qrNbG2W6IRE"),

  // ─── The Melodious Nineties (1990 – 1999) ─────────────────────────────
  s("Nazar Ke Samne", "Aashiqui", 1990, NINETIES, "uNt18l9UfjE"),
  s("Dheere Dheere Se Meri Zindagi", "Aashiqui", 1990, NINETIES, "KeyfUuXPOcY"),
  s("Pehla Nasha", "Jo Jeeta Wohi Sikandar", 1992, NINETIES, "Ki41AKu0iHc"),
  s("Tujhe Dekha Toh Yeh Jaana Sanam", "Dilwale Dulhania Le Jayenge", 1995, NINETIES, "xdCObwkw8yE"),
  s("Bahut Pyar Karte Hain", "Saajan", 1991, NINETIES, "iupGwQqjgOk"),
  s("Didi Tera Deewana", "Hum Aapke Hain Koun..!", 1994, NINETIES, "ZqcDGvCM_w0"),
  s("Chaiyya Chaiyya", "Dil Se..", 1998, NINETIES, "lZLxjLYyhYQ"),
  s("Kuch Kuch Hota Hai", "Kuch Kuch Hota Hai", 1998, NINETIES, "bKZTnnFU9HA"),
  s("Tanha Tanha Yahan Pe Jeena", "Rangeela", 1995, NINETIES, "W1GNGlaFKYw"),
  s("Taal Se Taal Mila", "Taal", 1999, NINETIES, "dfghBD0hC9I"),
  s("Chura Ke Dil Mera", "Main Khiladi Tu Anari", 1994, NINETIES, "Yqj1_V90KJo"),
  s("Tip Tip Barsa Pani", "Mohra", 1994, NINETIES, "9u-r5W4WVO4"),
  s("Dil To Pagal Hai", "Dil To Pagal Hai", 1997, NINETIES, "lZ2PhyBF3GQ"),
  s("Ghar Se Nikalte Hi", "Papa Kehte Hain", 1996, NINETIES, "_IcVb6hFhPs"),
  s("Aawaz Do Humko", "Dushman", 1998, NINETIES, "YEa4QpyJxO4"),
  s("Jaadoo Teri Nazar", "Darr", 1993, NINETIES, "FD3vgLOEdgk"),
  s("Roja Janeman", "Roja", 1992, NINETIES, "4iHxevc9vtU"),
  s("Kehna Hi Kya", "Bombay", 1995, NINETIES, "_YB1taxJPgk"),
  s("Chand Chhupa Badal Mein", "Hum Dil De Chuke Sanam", 1999, NINETIES, "9a6UaCBEV6o"),
  s("Pardesi Pardesi", "Raja Hindustani", 1996, NINETIES, "xKb6lP3JxrA"),

  // ─── Modern Millennium Classics (2000 – 2010) ─────────────────────────
  s("Kaho Naa... Pyaar Hai", "Kaho Naa... Pyaar Hai", 2000, MILLENNIUM, "1Nf8eQ9dkGY"),
  s("Mitwa", "Lagaan", 2001, MILLENNIUM, "ru-OonEvTss"),
  s("Dil Chahta Hai", "Dil Chahta Hai", 2001, MILLENNIUM, "HoDgYV1NzAI"),
  s("Kal Ho Naa Ho", "Kal Ho Naa Ho", 2003, MILLENNIUM, "WAmoNT1EoUw"),
  s("Tere Naam", "Tere Naam", 2003, MILLENNIUM, "OMoU0Pfibc4"),
  s("Tere Liye", "Veer-Zaara", 2004, MILLENNIUM, "nOZ3M1O0Wbg"),
  s("Piyu Bole", "Parineeta", 2005, MILLENNIUM, "PGPVZT3Blvs"),
  s("Kajra Re", "Bunty Aur Babli", 2005, MILLENNIUM, "4dsFQFCvVGU"),
  s("Tu Aashiqui Hai", "Jhankaar Beats", 2003, MILLENNIUM, "aw0s2KaoA2Q"),
  s("Chand Sifarish", "Fanaa", 2006, MILLENNIUM, "zWEOx7TSM6I"),
  s("Tere Bina", "Guru", 2007, MILLENNIUM, "_mwqXnTEHSc"),
  s("Mauja Hi Mauja", "Jab We Met", 2007, MILLENNIUM, "c7ZGREbEFa0"),
  s("Tum Se Hi", "Jab We Met", 2007, MILLENNIUM, "eLbDMz9q81g"),
  s("Jai Ho", "Slumdog Millionaire", 2008, MILLENNIUM, "xwwAVRyNmgQ"),
  s("Pehli Nazar Mein", "Race", 2008, MILLENNIUM, "BadBAMnPX0I"),
  s("Haule Haule", "Rab Ne Bana Di Jodi", 2008, MILLENNIUM, "XgdY_s1LsZc"),
  s("Masakali", "Delhi-6", 2009, MILLENNIUM, "VbiVF3_XU6E"),
  s("Behti Hawa Sa Tha Woh", "3 Idiots", 2009, MILLENNIUM, "G7KtPzUpCAc"),
  s("Pee Loon", "Once Upon a Time in Mumbaai", 2010, MILLENNIUM, "ovR_7R9I_vI"),
  s("Tere Mast Mast Do Nain", "Dabangg", 2010, MILLENNIUM, "oyLVu753XJw"),
];

export const eraOf = (eraId: EraId): Era => ERAS.find((e) => e.id === eraId)!;
