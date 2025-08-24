import { IconType } from "react-icons";

import {
  HiOutlineRocketLaunch,
} from "react-icons/hi2";

import {
  FaDocker,
  FaBook,
  FaGithub,
  FaTools,
  FaPython,
  FaReact,
  FaRust,
} from "react-icons/fa";

import {
  GoServer
} from "react-icons/go";

import { GiTrafficLightsReadyToGo } from "react-icons/gi";

import { TbSdk } from "react-icons/tb";
import { GrUserAdmin } from "react-icons/gr";
import { FaGolang } from "react-icons/fa6";
import { SiTypescript } from "react-icons/si";


export const iconLibrary: Record<string, IconType> = {
  rocket: HiOutlineRocketLaunch,
  docker: FaDocker,
  server: GoServer,
  book: FaBook,
  github: FaGithub,
  tools: FaTools,
  ready: GiTrafficLightsReadyToGo,
  sdk: TbSdk,
  admin: GrUserAdmin,
  go: FaGolang,
  python: FaPython,
  typescript: SiTypescript,
  react: FaReact,
  rust: FaRust,
};



export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;