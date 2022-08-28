import { useState } from "react";
import { curUserState, EduStatus, IEducation } from "../../atoms";
import { useForm } from "react-hook-form";
import EducationEditForm from "./EducationEditForm";
import EducationAddForm from "./EducationAddForm";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
    MvpContainer,
    MvpTitle,
    MvpTitleBox,
    MvpContentContainer,
    MvpContentBox,
    MvpContentName,
    MvpContentDetail,
    MvpEditButton,
    MvpAddButton,
    MvpDeleteButton,
    MvpContentAccent,
} from "../user/MyPortfolio";
import { PlusSquareFill } from "styled-icons/bootstrap";
import { Pencil } from "styled-icons/boxicons-solid";
import { Trash2 } from "styled-icons/feather";
import { deleteEducation } from "../../api/api";
export default function Education({ info }: any) {
    // user ID
    const { userId } = useParams();
    // 현재 로그인 유저
    const curUser = useRecoilValue(curUserState);
    // 학력 상태
    const [educations, setEducations] = useState<IEducation[]>(info); // 더미educations 초기값

    // form 관리
    const [isAddFormActive, setIsAddFormActive] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // edit버튼 눌러서 editform 활성화
    const [targetIndex, setTargetIndex] = useState<Number>(); // index 를 체크해서 맞는 것만 editform 활성화
    const onClickDeleteBtn = (education: IEducation, index: number) => {
        const userId = parseInt(education.userId!);
        const educationId = education.eduId!;
        deleteEducation(educationId, userId);
        setEducations((prev) => {
            const newEducations = [...prev];
            newEducations.splice(index, 1);
            return newEducations;
        });
    };
    const location = useLocation();
    const pathName = location.pathname;
    function handleAdding() {
        setIsAddFormActive((current) => !current);
    }
    return (
        <MvpContainer>
            <MvpTitleBox>
                <MvpTitle>학력</MvpTitle>
            </MvpTitleBox>
            <MvpContentContainer>
                {isAddFormActive && (
                    <EducationAddForm
                        educations={educations}
                        setIsAddFormActive={setIsAddFormActive}
                        setEducations={setEducations}
                        userId={curUser?.userId!}
                    />
                )}
                {!isAddFormActive &&
                    educations?.map((education, index) => (
                        <MvpContentBox key={index}>
                            {targetIndex !== index && (
                                <>
                                    <MvpContentAccent>{education.school}</MvpContentAccent>
                                    <div style={{ display: "flex" }}>
                                        <MvpContentDetail style={{ marginRight: "10px" }}>
                                            {education.major}
                                        </MvpContentDetail>
                                        <MvpContentDetail>({education.status})</MvpContentDetail>
                                    </div>
                                    {curUser && pathName === "/mypage" && targetIndex !== index && (
                                        <>
                                            <MvpEditButton
                                                onClick={() => {
                                                    setIsEditing(true);
                                                    setTargetIndex(index);
                                                }}
                                            >
                                                <Pencil color="#3867FF" />
                                            </MvpEditButton>
                                            <MvpDeleteButton
                                                onClick={() => {
                                                    onClickDeleteBtn(education, index);
                                                }}
                                            >
                                                <Trash2 color="#3867FF" />
                                            </MvpDeleteButton>
                                        </>
                                    )}
                                </>
                            )}
                            {isEditing && targetIndex == index && (
                                <EducationEditForm
                                    index={index}
                                    educations={educations}
                                    setEducations={setEducations}
                                    setIsEditing={setIsEditing}
                                    userId={education.userId}
                                    eduId={education.eduId}
                                    setTargetIndex={setTargetIndex}
                                />
                            )}
                        </MvpContentBox>
                    ))}
            </MvpContentContainer>
            {curUser && pathName === "/mypage" && !isAddFormActive && (
                <button onClick={handleAdding}>
                    <MvpAddButton>
                        <PlusSquareFill color="#3687FF" />
                    </MvpAddButton>
                </button>
            )}
        </MvpContainer>
    );
}
