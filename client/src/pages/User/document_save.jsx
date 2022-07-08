import React, {useEffect, useState} from 'react'
import {getData} from "../../utils/httpProvider";
import {API_BASE_URL} from "../../config/configUrl";
import {Link} from "react-router-dom";
import {AiOutlineDisconnect} from "react-icons/ai";

export default function DocumentSave(){
    const [tailieu, setTailieu] = useState();
    useEffect(()=>{
        (async ()=>{
           const res = await getData(API_BASE_URL+'/tailieu/save');
           setTailieu((res.data))

        })()
    },[]);
    console.log(tailieu)
    return(
        <div>
            <div className="my-5">
                <p className="text-[20px] font-bold">Tài liệu đã lưu</p>
                <div className="w-full mt-3  grid grid-cols-4 gap-2">
                    {tailieu?.tailieus?.map((e, idx) => {
                        if (e.active) {
                            return (
                                <div key={idx} className="bg-white p-3 rounded-md">
                                    <Link  to={"/app/document/detail/" + e.id}>
                                        <div
                                            className="mb-4 w-full h-[160px] bg-slate-200 rounded-lg overflow-hidden"></div>
                                        <p>
                                            <strong>{e.name}</strong>
                                        </p>
                                    </Link>
                                    <span>tạo bởi <strong>{e.user.ho_ten}</strong></span>
                                    <div className="flex flex-wrap space-x-2 items-start">
                                        {e.linhvucs?.map((e2, i) => (
                                            <span key={i} className="p-1 my-2 rounded-full text-white  bg-orange-400 font-semibold text-[10px] flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">{e2.name}</span>))}
                                    </div>
                                    <div>
                                        <AiOutlineDisconnect  size={30}
                                                              color="#2979ff"
                                                              className="ml-auto mr-0 cursor-pointer" />
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}