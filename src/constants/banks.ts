import type { SelectOption } from "@/components";

const JP_MORGAN = require("@/img/bank/JP_morgan.png") as number;
const CENTRAL_BANK = require("@/img/bank/Central_bank.png") as number;

export const BANK_IMAGES = {
  JP_MORGAN,
  CENTRAL_BANK,
} as const;

export const CARD_OPTIONS: SelectOption[] = [
  {
    value: "acc_001",
    label: "Jason Grey",
    subtitle: "JP Morgan Chase Visa *4147",
    image: BANK_IMAGES.JP_MORGAN,
  },
  {
    value: "acc_002",
    label: "Jason Grey",
    subtitle: "Central Bank Visa *2356",
    image: BANK_IMAGES.CENTRAL_BANK,
  },
  {
    value: "acc_003",
    label: "Maria Lafourcade",
    subtitle: "Central Bank Mastercard *2210",
    image: BANK_IMAGES.JP_MORGAN,
  },
];
