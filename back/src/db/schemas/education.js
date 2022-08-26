import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    // User 식별 id - userSeq
    userId: {
      type: Number,
      required: true,
    },
    // 학교명
    school: {
      type: String,
      required: true,
    },
    // 전공
    major: {
      type: String,
      required: true,
    },
    // 졸업상태
    status: {
      type: String,
      enum: ['학사졸업', '석사졸업', '박사졸업', '재학중'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };
