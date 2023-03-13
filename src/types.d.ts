import { Category, Material, Tag, User } from "@prisma/client";
import { IconPlus } from "@tabler/icons";
import { Dispatch, HTMLAttributes, SetStateAction } from "react";

export type TROLES = "teacher" | "student" | "admin";

export type TCATAGORIES =
  | "artificial_intelligence"
  | "data_science"
  | "cloud_computing"
  | "high_performance_computing"
  | "distributed_systems"
  | "security_and_privacy"
  | "software_engineering"
  | "human_computer_interaction"
  | "game_development"
  | "virtual_reality";

interface IButton extends HTMLAttributes<HTMLButtonElement> {
  handleSubmit?: any;
  size?: "sm" | "lg" | "md";
  radius?: "sm" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  outlined?: boolean;
  children: React.ReactNode;
  loading?: boolean;
  Icon?: typeof IconPlus;
}
interface IUser {
  approved: boolean;
  createdAt: string;
  email: string;
  image: string;
  name: string;
  reg: string;
  role: TROLES;
  id: string;
  __v: number;
}
interface IResearchCard {
  imgUrl: string;
  title: string;
  subtitle: string;
  index: number;
}
interface ITopicCard {
  id: string;
  imgUrl: string;
  title: string;
  index: number;
  active: string;
  handleClick: Dispatch<SetStateAction<string>>;
}
interface IEditInfo {
  name: string;
  reg: string;
  email: string;
  role: TROLES;
  approved: string;
}

export interface IMaterial {
  uploadedBy: string;
  id: string;
  title: string;
  abstract: string;
  markdownString: string;
  supervisorId: string[];
  dateStarted?: any;
  dateFinished?: any;
  tags: Tag[];
  categories: Category[];
  status: string;
  links: Link[];
  files: Link[];
  authorId: string[];
  authors: User[];
  supervisors: User[];
}

export interface Link {
  label: string;
  url: string;
}

export {
  IButton,
  IUser,
  TROLES,
  ITopicCard,
  IResearchCard,
  IEditInfo,
  IMaterial,
};

export interface IUserWithMaterials extends User {
  authorMaterials: IMaterial[];
  supervisorMaterials: IMaterial[];
}

export interface ILink {
  label: string;
  url: string;
}

export interface IUserFormValues {
  name: string;
  email: string;
  bio: string;
  secondaryEmail: string;
  contactNumber: string;
  links: ILink[];
  researchInterestIds: string[];
}

export interface Student {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  contactNumber: string | null;
  reg: string | null;
}

export type IMaterialWithCategories = Material & {
  categories: Category[];
};
