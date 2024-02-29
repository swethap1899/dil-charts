import { countryISO } from "../data/countryISO";

export const dataFilterFunction = (data, prop) => {
  const filtered = data?.reduce((group, value) => {
    const propGroup = group[value[prop]] ?? [];
    const updatedGroup = {
      ...group,
      [value[prop]]: [...propGroup, value],
    };

    return updatedGroup;
  }, {});
  return filtered;
};

export const modifyData = (data) => {
  return data.map((ele) => {
    const { country, birth, orderDate } = ele;

    const age = new Date().getFullYear() - new Date(birth).getFullYear();

    const d = new Date(orderDate).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    console.log("check: ", d);

    return {
      ...ele,
      age,
      orderDate: d,
      countryCode: country,
      country:
        country && countryISO[country] ? countryISO[country].name : "Others",
    };
  });
};
