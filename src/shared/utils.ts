export const formatVideoTime = (time: number) => {
  const date = new Date(0);
  date.setSeconds(time);
  const timeString = date.toISOString().substr(11, 8);
  return timeString;
};

export const isMobile = () =>
  /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);

export const htmlToText = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent as string;
};

export const calculateCreatedTime = (timeCreated: number) => {
  let periods = {
    year: 365 * 30 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
  };
  let diff = Date.now() - timeCreated;

  for (const key in periods) {
    if (diff >= periods[key]) {
      let result = Math.floor(diff / periods[key]);
      return `${result} ${result === 1 ? key : key + "s"} ago`;
    }
  }

  return "Just now";
};

import { format, formatRelative } from "date-fns";
import dayjs from "dayjs";
// @ts-ignore
import kebabCase from "lodash.kebabcase";

export const formatFileName = (name: string) => {
  const splitted = name.split(".");

  const extension = splitted.slice(-1)[0];
  const baseName = splitted.slice(0, -1).join(".");

  return `${Date.now()}-${kebabCase(
    baseName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
  )}.${extension}`;
};

export const formatFileSize = (size: number) => {
  let i = Math.floor(Math.log(size) / Math.log(1024));

  return `${(size / Math.pow(1024, i)).toFixed(1)} ${
    ["B", "KB", "MB", "GB", "TB"][i]
  }`;
};

export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const formatter = dayjs(date);
  const now = new Date();

  if (dayjs().isSame(formatter, "date")) return formatter.format("h:mm A");

  if (dayjs().isSame(formatter, "week")) return formatter.format("ddd h:mm A");

  if (now.getFullYear() === date.getFullYear())
    return formatter.format("MMM DD h:mm A");

  return formatter.format("DD MMM YYYY h:mm A");
};

export const splitLinkFromMessage = (message: string) => {
  const URL_REGEX =
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gm;

  const result = message.split(" ").reduce((acc, item) => {
    const isURL = URL_REGEX.test(item);
    if (isURL) acc.push({ link: item });
    else {
      if (typeof acc.slice(-1)[0] === "string") {
        acc = [...acc.slice(0, -1), `${acc.slice(-1)[0]} ${item}`];
      } else {
        acc.push(item);
      }
    }

    return acc;
  }, [] as ({ link: string } | string)[]);

  return result;
};

export const formatDateFirebase = (date) => {
    return format(date, "PPP")
}