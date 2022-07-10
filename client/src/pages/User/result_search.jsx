import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {IoMdFolderOpen} from "react-icons/io";
import {useParams} from "react-router-dom";
import {getData} from "../../utils/httpProvider";
import {API_BASE_URL} from "../../config/configUrl";
import {Link} from 'react-router-dom';
import * as CONFIG from "../../config/configUrl";
import {MdOutlineDataSaverOn} from "react-icons/md";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {getUserInfo} from "../../reducers/profile";

function ResultSearch() {
    const [value, setValue] = React.useState("1");
    const [data, setData] = useState([]);
    const {keyword} = useParams();
    const {t} = useTranslation();
    const user = useSelector(state => getUserInfo(state))

    useEffect(() => {
        (async () => {
            const res = await getData(API_BASE_URL + '/user/search/' + keyword);
            setData(res.data)

        })()
    }, [keyword])
    console.log(data)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="w-[90%] mx-auto">
            <Box sx={{width: "100%", magrin: "center", typography: "body1"}}>
                <TabContext value={value}>
                    <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Tất cả" value="1"/>
                            <Tab label="Khóa học" value="2"/>
                            <Tab label="Tài khoản" value="3"/>
                            <Tab label="Tài liệu" value="4"/>
                            <Tab label="Lĩnh vực" value="5"/>
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <div className="my-2 grid grid-cols-4 gap-5 mt-5">
                            {data?.taikhoan?.map(e => (
                                <Link key={e.id} to={`/app/user/${e.maso}`}
                                      className="p-4 text-center font-medium bg-white rounded-md cursor-pointer">
                <span key={e.id}>
                  {e.ho_ten}
                  </span>
                                </Link>
                            ))}
                        </div>
                        <div className="flex mt-2 flex-wrap space-x-2 items-start">
                            {data?.lv?.map((e2, idx) => (
                                <span key={idx}
                                      className="p-1 my-2 rounded-full text-white  bg-orange-400 font-semibold text-[10px] flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">{e2.name}</span>
                            ))}
                        </div>
                        <div className="grid grid-cols-4 mb-5">
                            {data?.kh?.map((e, idx) => (
                                <div
                                    key={idx}
                                    className="relative w-[250px] bg-white rounded-md shadow-md mb-2"
                                >
                                    <div className="p-4 w-full h-[100px] bg-slate-300 rounded-t-md">
                                        <div className="">
                                            <p className="text-[20px]">{e?.ten_khoa_hoc}</p>
                                            <p className="absolute top-[80px] mt-6 text-[14px]">{e?.ho_ten}</p>
                                            <div
                                                className="absolute z-50 top-[65px] right-2 w-[75px] h-[75px] bg-slate-500 rounded-full">
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
                                        <Link to={"/app/course/detail/" + e.id}>
                                            <div className="h-[150px]">
                                                <IoMdFolderOpen
                                                    size={25}
                                                    className="absolute bottom-2 right-2 cursor-pointer"
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                    <Link to={"/app/course/detail/" + e.id}>
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
                        <div className="grid grid-cols-4 mb-5">
                            {data?.tl?.map((e, idx) => (
                                <div key={idx} className="bg-white p-3 rounded-md">
                                    <Link to={"/app/document/detail/" + e.id}>
                                        <div
                                            className="mb-4 w-full h-[160px] bg-slate-200 rounded-lg overflow-hidden"></div>
                                        <p>
                                            <strong>{e.name}</strong>
                                        </p>
                                    </Link>
                                    <span>
                    {t("title.create_by")} <strong>{e.user.ho_ten}</strong>
                  </span>
                                    <div className="flex flex-wrap space-x-2 items-start">
                                        {e.linhvucs?.map((e2, i) => (
                                            <span
                                                key={i}
                                                className="p-1 my-2 rounded-full text-white  bg-orange-400 font-semibold text-[10px] flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
                                            >
                        {e2.name}
                      </span>
                                        ))}
                                    </div>
                                    {user?.maso !== e.user.maso && (
                                        <MdOutlineDataSaverOn
                                            size={30}
                                            color="#2979ff"
                                            className="ml-auto mr-0 cursor-pointer"
                                            // onClick={() => saveTaiLieu(user?.id, e.id)}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </TabPanel>

                    <TabPanel value="2">
                        <div className="grid grid-cols-4 mb-5">
                            {data?.kh?.map((e, idx) => (
                                <div
                                    key={idx}
                                    className="relative mb-2 w-[250px] bg-white rounded-md shadow-md"
                                >
                                    <div className="p-4 w-full h-[100px] bg-slate-300 rounded-t-md">
                                        <div className="">
                                            <p className="text-[20px]">{e?.ten_khoa_hoc}</p>
                                            <p className="absolute top-[80px] mt-6 text-[14px]">{e?.ho_ten}</p>
                                            <div
                                                className="absolute z-50 top-[65px] right-2 w-[75px] h-[75px] bg-slate-500 rounded-full">
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
                                        <Link to={"/app/course/detail/" + e.id}>
                                            <div className="h-[150px]">
                                                <IoMdFolderOpen
                                                    size={25}
                                                    className="absolute bottom-2 right-2 cursor-pointer"
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                    <Link to={"/app/course/detail/" + e.id}>
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
                    </TabPanel>

                    <TabPanel value="3">
                        <div className="my-2 grid grid-cols-4 gap-5 mt-5">
                            {data?.taikhoan?.map(e => (
                                <Link key={e.id} to={`/app/user/${e.maso}`}
                                      className="p-4 text-center font-medium bg-white rounded-md cursor-pointer">
                <span key={e.id}>
                  {e.ho_ten}
                  </span>
                                </Link>
                            ))}
                        </div>
                    </TabPanel>

                    <TabPanel value="4">
                        <div className="grid grid-cols-4 mb-5">
                            {data?.tl?.map((e, idx) => (
                                <div key={idx} className="bg-white p-3 rounded-md">
                                    <Link to={"/app/document/detail/" + e.id}>
                                        <div
                                            className="mb-4 w-full h-[160px] bg-slate-200 rounded-lg overflow-hidden"></div>
                                        <p>
                                            <strong>{e.name}</strong>
                                        </p>
                                    </Link>
                                    <span>
                    {t("title.create_by")} <strong>{e.user.ho_ten}</strong>
                  </span>
                                    <div className="flex flex-wrap space-x-2 items-start">
                                        {e.linhvucs?.map((e2, i) => (
                                            <span
                                                key={i}
                                                className="p-1 my-2 rounded-full text-white  bg-orange-400 font-semibold text-[10px] flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
                                            >
                        {e2.name}
                      </span>
                                        ))}
                                    </div>
                                    {user?.maso !== e.user.maso && (
                                        <MdOutlineDataSaverOn
                                            size={30}
                                            color="#2979ff"
                                            className="ml-auto mr-0 cursor-pointer"
                                            // onClick={() => saveTaiLieu(user?.id, e.id)}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </TabPanel>

                    <TabPanel value="5">
                        <div className="flex mt-2 flex-wrap space-x-2 items-start">
                            {data?.lv?.map((e2, idx) => (
                                <span key={idx}
                                      className="p-1 my-2 rounded-full text-white  bg-orange-400 font-semibold text-[10px] flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">{e2.name}</span>
                            ))}
                        </div>
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    );
}

export default ResultSearch;
