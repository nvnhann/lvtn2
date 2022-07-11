import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as $http from "../../utils/httpProvider";
import * as CONFIG from "../../config/configUrl";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../reducers/profile";
import { useTranslation } from "react-i18next";

function RegisterCourse() {
  const [data, setData] = useState([]);

  const user = useSelector((state) => getUserInfo(state));
  const navigate = useNavigate();
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  console.log(id);
  useEffect(() => {
    (async () => {
      const res = await $http.getData(
        CONFIG.API_BASE_URL + "/course/detail/" + id
      );
      let isMember = false;
      if (res.data?.kh.maso === user.maso) isMember = true;
      res.data?.member.map((e) => {
        if (e.maso === user.maso) {
          isMember = true;
        }
      });
      if (isMember) navigate("/app/course/detail/" + res.data?.kh.idkh);
      setData(res.data);
    })();
  }, []);
  console.log(data);
  const addKH = async (id, idkh) => {
    try {
      await $http.postData(CONFIG.API_BASE_URL + "/course/add", {
        id: id,
        idkh: idkh,
      });
      navigate("/app/course/detail/" + idkh);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex justify-center items-center mx-auto h-[400px] bg-white rounded-md p-2">
      <div className="text-center leading-10">
        <p className="text-[30px] font-bold">
          {t("title.course")}: {data?.kh?.ma_khoa_hoc} -{" "}
          {data?.kh?.ten_khoa_hoc}
        </p>
        <p>
          {t("title.lecturer")}:{" "}
          <span className="font-bold">{data?.kh?.ho_ten}</span>
        </p>
        <button
          onClick={() => addKH(user.id, id)}
          className="mt-4 py-2 px-4 bg-[#2554A6] text-white rounded-md font-medium shadow-md hover:opacity-90 duration-300"
        >
          {t("button.registered_course")}
        </button>
      </div>
    </div>
  );
}

export default RegisterCourse;
