import { IconType } from "react-icons";

import {
  HiOutlineRocketLaunch,
} from "react-icons/hi2";

import {
  FaDocker,
  FaBook,
  FaGithub,
  FaTools,
} from "react-icons/fa";

import {
  GoServer
} from "react-icons/go";


export const iconLibrary: Record<string, IconType> = {
  rocket: HiOutlineRocketLaunch,
  docker: FaDocker,
  server: GoServer,
  book: FaBook,
  github: FaGithub,
  tools: FaTools,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;