export function hasRole(role) {
  return this.roles.includes(role);
}

export function getMainRole(user) {
  const userHasRole = hasRole.bind(user);
  if (userHasRole("super-admin")) return "super-admin";
  if (userHasRole("admin")) return "admin";
  if (userHasRole("manager")) return "manager";
  if (userHasRole("contributor")) return "contributor";
}

export const groupByState = (array) => {
  const sortOrder = {
    live: 1,
    scheduled: 2,
    ended: 3,
    canceled: 4,
  };

  const groups = array.reduce((acc, curr) => {
    const key = curr.state;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(curr);

    return acc;
  }, {});

  return Object.entries(groups)

    .sort((a, b) => sortOrder[a[0]] - sortOrder[b[0]])
    .map(([key, data]) => ({
      key,
      data: data.sort((a, b) => {
        return key === "scheduled"
          ? new Date(a.scheduled_start) - new Date(b.scheduled_start)
          : new Date(b.scheduled_start) - new Date(a.scheduled_start);
      }),
    }));
};
export const roundToThousand = (num) => {
  let rounded = Math.round(num / 1000) * 1000;
  return `${rounded / 1000}k`;
};

export const convertDate = (dateStr) => {
  let date = new Date(dateStr);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return (
    strTime +
    ", " +
    date.toLocaleString("default", { month: "long" }) +
    " " +
    date.getDate() +
    ", " +
    date.getFullYear()
  );
};
