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
  FaLaptopCode,
  FaAws,
} from "react-icons/fa";

import {
  GoServer,
  GoZap,
} from "react-icons/go";

import { GiTrafficLightsReadyToGo } from "react-icons/gi";

import { TbSdk } from "react-icons/tb";
import { GrUserAdmin } from "react-icons/gr";
import { FaGolang, FaShieldHalved } from "react-icons/fa6";
import { SiTypescript } from "react-icons/si";
import { IoLayers } from "react-icons/io5";
import { FcDeployment } from "react-icons/fc";
import { TbApi } from "react-icons/tb";
import { DiGoogleCloudPlatform } from "react-icons/di";
import { VscAzure } from "react-icons/vsc";
import { GrDeploy } from "react-icons/gr";
import { FaReddit } from "react-icons/fa";



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
  shield: FaShieldHalved,
  code: FaLaptopCode,
  zap: GoZap,
  layers: IoLayers,
  deployment: FcDeployment,
  api: TbApi,
  gcp: DiGoogleCloudPlatform,
  aws: FaAws,
  azure: VscAzure,
  deploy: GrDeploy,
  reddit: FaReddit,
};



export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;