import { Router } from "express";
import { API_URL } from "../consts/api-url.mjs";

const router = Router();

let cacheAllStations;
let cacheDate;
let settlementsAll = [];

const map = new Map();

router.get("/stations", async (req, res, next) => {
  const currentDate = new Date();

  if (!cacheAllStations) {
    const allStations = await fetch(API_URL("stations_list"));
    const json = await allStations.json();

    cacheAllStations = json;

    createStationMap(cacheAllStations);
  }

  res.json({ stations: cacheAllStations, names: [...new Set(settlementsAll)] });
});

router.get(
  "/search/:from/:to/:transport_type/:date",
  async (req, res, next) => {
    const { from, to, transport_type, date } = req.params;

    try {
      const result = await fetch(
        API_URL(
          "search",
          `from=${from}&to=${to}&transport_types=${transport_type}&date=${date}&transfers=true`
        )
      );

      const json = await result.json();

      res.json(json);
    } catch {
      console.log("err");
    }
  }
);

router.get("/seachCode/:start/:end", async (req, res, next) => {
  const { start, end } = req.params;

  res.json(findCodes(start, end, map));
});

function createStationMap(data) {
  const countries = data.countries;
  for (const country of countries) {
    const countryTitle = country.title;
    const countryCodes = country.codes;
    const countrySpot = { title: countryTitle, codes: countryCodes };
    map.set(countryTitle, countrySpot);

    const regions = country.regions;
    for (const region of regions) {
      const regionTitle = region.title;
      const regionCodes = region.codes;
      const regionSpot = { title: regionTitle, codes: regionCodes };
      map.set(regionTitle, regionSpot);

      const settlements = region.settlements;
      for (const settlement of settlements) {
        const settlementTitle = settlement.title;
        const settlementCodes = settlement.codes;

        if (settlementTitle !== '') settlementsAll.push(settlement.title);

        const settlementSpot = {
          title: settlementTitle,
          codes: settlementCodes,
        };
        map.set(settlementTitle, settlementSpot);
      }
    }
  }
}

function findCodes(from, to, map) {
  const codeFrom = map.get(from)?.codes.yandex_code;
  const codeTo = map.get(to)?.codes.yandex_code;

  return { start: codeFrom, end: codeTo };
}

export default router;
