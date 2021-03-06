import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { Link, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Document from "./document";
import Course from "./course";
import Teacher from "./teacher";
import TeacherProfile from "./teacher_profile";
import MyProfile from "./my_profile";
import Home from "./home";
import Article from "./article";
import EditProfile from "./edit_profile";
import ForgotPassword from "./forgot_password";
import ResultSearch from "./result_search";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../reducers/profile";
import DocumentDetail from "./document_detail";
import CourseDetail from "./course_detail";
import CourseDetailList from "./course_detail_list";
import DocumentUpload from "./document_upload";
import * as CONFIG from "../../config/configUrl";
import { userLogout } from "../../actions/profile";
import { useTranslation } from "react-i18next";
import RegisterCourse from "./register_course";
import Test from "./test";
import DocumentSave from "./document_save";
import EditPost from "./edit_post";
import PostsDetails from "./posts_details";
import LuanVan from "./luanvan";
import TaiLieuLinhVuc from "./TaiLieuLinhVuc";
//-----------------------------------------------------------------

function User() {
  const [show, setShow] = useState(false);
  const { t, i18n } = useTranslation();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const profile = useSelector((state) => getUserInfo(state));
  const dispatch = useDispatch();
  let isAdmin = false;
  profile?.role?.map(e=>{
    if(e.groupname === 'ADMIN') isAdmin = true;
  });

  const handleProfile = () => {
    setShow(!show);
  };

  const close = () => {
    setShow(!show);
  };

  const logout = async () => {
    dispatch(await userLogout());
    navigate("/login");
  };

  const search = (data) => {
    if (data.search) navigate(`/app/search/${data.search}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center py-5 px-6 bg-[#2554A6] text-white">
        <Link to="/">
          <p className="block w-[15%] text-[30px] font-bold">CIT</p>
        </Link>
        <form
          className="flex justify-center w-[70%]"
          onSubmit={handleSubmit((data) => search(data))}
        >
          <input
            className="py-2 px-4 w-[80%] rounded-l-md text-black outline-none"
            type="text"
            name="search"
            {...register("search")}
          />
          <button className="px-4 py-2 bg-white rounded-r-md border border-r">
            <BiSearch size={20} color="#000" />
          </button>
        </form>
        <div className="flex gap-4 justify-end items-center w-[15%]">
          <p>{profile?.ho_ten}</p>
          <div className="relative">
            {!!profile.avatar?.path_name && (
              <img
                className="w-10 cursor-pointer cu h-10 rounded-full"
                onClick={handleProfile}
                src={
                  CONFIG.API_BASE_URL + "/avatar/" + profile.avatar.path_name
                }
                alt="Rounded avatar"
              />
            )}
            {!profile.avatar?.path_name && (
              <FaUserCircle
                className="cursor-pointer"
                size={35}
                onClick={handleProfile}
              />
            )}
            {show === true ? (
              <div className="absolute -right-3 w-[200px] text-center top-[60px] p-3 bg-white rounded-md after:content-['*'] after:w-[25px] after:h-[25px] after:absolute after:top-[-12px] after:right-[10px] after:bg-white after:rotate-45 z-[100]">
                {isAdmin && <Link to={"/admin/accounts"}>
                  <p
                    onClick={() => close()}
                    className="px-4 py-2 my-2 bg-[#2554A6] rounded-md cursor-pointer hover:opacity-80 duration-300"
                  >
                    {/* {t("header.profile")} */}
                    Admin
                  </p>
                </Link>}
                <Link to={"/app/user/" + profile?.maso}>
                  <p
                    onClick={() => close()}
                    className="px-4 py-2 my-2 bg-[#2554A6] rounded-md cursor-pointer hover:opacity-80 duration-300"
                  >
                    {t("header.profile")}
                  </p>
                </Link>
                <p
                  onClick={() => i18n.changeLanguage("en")}
                  className="px-4 py-2 my-2 bg-[#2554A6] rounded-md cursor-pointer hover:opacity-80 duration-300"
                >
                  {t("header.en")}
                </p>
                <p
                  onClick={() => i18n.changeLanguage("vi")}
                  className="px-4 py-2 my-2 bg-[#2554A6] rounded-md cursor-pointer hover:opacity-80 duration-300"
                >
                  {t("header.vi")}
                </p>
                <p
                  onClick={() => logout()}
                  className="px-4 py-2 my-2 bg-[#2554A6] rounded-md cursor-pointer hover:opacity-80 duration-300"
                >
                  {t("header.logout")}
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <div className="flex mt-4">
        <div className="w-[20%] p-5">
          <div className="bg-[#47568A] p-4 rounded-md text-center">
            <Link to="/">
              <p className="block my-4 mx-auto py-2 px-4 w-[90%] rounded-md bg-white cursor-pointer">
                {t("sidebar.suggest")}
              </p>
            </Link>
            <Link to="/app/course">
              <p className="block my-4 mx-auto py-2 px-4 w-[90%] rounded-md bg-white cursor-pointer">
                {t("sidebar.courses")}
              </p>
            </Link>
            <Link to="/app/teacher">
              <p className="block my-4 mx-auto py-2 px-4 w-[90%] rounded-md bg-white cursor-pointer">
                {t("sidebar.lectures")}
              </p>
            </Link>
            <Link to="/app/document">
              <p className="block my-4 mx-auto py-2 px-4 w-[90%] rounded-md bg-white cursor-pointer">
                {t("sidebar.my_doc")}
              </p>
            </Link>
            <Link to="/app/article">
              <p className="block my-4 mx-auto py-2 px-4 w-[90%] rounded-md bg-white cursor-pointer">
                {t("sidebar.paper")}
              </p>
            </Link>
            <Link to="/app/luanvan">
              <p className="block my-4 mx-auto py-2 px-4 w-[90%] rounded-md bg-white cursor-pointer">
                {t("sidebar.dissertation")}
              </p>
            </Link>
            <Link to="/app/lich-thuc-hanh">
              <p className="block my-4 mx-auto py-2 px-4 w-[90%] rounded-md bg-white cursor-pointer">
                {t("sidebar.schedule")}
              </p>
            </Link>
          </div>
        </div>
        <div className="w-[80%] p-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/save"
              element={<Navigate to="/app/document/save" />}
            />
            <Route path="/document/*" element={<Document />} />
            <Route path="/document/detail/:id" element={<DocumentDetail />} />
            <Route path="/document/upload" element={<DocumentUpload />} />
            <Route path="/document/save" element={<DocumentSave />} />
            <Route path="/tailieu/linhvuc/:id" element={<TaiLieuLinhVuc />} />
            <Route path="/article" element={<Article />} />
            <Route path="/luanvan" element={<LuanVan />} />
            <Route path="/course" element={<Course />} />
            <Route
              path="/course/register-course/:id"
              element={<RegisterCourse />}
            />
            <Route path="/course/detail/:id" element={<CourseDetailList />} />
            <Route
              path="/course/detail/:id/posts_detail=:idbv"
              element={<PostsDetails />}
            />
            <Route
              path="/course/detail/:id/post=:params"
              element={<EditPost />}
            />
            <Route
              path="/course/detail=:id1/subject=:id2"
              element={<CourseDetail />}
            />
            <Route path="/teacher/*" element={<Teacher />} />
            <Route
              path="/teacher/teacher_profile"
              element={<TeacherProfile />}
            />
            <Route path="/user/:id" element={<MyProfile />} />
            <Route path="/edit_profile/:user" element={<EditProfile />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/search/:keyword" element={<ResultSearch />} />
            <Route
              path="/lich-thuc-hanh"
              element={
                <iframe
                  title="L???ch th???c h??nh"
                  src="https://docs.google.com/spreadsheets/d/e/2PACX-1vR7otGf88SBVjmeKnug0-dVA1zi3XtNgohAWNNdKMm0sPEcbJQ_7EsicY8p2mRJwA/pubhtml"
                  width="1200"
                  height="580"
                  frameBorder="0"
                />
              }
            />
            {/* TEST */}
            <Route path="/test" element={<Test />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default User;
