import { CATEGORY_COLUMNS, TAG_COLUMNS } from "@components/columns";
import { Material_COLUMNS } from "@components/materials/MaterialAccept/column";
import { STUDENT_COLUMNS, TEACHER_COLUMNS } from "@components/tables/columns";
import dayjs from "dayjs";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import moment from "moment";
import { ROLES } from "src/constants";
import { storage } from "./firebase";

export function uploadFileCallBack(file: any) {
  return new Promise((resolve, reject) => {
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot: any) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error: any) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url: any) => {
          console.log(url);
          resolve({ data: { link: url } });
        });
      }
    );
  });
}

export const dateFormatter = (date: Date) => {
  const dateObj = new Date(date);
  return dayjs(dateObj).format("MMMM D, YYYY");
};

export const Capitalizer = (name: string) =>
  name
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");

export const timeAgo = (time: string) => moment(time).fromNow();

export const timeFormatter = (time: string) =>
  moment(time).format("MMMM Do YYYY, h:mm");

const KEYS = {
  STUDENT: "student",
  TEACHER: "teacher",
  ADMIN: "admin",
  MATERIAL: "materials",
  CATEGORY: "categories",
  TAG: "tags",
};
type TKEYS =
  | "student"
  | "teacher"
  | "admin"
  | "materials"
  | "categories"
  | "tags";
export const findColumn = (kye: TKEYS) => {
  switch (kye) {
    case KEYS.STUDENT:
      return STUDENT_COLUMNS;
    case KEYS.TEACHER:
      return TEACHER_COLUMNS;
    case KEYS.MATERIAL:
      return Material_COLUMNS;
    case KEYS.CATEGORY:
      return CATEGORY_COLUMNS;
    case KEYS.TAG:
      return TAG_COLUMNS;
    default:
      return null;
  }
};

export const transformer = (data: any) =>
  data.map((data: any) => ({
    ...data,
    label: data.name,
    value: data.id,
  }));

export const isAdmin = (role: string) => role === ROLES.ADMIN;
