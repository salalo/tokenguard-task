import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/chain-growth-data", () => {
    return HttpResponse.json(
      {
        blockchain: {
          tg_growth_index: [
            { date: "2023-04-03", value: 51 },
            { date: "2023-04-10", value: 54.06 },
            { date: "2023-04-17", value: 56.66 },
          ],
        },
        cumulative: {
          tg_growth_index: [
            { date: "2023-04-03", value: 51.63 },
            { date: "2023-04-10", value: 54.45 },
            { date: "2023-04-17", value: 52.19 },
          ],
        },
      },
      { status: 200 }
    );
  }),
];
