
BTPlatform.ready.then(() => {
  "use strict";
  const CUSTOMERS = [
    {
      id: "bp-d4fdd378-0962-4ca0-b893-f859b449d10d",
      externalId: "d4fdd378-0962-4ca0-b893-f859b449d10d",
      name: "AFRIDI MDK BV",
      street: "Maalderijstraat 2",
      city: "Antwerpen",
      postal: "200 0",
      country: "BE",
      vatId: "BE1030592831",
      registration: "",
      email: "afridimdkbv@gmail.com",
      phone: "",
      contact: "",
      currency: "",
      payment: "",
      shipToAddresses: [],
    },
    {
      id: "bp-f3c4c8af-6ed0-4e4a-b65b-6708b94b9605",
      externalId: "f3c4c8af-6ed0-4e4a-b65b-6708b94b9605",
      name: "Amana Group ApS",
      street: "Kompagnistrade 7",
      city: "Kobenhavn K",
      postal: "120 8",
      country: "DK",
      vatId: "DK40590242",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "",
      shipToAddresses: [],
    },
    {
      id: "bp-f146f966-9045-4d14-a0df-96149cc4896d",
      externalId: "f146f966-9045-4d14-a0df-96149cc4896d",
      name: "ArMaLe 8000",
      street: "Raamstraat 38",
      city: "Brugge",
      postal: "800 0",
      country: "BE",
      vatId: "BE1028346389",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-ebdd4163-14ef-433f-907e-e487f5cbb682",
      externalId: "ebdd4163-14ef-433f-907e-e487f5cbb682",
      name: "Aryal Timsina, Srijana",
      street: "Komvest 37",
      city: "Brugge",
      postal: "800 0",
      country: "BE",
      vatId: "BE0782636184",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "",
      payment: "",
      shipToAddresses: [],
    },
    {
      id: "bp-e016fdda-5c38-40bf-9591-7a912b7563fd",
      externalId: "e016fdda-5c38-40bf-9591-7a912b7563fd",
      name: "AU VIEUX PIGNON SAS",
      street: "52 RUE DES MARCHANDS",
      city: "COLMAR",
      postal: "680 00",
      country: "FR",
      vatId: "FR03823305248",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "",
      payment: "",
      shipToAddresses: [],
    },
    {
      id: "bp-3bf82a0e-a744-44ff-8204-9eb02f78aa88",
      externalId: "3bf82a0e-a744-44ff-8204-9eb02f78aa88",
      name: "AUX MERVEILLES DE LA CATHEDRALE SARL",
      street: "9 PL DE LA CATHEDRALE",
      city: "Strasbourg",
      postal: "670 00",
      country: "FR",
      vatId: "FR07301546776",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-61d2f056-0727-4c62-9be2-b21ee1ffcebe",
      externalId: "61d2f056-0727-4c62-9be2-b21ee1ffcebe",
      name: "Barakah BV",
      street: "Stoofstraat 24",
      city: "Brussel",
      postal: "100 0",
      country: "BE",
      vatId: "BE1019418233",
      registration: "",
      email: "barakah@yukiworks.be",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [
        {
          id: "d41ec6e2-0076-4ef4-8f37-55f9fbc42742",
          name: "Store Markt 13",
          street: "Markt 13",
          city: "Brugge",
          postal: "8000",
          country: "BE",
          contact: "",
        },
      ],
    },
    {
      id: "bp-e3afbea2-a6da-44b9-bfb4-fa66be2acbec",
      externalId: "e3afbea2-a6da-44b9-bfb4-fa66be2acbec",
      name: "Belgian Souvenirs Bruges BV",
      street: "Rozenhoedkaai 4",
      city: "Brugge",
      postal: "800 0",
      country: "BE",
      vatId: "BE1016237425",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-b471560b-5847-4cfc-82d5-b221ac890a9e",
      externalId: "b471560b-5847-4cfc-82d5-b221ac890a9e",
      name: "BELGIAN TREASURES BV",
      street: "Mageleinstraat 5",
      city: "Gent",
      postal: "900 0",
      country: "BE",
      vatId: "0885748570",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-a1366374-ff0d-4f67-87af-d9ed401705b0",
      externalId: "a1366374-ff0d-4f67-87af-d9ed401705b0",
      name: "Belgium Winkel Shop Bv",
      street: "Weidestraat 34",
      city: "Brugge",
      postal: "8310",
      country: "BE",
      vatId: "BE0838079406",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "",
      payment: "",
      shipToAddresses: [],
    },
    {
      id: "bp-71a4077d-1f16-49b2-b55a-6834668712c6",
      externalId: "71a4077d-1f16-49b2-b55a-6834668712c6",
      name: "BELTEXART ART SPRL",
      street: "Rue de l'Etuve 22",
      city: "Bruxelles",
      postal: "100 0",
      country: "BE",
      vatId: "BE0416532351",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-10fceedf-2671-4cbb-a3aa-02586934cffa",
      externalId: "10fceedf-2671-4cbb-a3aa-02586934cffa",
      name: "BISAKA - Kandel, Bal",
      street: "Hadewijchstraat 33",
      city: "Brugge",
      postal: "831 0",
      country: "BE",
      vatId: "0568797706",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-6bc8965d-9d5e-4255-aa58-2b5b35cc29f9",
      externalId: "6bc8965d-9d5e-4255-aa58-2b5b35cc29f9",
      name: "BV PANAMA-VDK",
      street: "Heuvelstraat 4",
      city: "Brussel",
      postal: "100 0",
      country: "BE",
      vatId: "BE0861704844",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-4b141ec1-0da4-4b7c-89f1-e30aeafe61f8",
      externalId: "4b141ec1-0da4-4b7c-89f1-e30aeafe61f8",
      name: "Copenhagen Tourist Point ApS",
      street: "Trommesalen 3",
      city: "Copenhagen K",
      postal: "161 4",
      country: "DK",
      vatId: "DK37663034",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [
        {
          id: "fd94e572-7ac3-46ed-a09a-e53e8362372c",
          name: "Store Frediksberggade 26",
          street: "Frediksberggade 26",
          city: "Copenhagen K",
          postal: "1459",
          country: "DK",
          contact: "",
        },
        {
          id: "8a6f6900-d0a8-4fb0-a56b-27ae1ad1e92a",
          name: "Store Kobmagergade 9",
          street: "Kobmagergade 9",
          city: "Copenhagen K",
          postal: "1150",
          country: "DK",
          contact: "",
        },
        {
          id: "ccece3d4-0ccb-422e-8622-7e1622c95eba",
          name: "Store Frediksberggade 25B",
          street: "Frediksberggade 25B",
          city: "Copenhagen K",
          postal: "1459",
          country: "DK",
          contact: "",
        },
        {
          id: "49f0dbc8-1737-40ed-8f7d-0439460e9d26",
          name: "Danish Souvenir Norre Voldgade 90",
          street: "Norre Voldgade 90",
          city: "Copenhagen K",
          postal: "1358",
          country: "DK",
          contact: "",
        },
        {
          id: "a5daf074-5ab0-4737-a24b-0dd8295fb0c0",
          name: "Store Amagertorv 9",
          street: "Amagertorv 9",
          city: "Copenhagen K",
          postal: "1160",
          country: "DK",
          contact: "",
        },
        {
          id: "eede148b-0e54-466a-ae15-fa8bad2308b3",
          name: "Store Ostergade 10",
          street: "Ostergade 10",
          city: "Copenhagen K",
          postal: "1100",
          country: "DK",
          contact: "",
        },
        {
          id: "8de3b116-b5c3-410e-a212-72c98eb9306f",
          name: "Store Ostergade 4",
          street: "Ostergade 4",
          city: "Copenhagen K",
          postal: "1100",
          country: "DK",
          contact: "",
        },
        {
          id: "1c8f8e39-5d70-477c-9e9d-a06fe9a14519",
          name: "Store Kobmagergade 59",
          street: "Kobmagergade 59",
          city: "Copenhagen K",
          postal: "1614",
          country: "DK",
          contact: "",
        },
        {
          id: "8afe53e7-431e-458e-89fd-63b90cfaf9ee",
          name: "Store Hojbro Pl .17",
          street: "Hojbro Pl .17",
          city: "Copenhagen K",
          postal: "1200",
          country: "DK",
          contact: "",
        },
        {
          id: "57c039c2-6058-4c5e-8572-3ba237f78a15",
          name: "Store Ostergade 17",
          street: "Ostergade 17",
          city: "Copenhagen K",
          postal: "1100",
          country: "DK",
          contact: "",
        },
        {
          id: "27da9363-f649-4ba4-80c1-fc725d911adc",
          name: "Store Torvegade 31",
          street: "Torvegade 31",
          city: "Copenhagen K",
          postal: "1400",
          country: "DK",
          contact: "",
        },
        {
          id: "a4b6a96b-3978-4051-bc5b-898a220ed583",
          name: "Store Bredgade 49",
          street: "Bredgade 49",
          city: "Copenhagen K",
          postal: "1260",
          country: "DK",
          contact: "",
        },
        {
          id: "0312ca3b-183f-479d-b5d3-a16d637e713e",
          name: "Store Fiolstraede 18",
          street: "Fiolstraede 18",
          city: "Copenhagen K",
          postal: "1171",
          country: "DK",
          contact: "",
        },
        {
          id: "6018c53b-b537-47d9-b7b8-3b0553558012",
          name: "Store Nygade 3",
          street: "Nygade 3",
          city: "Copenhagen K",
          postal: "1164",
          country: "DK",
          contact: "",
        },
        {
          id: "15dcb28e-66ac-4e00-bf2e-854e393dc996",
          name: "Store Ostergade 1",
          street: "Ostergade 1",
          city: "Copenhagen K",
          postal: "1100",
          country: "DK",
          contact: "",
        },
      ],
    },
    {
      id: "bp-46eafcf5-7ae3-453e-a6fb-7abb4f47d662",
      externalId: "46eafcf5-7ae3-453e-a6fb-7abb4f47d662",
      name: "De Kronn Van Singel BV",
      street: "SINGEL 00624",
      city: "Amsterdam",
      postal: "101 7",
      country: "NL",
      vatId: "NL821830983B01",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-221d0c98-16e0-47a7-a662-9a5b01145afc",
      externalId: "221d0c98-16e0-47a7-a662-9a5b01145afc",
      name: "DI & SH BVBA",
      street: "Katelijnestraat 36",
      city: "Brugge",
      postal: "800 0",
      country: "BE",
      vatId: "BE0567806623",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-40b0d7b0-6f08-4342-ac61-e49b5251b178",
      externalId: "40b0d7b0-6f08-4342-ac61-e49b5251b178",
      name: "Drishti BV",
      street: "Kraanlei 2",
      city: "Gent",
      postal: "900 0",
      country: "BE",
      vatId: "BE0877675497",
      registration: "",
      email: "drishtibv@yahoo.com",
      phone: "",
      contact: "",
      currency: "",
      payment: "",
      shipToAddresses: [],
    },
    {
      id: "bp-637be47c-c16a-4d43-b1b3-51ce728cfbf4",
      externalId: "637be47c-c16a-4d43-b1b3-51ce728cfbf4",
      name: "ELWY SRL",
      street: "Rue de l'Etuve 10",
      city: "Bruxelles",
      postal: "100 0",
      country: "BE",
      vatId: "BE0434768450",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-670a3749-eef3-4262-baec-d018945042b9",
      externalId: "670a3749-eef3-4262-baec-d018945042b9",
      name: "ENHALON s.r.o.",
      street: "Pražská 1149/57",
      city: "Praha",
      postal: "102 00",
      country: "CZ",
      vatId: "CZ49678809",
      registration: "49678809",
      email: "",
      phone: "",
      contact: "",
      currency: "",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-4e0510fd-e3d3-419b-bb4e-f51c7612098e",
      externalId: "4e0510fd-e3d3-419b-bb4e-f51c7612098e",
      name: "EURO - SOUVENIRS SPRL",
      street: "Rue au Beurre 51",
      city: "Bruxelles",
      postal: "100 0",
      country: "BE",
      vatId: "BE0474635153",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-123969e6-fae4-4905-a286-a1427958ffe5",
      externalId: "123969e6-fae4-4905-a286-a1427958ffe5",
      name: "Fefa Souvnier - Dahal Debu",
      street: "Rozenstraat 66",
      city: "Brugge",
      postal: "831 0",
      country: "BE",
      vatId: "0719876491",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-614b10fc-48ce-4798-96e9-728bbbdc3480",
      externalId: "614b10fc-48ce-4798-96e9-728bbbdc3480",
      name: "Frisius BV",
      street: "Jan Blomstraat 2",
      city: "Antwerpen",
      postal: "200 0",
      country: "BE",
      vatId: "BE0895748577",
      registration: "",
      email: "frisius@yukiworks.be",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [
        {
          id: "ccad5fba-90da-4e4d-8a51-e1bb3e4fb5fb",
          name: "Store Jan Blomstraat 2",
          street: "Jan Blomstraat 2",
          city: "Antwerpen",
          postal: "2000",
          country: "BE",
          contact: "",
        },
        {
          id: "9994dc99-a484-44ef-bed8-b832bbf3604b",
          name: "Store Grote Markt 30",
          street: "Grote Markt 30",
          city: "Antwerpen",
          postal: "2000",
          country: "BE",
          contact: "",
        },
        {
          id: "54331850-6358-46f8-9454-ae7fa8c157b4",
          name: "Store Suikerrui 12",
          street: "Suikerrui 12",
          city: "Antwerpen",
          postal: "2000",
          country: "BE",
          contact: "",
        },
      ],
    },
    {
      id: "bp-18ab04f6-19ad-4291-8cd8-2b3f1ab21e7a",
      externalId: "18ab04f6-19ad-4291-8cd8-2b3f1ab21e7a",
      name: "GIFT STORE BV",
      street: "Grasmarkt 105/54-55",
      city: "Brussels",
      postal: "100 0",
      country: "BE",
      vatId: "BE0786912993",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "",
      payment: "",
      shipToAddresses: [],
    },
    {
      id: "bp-cb4cb53b-8352-415f-b3c6-50e25aed0f77",
      externalId: "cb4cb53b-8352-415f-b3c6-50e25aed0f77",
      name: "Himalayan Gift shop - Tamang, Mahindo",
      street: "Maagdenstraat 36",
      city: "Brugge",
      postal: "800 0",
      country: "BE",
      vatId: "BE0802559687",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-21909e44-29de-42ea-8a1b-24fe39047eb7",
      externalId: "21909e44-29de-42ea-8a1b-24fe39047eb7",
      name: "Hristo Ivanov Gonov",
      street: "Břežánecká 758/4",
      city: "Praha",
      postal: "15800",
      country: "CZ",
      vatId: "CZ7008059993",
      registration: "66323037",
      email: "",
      phone: "",
      contact: "",
      currency: "",
      payment: "",
      shipToAddresses: [],
    },
    {
      id: "bp-40863b03-0392-421c-8ad8-5c2ec49b1f2c",
      externalId: "40863b03-0392-421c-8ad8-5c2ec49b1f2c",
      name: "Chauhan - Singh, Ranjit",
      street: "Kustlaan 72/1",
      city: "Brugge",
      postal: "838 0",
      country: "BE",
      vatId: "BE1018192172",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-37d7a188-b435-4fab-83df-a217d754f9fb",
      externalId: "37d7a188-b435-4fab-83df-a217d754f9fb",
      name: "iBagel & Souvenir ApS",
      street: "Vesterbrogade 6D",
      city: "Copenhagen V",
      postal: "162 0",
      country: "DK",
      vatId: "DK40529225",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "",
      payment: "",
      shipToAddresses: [],
    },
    {
      id: "bp-370c2dce-9dc5-4211-a154-7282d1495ac2",
      externalId: "370c2dce-9dc5-4211-a154-7282d1495ac2",
      name: "KAD & CO SPRL",
      street: "Rue de la Madeleine 15",
      city: "Bruxelles",
      postal: "100 0",
      country: "BE",
      vatId: "BE0820111046",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-d43b68d0-40dd-48da-bb15-f0a7829f2baf",
      externalId: "d43b68d0-40dd-48da-bb15-f0a7829f2baf",
      name: "KALIKA BVBA",
      street: "Katelijnestraat 7/A",
      city: "Brugge",
      postal: "800 0",
      country: "BE",
      vatId: "BE0811444986",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [
        {
          id: "9e5c860d-bb31-4cfb-818c-2255860131bb",
          name: "",
          street: "Katelijnerstraat 7",
          city: "Brugge",
          postal: "800 0",
          country: "BE",
          contact: "",
        },
      ],
    },
    {
      id: "bp-c222796a-7450-4632-8db9-1d8e005b17cf",
      externalId: "c222796a-7450-4632-8db9-1d8e005b17cf",
      name: "Krásné sklo, s.r.o.",
      street: "Jilská 448/12",
      city: "Praha",
      postal: "110 00",
      country: "CZ",
      vatId: "CZ27207579",
      registration: "27207579",
      email: "",
      phone: "",
      contact: "",
      currency: "",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-b1464365-187d-411f-bd8b-5386cf1bf22c",
      externalId: "b1464365-187d-411f-bd8b-5386cf1bf22c",
      name: "LA PINTADINE SPRL.",
      street: "Rue de la Colline 5",
      city: "Bruxelles",
      postal: "100 0",
      country: "BE",
      vatId: "0455074906",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-096b0db5-0a43-4994-94b1-7662a93c13ae",
      externalId: "096b0db5-0a43-4994-94b1-7662a93c13ae",
      name: "LAND SPRL",
      street: "Rue de la Colline 15",
      city: "Bruxelles",
      postal: "100 0",
      country: "BE",
      vatId: "BE0871937156",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [
        {
          id: "1c5b722a-6aa0-42c7-98f2-ff7aefe3e5e7",
          name: "SHOP LAND 1",
          street: "",
          city: "",
          postal: "",
          country: "BE",
          contact: "",
        },
        {
          id: "4ea03d85-6f8d-4806-a9e1-5734cbb4eec5",
          name: "SHOP LAND 2",
          street: "",
          city: "",
          postal: "",
          country: "BE",
          contact: "",
        },
        {
          id: "c9c6833e-17aa-4c5a-8dcd-d7c8fe4dc37c",
          name: "",
          street: "",
          city: "",
          postal: "",
          country: "BE",
          contact: "",
        },
        {
          id: "1ff30a4c-975f-4836-a69e-5c31093b5e44",
          name: "Store Train Station Brussels",
          street: "",
          city: "",
          postal: "",
          country: "BE",
          contact: "",
        },
      ],
    },
    {
      id: "bp-647e36ff-ff0e-4233-879c-e5522d5b4cf3",
      externalId: "647e36ff-ff0e-4233-879c-e5522d5b4cf3",
      name: "LANKU BV",
      street: "Katelijnestraat 7/C",
      city: "Brugge",
      postal: "800 0",
      country: "BE",
      vatId: "BE0802142983",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-b7d2b183-05e6-40aa-a162-48167c3a779a",
      externalId: "b7d2b183-05e6-40aa-a162-48167c3a779a",
      name: "LBAB Management GmbH",
      street: "Hofburg B/7",
      city: "Wien",
      postal: "101 0",
      country: "AT",
      vatId: "U76925357",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-c3e851f1-dd03-4b91-8598-e3edbfdd9d1f",
      externalId: "c3e851f1-dd03-4b91-8598-e3edbfdd9d1f",
      name: "LE COIN D'ALSACE SARL",
      street: "1 PL MARCHE COCHON DE LAIT",
      city: "STRASBOURG",
      postal: "670 00",
      country: "FR",
      vatId: "FR93483511853",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-e2f5ed25-6195-4e0d-a18d-0aa625842e1b",
      externalId: "e2f5ed25-6195-4e0d-a18d-0aa625842e1b",
      name: "LIETHO BV",
      street: "Warvinge 43 B",
      city: "De Haan",
      postal: "842 1",
      country: "BE",
      vatId: "BE0629973329",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-9c7c36b6-72af-4588-b22b-7299ae2dff6a",
      externalId: "9c7c36b6-72af-4588-b22b-7299ae2dff6a",
      name: "Lucky Lot BV",
      street: "Wollestraat 5",
      city: "Brugge",
      postal: "800 0",
      country: "BE",
      vatId: "BE0734839138",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-9f3b028e-1142-4193-8e1b-992722a42227",
      externalId: "9f3b028e-1142-4193-8e1b-992722a42227",
      name: "Maimuna BV",
      street: "Boterstraat 57",
      city: "Brussel",
      postal: "100 0",
      country: "BE",
      vatId: "BE0798179346",
      registration: "",
      email: "maimuna@yukiworks.be",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [
        {
          id: "df1b703d-c4c5-45a6-aaf4-b49dc60f1825",
          name: "Store Rozenhoedkaai 3",
          street: "Rozenhoedkaai 3",
          city: "Brugge",
          postal: "8000",
          country: "BE",
          contact: "",
        },
        {
          id: "1aa22d3d-24c4-4060-866b-776b793efd68",
          name: "Store Stoofstraat 57",
          street: "Stoofstraat 57",
          city: "Brussels",
          postal: "100 0",
          country: "BE",
          contact: "",
        },
      ],
    },
    {
      id: "bp-d4182e9b-7c5d-4edd-86cc-e67185127723",
      externalId: "d4182e9b-7c5d-4edd-86cc-e67185127723",
      name: "Monzolo BV",
      street: "Boterstraat 47",
      city: "Brussel",
      postal: "100 0",
      country: "BE",
      vatId: "BE0798179247",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [
        {
          id: "fc8c72b4-906a-4ce5-bd07-d094ad92b940",
          name: "Store St Baafsplein 66-68",
          street: "St Baafsplein 66-68",
          city: "Gent",
          postal: "9000",
          country: "BE",
          contact: "",
        },
      ],
    },
    {
      id: "bp-647bd668-5ab1-45a7-8d86-4f14abf861d7",
      externalId: "647bd668-5ab1-45a7-8d86-4f14abf861d7",
      name: "NEBE souvenirs BVBA",
      street: "Boterstraat 47",
      city: "Brussel",
      postal: "100 0",
      country: "BE",
      vatId: "BE0845493570",
      registration: "",
      email: "nebe-souvenirs@yukiworks.be",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [
        {
          id: "5d9c003e-541d-4f58-831b-63cbbd368bee",
          name: "Store Boterstraat 47",
          street: "Boterstraat 47",
          city: "Brussels",
          postal: "1000",
          country: "BE",
          contact: "",
        },
      ],
    },
    {
      id: "bp-96b13c3e-fd28-49be-a0df-526baecf6a94",
      externalId: "96b13c3e-fd28-49be-a0df-526baecf6a94",
      name: "NIKOLOVA s.r.o.",
      street: "Na Perštýně 357/10",
      city: "Praha",
      postal: "11000",
      country: "CZ",
      vatId: "CZ27578968",
      registration: "27578968",
      email: "",
      phone: "",
      contact: "",
      currency: "",
      payment: "",
      shipToAddresses: [],
    },
    {
      id: "bp-debbc320-5ec2-416a-afac-1c2af352f165",
      externalId: "debbc320-5ec2-416a-afac-1c2af352f165",
      name: "Pathak Kharel, Roshani",
      street: "Wijngaardstraat 17",
      city: "Brugge",
      postal: "8000",
      country: "BE",
      vatId: "BE1003771935",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "",
      payment: "",
      shipToAddresses: [],
    },
    {
      id: "bp-8c4e803c-0f3d-453c-b414-979fb145a236",
      externalId: "8c4e803c-0f3d-453c-b414-979fb145a236",
      name: "Petre Nikolov GROZDANOV",
      street: "Mezi školami 2473/14",
      city: "Praha",
      postal: "15800",
      country: "CZ",
      vatId: "CZ6902159924",
      registration: "64563227",
      email: "",
      phone: "",
      contact: "",
      currency: "",
      payment: "",
      shipToAddresses: [],
    },
    {
      id: "bp-f08e87c2-57ec-4a0f-a4e9-75022302b9e6",
      externalId: "f08e87c2-57ec-4a0f-a4e9-75022302b9e6",
      name: "PUJA - Sharma, Rajendra",
      street: "Katelijnestraat 54",
      city: "Brugge",
      postal: "800 0",
      country: "BE",
      vatId: "BE0525665665",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-2dee6e91-5776-4649-940e-80efb01d3f16",
      externalId: "2dee6e91-5776-4649-940e-80efb01d3f16",
      name: "RAIMAN SHOPPING SPL",
      street: "Rue du Marché aux Herbes 105",
      city: "Brussels",
      postal: "100 0",
      country: "BE",
      vatId: "BE0872350395",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "",
      payment: "",
      shipToAddresses: [],
    },
    {
      id: "bp-4c239fcf-f88e-4005-8362-153b07ffeebd",
      externalId: "4c239fcf-f88e-4005-8362-153b07ffeebd",
      name: "RETAIL TYCOON SRL",
      street: "Rue au Beurre 33",
      city: "Bruxelles",
      postal: "100 0",
      country: "BE",
      vatId: "BE0782494842",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [
        {
          id: "ef93c8b4-c718-48bd-93ba-60bb44b2d18b",
          name: "SHOP DISCOVER BRUSSELS",
          street: "",
          city: "",
          postal: "",
          country: "BE",
          contact: "",
        },
        {
          id: "a899da08-e517-4f2b-a92a-31d80b407250",
          name: "SHOP DISCOVER BRUGES",
          street: "",
          city: "",
          postal: "",
          country: "BE",
          contact: "",
        },
        {
          id: "6205c323-e375-4d14-a0bf-5b7e7e08c108",
          name: "SHOP TRAIN STATION",
          street: "",
          city: "",
          postal: "",
          country: "BE",
          contact: "",
        },
        {
          id: "7f539d3d-b921-4d89-833a-9247f76df32e",
          name: "Store Retail 3 Tycoon",
          street: "RUE DES FRIPIERS 42",
          city: "Bruxelles",
          postal: "",
          country: "BE",
          contact: "",
        },
      ],
    },
    {
      id: "bp-fe4f137b-8af1-4fb0-a73d-0ec2613d231b",
      externalId: "fe4f137b-8af1-4fb0-a73d-0ec2613d231b",
      name: "Rosseneu Souvenirs Fantasy - Van Lerberghe, Katrien",
      street: "Dijver 1",
      city: "Brugge",
      postal: "800 0",
      country: "BE",
      vatId: "BE0518665136",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-b71f0ec4-3751-4c7a-86b5-526a006ac33f",
      externalId: "b71f0ec4-3751-4c7a-86b5-526a006ac33f",
      name: "Royal Souvenir ApS",
      street: "Bredgade 47",
      city: "Copenhagen K",
      postal: "1260",
      country: "DK",
      vatId: "DK38721917",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "",
      payment: "",
      shipToAddresses: [
        {
          id: "70d6b2f8-981e-4d32-931d-7cf58c094559",
          name: "SHOP BREDGADE 51",
          street: "Bredgade 51",
          city: "Copenhagen K",
          postal: "1260",
          country: "CZ",
          contact: "",
        },
      ],
    },
    {
      id: "bp-cc831dc6-5f7d-400c-bfeb-e99e01437dc4",
      externalId: "cc831dc6-5f7d-400c-bfeb-e99e01437dc4",
      name: "ROYAL SOUVENIRS SRL",
      street: "Rue de l'Etuve 31",
      city: "Bruxelles",
      postal: "100 0",
      country: "BE",
      vatId: "0860659323",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-0288c547-fbab-49c9-87ef-55e036ed5551",
      externalId: "0288c547-fbab-49c9-87ef-55e036ed5551",
      name: "SD GENT BV",
      street: "Jezuietengoed 36",
      city: "Brugge",
      postal: "800 0",
      country: "BE",
      vatId: "BE0786492034",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "",
      payment: "",
      shipToAddresses: [
        {
          id: "3c457cf1-59a4-43c4-b4b4-574d84df35fc",
          name: "Store Gent Sint-Niklasstraat 1",
          street: "Sint-Niklasstraat 1",
          city: "Gent",
          postal: "9000",
          country: "BE",
          contact: "",
        },
      ],
    },
    {
      id: "bp-09659c0b-9bcc-4de3-8bb1-2f00d7c204ff",
      externalId: "09659c0b-9bcc-4de3-8bb1-2f00d7c204ff",
      name: "Serhat Korkmaz E.U.",
      street: "Führichgasse 4/G6",
      city: "Wien",
      postal: "101 0",
      country: "AT",
      vatId: "ATU81751604",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-a515fdd9-29e8-4001-8197-1cf7e1f1dfc2",
      externalId: "a515fdd9-29e8-4001-8197-1cf7e1f1dfc2",
      name: "Singidunum, spol. s r.o.",
      street: "Karlova 184/12",
      city: "Praha",
      postal: "110 00",
      country: "CZ",
      vatId: "CZ25734784",
      registration: "25734784",
      email: "",
      phone: "",
      contact: "",
      currency: "",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-713deeac-5565-4618-83d4-8bb73ab2c29b",
      externalId: "713deeac-5565-4618-83d4-8bb73ab2c29b",
      name: "SITAS Souvnier - Sunar, Sita",
      street: "Vestingstraat 36",
      city: "Brugge",
      postal: "831 0",
      country: "BE",
      vatId: "BE0737591859",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-e732f515-89af-41cd-a5d3-32fe783e58ad",
      externalId: "e732f515-89af-41cd-a5d3-32fe783e58ad",
      name: "Souvenir 4you GmbH",
      street: "Rotenturmstraße 5-9",
      city: "VIENNA",
      postal: "101 0",
      country: "AT",
      vatId: "ATU67813636",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "",
      payment: "",
      shipToAddresses: [
        {
          id: "0142d08b-e86b-43a7-b63c-8d1484c46023",
          name: "Store Naschmarkt",
          street: "",
          city: "",
          postal: "",
          country: "AT",
          contact: "",
        },
        {
          id: "bce0cf3c-2f10-4a56-8c9c-6bb94fc99dab",
          name: "Store 10",
          street: "",
          city: "",
          postal: "",
          country: "AT",
          contact: "",
        },
        {
          id: "2f09c9ef-19b6-40bb-986e-8ab201ff3649",
          name: "Store 9",
          street: "",
          city: "",
          postal: "",
          country: "AT",
          contact: "",
        },
      ],
    },
    {
      id: "bp-3deb220f-f926-4547-8d05-948d97cee706",
      externalId: "3deb220f-f926-4547-8d05-948d97cee706",
      name: "STAR - SOUVENIRS SPRL",
      street: "Rue du Marché aux Herbes 77",
      city: "Bruxelles",
      postal: "100 0",
      country: "BE",
      vatId: "BE0478395684",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
    {
      id: "bp-d5f51f84-9590-4ef8-a184-206179f61c17",
      externalId: "d5f51f84-9590-4ef8-a184-206179f61c17",
      name: "SVNRS BV",
      street: "Sint-Baafsplein 70",
      city: "Gent",
      postal: "900 0",
      country: "BE",
      vatId: "BE0735882283",
      registration: "",
      email: "svnrs@yukiworks.be",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [
        {
          id: "eda7283f-068a-461e-b921-7832d5786fb9",
          name: "Store Katelijnerstraat 28",
          street: "Katelijnerstraat 28",
          city: "Bruge",
          postal: "8000",
          country: "BE",
          contact: "",
        },
        {
          id: "c2eee21c-1913-45e0-866e-a3015cc75523",
          name: "Store Kleine Vismarkt 5",
          street: "Kleine Vismarkt 5",
          city: "Gent",
          postal: "9000",
          country: "BE",
          contact: "",
        },
        {
          id: "ab81d99f-0ef2-4a44-84f3-f0806f54c4ff",
          name: "Store Sint-Baafsplein 70",
          street: "Sint-Baafsplein 70",
          city: "Gent",
          postal: "9000",
          country: "BE",
          contact: "",
        },
        {
          id: "b32b2f2e-1482-421c-8134-1fe27cfc91df",
          name: "Store Markt 11",
          street: "Markt 11",
          city: "Brugge",
          postal: "8000",
          country: "BE",
          contact: "",
        },
      ],
    },
    {
      id: "bp-3414d183-8d08-4fef-9161-49c5f26c9635",
      externalId: "3414d183-8d08-4fef-9161-49c5f26c9635",
      name: "UltiemPlan BV",
      street: "Stoofstraat 24",
      city: "Brussel",
      postal: "100 0",
      country: "BE",
      vatId: "BE0791426463",
      registration: "",
      email: "ultiemplan@yukiworks.be",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [
        {
          id: "1a741c90-f99d-4dfe-85f3-8bbd2ff68ea0",
          name: "Store Stoofstraat 24",
          street: "Stoofstraat 24",
          city: "Brussels",
          postal: "1000",
          country: "BE",
          contact: "",
        },
      ],
    },
    {
      id: "bp-82a60320-5ba8-478c-9087-8784d6eaab91",
      externalId: "82a60320-5ba8-478c-9087-8784d6eaab91",
      name: "Wolle - Souvenirs",
      street: "Wollestraat 32",
      city: "Brugge",
      postal: "8000",
      country: "BE",
      vatId: "BE1009202252",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [
        {
          id: "3d34130f-edff-49f1-ab7c-2021d95883ec",
          name: "Store Wollestraar 32",
          street: "Wollestraar 32",
          city: "Brugge",
          postal: "8000",
          country: "BE",
          contact: "",
        },
      ],
    },
    {
      id: "bp-92d1aa72-bb41-41e3-a136-cf49594e713f",
      externalId: "92d1aa72-bb41-41e3-a136-cf49594e713f",
      name: "Wonderful Souvenirs ApS",
      street: "Frederiksberggade 29",
      city: "Copenhagen C",
      postal: "1459",
      country: "DK",
      vatId: "DK37043397",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "",
      payment: "",
      shipToAddresses: [],
    },
    {
      id: "bp-b72a6081-9c55-4154-94bd-56ed736715ee",
      externalId: "b72a6081-9c55-4154-94bd-56ed736715ee",
      name: "YSSA THE TROPICAL ELEGANCE BV",
      street: "Mageleinstraat 1",
      city: "Gent",
      postal: "900 0",
      country: "BE",
      vatId: "BE0860905385",
      registration: "",
      email: "",
      phone: "",
      contact: "",
      currency: "EUR",
      payment: "Příkazem",
      shipToAddresses: [],
    },
  ];
  // The original logo is embedded so printing and offline use never need a separate image file.
  const BRAND_LOGO = document.getElementById("sidebar-brand-logo").src;
  const STORE = "olga_issue_slip_v4";
  const LEGACY = ["olga_delivery_desk_v2", "olga_delivery_desk_v3"];
  const today = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const uid = () =>
    "id" + Math.random().toString(36).slice(2) + Date.now().toString(36);
  const safe = (s) =>
    String(s ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const num = (x, f = 0) => {
    const n = Number(String(x ?? "").replace(",", "."));
    return Number.isFinite(n) ? n : f;
  };
  const money = (n, cur = "EUR") =>
    new Intl.NumberFormat("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num(n)) +
    " " +
    cur;
  const round = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
  const dateFmt = (d) => {
    if (!d) return "—";
    const a = d.split("-");
    return a.length === 3 ? `${a[2]}.${a[1]}.${a[0]}` : d;
  };
  const categories0 = [
    { id: "cat1", name: "Souvenirs" },
    { id: "cat2", name: "Accessories" },
    { id: "cat3", name: "Stationery" },
  ];
  const seedProducts = [
    ["LIGHTER GAS", "cat2"],
    ["BOOKMARK", "cat3"],
    ["TOTE BAG", "cat1"],
    ["PIN BADGE", "cat1"],
    ["PEN CROWN", "cat3"],
    ["PENCIL TOPPER", "cat3"],
    ["KEYCHAIN", "cat1"],
    ["STICKER", "cat1"],
    ["PATCH", "cat1"],
  ].map((a, i) => ({
    id: "item" + (i + 1),
    sku: "BT-" + String(i + 1).padStart(3, "0"),
    name: a[0],
    categoryId: a[1],
    vat: 0,
    unit: "pcs",
    active: true,
  }));
  const baseSettings = {
    company: "Royal Intertrade s.r.o.",
    logo: "BT Souvenirs",
    street: "V Háji 1619/2",
    postal: "170 00",
    city: "Praha 7",
    country: "Czech Republic",
    ico: "06532039",
    vatId: "CZ06532039",
    phone: "+420 602 251 253",
    email: "info@btsouvenirs.com",
    issuer: "Burhan TURKKAN",
    defaultCurrency: "EUR",
    rates: { CZK: 1, EUR: 24.35, USD: 22, GBP: 29 },
    defaultVat: 0,
    payment: "Bank transfer",
    prefix: "2026",
    nextNumber: 1,
    showCzkRecap: true,
    bank: "",
    iban: "",
    bic: "",
    notes: "",
    footer: "BT Souvenirs · Royal Intertrade s.r.o.",
    terms: "",
  };
  const initial = () => ({
    version: 4,
    settings: clone(baseSettings),
    customers: clone(CUSTOMERS),
    categories: clone(categories0),
    products: clone(seedProducts),
    docs: [],
    savedAt: null,
  });
  let storageOk = true;
        let storageLocked = false;
        let recoveryRaw = null;
        let startupNote = "";
        let db;
        try {
          recoveryRaw = localStorage.getItem(STORE);
          db = recoveryRaw ? BTData.validateDatabase(JSON.parse(recoveryRaw)) : initial();
          if (BTPlatform.snapshot) {
            try {
              const copy = BTData.validateDatabase(JSON.parse(BTPlatform.snapshot));
              if (!recoveryRaw || String(copy.savedAt || "") > String(db.savedAt || "")) {
                db = copy;
                localStorage.setItem(STORE, JSON.stringify(db));
                startupNote = "Your records were recovered from the private on-device copy.";
              }
            } catch (ignored) { /* An invalid mirror must never replace valid local records. */ }
          }
        } catch (error) {
          db = initial();
          storageOk = false;
          storageLocked = true;
          startupNote = "Saved data could not be read. Existing records have been preserved. Export the recovery file, then restore a valid JSON backup.";
        }
        function stripCatalogPrices(data) {
    // Existing issued documents retain their saved figures. Only catalog presets are removed.
    if (!Array.isArray(data.products)) data.products = clone(seedProducts);
    if (!Array.isArray(data.categories)) data.categories = clone(categories0);
    const oldSettings =
      data.settings && typeof data.settings === "object" ? data.settings : {};
    data.settings = {
      ...clone(baseSettings),
      ...oldSettings,
      rates: { ...baseSettings.rates, ...(oldSettings.rates || {}) },
    };
    if (data.settings.footer === "Issued in Olga Delivery Desk")
      data.settings.footer = baseSettings.footer;
    if (data.settings.notes === "The VAT is only indicative.")
      data.settings.notes = "";
    data.products.forEach((product) => {
      if (product && typeof product === "object") {
        delete product.price;
        delete product.currency;
      }
    });
    return data;
  }
  db = stripCatalogPrices(db);
  function persist() {
          if (storageLocked) {
            toast("Storage is protected. Export the recovery file or restore a valid backup first.");
            return false;
          }
          stripCatalogPrices(db);
          const previousSavedAt = db.savedAt;
          db.savedAt = new Date().toISOString();
          try {
            const serialized = JSON.stringify(db);
            localStorage.setItem(STORE, serialized);
            BTPlatform.saveState(serialized);
            storageOk = true;
            document.getElementById("storage-indicator").textContent = "● Saved on device";
            if (!storageLocked) document.getElementById("save-failure-warning")?.remove();
            return true;
          } catch (error) {
            db.savedAt = previousSavedAt;
            storageOk = false;
            document.getElementById("storage-indicator").textContent = "● Save failed · export backup";
            let warning = document.getElementById("save-failure-warning");
            if (!warning) {
              warning = document.createElement("div");
              warning.id = "save-failure-warning";
              warning.className = "storage-warning";
              warning.innerHTML = '<p>Changes could not be saved. Keep this app open and export a JSON backup.</p><button class="btn" data-action="export-backup">Export JSON backup</button>';
              document.querySelector(".main").prepend(warning);
            }
            toast("Storage failed. Your work is still open. Export a JSON backup before closing the app.");
            return false;
          }
        }
  let ui = {
    page: "editor",
    step: 0,
    draft: null,
    editId: null,
    search: "",
    productSearch: "",
    category: "all",
    modal: null,
    pickerOpen: false,
    pickerSearch: "",
    pickerSelectedId: "",
  };
  const settings = () => db.settings;
  const nextNumber = () =>
    `${settings().prefix}${String(settings().nextNumber).padStart(4, "0")}`;
  function newDraft() {
    return {
      id: uid(),
      number: nextNumber(),
      issueDate: today(),
      currency: settings().defaultCurrency,
      exchange: num(settings().rates[settings().defaultCurrency], 1),
      customerId: "",
      shipId: "",
      shipManual: null,
      orderNo: "",
      orderDate: "",
      status: "draft",
      payment: settings().payment,
      issuer: settings().issuer,
      notes: "",
      reference: "",
      warehouse: "Main warehouse",
      items: [],
    };
  }
  function current() {
    if (!ui.draft) ui.draft = newDraft();
    return ui.draft;
  }
  function curRate(c) {
    return Math.max(0.00000001, num(settings().rates[c], 1));
  }
  function lineTotals(item) {
    const net = round(num(item.qty) * num(item.price));
    const tax = round((net * num(item.vat)) / 100);
    return { net, tax, gross: round(net + tax) };
  }
  function totals(doc = current()) {
    let net = 0,
      tax = 0;
    const groups = {};
    (doc.items || []).forEach((it) => {
      const line = lineTotals(it);
      const base = line.net;
      const r = num(it.vat);
      const t = line.tax;
      net += base;
      tax += t;
      if (!groups[r]) groups[r] = { base: 0, tax: 0 };
      groups[r].base += base;
      groups[r].tax += t;
    });
    return {
      net: round(net),
      tax: round(tax),
      gross: round(net + tax),
      groups,
    };
  }
  function customer() {
    return db.customers.find((c) => c.id === current().customerId) || null;
  }
  function selectedShip(c = customer(), doc = current()) {
    if (doc.shipManual) return doc.shipManual;
    if (!c) return null;
    return c.shipToAddresses?.find((a) => a.id === doc.shipId) || null;
  }
  function addr(o) {
    return [
      o?.street,
      [o?.postal, o?.city].filter(Boolean).join(" "),
      o?.country,
    ]
      .filter(Boolean)
      .join(", ");
  }
  function togglePage(p) {
    ui.page = p;
    ui.search = "";
    if (p === "editor" && !ui.draft) {
      ui.step = 0;
      ui.draft = newDraft();
      ui.editId = null;
    }
    checkpoint();
    render();
  }
  function toast(msg) {
    const root = document.getElementById("toast-root");
    root.innerHTML = `<div class="toast">${safe(msg)}</div>`;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => (root.innerHTML = ""), 3500);
  }
  function savedToast(msg) {
    if (storageOk && !storageLocked) toast(msg);
  }
  function field(label, name, value = "", opts = {}) {
    const v = safe(value);
    let control = "";
    if (opts.type === "select") {
      control = `<select data-field="${name}">${(opts.options || []).map(([optionValue, text]) => `<option value="${safe(optionValue)}" ${String(optionValue) === String(value) ? "selected" : ""}>${safe(text)}</option>`).join("")}</select>`;
    } else if (opts.type === "textarea") {
      control = `<textarea data-field="${name}" placeholder="${safe(opts.placeholder || "")}">${v}</textarea>`;
    } else {
      control = `<input data-field="${name}" type="${opts.type || "text"}" value="${v}" ${opts.step ? 'step="' + opts.step + '"' : ""} ${opts.min !== undefined ? 'min="' + opts.min + '"' : ""} placeholder="${safe(opts.placeholder || "")}">`;
    }
    return `<div class="field ${opts.class || ""}"><label>${safe(label)}</label>${control}${opts.hint ? `<div class="hint">${safe(opts.hint)}</div>` : ""}</div>`;
  }
  function selectField(label, name, value, options, extra = "") {
    return `<div class="field ${extra}"><label>${safe(label)}</label><select data-field="${name}">${options.map(([v, l]) => `<option value="${safe(v)}" ${String(value) === String(v) ? "selected" : ""}>${safe(l)}</option>`).join("")}</select></div>`;
  }
  function head(title, description, action = "") {
    return `<div class="head"><div><div class="eyebrow">BT SOUVENIRS / DELIVERY</div><h1>${title}</h1><p>${description}</p></div><div class="actions">${action}</div></div>`;
  }
  function changeDocCurrency(next) {
    const d = current(),
      from = d.currency;
    if (next === from) return;
    const fromRate = from === "CZK" ? 1 : num(d.exchange),
      toRate = curRate(next);
    if (fromRate <= 0) {
      toast("Enter a positive exchange rate before changing currency.");
      return;
    }
    d.items.forEach((it) => {
      if (it.price !== null && it.price !== "" && it.price !== undefined)
        it.price = round((num(it.price) * fromRate) / toRate);
    });
    d.currency = next;
    d.exchange = toRate;
    toast(
      `Entered prices converted with manual exchange rates (${from} → ${next}). Please verify.`,
    );
  }
function checkpoint() {
          if (storageLocked) return false;
          if (ui.draft) db.workingDraft = clone(ui.draft);
          db.workspaceState = { page: ui.page, step: ui.step, editId: ui.editId };
          return persist();
        }
function canReplaceDraft() {
          const d = ui.draft;
          if (!d || (!d.customerId && !d.items.length && !d.notes)) return true;
          const saved = db.docs.find(doc => doc.id === d.id);
          if (saved && JSON.stringify(saved) === JSON.stringify(d)) return true;
          return window.confirm("Replace the current working draft? Save it first if you want to keep it as a separate document.");
        }
function fitPreview() {
          const frame = document.querySelector("#print-layer .preview-frame");
          const paper = frame?.querySelector(".paper");
          if (!frame || !paper) return;
          frame.style.setProperty("--preview-scale", Math.min(1, Math.max(.2, (frame.clientWidth - 28) / 793.7)));
        }
async function outputDocument(mode) {
          const d = previewingDoc;
          if (!d) return;
          const error = validateDoc(d, "open");
          if (error) { toast(error); return; }
          if (!BTPlatform.native) { window.print(); return; }
const buttons = [...document.querySelectorAll('#print-layer [data-action="print"], #print-layer [data-action="save-pdf"], #print-layer [data-action="share-pdf"]')];
          buttons.forEach(button => button.disabled = true);
          try {
            await BTPlatform.flush();
            const result = await BTPlatform.document(mode, paperHtml(d), `issue-slip-${d.number}.pdf`);
            if (result.shareOpened) toast("Choose WhatsApp or another app to share the PDF.");
            else if (result.dialogOpened) toast("Android print dialog opened. Select your printer or Save as PDF.");
            else if (result.cancelled) toast("Save cancelled. Your document is still available.");
            else if (result.saved) toast("PDF saved to your selected location.");
          } catch (error) { toast(error.message); }
          finally { buttons.forEach(button => button.disabled = false); }
        }
function summaryLabel(d) {
          if (d.items.some(item => item.price == null || item.price === "")) return "Price pending";
          if (d.items.some(item => BTData.lineError(item))) return "Check amounts";
          return d.items.length ? money(totals(d).gross, d.currency) : "—";
        }
function decorateTables() {
  document.querySelectorAll(".data-table, .item-grid").forEach(table => {
    const labels = [...table.querySelectorAll("thead th")].map(cell => cell.textContent.trim());
    table.querySelectorAll("tbody tr").forEach(row => [...row.children].forEach((cell,i) => { if (cell.colSpan === 1) cell.dataset.label = labels[i] || ""; }));
  });
}
  function render() {
    document.querySelector("#company-name").textContent =
      settings().company || "BT Souvenirs";
    document
      .querySelectorAll("[data-page]")
      .forEach((el) =>
        el.classList.toggle("active", el.dataset.page === ui.page),
      );
    const content = document.querySelector("#content");
    content.innerHTML =
      ui.page === "editor"
        ? editorPage()
        : ui.page === "slips"
          ? slipsPage()
          : ui.page === "customers"
            ? customersPage()
            : ui.page === "products"
              ? productsPage()
              : settingsPage();
  decorateTables();
}
  function editorPage() {
    const d = current(),
      t = totals(d);
    const labels = ["Customer", "Products", "Other details", "Review"];
    return (
      head(
        ui.editId ? "Edit issue slip" : "New issue slip",
        "Create the delivery document in four short steps. Supplier data is filled in automatically.",
        `<button class="btn" data-action="new-doc">＋ Start fresh</button><button class="btn" data-action="save-draft">Save draft</button>`,
      ) +
      `<div class="steps">${labels.map((label, i) => `<button class="step ${ui.step === i ? "active" : i < ui.step ? "done" : ""}" data-action="step" data-index="${i}"><span class="circle">${i < ui.step ? "✓" : i + 1}</span>${label}</button>`).join("")}</div><div class="editor-layout"><div class="editor-body panel panel-pad">${[stepCustomer, stepItems, stepDetails, stepReview][ui.step]()}<div class="editor-foot"><button class="btn" data-action="prev" ${ui.step === 0 ? "disabled" : ""}>← Back</button><div class="toolbar">${ui.step === 3 ? `<button class="btn" data-action="show-preview">Document preview</button><button class="btn primary" data-action="issue-doc">Save issue slip ✓</button>` : `<button class="btn primary" data-action="next">Continue →</button>`}</div></div></div><div class="panel sidebar-summary"><div class="summary-kicker">Live summary</div><div class="summary-total" id="live-total">${summaryLabel(d)}</div><div class="summary-row"><span>Number</span><strong id="sum-number">${safe(d.number)}</strong></div><div class="summary-row"><span>Customer</span><strong id="sum-customer">${safe(customer()?.name || "Not selected")}</strong></div><div class="summary-row"><span>Lines</span><strong id="sum-lines">${d.items.length}</strong></div><div class="summary-row"><span>Currency</span><strong>${safe(d.currency)}</strong></div><div class="summary-row"><span>VAT</span><strong id="sum-vat">${money(t.tax, d.currency)}</strong></div><div class="summary-actions"><button class="btn primary" data-action="save-draft">Save draft</button><button class="btn" data-action="show-preview">Preview A4</button></div></div></div>`
    );
  }
  function stepCustomer() {
    const d = current(),
      c = customer(),
      sh = selectedShip();
    const deliveryOptions = [
      ["", "Use billing address"],
      ...(c?.shipToAddresses || []).map((a) => [a.id, a.name || addr(a)]),
    ];
    const status = c
      ? `<span class="customer-status"><span class="status-dot"></span> Customer selected</span>`
      : `<span class="customer-status status-pending">Selection required</span>`;
    const intro = `<div class="customer-step-head"><div><div class="eyebrow">STEP 01 / CUSTOMER</div><h2>Who are we delivering to?</h2><p>Choose a customer, check their details, then confirm. The delivery address can be changed afterward.</p></div>${status}</div>`;
    if (!c) {
      return (
        intro +
        `<div class="customer-empty-card"><div class="customer-empty-symbol" aria-hidden="true">⌕</div><h3>No customer selected</h3><p>Find the right company from ${db.customers.length} saved customers. You’ll see billing, VAT and contact details before confirming.</p><button class="btn primary customer-primary-action" data-action="open-customer-picker">Search & choose customer →</button><button class="btn" data-action="new-customer">＋ Add a new customer</button></div>`
      );
    }
    return (
      intro +
      `<div class="customer-selected-card"><div class="customer-card-head"><div class="customer-avatar" aria-hidden="true">${safe((c.name || "C").trim().slice(0, 2).toUpperCase())}</div><div class="customer-card-identity"><small>SELECTED CUSTOMER</small><strong>${safe(c.name)}</strong><span>${safe([c.city, c.country].filter(Boolean).join(" · ") || "Location not provided")}</span></div>
                <button class="btn small" data-action="open-customer-picker">Change customer</button>
            </div>
            <div class="customer-facts">
                <div><small>BILLING ADDRESS</small><strong>${safe(addr(c) || "No address provided")}</strong></div>
                <div><small>VAT ID</small><strong>${safe(c.vatId || "Not provided")}</strong></div>
                <div><small>CONTACT</small><strong>${safe(c.contact || c.email || c.phone || "Not provided")}</strong></div>
            </div>
            <div class="customer-card-toolbar"><button class="btn small" data-action="edit-customer" data-id="${safe(c.id)}">✎ Edit details</button><span class="muted">Confirm the address before creating the document.</span></div>
    </div>
    <div class="delivery-panel">
        <div class="delivery-panel-heading">
            <div>
                <h3>Delivery address</h3>
                <p>Choose where this order will be sent.</p>
            </div><button class="btn small" data-action="new-address">＋ Add address</button></div>${selectField("Delivery location", "shipId", d.shipId, deliveryOptions)}
        <div class="delivery-address-preview"><span class="status-dot"></span>
            <div><strong>${safe(sh?.name || c.name)}</strong><span>${safe(addr(sh || c) || "No delivery address provided")}</span></div>${sh ? `<button class="btn small" data-action="edit-address">Edit</button>` : ""}</div>
    </div>`
    );
  }
  function matchingPickerCustomers() {
    const q = (ui.pickerSearch || "").trim().toLocaleLowerCase();
    return db.customers.filter((c) =>
      [c.name, c.city, c.country, c.vatId, c.registration, c.email]
        .join(" ")
        .toLocaleLowerCase()
        .includes(q),
    );
  }
  function pickerCustomerRows() {
    const customers = matchingPickerCustomers();
    return customers.length
      ? customers
          .map(
            (
              c,
            ) => `<button type="button" class="picker-customer-row ${ui.pickerSelectedId === c.id ? " active " : " "}" data-action="preview-customer"
        data-id="${safe(c.id)}" aria-pressed="${ui.pickerSelectedId === c.id}"><span class="picker-avatar">${safe((c.name || "C").trim().slice(0, 2).toUpperCase())}</span><span class="picker-customer-copy"><strong>${safe(c.name)}</strong><small>${safe([c.city, c.country].filter(Boolean).join(" · ") || "City not specified")}</small></span><span class="picker-chevron">›</span></button>`,
          )
          .join("")
      : `
    <div class="picker-no-results"><strong>No matching customer</strong>
        <p>Try another name or VAT ID, or create a new customer.</p><button class="btn small" data-action="new-customer">＋ New customer</button></div>`;
  }
  function pickerDetailHtml() {
    const c = db.customers.find((c) => c.id === ui.pickerSelectedId);
    if (!c)
      return `
    <div class="picker-detail-empty">
        <div class="picker-detail-icon">▤</div>
        <h3>Customer information</h3>
        <p>Select a company on the left to check its billing address, VAT details and delivery locations.</p>
    </div>`;
    const info = (label, value) => `
    <div class="picker-info"><span>${label}</span><strong>${safe(value || "Not provided")}</strong></div>`;
    const destinations = c.shipToAddresses || [];
    return `
    <div class="picker-detail-content">
        <div class="picker-detail-overline">CUSTOMER RECORD</div>
        <h3>${safe(c.name)}</h3>
        <p class="picker-detail-subtitle">Review the details before confirming your selection.</p>
        <div class="picker-detail-section">
            <div class="picker-section-heading">Billing & legal information</div>${info("Billing address", addr(c))}${info("VAT ID", c.vatId)}${info("Registration number", c.registration)}</div>
        <div class="picker-detail-section">
            <div class="picker-section-heading">Contact information</div>${info("Contact person", c.contact)}${info("Email", c.email)}${info("Phone", c.phone)}</div>
        <div class="picker-detail-section">
            <div class="picker-section-heading">Delivery destinations <span>${destinations.length}</span></div>${
              destinations.length
                ? destinations
                    .map(
                      (a) => `
            <div class="picker-delivery-item"><strong>${safe(a.name || "Delivery address")}</strong><small>${safe(addr(a) || "Address not specified")}</small></div>`,
                    )
                    .join("")
                : `
            <p class="picker-detail-footnote">Billing address will be used unless another address is added.</p>`
            }</div>
    </div>`;
  }
  function updatePickerResults() {
    const rows = document.getElementById("picker-results");
    if (rows) rows.innerHTML = pickerCustomerRows();
    const count = document.getElementById("picker-result-count");
    if (count)
      count.textContent = `${matchingPickerCustomers().length}
    results`;
    const panel = document.getElementById("picker-details");
    if (panel) panel.innerHTML = pickerDetailHtml();
    const confirm = document.getElementById("picker-confirm");
    if (confirm)
      confirm.disabled = !db.customers.some(
        (c) => c.id === ui.pickerSelectedId,
      );
  }
  function openCustomerPicker() {
    ui.pickerSearch = "";
    ui.pickerSelectedId = customer()?.id || "";
    ui.pickerOpen = true;
    document.getElementById("modal-root").innerHTML = `
    <div class="modal-cover picker-cover" data-dismiss="true">
        <div class="modal customer-picker-modal" role="dialog" aria-modal="true" aria-labelledby="picker-title">
            <div class="picker-header">
                <div>
                    <div class="eyebrow">CUSTOMER SELECTION</div>
                    <h2 id="picker-title">Select a customer</h2>
                    <p>Search the customer database, then verify details before continuing.</p>
                </div><button class="picker-close" data-action="close-customer-picker" aria-label="Close customer selection">×</button></div>
            <div class="picker-workspace">
                <section class="picker-list-side">
                    <div class="picker-search-wrap"><label for="picker-search">Search customers</label>
                        <div class="picker-search-box"><span aria-hidden="true">⌕</span><input id="picker-search" autocomplete="off" placeholder="Company, city, VAT ID…" aria-controls="picker-results"></div>
                        <div class="picker-results-meta"><span>${db.customers.length} saved customers</span><span id="picker-result-count">${db.customers.length} results</span></div>
                    </div>
                    <div id="picker-results" class="picker-results">${pickerCustomerRows()}</div><button class="picker-add" data-action="new-customer">＋ Add new customer</button></section>
                <section id="picker-details" class="picker-detail-side" aria-live="polite">${pickerDetailHtml()}</section>
            </div>
            <div class="picker-footer"><span><span class="status-dot"></span> Your customer details stay on this device.</span>
                <div class="picker-footer-actions"><button class="btn" data-action="close-customer-picker">Cancel</button><button class="btn primary" id="picker-confirm" data-action="confirm-picked-customer" ${ui.pickerSelectedId ? "" : "disabled"}>Confirm customer →</button></div>
            </div>
        </div>
    </div>`;
    document.body.classList.add("dialog-open");
    document.getElementById("picker-search")?.focus();
  }
  function closeCustomerPicker() {
    ui.pickerOpen = false;
    document.body.classList.remove("dialog-open");
    document.getElementById("modal-root").innerHTML = "";
    ui.pickerSelectedId = "";
  }
  function stepItems() {
    const d = current();
    const cats = [
      ["all", "All categories"],
      ...db.categories.map((c) => [c.id, c.name]),
    ];
    return `
    <div class="section-title">
        <div>
            <h2>2. Products on the slip</h2><small>Catalog items have no preset prices. Enter each price manually.</small></div>
        <div class="toolbar"><button class="btn small" data-action="new-product">＋ Catalog product</button><button class="btn small" data-action="new-category">＋ Category</button><button class="btn small" data-action="custom-line">＋ Custom line</button></div>
    </div>
    <div class="grid">
        <div class="field"><label>Search products</label><input id="product-search" value="${safe(ui.productSearch)}" placeholder="Product name or SKU"></div>${selectField("Category", "productCategory", ui.category, cats)}</div>
    <div class="products-picker" id="product-picker">${productChoices()}</div>
    <div class="subhead">Selected items (${d.items.length})</div>
    <div class="table-scroll">
        <table class="item-grid">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Unit price</th>
                    <th>VAT %</th>
                    <th class="right">Total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="item-rows">${itemRows()}</tbody>
        </table>
    </div>
    <p class="muted" style="font-size:11px;margin-top:12px">Unit prices start empty, including catalog products. Enter a price yourself (0 is allowed for a free item). Tax treatment must be checked for each transaction.</p>`;
  }
  function productChoices() {
    const q = ui.productSearch.trim().toLowerCase();
    const prods = db.products
      .filter(
        (p) =>
          p.active !== false &&
          (ui.category === "all" || p.categoryId === ui.category) &&
          [p.name, p.sku].join(" ").toLowerCase().includes(q),
      )
      .slice(0, 30);
    return (
      prods
        .map(
          (p) => `
    <button class="product-choice" data-action="add-product" data-id="${safe(p.id)}"><strong>＋ ${safe(p.name)}</strong><small>${safe(p.sku)} · ${safe(p.unit || "pcs")} · Enter price on slip</small></button>`,
        )
        .join("") ||
      `
    <div class="muted" style="font-size:12px;padding:13px">No products. Add custom line or manage catalog.</div>`
    );
  }
  function itemRows() {
    const d = current();
    return (
      d.items
        .map((it, i) => {
          const value =
            it.price == null || it.price === "" ? null : lineTotals(it).gross;
          return `
    <tr>
        <td><input class="item-name" data-item="${safe(it.id)}" data-prop="name" value="${safe(it.name)}" aria-label="Description"></td>
        <td><input class="num" type="number" inputmode="decimal" min="0" step="0.01" data-item="${safe(it.id)}" data-prop="qty" value="${safe(it.qty)}" aria-label="Quantity"></td>
        <td><input class="num" type="number" inputmode="decimal" min="0" step="0.01" data-item="${safe(it.id)}" data-prop="price" value="${it.price == null ? "" : safe(it.price)}" placeholder="Enter price" aria-label="Unit price"></td>
        <td><input class="vat" type="number" inputmode="decimal" min="0" max="100" step="0.01" data-item="${safe(it.id)}" data-prop="vat" value="${safe(it.vat)}" aria-label="VAT percentage"></td>
        <td class="item-total" data-item-total="${safe(it.id)}">${value == null ? "—" : money(value, d.currency)}</td>
        <td><button class="del" data-action="remove-item" data-id="${safe(it.id)}" aria-label="Remove line">×</button></td>
    </tr>`;
        })
        .join("") ||
      `
    <tr>
        <td colspan="6" class="muted" style="text-align:center;padding:24px">Choose a product above to start the document.</td>
    </tr>`
    );
  }
  function stepDetails() {
    const d = current();
    return `
    <div class="section-title">
        <div>
            <h2>3. Other details</h2><small>Document numbering, currency, exchange rate, payment and references</small></div><span class="badge">Editable</span></div>
    <div class="grid three">${field("Issue slip number", "number", d.number)}${field("Issued on", "issueDate", d.issueDate, { type: "date" })}${selectField(
      "Currency",
      "currency",
      d.currency,
      [
        ["EUR", "EUR · Euro"],
        ["CZK", "CZK · Czech koruna"],
        ["USD", "USD · US dollar"],
        ["GBP", "GBP · Pound sterling"],
      ],
    )}${field("CZK per 1 document currency", "exchange", d.exchange, { type: "number", step: "0.0001", min: "0.0001", hint: "Manual exchange rate. No automatic live rate lookup." })}
        <div class="field"><label>Document status</label>
            <div class="address-card">${d.status === "open" ? "Previously issued" : "Draft"} · Final status is set when you save the slip.</div>
        </div>${field("Warehouse", "warehouse", d.warehouse)}${field("Order number", "orderNo", d.orderNo)}${field("Order date", "orderDate", d.orderDate, { type: "date" })}${field("Reference", "reference", d.reference)}${selectField(
          "Payment method",
          "payment",
          d.payment,
          [
            ["Bank transfer", "Bank transfer"],
            ["Cash", "Cash"],
            ["Card", "Card"],
            ["Other", "Other"],
          ],
        )}${field("Issued by", "issuer", d.issuer)}
        <div class="span3">${field("Remarks / notes", "notes", d.notes, { type: "textarea" })}</div>
    </div>
    <div class="note" style="margin-top:18px">Supplier name, address, VAT ID and default currency are managed in <button class="btn small" data-page="settings" style="margin-left:5px">Settings</button>. Changes to the defaults apply to newly created slips. This document can have its own currency
        and rate.</div>`;
  }
  function stepReview() {
    const d = current(),
      c = customer(),
      sh = selectedShip(),
      t = totals(d);
    return `
    <div class="section-title">
        <div>
            <h2>4. Review before issuing</h2><small>Check carefully — this is an issue slip, not a tax invoice</small></div><button class="btn small" data-action="show-preview">Preview A4</button></div>
    <div class="grid">
        <div class="address-card"><span class="eyebrow">SUPPLIER</span><strong>${safe(settings().company)}</strong><br>${safe(addr(settings()))}<br>${safe(settings().vatId)}</div>
        <div class="address-card"><span class="eyebrow">CUSTOMER / DELIVERY</span><strong>${safe(c?.name || "Not selected")}</strong><br>${safe(addr(sh || c))}<br>${safe(c?.vatId || "VAT not specified")}</div>
    </div>${d.items.some((i) => i.price == null) ? `<div class="note" style="margin-top:14px">Some unit prices are blank. Go back to Products and enter them before issuing.</div>` : ""}
    <div class="subhead">Items</div>
    <div class="table-scroll">
        <table class="data-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Unit price</th>
                    <th>VAT</th>
                    <th style="text-align:right">Amount</th>
                </tr>
            </thead>
            <tbody>${d.items
              .map(
                (i) => `
                <tr>
                    <td>${safe(i.name)}</td>
                    <td>${safe(i.qty)}</td>
                    <td>${i.price == null ? "Not entered" : money(i.price, d.currency)}</td>
                    <td>${safe(i.vat)}%</td>
                    <td style="text-align:right">${i.price == null || i.price === "" ? "—" : money(lineTotals(i).gross, d.currency)}</td>
                </tr>`,
              )
              .join("")}</tbody>
        </table>
    </div>
    <div style="max-width:320px;margin:18px 0 0 auto">
        <div class="summary-row"><span>Net</span><strong>${money(t.net, d.currency)}</strong></div>
        <div class="summary-row"><span>VAT</span><strong>${money(t.tax, d.currency)}</strong></div>
        <div class="summary-row"><strong>Total due</strong><strong>${money(t.gross, d.currency)}</strong></div>
    </div>
    <p class="muted" style="font-size:12px">Document ${safe(d.number)} · ${dateFmt(d.issueDate)} · ${safe(d.payment)} · 1 ${safe(d.currency)} = ${safe(d.exchange)} CZK</p>`;
  }
  function matchingDocs() {
    const q = ui.search.trim().toLowerCase();
    return [...db.docs]
      .sort((a, b) =>
        String(b.savedAt || "").localeCompare(String(a.savedAt || "")),
      )
      .filter((d) =>
        [
          d.number,
          d.customerSnapshot?.name ||
            db.customers.find((c) => c.id === d.customerId)?.name ||
            "",
          d.status,
          d.status === "open" ? "Issued" : "Draft",
        ]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
  }
  function slipsPage() {
    const docs = db.docs,
      selected = matchingDocs();
    return (
      head(
        "Issue slips",
        "Drafts, issued documents, A4 previews and duplicates.",
        `
    <button class="btn primary" data-action="new-doc">＋ New issue slip</button>`,
      ) +
      `
    <div class="mini-stats">
        <div class="panel"><small>Total slips</small><strong>${docs.length}</strong></div>
        <div class="panel"><small>Issued</small><strong>${docs.filter((d) => d.status === "open").length}</strong></div>
        <div class="panel"><small>Drafts</small><strong>${docs.filter((d) => d.status !== "open").length}</strong></div>
    </div>
    <div class="panel panel-pad">
        <div class="searchbar"><input id="list-search" placeholder="Search number, customer or status" value="${safe(ui.search)}"><button class="btn" data-action="new-doc">＋ Create</button></div>${
          docs.length
            ? `
        <div class="table-scroll">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Customer</th>
                        <th>Issued</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="slip-rows">${docRows(selected)}</tbody>
            </table>
        </div>`
            : `
        <div class="empty"><strong>No issue slips found</strong>
            <p>Create your first document or change the search.</p><button class="btn primary" data-action="new-doc">＋ New issue slip</button></div>`
        }</div>`
    );
  }
  function docRows(docs) {
    return (
      docs
        .map(
          (d) => `
    <tr>
        <td><strong>${safe(d.number)}</strong></td>
        <td>${safe(d.customerSnapshot?.name || db.customers.find((c) => c.id === d.customerId)?.name || "—")}</td>
        <td>${safe(dateFmt(d.issueDate))}</td>
        <td><span class="badge ${d.status === "open" ? "open" : "draft"}">${d.status === "open" ? "Issued" : "Draft"}</span></td>
        <td>${d.items.some((it) => it.price == null || it.price === "") ? "Price pending" : money(totals(d).gross, d.currency)}</td>
        <td>
            <div class="row-actions"><button class="btn small" data-action="edit-doc" data-id="${safe(d.id)}">Edit</button><button class="btn small" data-action="print-doc" data-id="${safe(d.id)}">A4</button><button class="btn small" data-action="copy-doc" data-id="${safe(d.id)}">Copy</button><button class="btn small" data-action="share-doc" data-id="${safe(d.id)}">Share</button>
                <button class="btn small danger" data-action="delete-doc" data-id="${safe(d.id)}">×</button>
            </div>
        </td>
    </tr>`,
        )
        .join("") ||
      '<tr><td colspan="6" class="muted">No matching issue slips</td></tr>'
    );
  }
  function customersPage() {
    const q = ui.search.toLowerCase();
    const cs = db.customers.filter((c) =>
      [c.name, c.city, c.country, c.vatId].join(" ").toLowerCase().includes(q),
    );
    return (
      head(
        "Customers",
        `${db.customers.length}
    customers · Import XML / customer-book JSON, or export all customers and delivery addresses.`,
        `
    <button class="btn" data-action="import-customers">↑ Import customer book</button><button class="btn" data-action="export-customers">↓ Export customer book</button><button class="btn primary" data-action="new-customer">＋ Add customer</button>`,
      ) +
      `
    <div class="panel panel-pad">
        <div class="searchbar"><input id="list-search" placeholder="Search company, VAT ID or city" value="${safe(ui.search)}"></div>
        <div class="table-scroll">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>VAT / DIČ</th>
                        <th>Billing address</th>
                        <th>Delivery locations</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="customer-rows">${customerRows(cs)}</tbody>
            </table>
        </div>
    </div>`
    );
  }
  function customerRows(cs) {
    return (
      cs
        .map(
          (c) => `
    <tr>
        <td><strong>${safe(c.name)}</strong><br><small class="muted">${safe(c.email || "")}</small></td>
        <td>${safe(c.vatId || "—")}</td>
        <td>${safe(addr(c))}</td>
        <td>${(c.shipToAddresses || []).length}</td>
        <td><button class="btn small" data-action="edit-customer" data-id="${safe(c.id)}">Edit</button></td>
    </tr>`,
        )
        .join("") ||
      `
    <tr>
        <td colspan="5">No matching customers</td>
    </tr>`
    );
  }
  function matchingProducts() {
    const q = ui.search.trim().toLowerCase();
    return db.products.filter((x) =>
      [x.name, x.sku, db.categories.find((c) => c.id === x.categoryId)?.name]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }
  function productsPage() {
    const p = matchingProducts();
    return (
      head(
        "Products & categories",
        "Maintain a short catalog for fast document creation.",
        `
    <button class="btn" data-action="new-category">＋ Category</button><button class="btn primary" data-action="new-product">＋ Product</button>`,
      ) +
      `
    <div class="panel panel-pad">
        <div class="section-title">
            <h2>Categories</h2><small>${db.categories.length} categories</small></div>
        <div class="chip-row">${db.categories.map((c) => `<button class="chip" data-action="edit-category" data-id="${safe(c.id)}">${safe(c.name)} ✎</button>`).join("")}</div>
        <div class="searchbar"><input id="list-search" value="${safe(ui.search)}" placeholder="Search products and SKUs"></div>
        <div class="table-scroll">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>VAT</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="product-rows">${productRows(p)}</tbody>
            </table>
        </div>
    </div>`
    );
  }
  function productRows(products) {
    return (
      products
        .map(
          (p) => `
    <tr>
        <td><strong>${safe(p.name)}</strong><br><small class="muted">${safe(p.sku)}</small></td>
        <td>${safe(db.categories.find((c) => c.id === p.categoryId)?.name || "Uncategorized")}</td>
        <td>${safe(p.vat)}%</td>
        <td><button class="btn small" data-action="edit-product" data-id="${safe(p.id)}">Edit</button></td>
    </tr>`,
        )
        .join("") ||
      `
    <tr>
        <td colspan="4">No products</td>
    </tr>`
    );
  }
  function settingsPage() {
    const s = settings();
    return (
      head(
        "Settings",
        "Supplier defaults, currency, document appearance and device backup.",
      ) +
      `
    <div class="stack">
        <section class="panel settings-block">
            <h2>Company · printed automatically</h2>
            <p>These fields appear on every new issue slip and its printout. Editable at any time.</p>
            <div class="grid three">${field("Supplier company", "company", s.company)}
                <div class="field"><label>Original BT Souvenirs logo · printed on every slip</label><img class="company-logo-preview" src="${BRAND_LOGO}" alt="BT Souvenirs original logo">
                    <div class="hint">Embedded in this HTML file; works offline and in print.</div>
                </div>${field("IČ / Registration", "ico", s.ico)}${field("VAT / DIČ", "vatId", s.vatId)}${field("Street", "street", s.street)}${field("Postal code", "postal", s.postal)}${field("City", "city", s.city)}${field("Country", "country", s.country)}${field(
                  "Phone",
                  "phone",
                  s.phone,
                )}${field("E-mail", "email", s.email, { type: "email" })}${field("Default issuer", "issuer", s.issuer)}</div>
        </section>
        <section class="panel settings-block">
            <h2>Currency & tax defaults</h2>
            <p>Set the currency you use most often. Exchange rates are MANUAL example values until you verify them; never treated as live bank rates.</p>
            <div class="grid three">${selectField(
              "Default document currency",
              "defaultCurrency",
              s.defaultCurrency,
              [
                ["EUR", "EUR · Euro"],
                ["CZK", "CZK · Czech koruna"],
                ["USD", "USD · US dollar"],
                ["GBP", "GBP · Pound sterling"],
              ],
            )}${field("CZK for 1 EUR", "rate-EUR", s.rates.EUR, {
              type: "number",
              step: "0.0001",
              min: "0.0001",
            })}${field("CZK for 1 USD", "rate-USD", s.rates.USD, { type: "number", step: "0.0001", min: "0.0001" })}${field(
              "CZK for 1 GBP",
              "rate-GBP",
              s.rates.GBP,
              { type: "number", step: "0.0001", min: "0.0001" },
            )}${selectField("Default VAT %", "defaultVat", s.defaultVat, [
              [0, "0%"],
              [12, "12%"],
              [21, "21%"],
            ])}${selectField("Default payment", "payment", s.payment, [
              ["Bank transfer", "Bank transfer"],
              ["Cash", "Cash"],
              ["Card", "Card"],
              ["Other", "Other"],
            ])}
            </div>
        </section>
        <section class="panel settings-block">
            <h2>Issue slip layout & numbering</h2>
            <div class="grid three">${field("Document prefix", "prefix", s.prefix)}${field("Next sequence number", "nextNumber", s.nextNumber, { type: "number", min: 1 })}${field("Bank name (optional)", "bank", s.bank)}${field("IBAN (optional)", "iban", s.iban)}${field("BIC (optional)", "bic", s.bic)}${field("Footer caption", "footer", s.footer)}
                <div class="span3">${field("Default notes", "notes", s.notes, { type: "textarea" })}</div>
            </div><label class="inline-check" style="margin-top:15px"><input type="checkbox" data-setting-check="showCzkRecap" ${s.showCzkRecap ? "checked" : ""}> Show CZK VAT recap on A4</label></section>
        <div style="display:flex;justify-content:flex-end"><button class="btn primary" data-action="save-settings">Save settings</button></div>
        <section class="panel settings-block">
            <h2>Local memory & backup</h2>
            ${storageLocked ? '<div class="note">Stored records could not be read. The original data has been preserved. Export recovery data before restoring a backup or resetting.</div><button class="btn" data-action="export-recovery">↓ Export recovery data</button>' : ""}
            <p>Data is saved in this browser or Android WebView on this device. Clearing the app/browser storage can erase records, so export backups regularly.</p>
            <div class="toolbar"><button class="btn" data-action="export-backup">↓ Export JSON backup</button><button class="btn" data-action="import-backup">↑ Restore JSON backup</button><button class="btn" data-action="import-xml">↑ Import mPOHODA customers XML</button>
                <button class="btn danger" data-action="clear-data">Reset local data</button>
            </div>
            <p class="muted" style="margin-top:13px">${db.customers.length} customers · ${db.products.length} products · ${db.docs.length} issue slips · last save ${db.savedAt ? new Date(db.savedAt).toLocaleString("en-GB") : "—"}</p>
        </section>
    </div>`
    );
  }
  function showModal(title, body, onSave, wide = false) {
    ui.returnToPicker = ui.pickerOpen && title === "Add customer";
    ui.pickerOpen = false;
    document.body.classList.add("dialog-open");
    ui.modal = { title, onSave };
    document.getElementById("modal-root").innerHTML = `
    <div class="modal-cover" data-dismiss="true">
        <div class="modal ${wide ? " wide " : " "}" role="dialog" aria-modal="true" aria-label="${safe(title)}">
            <div class="modal-head">
                <h2>${safe(title)}</h2><button class="btn icon" data-action="close-modal">×</button></div>
            <form id="modal-form">
                <div class="modal-content">${body}</div>
                <div class="modal-foot"><button type="button" class="btn" data-action="close-modal">Cancel</button><button type="submit" class="btn primary">Save changes</button></div>
            </form>
        </div>
    </div>`;
  }
  function closeModal() {
    ui.modal = null;
    document.getElementById("modal-root").innerHTML = "";
    document.body.classList.remove("dialog-open");
    if (ui.returnToPicker) {
      ui.returnToPicker = false;
      if (ui.page === "editor" && !customer()) openCustomerPicker();
    }
  }
  function customerModal(c = null) {
    const edit = !!c;
    c = c || {
      id: uid(),
      name: "",
      vatId: "",
      registration: "",
      street: "",
      postal: "",
      city: "",
      country: "",
      email: "",
      phone: "",
      contact: "",
      currency: "",
      payment: "",
      shipToAddresses: [],
    };
    showModal(
      edit ? "Edit customer" : "Add customer",
      `
    <div class="grid">${modalInput("Company / customer name", "name", c.name, true)}${modalInput("VAT ID / DIČ", "vatId", c.vatId)}${modalInput("Company registration ID", "registration", c.registration)}${modalInput("Contact person", "contact", c.contact)}${modalInput(
      "Street",
      "street",
      c.street,
    )}${modalInput("Postal code", "postal", c.postal)}${modalInput("City", "city", c.city)}${modalInput("Country code", "country", c.country)}${modalInput("E-mail", "email", c.email)}${modalInput("Phone", "phone", c.phone)}${modalInput("Preferred currency", "currency", c.currency || "", false, "text", "EUR / CZK / USD / GBP")}</div>
    <div class="subhead">Delivery locations · ${(c.shipToAddresses || []).length}</div>
    <div class="address-card">${
      (c.shipToAddresses || [])
        .map(
          (s) => `
        <div style="margin-bottom:9px">${safe(s.name || "Location")}: ${safe(addr(s))}</div>`,
        )
        .join("") || "No alternative locations yet."
    }
        <p>After saving, use “Add delivery address” from the New Issue Slip customer step.</p>
    </div>`,
      (v) => {
        const existing = db.customers.findIndex((x) => x.id === c.id);
        const record = { ...c, ...v, name: v.name.trim() };
        if (!record.name) {
          toast("Customer name is required.");
          return false;
        }
        if (existing >= 0) db.customers[existing] = record;
        else db.customers.unshift(record);
        if (ui.page === "editor" && !edit) {
          current().customerId = record.id;
          current().shipId = "";
          current().shipManual = null;
        }
        rememberWork();
        render();
        savedToast("Customer saved.");
        return true;
      },
      true,
    );
  }
  function modalInput(
    label,
    name,
    value = "",
    required = false,
    type = "text",
    placeholder = "",
  ) {
    return `
    <div class="field"><label>${safe(label)}</label><input name="${safe(name)}" type="${type}" ${type === "number" ? 'step="any"' : ""} value="${safe(value)}" placeholder="${safe(placeholder)}" ${required ? "required" : ""}></div>`;
  }
  function addressModal(c = customer(), existing = null) {
    if (!c) {
      toast("Choose a customer first.");
      return;
    }
    const v0 = existing || {};
    showModal(
      (existing ? "Edit" : "Add") + " delivery location · " + c.name,
      `
    <div class="grid">${modalInput("Location name", "name", v0.name || "", true)}${modalInput("Street", "street", v0.street || "", true)}${modalInput("Postal code", "postal", v0.postal || "")}${modalInput("City", "city", v0.city || "", true)}${modalInput(
      "Country code",
      "country",
      v0.country || c.country || "",
    )}${modalInput("Contact", "contact", v0.contact || "")}</div>`,
      (v) => {
        if (!v.name || !v.street || !v.city) return false;
        const a = { id: existing?.id || uid(), ...v };
        c.shipToAddresses = c.shipToAddresses || [];
        const idx = c.shipToAddresses.findIndex((s) => s.id === a.id);
        if (idx >= 0) c.shipToAddresses[idx] = a;
        else c.shipToAddresses.push(a);
        current().shipId = a.id;
        rememberWork();
        render();
        savedToast("Delivery location saved.");
        return true;
      },
    );
  }
  function productModal(p = null) {
    const edit = !!p;
    p = p || {
      id: uid(),
      name: "",
      sku: "",
      categoryId: db.categories[0]?.id || "",
      vat: settings().defaultVat,
      unit: "pcs",
      active: true,
    };
    showModal(
      edit ? "Edit catalog product" : "Add catalog product",
      `
    <div class="grid">${modalInput("Product name", "name", p.name, true)}${modalInput("SKU", "sku", p.sku)}
        <div class="field"><label>Category</label><select name="categoryId">${db.categories.map((c) => `<option value="${safe(c.id)}" ${c.id === p.categoryId ? "selected" : ""}>${safe(c.name)}</option>`).join("")}</select></div>${modalInput(
          "Default VAT %",
          "vat",
          p.vat,
          false,
          "number",
        )}${modalInput("Unit", "unit", p.unit)}</div>`,
      (v) => {
        const record = {
          ...p,
          ...v,
          vat: num(v.vat, -1),
          active: true,
        };
        record.name = record.name.trim();
        if (!record.name) return false;
        if (record.vat < 0 || record.vat > 100 || v.vat.trim() === "") {
          toast("Enter a VAT percentage between 0 and 100.");
          return false;
        }
        const idx = db.products.findIndex((x) => x.id === p.id);
        if (idx >= 0) db.products[idx] = record;
        else db.products.push(record);
        persist();
        render();
        savedToast("Product saved.");
        return true;
      },
    );
  }
  function categoryModal(c = null) {
    const edit = !!c;
    c = c || { id: uid(), name: "" };
    showModal(
      edit ? "Edit category" : "New category",
      modalInput("Category name", "name", c.name, true),
      (v) => {
        if (!v.name.trim()) return false;
        const existing = db.categories.findIndex((x) => x.id === c.id);
        if (existing >= 0) db.categories[existing] = { ...c, ...v };
        else db.categories.push({ ...c, ...v });
        persist();
        render();
        savedToast("Category saved.");
        return true;
      },
    );
  }
  function ask(title, text, confirmLabel, cb) {
    document.body.classList.add("dialog-open");
    ui.modal = {};
    document.getElementById("modal-root").innerHTML = `
    <div class="modal-cover">
        <div class="modal" style="max-width:460px">
            <div class="modal-head">
                <h2>${safe(title)}</h2><button class="btn icon" data-action="close-modal">×</button></div>
            <div class="modal-content">
                <p>${safe(text)}</p>
            </div>
            <div class="modal-foot"><button class="btn" data-action="close-modal">Cancel</button><button class="btn danger" id="confirm-action">${safe(confirmLabel)}</button></div>
        </div>
    </div>`;
    document.getElementById("confirm-action").onclick = () => {
      closeModal();
      cb();
    };
  }
  function rememberWork() {
          db.workingDraft = clone(current());
          db.workspaceState = { page: ui.page, step: ui.step, editId: ui.editId };
          return persist();
        }
  function validateDoc(d, mode = "draft") {
          if (typeof d.number !== "string" || !d.number.trim()) return "Document number is required.";
          if (!d.issueDate || !/^\d{4}-\d{2}-\d{2}$/.test(d.issueDate)) return "Issue date is required.";
          if (mode === "open") {
            if (!d.customerId && !d.customerSnapshot) return "Select a customer first.";
            if (!d.items.length) return "Add at least one product.";
            if (!["EUR", "CZK", "USD", "GBP"].includes(d.currency)) return "Select a supported currency.";
            if (!BTData.numeric(d.exchange) || num(d.exchange) <= 0) return "Enter an exchange rate greater than zero.";
            for (const item of d.items) { const error = BTData.lineError(item); if (error) return error; }
            if (!Number.isSafeInteger(Math.round(totals(d).gross * 100))) return "The total is too large. Check item amounts.";
          }
          if (db.docs.some(x => x.number === d.number && x.id !== d.id)) return "This document number is already used.";
          return null;
        }
  function saveDoc(issued = false) {
    const d = clone(current());
    d.status = issued ? "open" : "draft";
    const err = validateDoc(d, issued ? "open" : "draft");
    if (err) {
      toast(err);
      return;
    }
    if (d.status === "open") {
      const c = db.customers.find((x) => x.id === d.customerId) || null;
      d.supplierSnapshot = clone(settings());
      d.customerSnapshot = c ? clone(c) : null;
      d.deliverySnapshot = selectedShip(c, d)
        ? clone(selectedShip(c, d))
        : c
          ? clone(c)
          : null;
      d.revision = (d.revision || 0) + 1;
    }
    const previousDocs = db.docs.slice(),
      previousNextNumber = settings().nextNumber;
    const idx = db.docs.findIndex((x) => x.id === d.id);
    d.savedAt = new Date().toISOString();
    if (idx >= 0) db.docs[idx] = d;
    else db.docs.unshift(d);
    if (d.number === nextNumber()) {
      settings().nextNumber++;
    }
    db.workingDraft = null;
    if (!persist()) {
      db.docs = previousDocs;
      settings().nextNumber = previousNextNumber;
      db.workingDraft = clone(current());
      return;
    }
    ui.editId = null;
    ui.draft = null;
    ui.page = "slips";
    ui.search = "";
    ui.step = 0;
    render();
    toast(issued ? "Issue slip saved and issued." : "Draft saved.");
  }
  function openDoc(id) {
    if (ui.draft?.id !== id && !canReplaceDraft()) return;
    const d = db.docs.find((x) => x.id === id);
    if (!d) return;
    ui.draft = clone(d);
    ui.editId = d.id;
    ui.step = 0;
    ui.page = "editor";
    rememberWork();
    render();
  }
  function startNew() {
    if (!canReplaceDraft()) return;
    ui.draft = newDraft();
    ui.editId = null;
    ui.step = 0;
    ui.page = "editor";
    ui.search = "";
    rememberWork();
    render();
  }
  function duplicateDoc(id) {
    if (!canReplaceDraft()) return;
    const d = db.docs.find((x) => x.id === id);
    if (!d) return;
    ui.draft = {
      ...clone(d),
      id: uid(),
      number: nextNumber(),
      status: "draft",
      issueDate: today(),
      savedAt: null,
      supplierSnapshot: null,
      customerSnapshot: null,
      deliverySnapshot: null,
      revision: 0,
    };
    ui.editId = null;
    ui.step = 0;
    ui.page = "editor";
    rememberWork();
    render();
    toast("Copy created. Check document number before saving.");
  }
  function stepTo(i) {
    if (i > ui.step) {
      if (ui.step === 0 && !current().customerId) {
        toast("Select a customer first.");
        return;
      }
      if (ui.step <= 1 && i >= 2 && current().items.length === 0) {
        toast("Add at least one product.");
        return;
      }
    }
    ui.step = Math.max(0, Math.min(3, i));
    rememberWork();
    render();
  }
  function syncSummary() {
    const d = current(),
      t = totals(d);
    const summaryTotal = document.getElementById("live-total");
    const summaryNumber = document.getElementById("sum-number");
    if (summaryNumber) summaryNumber.textContent = d.number;
    if (summaryTotal)
      summaryTotal.textContent = summaryLabel(d);
    document.getElementById("sum-vat") &&
      (document.getElementById("sum-vat").textContent = money(
        t.tax,
        d.currency,
      ));
    document.getElementById("sum-lines") &&
      (document.getElementById("sum-lines").textContent = d.items.length);
    document.querySelectorAll("[data-item-total]").forEach((el) => {
      const it = d.items.find((x) => x.id === el.dataset.itemTotal);
      if (it)
        el.textContent =
          it.price == null ? "—" : money(lineTotals(it).gross, d.currency);
    });
  }
  function download(filename, text, type = "application/json") {
  if (BTPlatform.native) { BTPlatform.saveText(filename, text).catch(error => toast(error.message)); return; }
  const url = URL.createObjectURL(new Blob([text], { type }));
  const link = document.createElement("a"); link.href = url; link.download = filename; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 15000);
}
  function importCustomersXml(xmlString) {
    const xml = new DOMParser().parseFromString(xmlString, "text/xml");
    if (xml.querySelector("parsererror")) throw Error("Invalid XML file");
    let count = 0,
      updated = 0,
      shipcount = 0;
    const nodes = [...xml.getElementsByTagNameNS("*", "addressbook")];
    const get = (node, name) =>
      node?.getElementsByTagNameNS("*", name)?.[0]?.textContent?.trim() || "";
    const direct = (node, name) =>
      [...(node?.children || [])].find((x) => x.localName === name) || null;
    for (const ab of nodes) {
      const header = direct(ab, "addressbookHeader");
      if (!header) continue;
      const identity = direct(header, "identity");
      const address = direct(identity, "address");
      if (!address) continue;
      const name = get(address, "company") || get(address, "name");
      if (!name) continue;
      const extId = get(direct(identity, "extId"), "ids");
      const rawShips = [...identity.children].filter(
        (x) => x.localName === "shipToAddress",
      );
      const shipToAddresses = rawShips.map((x) => ({
        id: get(x, "extId") || uid(),
        name: get(x, "name"),
        street: get(x, "street"),
        city: get(x, "city"),
        postal: get(x, "zip"),
        country: get(direct(x, "country"), "ids"),
        contact: "",
      }));
      const record = {
        id: extId ? "bp-" + extId : uid(),
        externalId: extId,
        name,
        street: get(address, "street"),
        city: get(address, "city"),
        postal: get(address, "zip"),
        country: get(direct(address, "country"), "ids"),
        vatId: get(address, "dic"),
        registration: get(address, "ico"),
        email: get(header, "email"),
        phone: get(header, "phone") || get(header, "mobil"),
        contact: "",
        currency: get(direct(header, "foreignCurrency"), "ids"),
        payment: get(direct(header, "paymentType"), "ids"),
        shipToAddresses,
      };
      const idx = db.customers.findIndex(
        (c) => (extId && c.externalId === extId) || c.id === record.id,
      );
      if (idx >= 0) {
        const old = db.customers[idx];
        db.customers[idx] = {
          ...old,
          ...record,
          shipToAddresses: shipToAddresses.length
            ? shipToAddresses
            : old.shipToAddresses || [],
        };
        updated++;
      } else {
        db.customers.push(record);
        count++;
      }
      shipcount += shipToAddresses.length;
    }
    persist();
    render();
    savedToast(`${count}
            customers added, ${updated} updated; ${shipcount} delivery addresses read.`);
  }
  function paperHtml(d) {
    const editingLive = d === ui.draft;
    const s = editingLive ? settings() : d.supplierSnapshot || settings(),
      c = editingLive
        ? db.customers.find((x) => x.id === d.customerId)
        : d.customerSnapshot || db.customers.find((x) => x.id === d.customerId),
      sh = editingLive
        ? selectedShip(c, d) || c
        : d.deliverySnapshot || selectedShip(c, d) || c,
      t = totals(d);
    const separateDelivery = !!(
      sh &&
      c &&
      (addr(sh) !== addr(c) || (sh.name && sh.name !== c.name))
    );
    const customerBlock = `<span>Customer / billing</span><strong>${safe(c?.name || "—")}</strong>${safe(c?.street || "")}<br>${safe(c?.postal || "")} ${safe(c?.city || "")}<br>${safe(
      c?.country || "",
    )}
            <div class="p-customer-ids">Identif. number: ${safe(c?.registration || "—")}<br>VAT ID: ${safe(c?.vatId || "—")}</div>${
              separateDelivery
                ? `
            <div class="p-delivery-separate"><span>Delivery address</span><strong>${safe(sh.name || c?.name || "—")}</strong>${safe(sh.street || "")}<br>${safe(sh.postal || "")} ${safe(sh.city || "")}<br>${safe(sh.country || "")}</div>`
                : ""
            }`;
    const pnum = (n) =>
      new Intl.NumberFormat("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(round(n));
    const rate = Math.max(0, num(d.exchange, 1));
    const rateLabel = rate
      ? `1 ${safe(d.currency)} = ${pnum(rate)} CZK`
      : "Not set";
    const orderline = [
      d.orderNo ? "Order No.: " + safe(d.orderNo) : "",
      d.orderDate ? "Order date: " + safe(dateFmt(d.orderDate)) : "",
    ]
      .filter(Boolean)
      .join("<br>");
    const rows = (d.items || [])
      .map((it) => {
        const { net, tax } = lineTotals(it);
        return `
            <tr>
                <td>${safe(it.name)}</td>
                <td>${safe(it.qty)}</td>
                <td>${it.price == null ? "—" : pnum(it.price)}</td>
                <td>${it.price == null ? "—" : pnum(net)}</td>
                <td>${safe(it.vat)}%</td>
                <td>${it.price == null ? "—" : pnum(tax)}</td>
                <td>${it.price == null ? "—" : pnum(net + tax)}</td>
            </tr>`;
      })
      .join("");
    const recapRates = [21, 12, 0, ...Object.keys(t.groups).map(Number)].filter(
      (n, i, arr) => arr.indexOf(n) === i,
    );
    const summary = recapRates
      .map((r) => {
        const z = t.groups[r] || { base: 0, tax: 0 };
        return `
            <tr>
                <td>${pnum(z.base * rate)}</td>
                <td>${r}%</td>
                <td>${pnum(z.tax * rate)}</td>
                <td>${pnum((z.base + z.tax) * rate)}</td>
            </tr>`;
      })
      .join("");
    return `
            <article class="paper">
                <div class="p-head"><span class="p-header-context">DOCUMENT / DELIVERY</span>
                    <div class="p-title">ISSUE SLIP No. ${safe(d.number)}</div>
                </div>
                <div class="p-grid">
                    <div class="supplier">
                        <div class="supplier-top"><img class="invoice-logo" src="${BRAND_LOGO}" alt="BT Souvenirs official logo">
                            <div><b>${safe(s.company)}</b><br>${safe(s.street)}<br>${safe(s.postal)} ${safe(s.city)}<br>${safe(s.country)}</div>
                        </div>
                        <div class="supplier-details">Identif. number: ${safe(s.ico)}<br>VAT ID: ${safe(s.vatId)}<br>Mobile phone: ${safe(s.phone)}<br>E-mail: ${safe(s.email)}</div>
                        <div class="p-ident"><span>Number of supply form</span><b class="p-value">${safe(d.number)}</b><span>Issued</span><b class="p-value">${safe(dateFmt(d.issueDate))}</b></div>
                    </div>
                    <div class="right-info">
                        <div class="order-info">
                            <div>${orderline || "Order No.:<br>Order date:"}</div>
                            <div></div>
                        </div>
                        <div class="customer-info">${customerBlock}</div>
                    </div>
                </div>
                <table class="lines">
                    <thead>
                        <tr>
                            <th>Delivery description</th>
                            <th>Qty</th>
                            <th>Unit price</th>
                            <th>Price</th>
                            <th>% VAT</th>
                            <th>VAT</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="p-source">
                            <td>${safe(d.warehouse || "Výdejka ze skladu")}</td>
                            <td colspan="6"></td>
                        </tr>${rows || `<tr><td colspan="7">No items</td></tr>`}</tbody>
                    <tfoot>
                        <tr>
                            <td><b>Total amount</b></td>
                            <td colspan="2"></td>
                            <td>${pnum(t.net)}</td>
                            <td></td>
                            <td>${pnum(t.tax)}</td>
                            <td>${pnum(t.gross)}</td>
                        </tr>
                    </tfoot>
                </table>
                <div class="big-total"><span>TOTAL DUE</span><span>Total due in ${safe(d.currency)} &nbsp; <strong style="font-size:14px">${pnum(t.gross)}</strong></span></div>
                <div class="p-issuer">Issuer: ${safe(d.issuer || s.issuer)}${d.reference ? `<br>Reference: ${safe(d.reference)}` : ""}${d.notes ? `<br>${safe(d.notes)}` : ""}</div>
                <div class="p-flex-space"></div><div class="p-footer">${
                  s.showCzkRecap
                    ? `
                <div class="recap"><strong>Recapitulation in CZK:</strong>
                    <table>
                        <thead>
                            <tr>
                                <th>Tax base in CZK</th>
                                <th>VAT</th>
                                <th>VAT in CZK</th>
                                <th>Total in CZK</th>
                            </tr>
                        </thead>
                        <tbody>${summary}</tbody>
                    </table>
                    <p>Foreign exchange rate used: ${rateLabel}</p>
                    <p>${safe(s.notes || "")}</p>
                </div>`
                    : ""
                }
                <div class="p-signatures"><span>Recipient: ______________________</span><span>Stamp: ______________________</span></div>
                <div class="p-last"><span>${safe(s.footer)}</span><span>${safe(d.number)}</span></div></div>
            </article>`;
  }
  let previewingDoc = null;
  function preview(doc = current()) {
  previewingDoc = doc;
  document.body.classList.add("preview-open");
  const problem = validateDoc(doc, "open");
  const layer = document.getElementById("print-layer"); layer.classList.remove("hide");
  layer.innerHTML = `<div class="modal wide" role="dialog" aria-modal="true" aria-label="A4 issue slip preview">
    <div class="modal-head"><h2>A4 preview · ISSUE SLIP ${safe(doc.number)}</h2><button class="btn icon" data-action="close-preview" aria-label="Close preview">×</button></div>
    ${problem ? `<div class="note preview-warning" style="margin:10px 20px">${safe(problem)}</div>` : ""}
    <div class="preview-frame"><div class="paper-wrapper">${paperHtml(doc)}</div></div>
    <div class="modal-foot"><button class="btn" data-action="close-preview">Close</button><button class="btn" data-action="save-pdf" ${problem ? "disabled" : ""}>Save PDF</button><button class="btn" data-action="share-pdf" ${problem ? "disabled" : ""}>Share PDF</button><button class="btn primary" data-action="print" ${problem ? "disabled" : ""}>Print</button></div></div>`;
  requestAnimationFrame(fitPreview);
}
  function closePreview() {
    previewingDoc = null; document.body.classList.remove("preview-open");
    document.getElementById("print-layer").classList.add("hide");
    document.getElementById("print-layer").innerHTML = "";
  }
  function saveSettings() {
    const s = settings();
    if (
      [...document.querySelectorAll("[data-field^=rate-]")].some(
        (x) => num(x.value) <= 0,
      )
    ) {
      toast("All exchange rates must be above zero.");
      return;
    }
    document.querySelectorAll("[data-field]").forEach((x) => {
      let k = x.dataset.field,
        v = x.value;
      if (k.startsWith("rate-")) {
        s.rates[k.slice(5)] = num(v);
      } else if (k === "defaultVat") {
        s[k] = num(v);
      } else if (k === "nextNumber") {
        s[k] = Math.max(1, Math.floor(num(v, 1)));
      } else s[k] = v;
    });
    s.rates.CZK = 1;
    s.showCzkRecap = !!document.querySelector(
      "[data-setting-check=showCzkRecap]",
    )?.checked;
    persist();
    render();
    savedToast("Settings saved. New issue slips use these defaults.");
  }
  function act(name, id, target) {
    switch (name) {
      case "new-doc":
        startNew();
        break;
      case "step":
        stepTo(num(target.dataset.index));
        break;
      case "next":
        stepTo(ui.step + 1);
        break;
      case "prev":
        stepTo(ui.step - 1);
        break;
      case "open-customer-picker":
        openCustomerPicker();
        break;
      case "preview-customer":
        ui.pickerSelectedId = id;
        updatePickerResults();
        break;
      case "confirm-picked-customer": {
        const c = db.customers.find((x) => x.id === ui.pickerSelectedId);
        if (!c) {
          toast("Choose a customer first.");
          break;
        }
        if (current().customerId !== c.id) {
          current().shipId = "";
          current().shipManual = null;
        }
        current().customerId = c.id;
        ui.search = "";
        closeCustomerPicker();
        rememberWork();
        render();
        break;
      }
      case "close-customer-picker":
        closeCustomerPicker();
        break;
      case "new-customer":
        customerModal();
        break;
      case "edit-customer":
        customerModal(db.customers.find((c) => c.id === id));
        break;
      case "new-address":
        addressModal();
        break;
      case "edit-address":
        addressModal(customer(), selectedShip());
        break;
      case "add-product": {
        const p = db.products.find((x) => x.id === id);
        if (!p) return;
        current().items.push({
          id: uid(),
          productId: p.id,
          name: p.name,
          qty: 1,
          price: null,
          vat: num(p.vat),
          unit: p.unit,
        });
        rememberWork();
        render();
        break;
      }
      case "custom-line":
        current().items.push({
          id: uid(),
          name: "Custom item",
          qty: 1,
          price: null,
          vat: num(settings().defaultVat),
          unit: "pcs",
        });
        rememberWork();
        render();
        break;
      case "remove-item":
        current().items = current().items.filter((x) => x.id !== id);
        rememberWork();
        render();
        break;
      case "show-preview":
        preview();
        break;
      case "close-preview":
        closePreview();
        break;
      case "print": outputDocument("print"); break;
case "save-pdf": outputDocument("pdf"); break;
case "share-pdf": outputDocument("share"); break;
case "share-doc": { const doc = db.docs.find(d=>d.id===id); if(doc) { preview(doc); outputDocument("share"); } break; }
case "save-draft":
        saveDoc(false);
        break;
      case "issue-doc":
        saveDoc(true);
        break;
      case "edit-doc":
        openDoc(id);
        break;
      case "print-doc": {
        const d = db.docs.find((x) => x.id === id);
        if (d) preview(d);
        break;
      }
      case "copy-doc":
        duplicateDoc(id);
        break;
      case "delete-doc":
        ask(
          "Delete this slip?",
          "The document will be removed from local memory.",
          "Delete",
          () => {
            db.docs = db.docs.filter((x) => x.id !== id);
            persist();
            render();
          },
        );
        break;
      case "new-product":
        productModal();
        break;
      case "edit-product":
        productModal(db.products.find((p) => p.id === id));
        break;
      case "new-category":
        categoryModal();
        break;
      case "edit-category":
        categoryModal(db.categories.find((c) => c.id === id));
        break;
      case "save-settings":
        saveSettings();
        break;
      case "close-modal":
        closeModal();
        break;
      case "export-backup":
        if (storageLocked) {
          download(`bt-souvenirs-recovery-${today()}.json`, recoveryRaw);
          break;
        }
        download(
          `bt-souvenirs-backup-${today()}.json`,
          JSON.stringify(db, null, 2),
        );
        break;
      case "export-customers": download(`bt-customers-${today()}.json`, BTCustomers.encode(db.customers)); break;
case "import-customers": if (BTPlatform.native) openNativeImport("customers"); else document.getElementById("customer-upload").click(); break;
case "import-backup":
        if (BTPlatform.native) openNativeImport("json"); else document.getElementById("backup-upload").click();
        break;
      case "export-recovery":
        if (recoveryRaw !== null)
          download(`bt-souvenirs-recovery-${today()}.json`, recoveryRaw);
        break;
      case "import-xml":
        if (BTPlatform.native) openNativeImport("xml"); else document.getElementById("xml-upload").click();
        break;
      case "clear-data":
        ask(
          "Reset all local data?",
          "This deletes issue slips and custom records from this device. Export a backup first.",
          "Reset everything",
          () => {
            if (replaceDatabase(initial())) { ui.page = "editor"; checkpoint(); render(); }
toast("Local database reset.");
          },
        );
        break;
    }
  }
  document.addEventListener("click", (e) => {
    const nav = e.target.closest("[data-page]");
    if (nav) {
      togglePage(nav.dataset.page);
      return;
    }
    const b = e.target.closest("[data-action]");
    if (b) {
      e.preventDefault();
      act(b.dataset.action, b.dataset.id, b);
      return;
    }
    if (e.target.matches(".modal-cover[data-dismiss=true]")) {
      if (ui.pickerOpen) closeCustomerPicker();
      else closeModal();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!document.getElementById("print-layer").classList.contains("hide"))
      closePreview();
    else if (ui.pickerOpen) closeCustomerPicker();
    else if (ui.modal) closeModal();
  });
  document.addEventListener("submit", (e) => {
    if (e.target.id !== "modal-form") return;
    e.preventDefault();
    const val = Object.fromEntries(new FormData(e.target).entries());
    if (ui.modal?.onSave?.(val) !== false) closeModal();
  });
  document.addEventListener("input", (e) => {
    const x = e.target;
    if (x.id === "picker-search") {
      ui.pickerSearch = x.value;
      updatePickerResults();
      return;
    }
    if (x.id === "customer-search" || x.id === "list-search") {
      ui.search = x.value;
      if (x.id === "customer-search") {
        const target = document.getElementById("customer-choices");
        if (target) target.innerHTML = customerChoices();
      } else if (ui.page === "slips") {
        const target = document.getElementById("slip-rows");
        if (target) target.innerHTML = docRows(matchingDocs());
      } else if (ui.page === "customers") {
        const target = document.getElementById("customer-rows");
        if (target)
          target.innerHTML = customerRows(
            db.customers.filter((c) =>
              [c.name, c.city, c.country, c.vatId]
                .join(" ")
                .toLowerCase()
                .includes(ui.search.toLowerCase()),
            ),
          );
      } else if (ui.page === "products") {
        const target = document.getElementById("product-rows");
        if (target) target.innerHTML = productRows(matchingProducts());
      }
      return;
    }
    if (x.id === "product-search") {
      ui.productSearch = x.value;
      document.getElementById("product-picker").innerHTML = productChoices();
      return;
    }
    if (x.dataset.item) {
      const it = current().items.find((it) => it.id === x.dataset.item);
      if (!it) return;
      const p = x.dataset.prop;
      it[p] = p === "name" ? x.value : x.value === "" ? null : num(x.value);
      syncSummary();
      rememberWork();
      return;
    }
    if (
      x.dataset.field &&
      ui.page === "editor" &&
      (x.tagName === "TEXTAREA" || x.tagName === "INPUT") &&
      x.dataset.field !== "productCategory"
    ) {
      current()[x.dataset.field] = x.value;
      if (x.dataset.field === "number") syncSummary();
      rememberWork();
    }
  });
  document.addEventListener("change", (e) => {
    const x = e.target;
    if (!x.dataset.field) return;
    let name = x.dataset.field,
      v = x.value;
    if (ui.page === "editor") {
      if (name === "productCategory") {
        ui.category = v;
        document.getElementById("product-picker").innerHTML = productChoices();
        return;
      }
      if (name === "currency") {
        changeDocCurrency(v);
        rememberWork();
        render();
        return;
      }
      if (name === "exchange") {
        v = x.value === "" ? "" : num(v);
      }
      if (name === "status" && v === "open" && !current().customerId) {
        toast("Select customer before issuing.");
        x.value = "draft";
        return;
      }
      current()[name] = v;
      rememberWork();
      if (["shipId", "customerId"].includes(name)) {
        render();
      } else if (name === "number") {
        syncSummary();
      }
    }
  });
function replaceDatabase(replacement) {
          const previous = db;
          const wasLocked = storageLocked;
          try {
            BTData.validateDatabase(replacement);
            localStorage.setItem(STORE + ".before-replace", wasLocked ? recoveryRaw || JSON.stringify(previous) : JSON.stringify(previous));
            db = stripCatalogPrices(clone(replacement));
            storageLocked = false;
            if (!persist()) { db = previous; storageLocked = wasLocked; return false; }
            ui.draft = clone(db.workingDraft || newDraft());
            ui.editId = db.docs.some(doc => doc.id === ui.draft.id) ? ui.draft.id : null;
            ui.page = "slips";
            ui.step = 0;
            document.getElementById("storage-warning")?.remove();
            return true;
          } catch (error) {
            db = previous;
            storageLocked = wasLocked;
            toast("Could not replace data: " + error.message + ". Export your records and retry.");
            return false;
          }
        }
        function importBackupText(text) {
          try {
            const data = BTData.validateDatabase(JSON.parse(text.replace(/^\uFEFF/, "")));
            ask("Restore backup?", "Current data will be replaced. A local recovery copy will be kept before restoring.", "Restore", () => {
              if (replaceDatabase(data)) { checkpoint(); render(); toast("Backup restored."); }
            });
          } catch (error) { toast("Could not restore: " + error.message); }
        }
        function importCustomerBook(text) {
          if (text.trim().startsWith("<")) { importCustomersXml(text); return; }
          try {
            if (storageLocked) throw Error("Restore the protected database before adding customers.");
            const incoming = BTCustomers.decode(text);
            const result = BTCustomers.merge(db.customers, incoming);
            ask("Import customer book?", `${result.added} new customers and ${result.updated} matching customers. Existing customers, delivery locations and issue slips will be kept.`, "Import customers", () => {
              const previous = db.customers;
              try { localStorage.setItem(STORE + ".customers-before-import", JSON.stringify(previous)); }
              catch (error) { toast("Could not preserve the previous customer book. Export it and retry."); return; }
              db.customers = result.customers;
              if (!persist()) { db.customers = previous; return; }
              ui.search = ""; render();
              toast(`${result.added} customers added, ${result.updated} updated. Customer book saved.`);
            });
          } catch (error) { toast("Could not import customers: " + error.message); }
        }
        async function openNativeImport(kind) {
          try {
            const result = await BTPlatform.openText(kind);
            if (result.cancelled) return;
            if (kind === "json") importBackupText(result.text);
            else if (kind === "xml") importCustomersXml(result.text);
            else importCustomerBook(result.text);
          } catch (error) { toast("Could not import: " + error.message); }
        }
        for (const [id, kind] of [["backup-upload", "json"], ["xml-upload", "xml"], ["customer-upload", "customers"]]) {
          document.getElementById(id).addEventListener("change", async event => {
            const file = event.target.files?.[0];
            if (!file) return;
            try {
              if (file.size > 16 * 1024 * 1024) throw Error("File exceeds 16 MB.");
              const text = await file.text();
              if (kind === "json") importBackupText(text);
              else if (kind === "xml") importCustomersXml(text);
              else importCustomerBook(text);
            } catch (error) { toast("Could not import: " + error.message); }
            event.target.value = "";
          });
        }
        const previewResizeObserver = new ResizeObserver(fitPreview);
previewResizeObserver.observe(document.getElementById("print-layer"));
window.addEventListener("resize", fitPreview);
window.BTApp = {
          checkpoint,
          handleBack() {
            if (!document.getElementById("print-layer").classList.contains("hide")) { closePreview(); return "handled"; }
            if (ui.pickerOpen) { closeCustomerPicker(); return "handled"; }
            if (ui.modal) {
              const form = document.getElementById("modal-form");
              const dirty = form && [...form.elements].some(element => element.value !== element.defaultValue && element.tagName === "INPUT");
              if (!dirty || window.confirm("Close this form without saving its changes?")) closeModal();
              return "handled";
            }
            if (ui.page !== "editor") { togglePage("editor"); return "handled"; }
            if (ui.step > 0) { stepTo(ui.step - 1); return "handled"; }
            return checkpoint() ? "exit" : "blocked";
          },
        };
        document.addEventListener("visibilitychange", () => { if (document.hidden) checkpoint(); });
        window.addEventListener("pagehide", checkpoint);
        document.addEventListener("focusin", event => {
          if (event.target.matches("input, textarea, select")) setTimeout(() => {
            if (document.activeElement === event.target) event.target.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
          }, 250);
        });
        window.addEventListener("bt-storage-error", event => {
          document.getElementById("storage-indicator").textContent = "● Local save · private copy failed";
          toast("Private recovery copy could not be updated: " + event.detail + ". Export a JSON backup.");
        });
        ui.draft = clone(db.workingDraft || newDraft());
        const workspace = db.workspaceState;
        if (workspace && ["editor", "slips", "customers", "products", "settings"].includes(workspace.page)) {
          ui.page = workspace.page;
          ui.step = Math.max(0, Math.min(3, Number(workspace.step) || 0));
          ui.editId = db.docs.some(doc => doc.id === ui.draft.id) ? ui.draft.id : null;
        }
        render();
        if (storageLocked || BTPlatform.startupError) {
          const warning = document.createElement("div");
          warning.id = "storage-warning";
          warning.className = "storage-warning";
          warning.innerHTML = `<p>${safe(startupNote || BTPlatform.startupError)}</p>`;
          if (storageLocked) {
            const exportButton = document.createElement("button");
            exportButton.className = "btn";
            exportButton.textContent = "Export recovery file";
            exportButton.onclick = () => download(`bt-recovery-${today()}.json`, recoveryRaw || "{}");
            warning.append(exportButton);
            const restore = document.createElement("button");
            restore.className = "btn";
            restore.textContent = "Restore JSON backup";
            restore.onclick = () => BTPlatform.native ? openNativeImport("json") : document.getElementById("backup-upload").click();
            warning.append(restore);
            if (BTPlatform.snapshot) {
              const recover = document.createElement("button");
              recover.className = "btn";
              recover.textContent = "Recover private copy";
              recover.onclick = () => importBackupText(BTPlatform.snapshot);
              warning.append(recover);
            }
          }
          document.querySelector(".main").prepend(warning);
        } else if (startupNote) toast(startupNote);
        if (!storageOk) document.getElementById("storage-indicator").textContent = "● Records protected · recovery required";
});
