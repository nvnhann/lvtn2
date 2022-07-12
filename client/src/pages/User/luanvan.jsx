import React, { useEffect, useState } from "react";
import { MdDelete, MdOutlineDataSaverOn } from "react-icons/md";
import { Link } from "react-router-dom";
import { getData } from "../../utils/httpProvider";
import { API_BASE_URL } from "../../config/configUrl";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../reducers/profile";
import { useTranslation } from "react-i18next";

function LuanVan() {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => getUserInfo(state));
  useEffect(() => {
    (async () => {
      const res = await getData(API_BASE_URL + "/tailieulv/luận văn");
      setData(res.data);
    })();
  }, []);
  return (
    <>
      <div className="mb-2 font-bold text-[2rem]">
        {t("title.university_thesis")}
      </div>

      <div className="w-full px-5 grid grid-cols-4 gap-4">
        {data?.map((item, idx) => (
          <Link key={idx} to={"/app/document/detail/" + item.id}>
            <div className="bg-white p-3 rounded-md">
              <div className="mb-4 w-full h-[160px] bg-slate-200 rounded-lg overflow-hidden">
                {/* <GoogleDocsViewer width="100%" height="160px" fileUrl={lvtn} /> */}
              </div>
              <p>
                <strong>{item.name}</strong>
              </p>
              <span>
                {t("title.create_by")} <strong>{item.user.ho_ten}</strong>
              </span>
              <p>
                {item.linhvucs.map((e) => (
                  <Link to={"/app/tailieu/linhvuc/"+e.name}>
                      <span
                          key={e.id}
                          className="text-[12px] text-white bg-orange-500 rounded-full mr-2 px-[8px] py-1"
                      >
                    {e.name}
                  </span>
                  </Link>
                ))}
              </p>
              {user?.maso !== item.user.maso && (
                <MdOutlineDataSaverOn
                  size={30}
                  color="#2979ff"
                  className="ml-auto mr-0 cursor-pointer"
                  // onClick={() => saveTaiLieu(user?.id, e.id)}
                />
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default LuanVan;
