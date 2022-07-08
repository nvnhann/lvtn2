import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {FiUpload} from "react-icons/fi";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {AiFillPlusCircle, AiTwotoneEdit} from "react-icons/ai";
import * as $http from '../../utils/httpProvider';
import * as CONFIG from '../../config/configUrl';
import {useSnackbar} from "notistack";
import {useSelector} from "react-redux";
import {getUserInfo} from "../../reducers/profile";
import {formatDate} from "../../utils/formatDate";
import {BsFillEyeSlashFill} from "react-icons/bs";
import {IoEyeSharp} from "react-icons/io5";
import {MdDelete} from "react-icons/md";

const styleFile = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 4,
    p: 2,
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "size",
    "color",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
];

const modules = {
    toolbar: {
        container: [
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{size: ["small", false, "large", "huge"]}, {color: []}],
            [
                {list: "ordered"},
                {list: "bullet"},
                {indent: "-1"},
                {indent: "+1"},
                {align: []},
            ],
            ["link", "image"],
            ["clean"],
        ],
    },
};

function CourseDetailList() {
    const [openEditor, setOpenEditor] = useState(false);
    const [data, setData] = useState(null);
    const [course, setCourse] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();
    const user = useSelector(state => getUserInfo(state))
    const [openFile, setOpenFile] = useState(false);
    const handleOpenFile = () => setOpenFile(true);
    const handleCloseFile = () => setOpenFile(false);
    const [tailieu, setTaiLieu] = useState([]);
    const [selectTL, setSelectTL] = useState([]);
    const [search, setSearch] = useState(null);
    const [baiviet, setBaiviet] = useState([]);
    const {enqueueSnackbar} = useSnackbar();
    const [load, setLoad] = useState(0)

    useEffect(() => {
        (async () => {
            const res = await $http.getData(CONFIG.API_BASE_URL + '/baiviet/' + id);
            setBaiviet(res.data);
        })()
    }, [load]);
    console.log(baiviet)
    useEffect(() => {
        (async () => {
            const res = await $http.getData(CONFIG.API_BASE_URL + '/course/detail/' + id);
            let isMember = false;
            if (res.data?.kh.maso === user.maso) isMember = true;
            res.data?.member.map(e => {
                if (e.maso === user.maso) {
                    isMember = true;
                }
            })
            if (!isMember) navigate('/app/course/register-course/' + res.data?.kh.idkh)
            setCourse(res.data);
            let tl = [];
            if (!search) {
                tl = await $http.getData(CONFIG.API_BASE_URL + '/tailieugv/' + user?.maso);
            } else {
                tl = await $http.getData(CONFIG.API_BASE_URL + `/tailieugv/${user?.maso}?search=${search}`);

            }
            setTaiLieu(tl.data)
        })()
    }, [search]);

    const openInputFile = () => {
        document.querySelector(".inputfile").click();
    };

    const handleChange = (value) => {
        setData(value);
    };

    const postTL = async () => {
        const tl = [];
        if (selectTL.length > 0) selectTL.forEach(e => tl.push(parseInt(e.value)))
        const dt = {};
        dt.mota = data;
        dt.tailieu = tl;
        await $http.postData(CONFIG.API_BASE_URL + '/baiviet', {noidung: dt.mota, idkh: id, tailieu: dt.tailieu});
        setLoad(e => e+1)
        enqueueSnackbar('Thêm thành công', {variant: 'success', autoHideDuration: 3000})

    }
    const selectedTL = () => {
        const tl = [];
        if (selectTL.length > 0) selectTL.forEach(e => tl.push(parseInt(e.value)))
        return tl;
    }

    const setActiveBaiViet = async (id, active) =>{
        try {
            await $http.postData(CONFIG.API_BASE_URL + '/baiviet/active',{id: id, active: active});
            setLoad(e => e+1)
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="flex gap-4">
            <div className="w-[75%]">
                <div className="flex justify-center align-middle  py-4  bg-[#2554A6] rounded-md">
                    <p className="text-white text-[30px]">{course?.kh?.ma_khoa_hoc} - {course?.kh?.ten_khoa_hoc}</p>
                </div>
                {!!openEditor ? (
                    <div className=" my-5 p-4 bg-white  rounded-md">
                        <p className="mb-2 text-[25px] text-center font-medium">
                            Thêm bài viết
                        </p>
                        <div className="h-[15rem]">
                            <ReactQuill
                                theme="snow"
                                className="h-[100%]"
                                formats={formats}
                                modules={modules}
                                value={data}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="my-16">
                            {selectTL.length > 0 && tailieu?.map(e => (
                                selectedTL()?.map((e1) => {
                                    if (e.id === e1) {
                                        return (
                                            <div key={e.id} className="w-full  grid grid-cols-3 gap-2">
                                                <div className="bg-cyan-700 text-white mb-2 p-3 rounded-md">
                                                    {e.name}
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            ))}
                        </div>
                        <div className="flex gap-4 justify-between mt-16 font-medium text-[18px] text-gray-500">
                            <div
                                onClick={handleOpenFile}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <FiUpload
                                    onClick={() => openInputFile()}
                                    className="hover:text-gray-800 duration-300"
                                    size={25}
                                />
                                <p>Thêm tài liệu</p>
                            </div>
                            <Modal
                                open={openFile}
                                onClose={handleCloseFile}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={styleFile}>
                                    <div className="flex gap-2 items-center">
                                        <input
                                            className="w-full py-1 px-4 outline-none rounded-md border border-slate-600"
                                            type="text"
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Tìm kiếm tài liệu"
                                        />

                                        <AiFillPlusCircle
                                            className="cursor-pointer"
                                            size={25}
                                            color="#2866c3"
                                        />
                                    </div>
                                    {tailieu.length > 0 ? tailieu.map(({id, name}, idx) => (
                                        <div key={idx}
                                             className="flex gap-2 items-center my-4 p-2 bg-slate-300 rounded-md">
                                            <input type="checkbox" name={id} value={id}/>
                                            <p>{name}</p>
                                        </div>
                                    )) : <div>Tài liệu trống</div>}
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={handleCloseFile}
                                            className="py-2 px-4 bg-gray-400 rounded-md text-white font-medium"
                                        >
                                            Hủy
                                        </button>
                                        <button onClick={() => {
                                            setSelectTL(document.querySelectorAll('input[type="checkbox"]:checked'))
                                            handleCloseFile()
                                        }} className="py-2 px-4 bg-orange-400 rounded-md font-medium">
                                            Thêm
                                        </button>
                                    </div>
                                </Box>
                            </Modal>

                            <div>
                                <button
                                    className="hover:text-gray-800 duration-300"
                                    onClick={() => {
                                        setOpenEditor(false)
                                        setData(null);
                                        setSelectTL([])
                                    }}
                                >
                                    Hủy
                                </button>
                                <button onClick={() => {
                                    postTL()
                                }} className="ml-4 hover:text-gray-800 duration-300">
                                    Đăng
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
                {!openEditor && (course?.kh?.maso === user.maso) ? (
                    <div
                        onClick={() => setOpenEditor(true)}
                        className=" my-4  flex items-center gap-5 p-2 bg-white rounded-md cursor-text"
                    >
                        <div className="w-[50px] h-[50px] rounded-full bg-slate-500"/>
                        <p className="text-slate-400">Thêm bài viết</p>
                    </div>
                ) : (
                    <></>
                )}
                {baiviet?.map((e, idx) => {
                    if(e.active || course?.kh?.maso === user.maso) return(
                        <div key={idx} className=" my-2 p-2  bg-white rounded-md ">
                            <div className="flex">
                                <div><span className="font-bold">Cập nhật: </span>{formatDate(e.updatedAt)}</div>
                                {course?.kh?.maso === user.maso &&  <AiTwotoneEdit size={25} color="#ff7961" className="ml-auto my-2 mr-0 cursor-pointer"/>}
                            </div>
                            <div className="my-2" dangerouslySetInnerHTML={{__html: e?.noidung}}/>
                            <div className="w-full  grid grid-cols-4 gap-2">
                                {e?.tailieus.map(e1 => (
                                    <div key={e1.id} className="bg-cyan-100 p-3 rounded-md">
                                        <Link to={"/app/document/detail/" + e1.id}>
                                            <div className="mb-4 w-full h-[160px] bg-slate-200 rounded-lg overflow-hidden"/>
                                            <p>
                                                <strong>{e1.name}</strong>
                                            </p>
                                        </Link>
                                        <span>tạo bởi <strong>{e1.user.ho_ten}</strong></span>
                                        <div className="flex flex-wrap space-x-2 items-start">
                                            {e1.linhvucs?.map((e2, id) => (
                                                <span key={id}
                                                      className="p-1 my-2 rounded-full text-white  bg-orange-400 font-semibold text-[10px] flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">{e2.name}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {(course?.kh?.maso === user.maso) && (
                                <div className="flex">
                                    <div className="my-2">
                                        {e.active && <BsFillEyeSlashFill onClick={()=> setActiveBaiViet(e.id, 0)}  className="cursor-pointer" size={30} color="#2979ff"/>}
                                        {!e.active && <IoEyeSharp onClick={()=> setActiveBaiViet(e.id, 1)}   className="cursor-pointer" size={30} color="#2979ff"/>}
                                    </div>
                                    <MdDelete
                                        size={30}
                                        color="#757575"
                                        className="ml-auto my-2 mr-0 cursor-pointer"
                                    />
                                </div>
                            )}
                        </div>
                    )
                })}

            </div>

            <div className="grid grid-cols-1 gap-2 w-[25%] bg-white rounded-md p-2">
                <div>
                    <Link to={`/app/user/${course?.kh?.maso}`}>
                        <p className="mb-2 text-[20px] text-gray-800 font-medium text-center">
                            Giảng viên
                        </p>
                        <div>
                            <div className="flex justify-start items-center gap-2 mb-2 p-2 bg-slate-200 rounded-md">
                                <div className="w-[50px] h-[50px]  rounded-full bg-slate-300"><img
                                    className="w-[50px] h-[50px]  rounded-full bg-slate-300"
                                    src={course.kh?.path_name ? CONFIG.API_BASE_URL + '/avatar/' + course.kh?.path_name : '/avt.jpg'}/>
                                </div>
                                <p className="">{course?.kh?.ho_ten}</p>
                            </div>
                        </div>
                    </Link>
                    <p className="mb-2 text-[20px] text-gray-800 font-medium text-center">
                        Thành Viên
                    </p>
                    {course?.member?.map((e, idx) => (
                        <div key={idx}>
                            <Link to={`/app/user/${e.maso}`}>
                                <div
                                    className="flex cursor-pointer justify-start items-center gap-2 mb-2 p-2 bg-slate-200 rounded-md">
                                    <div className="w-[50px] h-[50px]  rounded-full bg-slate-300"><img
                                        className="w-[50px] h-[50px]  rounded-full bg-slate-300"
                                        src={e?.path_name ? CONFIG.API_BASE_URL + '/avatar/' + e?.path_name : '/avt.jpg'}/>
                                    </div>
                                    <p className="">{e?.ho_ten}</p>
                                </div>
                            </Link>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}

export default CourseDetailList;
