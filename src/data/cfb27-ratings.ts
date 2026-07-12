/** EA Sports College Football 27 player ratings for Oklahoma.
 *  Attributes: OVR overall, SPD speed, STR strength, AGI agility,
 *  COD change of direction, INJ injury, AWR awareness.
 */

export interface Cfb27Ratings {
  /** In-game position abbreviation */
  position: string;
  ovr: number;
  spd: number;
  str: number;
  agi: number;
  cod: number;
  inj: number;
  awr: number;
}

export const CFB27_RATINGS_SOURCE =
  "EA Sports College Football 27";

export const cfb27Ratings: Record<string, Cfb27Ratings> = {
  "david-stone-0": { position: "DT", ovr: 94, spd: 78, str: 94, agi: 77, cod: 65, inj: 90, awr: 87 },
  "eli-bowen-23": { position: "CB", ovr: 90, spd: 93, str: 59, agi: 90, cod: 92, inj: 86, awr: 88 },
  "isaiah-sategna-iii-1": { position: "WR", ovr: 90, spd: 96, str: 55, agi: 95, cod: 94, inj: 89, awr: 91 },
  "john-mateer-10": { position: "QB", ovr: 89, spd: 89, str: 77, agi: 89, cod: 89, inj: 94, awr: 90 },
  "kip-lewis-10": { position: "MIKE", ovr: 89, spd: 85, str: 75, agi: 85, cod: 83, inj: 90, awr: 96 },
  "peyton-bowen-22": { position: "SS", ovr: 87, spd: 91, str: 74, agi: 89, cod: 88, inj: 90, awr: 87 },
  "tate-sandell-29": { position: "K", ovr: 87, spd: 70, str: 48, agi: 66, cod: 66, inj: 88, awr: 78 },
  "taylor-wein-44": { position: "LEDG", ovr: 87, spd: 80, str: 88, agi: 79, cod: 73, inj: 87, awr: 90 },
  "trell-harris-11": { position: "WR", ovr: 87, spd: 91, str: 68, agi: 90, cod: 90, inj: 90, awr: 92 },
  "jayden-jackson-65": { position: "DT", ovr: 86, spd: 71, str: 90, agi: 67, cod: 54, inj: 89, awr: 85 },
  "michael-fasusi-56": { position: "LT", ovr: 86, spd: 76, str: 89, agi: 75, cod: 65, inj: 95, awr: 82 },
  "courtland-guillory-4": { position: "CB", ovr: 85, spd: 92, str: 52, agi: 89, cod: 86, inj: 91, awr: 83 },
  "hayden-hansen-89": { position: "TE", ovr: 85, spd: 79, str: 84, agi: 77, cod: 73, inj: 92, awr: 87 },
  "rocky-beers-81": { position: "TE", ovr: 85, spd: 81, str: 79, agi: 81, cod: 75, inj: 87, awr: 91 },
  "adepoju-adebawore-34": { position: "REDG", ovr: 84, spd: 86, str: 79, agi: 81, cod: 68, inj: 85, awr: 85 },
  "jake-maikkula-69": { position: "C", ovr: 83, spd: 69, str: 85, agi: 67, cod: 59, inj: 92, awr: 88 },
  "owen-heinecke-38": { position: "WILL", ovr: 83, spd: 86, str: 74, agi: 83, cod: 81, inj: 87, awr: 93 },
  "parker-livingstone-3": { position: "WR", ovr: 83, spd: 90, str: 61, agi: 87, cod: 83, inj: 88, awr: 80 },
  "tory-blaylock-6": { position: "HB", ovr: 83, spd: 93, str: 64, agi: 90, cod: 88, inj: 87, awr: 75 },
  "xavier-robinson-24": { position: "HB", ovr: 83, spd: 88, str: 83, agi: 82, cod: 81, inj: 90, awr: 79 },
  "lloyd-avant-9": { position: "HB", ovr: 82, spd: 88, str: 75, agi: 86, cod: 85, inj: 88, awr: 83 },
  "eddy-pierre-louis-55": { position: "LG", ovr: 80, spd: 74, str: 89, agi: 65, cod: 55, inj: 90, awr: 77 },
  "grayson-miller-43": { position: "P", ovr: 80, spd: 66, str: 62, agi: 63, cod: 61, inj: 89, awr: 75 },
  "jacobe-johnson-24": { position: "CB", ovr: 80, spd: 91, str: 63, agi: 89, cod: 88, inj: 89, awr: 76 },
  "bishop-thomas-8": { position: "DT", ovr: 79, spd: 68, str: 87, agi: 65, cod: 46, inj: 97, awr: 78 },
  "e-marion-harris-76": { position: "RT", ovr: 79, spd: 57, str: 89, agi: 58, cod: 55, inj: 87, awr: 84 },
  "jack-van-dorselaer-88": { position: "TE", ovr: 79, spd: 82, str: 75, agi: 80, cod: 78, inj: 89, awr: 78 },
  "elijah-thomas-14": { position: "WR", ovr: 78, spd: 94, str: 59, agi: 92, cod: 92, inj: 88, awr: 62 },
  "ryan-fodje-70": { position: "RG", ovr: 78, spd: 68, str: 88, agi: 67, cod: 57, inj: 91, awr: 76 },
  "cole-sullivan-18": { position: "MIKE", ovr: 77, spd: 85, str: 72, agi: 86, cod: 81, inj: 88, awr: 84 },
  "michael-boganowski-25": { position: "FS", ovr: 77, spd: 86, str: 74, agi: 85, cod: 83, inj: 90, awr: 82 },
  "bowe-bentley-8": { position: "QB", ovr: 76, spd: 85, str: 66, agi: 89, cod: 88, inj: 92, awr: 60 },
  "caleb-nitta-60": { position: "C", ovr: 76, spd: 72, str: 82, agi: 72, cod: 57, inj: 75, awr: 78 },
  "danny-okoye-16": { position: "REDG", ovr: 76, spd: 81, str: 78, agi: 80, cod: 72, inj: 80, awr: 73 },
  "ivan-carreon-82": { position: "WR", ovr: 76, spd: 88, str: 74, agi: 83, cod: 78, inj: 83, awr: 63 },
  "jer-michael-carter-5": { position: "WR", ovr: 76, spd: 88, str: 63, agi: 86, cod: 84, inj: 90, awr: 75 },
  "kenny-ozowalu-93": { position: "LEDG", ovr: 76, spd: 77, str: 82, agi: 76, cod: 71, inj: 86, awr: 77 },
  "trent-wilson-90": { position: "DT", ovr: 76, spd: 75, str: 83, agi: 75, cod: 70, inj: 88, awr: 68 },
  "whitt-newbauer-16": { position: "QB", ovr: 76, spd: 77, str: 78, agi: 76, cod: 75, inj: 92, awr: 76 },
  "deacon-schmitt-73": { position: "C", ovr: 75, spd: 64, str: 88, agi: 62, cod: 53, inj: 85, awr: 70 },
  "derrick-johnson-ii-12": { position: "CB", ovr: 75, spd: 90, str: 54, agi: 91, cod: 88, inj: 89, awr: 69 },
  "heath-ozaeta-77": { position: "RG", ovr: 75, spd: 59, str: 87, agi: 69, cod: 53, inj: 86, awr: 70 },
  "jayden-petit-13": { position: "WR", ovr: 75, spd: 89, str: 64, agi: 88, cod: 86, inj: 90, awr: 68 },
  "kade-mcintyre-19": { position: "TE", ovr: 75, spd: 78, str: 70, agi: 81, cod: 79, inj: 84, awr: 70 },
  "matthew-nelson-40": { position: "LEDG", ovr: 75, spd: 83, str: 63, agi: 83, cod: 78, inj: 92, awr: 70 },
  "nigel-smith-ii-6": { position: "DT", ovr: 75, spd: 73, str: 81, agi: 74, cod: 68, inj: 86, awr: 72 },
  "reggie-powers-iii-3": { position: "SS", ovr: 75, spd: 91, str: 67, agi: 90, cod: 91, inj: 85, awr: 72 },
  "jeremiah-newcombe-21": { position: "CB", ovr: 74, spd: 90, str: 53, agi: 89, cod: 87, inj: 94, awr: 74 },
  "omarion-robinson-2": { position: "SS", ovr: 74, spd: 89, str: 55, agi: 89, cod: 86, inj: 93, awr: 73 },
  "trystan-haynes-14": { position: "CB", ovr: 74, spd: 89, str: 53, agi: 90, cod: 89, inj: 90, awr: 73 },
  "jahsiear-rogers-2": { position: "WR", ovr: 73, spd: 91, str: 51, agi: 89, cod: 88, inj: 89, awr: 58 },
  "wyatt-gilmore-42": { position: "LEDG", ovr: 73, spd: 73, str: 82, agi: 71, cod: 63, inj: 85, awr: 83 },
  "dakoda-fields-9": { position: "CB", ovr: 72, spd: 86, str: 58, agi: 87, cod: 85, inj: 91, awr: 67 },
  "dezephen-walker-28": { position: "HB", ovr: 72, spd: 87, str: 64, agi: 86, cod: 85, inj: 92, awr: 44 },
  "peyton-joseph-71": { position: "RT", ovr: 72, spd: 55, str: 84, agi: 55, cod: 50, inj: 93, awr: 73 },
  "taylor-heim-7": { position: "WILL", ovr: 72, spd: 77, str: 76, agi: 75, cod: 72, inj: 90, awr: 75 },
  "mackenzie-alleyne-17": { position: "WR", ovr: 71, spd: 89, str: 59, agi: 88, cod: 85, inj: 86, awr: 72 },
  "prince-ijioma-37": { position: "CB", ovr: 71, spd: 87, str: 60, agi: 85, cod: 83, inj: 75, awr: 71 },
  "bergin-kysar-80": { position: "DT", ovr: 70, spd: 58, str: 87, agi: 58, cod: 47, inj: 95, awr: 70 },
  "jacob-jordan-7": { position: "WR", ovr: 70, spd: 87, str: 52, agi: 87, cod: 85, inj: 88, awr: 55 },
  "james-nesta-47": { position: "MIKE", ovr: 70, spd: 84, str: 67, agi: 87, cod: 83, inj: 82, awr: 62 },
  "daniel-akinkunmi-75": { position: "LG", ovr: 67, spd: 65, str: 86, agi: 72, cod: 52, inj: 85, awr: 66 },
  "james-carrington-58": { position: "DT", ovr: 67, spd: 73, str: 74, agi: 73, cod: 58, inj: 92, awr: 52 },
  "marcus-james-28": { position: "MIKE", ovr: 66, spd: 79, str: 73, agi: 77, cod: 75, inj: 92, awr: 68 },
  "dane-bathurst-30": { position: "WILL", ovr: 65, spd: 79, str: 75, agi: 79, cod: 77, inj: 86, awr: 68 },
  "seth-freeman-50": { position: "TE", ovr: 63, spd: 73, str: 70, agi: 67, cod: 73, inj: 79, awr: 65 },
  "ben-anderson-49": { position: "TE", ovr: 60, spd: 71, str: 70, agi: 73, cod: 69, inj: 84, awr: 56 },
  "noah-best-52": { position: "LG", ovr: 53, spd: 66, str: 75, agi: 65, cod: 55, inj: 88, awr: 60 },
};
