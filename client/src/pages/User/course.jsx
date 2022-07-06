import React, { useEffect, useState } from "react";
import { IoMdFolderOpen } from "react-icons/io";
import { Link } from "react-router-dom";
import * as $http from "../../utils/httpProvider";
import * as CONFIG from "../../config/configUrl";
import { IconButton, Stack } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
function Course() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1)

  useEffect(() => {
    (async () => {
      const res = await $http.getData(CONFIG.API_BASE_URL + "/course?pageURL="+page);
      setData(res.data);
    })();
  }, [page]);

  return (
    <>
    <div className="flex flex-wrap gap-4 mb-5">
        {data?.map((e, idx) => (
          <div
            key={idx}
            className="relative w-[260px] bg-white rounded-md shadow-md"
          >
            <div className="p-4 w-full h-[100px] bg-slate-300 rounded-t-md">
              <div className="">
                <p className="text-[20px]">{e?.ten_khoa_hoc}</p>
                <p className="absolute top-[80px] mt-6 text-[14px]">{e?.ho_ten}</p>
                <div className="absolute z-50 top-[65px] right-2 w-[75px] h-[75px] bg-slate-500 rounded-full">
                  {e?.path_name && (
                    <img
                      className=" w-[75px] h-[75px] rounded-full"
                      src={
                        CONFIG.API_BASE_URL + "/avatar/" + e?.path_name
                      }
                    />
                  )}
                  {!e?.path_name && (
                    <img
                      className=" w-[75px] h-[75px] rounded-full"
                      src="/avatar.png"
                    />
                  )}
                </div>
              </div>
              <Link to="/app/course/detail=jkasndjj">
                <div className="h-[150px]">
                  <IoMdFolderOpen
                    size={25}
                    className="absolute bottom-2 right-2 cursor-pointer"
                  />
                </div>
              </Link>
            </div>
            <Link to={"/app/course/detail/id=" + e.id + "&gv=" + e.idgv}>
              <div className="h-[150px]">
                <IoMdFolderOpen
                  size={25}
                  className="absolute bottom-2 right-2 cursor-pointer"
                />
              </div>
            </Link>
          </div>
        ))}
    </div>
      <Stack>
        <IconButton onClick={()=> setPage(e=>e+1)}><MoreHorizIcon sx={{fontSize: '3rem'}} /></IconButton>
      </Stack>
    </>
  );
}

export default Course;
