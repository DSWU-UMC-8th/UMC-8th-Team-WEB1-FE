import { StudyPeriod } from "../enums/StudyPeriod";

export interface ReviewLectureInfo {
  name: string;
  instructorName: string;
  platformId: number | null;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  category: "IT" | "DESIGN" | "BUSINESS" | "ETC";
}

export interface ReviewRequest {
  lectureId: number | null;
  lecture: ReviewLectureInfo;
  platformIds: (number | null)[];
  rating: number;
  content: string;
  studyPeriod: StudyPeriod;
}
