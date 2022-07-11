import React, {useEffect, useState} from "react";
import { GrDocumentText } from "react-icons/gr";
import {AiFillCaretDown, AiOutlineDisconnect} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo} from "../../reducers/profile";
import {getData} from "../../utils/httpProvider";
import {API_BASE_URL} from "../../config/configUrl";
import {Link} from "react-router-dom";
import {checkTL} from "../../utils/checkTaiLieu";
import {MdOutlineDataSaverOn} from "react-icons/md";
import {fnSaveTaiLieu, fnUnSaveTaiLieu} from "../../actions/profile/profileAction";
import {useTranslation} from "react-i18next";



function Home() {
 const [data, setData] = useState([]);
 const user = useSelector(state => getUserInfo(state));
 const dispatch = useDispatch();
 const {t} = useTranslation();

 useEffect(()=>{
   (async ()=>{
     const res = await getData(API_BASE_URL+ '/tailieu/goiy/'+user.id);
     setData(res.data);
   })()
 }, []);
 console.log(data)
  return (
   <div>
       <div className="w-full mt-3  grid grid-cols-4 gap-2">
           {data?.map((e, idx) => {
               if (e.active && !checkTL(e.id, user.tl)) {
                   return (
                       <div key={idx} className="bg-white p-3 rounded-md">
                           <Link to={"/app/document/detail/" + e.id}>
                               <div className="mb-4 w-full h-[160px] bg-slate-200 rounded-lg overflow-hidden"></div>
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
                           <div className="flex justify-end items-center gap-5">
                               {e?.user?.maso !== user?.maso && <div
                                   className="flex items-center gap-2 p-2 cursor-pointer bg-yellow-300 rounded-md shadow-md"
                               >

                                   {
                                       !checkTL(e.id, user.tl) ? <MdOutlineDataSaverOn
                                           color="#2979ff"
                                           className="ml-auto mr-0 cursor-pointer"
                                           onClick={async () => dispatch(await fnSaveTaiLieu(user.id, e.id, user.maso))}
                                       /> : <AiOutlineDisconnect
                                           color="#2979ff"
                                           onClick={async () => dispatch(await fnUnSaveTaiLieu(user.id, e.id, user.maso))}
                                           className="ml-auto mr-0 cursor-pointer"/>
                                   }
                               </div>}
                           </div>
                       </div>
                   );
               }
           })}
       </div>
    </div>
  );
}

export default Home;
