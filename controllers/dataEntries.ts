import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { BankDataEntry, Category, SimpleDate } from "../types.ts";

const entries: BankDataEntry[] = [
  {
    id: "1",
    postingDate: new SimpleDate(1, 2, 2019),
    valueDate: new SimpleDate(1, 2, 2019),
    paymentDate: new SimpleDate(1, 2, 2019),
    amount: 10,
    recipientOrPayer: "recipientOrPayer",
    accountNumber: 123,
    bic: 123,
    event: "event",
    reference: "reference",
    payerReference: "payerReference",
    message: "message",
    cardNumber: 123123123,
    receipt: "receipt",
    category: Category.CLOTHING,
  },
  {
    id: "2",
    postingDate: new SimpleDate(1, 2, 2020),
    valueDate: new SimpleDate(1, 2, 2020),
    paymentDate: new SimpleDate(1, 2, 2020),
    amount: 10,
    recipientOrPayer: "recipientOrPayer",
    accountNumber: 123,
    bic: 123,
    event: "event",
    reference: "reference",
    payerReference: "payerReference",
    message: "message",
    cardNumber: 123123123,
    receipt: "receipt",
    category: Category.ELECTRONICSERVICES,
  },
  {
    id: "3",
    postingDate: new SimpleDate(1, 2, 2021),
    valueDate: new SimpleDate(1, 2, 2021),
    paymentDate: new SimpleDate(1, 2, 2021),
    amount: 10,
    recipientOrPayer: "recipientOrPayer",
    accountNumber: 123,
    bic: 123,
    event: "event",
    reference: "reference",
    payerReference: "payerReference",
    message: "message",
    cardNumber: 123123123,
    receipt: "receipt",
    category: Category.OTHER,
  },
];

// const fetchAllDataEntries = ({response}: {response: any}) => {
//     response.body = {
//         success: true,
//         data: entries
//     }
// }

const fetchAllDataEntries = ({ response }: any) => {
  response.status = 200;
  response.body = {
    success: true,
    data: entries,
  };
};

export { fetchAllDataEntries };
