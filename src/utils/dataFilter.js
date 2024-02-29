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

export const dummy = () => {};
