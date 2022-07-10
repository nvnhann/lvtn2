import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { IoMdFolderOpen } from "react-icons/io";

function ResultSearch() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="w-[80%] mx-auto">
      <Box sx={{ width: "100%", magrin: "center", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Tất cả" value="1" />
              <Tab label="Khóa học" value="2" />
              <Tab label="Giáo viên" value="3" />
              <Tab label="Sinh viên" value="4" />
              <Tab label="Bài báo" value="5" />
              <Tab label="Lĩnh vực" value="6" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div className="relative w-[260px] bg-white rounded-md shadow-md">
              <div className="p-4 w-full h-[100px] bg-slate-300 rounded-t-md">
                <div className="">
                  <p className="text-[20px]">CT428-Lập trình web</p>
                  <p className="mt-6 text-[14px]">Nguyễn Minh Trung</p>
                  <div className="absolute z-50 top-[65px] right-2 w-[75px] h-[75px] bg-slate-500 rounded-full"></div>
                </div>
              </div>
              <div className="h-[150px]">
                <IoMdFolderOpen
                  size={25}
                  className="absolute bottom-2 right-2 cursor-pointer"
                />
              </div>
            </div>
          </TabPanel>

          <TabPanel value="2">
            <div className="relative w-[260px] bg-white rounded-md shadow-md">
              <div className="p-4 w-full h-[100px] bg-slate-300 rounded-t-md">
                <div className="">
                  <p className="text-[20px]">CT428-Lập trình web</p>
                  <p className="mt-6 text-[14px]">Nguyễn Minh Trung</p>
                  <div className="absolute z-50 top-[65px] right-2 w-[75px] h-[75px] bg-slate-500 rounded-full"></div>
                </div>
              </div>
              <div className="h-[150px]">
                <IoMdFolderOpen
                  size={25}
                  className="absolute bottom-2 right-2 cursor-pointer"
                />
              </div>
            </div>
          </TabPanel>

          <TabPanel value="3">
            <div className="flex p-4 gap-4 items-center rounded-md bg-white">
              <div className="w-[80px] h-[80px] bg-slate-300 rounded-full"></div>
              <div>
                <p className="text-[20px] font-bold">Phạm Thế Phi</p>
                <p>
                  <strong>MGV: </strong>CI1234
                </p>
                <p>
                  <strong>Bộ môn: </strong>Công nghệ thông tin
                </p>
              </div>
              <div className="ml-auto mr-0">
                <button className="py-2 px-8 font-bold bg-[#A7DDFB] text-[#2554A6] rounded-md">
                  Xem
                </button>
              </div>
            </div>
            <p className="mt-4 text-center font-bold">Xem thêm</p>
          </TabPanel>

          <TabPanel value="4">
            <div className="flex p-4 gap-4 items-center rounded-md bg-white">
              <div className="w-[80px] h-[80px] bg-slate-300 rounded-full"></div>
              <div>
                <p className="text-[20px] font-bold">Đào Minh Pha</p>
                <p>
                  <strong>MSSV: </strong>B1809248
                </p>
                <p>
                  <strong>Chuyên nghành : </strong>Công nghệ thông tin
                </p>
              </div>
              <div className="ml-auto mr-0">
                <button className="py-2 px-8 font-bold bg-[#A7DDFB] text-[#2554A6] rounded-md">
                  Xem
                </button>
              </div>
            </div>
            <p className="mt-4 text-center font-bold">Xem thêm</p>
          </TabPanel>

          <TabPanel value="5">
            <div className="flex p-4 gap-5 bg-white rounded-md">
              <div className="w-[30%] h-[200px] bg-slate-400 rounded-md"></div>
              <div className="w-[70%]">
                <p className="text-[25px] font-bold">
                  Tạp chí khoa học công nghệ thế giới
                </p>
                <p>Tạp chí của Nguyễn Văn A</p>
                <p className="text-[14px]">
                  <i>Ngày 30/6/2022</i>
                </p>
                <div className="mt-5">
                  <button className="py-2 min-w-[100px] font-bold text-[#2554A6] bg-[#A7DDFB] rounded-md">
                    Xem
                  </button>
                  <button className="ml-4 py-2 min-w-[100px] font-bold text-[#2554A6] bg-[#A7DDFB] rounded-md">
                    Lưu
                  </button>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center font-bold">Xem thêm</p>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default ResultSearch;
