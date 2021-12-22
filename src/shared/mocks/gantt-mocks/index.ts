import { GantItem } from "~/types";

export const GANTT_DATA_MOCK: GantItem[] = [
  {
    id: "86e72332-ed8e-11eb-b80a-c38d9cf7efaf",
    title: "КС 17 Поставка",
    start: 1613336400000,
    end: 1626296400000,
    relations: [],
    delay: 1630098000000,
    children: [
      {
        id: "86e7231e-ed8e-11eb-b80a-c38d9cf7efaf",
        title: "КС 7 Поставка",
        start: 1707426000000,
        end: 1707426000000,
        relations: [],
        delay: 0,
        children: [
          {
            id: "86e7231e-ed8e-11eb-b80a-c38d9cf7efaf",
            title: "КС 7 Поставка",
            start: 1707426000000,
            end: 1707426000000,
            relations: [],
            delay: 0,
            children: [
              {
                id: "86e7231e-ed8e-11eb-b80a-c38d9cf7efaf",
                title: "КС 7 Поставка",
                start: 1707426000000,
                end: 1707426000000,
                relations: [],
                delay: 0,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "e31610c8-ed8a-11eb-b80a-c38d9cf7efaf",
    title: "КС 1 Оплата",
    start: 1630243218000,
    end: 1658921618000,
    relations: ["e31610da-ed8a-11eb-b80a-c38d9cf7efaf", "86e72338-ed8e-11eb-b80a-c38d9cf7efaf"],
    delay: 0,
    children: [],
  },
  {
    id: "86e72312-ed8e-11eb-b80a-c38d9cf7efaf",
    title: "КС 1 Поставка",
    start: 1639406800000,
    end: 1650357200000,
    relations: ["e31610da-ed8a-11eb-b80a-c38d9cf7efaf"],
    delay: 0,
    children: [],
  },
  {
    id: "86e72328-ed8e-11eb-b80a-c38d9cf7efaf",
    title: "КС 12 Поставка",
    start: 1624210000000,
    end: 1635210000000,
    relations: [],
    delay: 0,
    children: [],
  },
  {
    id: "86e7231e-ed8e-11eb-b80a-c38d9cf7efaf",
    title: "КС 7 Поставка",
    start: 1607426000000,
    end: 1707426000000,
    relations: [],
    delay: 0,
    children: [],
  },
];
