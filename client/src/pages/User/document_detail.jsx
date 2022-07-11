import React, { useEffect, useState } from "react";
import * as $http from "../../utils/httpProvider";
import * as CONFIG from "../../config/configUrl";
import { Link, useParams } from "react-router-dom";
import Code from "./Code";
import { MdDelete, MdOutlineDataSaverOn } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../reducers/profile";
import { checkTL } from "../../utils/checkTaiLieu";
import { useTranslation } from "react-i18next";

import {
  fnSaveTaiLieu,
  fnUnSaveTaiLieu,
} from "../../actions/profile/profileAction";
import { AiOutlineDisconnect } from "react-icons/ai";

function DocumentDetail() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [raw, setRaw] = useState(null);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState();
  const user = useSelector((state) => getUserInfo(state));
  const dispatch = useDispatch();

  function trimFile(file) {
    if (!file) return;
    let trim = file.split(".");
    let lg = trim[trim.length - 1];
    setLanguage(lg);
    return lg;
  }

  useEffect(() => {
    (async () => {
      const res = await $http.getData(CONFIG.API_BASE_URL + "/tailieu/" + id);
      setData(res.data);
      console.log(res.data);
      if (
        trimFile(res?.data?.path) !== "pdf" &&
        trimFile(res?.data?.path) !== "docs" &&
        trimFile(res?.data?.path) !== "xlsx" &&
        trimFile(res?.data?.path) !== "doc" &&
        trimFile(res?.data?.path) !== "pptx" &&
        trimFile(res?.data?.path) !== "png" &&
        trimFile(res?.data?.path) !== "jpg" &&
        trimFile(res?.data?.path) !== "jpeg" &&
        trimFile(res?.data?.path) !== "csv"
      ) {
        const ct = await $http.getData(
          CONFIG.API_BASE_URL + "/tailieu/file/" + res.data?.path
        );
        setRaw(ct.data);
      }
    })();
  }, []);

  return (
    <div>
      <div>
        <span className="text-base font-bold">
          {t("title.document_name")}:{" "}
        </span>{" "}
        <span>{data?.name}</span>
      </div>
      <div>
        <span className="font-bold">{t("title.describe")}: </span>{" "}
        <span>{data?.mota}</span>
      </div>
      <span className="font-bold">{t("title.fields")}: </span>
      <div className="flex flex-wrap space-x-2 items-start">
        {data?.linhvucs?.map((e, idx) => (
          <span
            key={idx}
            className="px-4 py-2 my-2 rounded-full text-white bg-orange-400 font-semibold flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
          >
            {e?.name}
          </span>
        ))}
      </div>
      <div>
        <span className="font-bold">{t("title.create_by")}: </span>{" "}
        <Link to={`/app/user/${data?.user?.maso}`}>
          <span>{data?.user?.ho_ten}</span>
        </Link>
      </div>

      {raw && (
        <>
          {" "}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              window.location.href =
                CONFIG.API_BASE_URL + "/documents/" + data?.path;
            }}
          >
            <FaDownload className="cursor-pointer" size={25} />
            <p>Tải về</p>
          </div>{" "}
          <Code code={raw} language="javascript" />{" "}
        </>
      )}
      {language === "pdf" && (
        <div className="mt-5 w-[90%] h-[100vh] bg-slate-400">
          <iframe
            src={CONFIG.API_BASE_URL + "/documents/" + data?.path}
            width="100%"
            height="100%"
          />
        </div>
      )}
      {language !== "pdf" && !raw && (
        <div className="bg-white w-[60%] p-3 rounded-md">
          <div className="mb-4 w-full h-[160px] bg-slate-200 rounded-lg overflow-hidden"></div>
          <p>
            <strong>{data?.name}</strong>
          </p>
          <div className="flex justify-end items-center gap-5">
            {user?.maso !== data?.user?.maso && (
              <div className="flex items-center gap-2 p-2 cursor-pointer bg-yellow-300 rounded-md shadow-md">
                {!checkTL(data.id, user.tl) ? (
                  <MdOutlineDataSaverOn
                    color="#2979ff"
                    className="ml-auto mr-0 cursor-pointer"
                    onClick={async () =>
                      dispatch(await fnSaveTaiLieu(user.id, data.id, user.maso))
                    }
                  />
                ) : (
                  <AiOutlineDisconnect
                    color="#2979ff"
                    onClick={async () =>
                      dispatch(
                        await fnUnSaveTaiLieu(user.id, data.id, user.maso)
                      )
                    }
                    className="ml-auto mr-0 cursor-pointer"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentDetail;
