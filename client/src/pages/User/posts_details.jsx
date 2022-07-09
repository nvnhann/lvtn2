import React, { useState } from "react";
import { IoSend } from "react-icons/io5";

function PostsDetails() {
  const [comment, setComment] = useState("");

  const submitComment = () => {
    console.log(comment);
    document.querySelector(".comment").value = "";
    setComment("");
  };
  return (
    <div className="flex gap-4">
      <div className="w-[55%] bg-white rounded-md">
        <div className="flex justify-center align-middle py-4 bg-[#2554A6] rounded-t-md">
          <p className="text-white text-[30px]">CT101 - Lập trình căn bản</p>
        </div>
        <div>
          <div className="flex items-center gap-3 p-4">
            <div className="w-[50px] h-[50px] bg-slate-400 rounded-full"></div>
            <div>
              <p className="font-medium">Phạm Thế Phi</p>
              <p className="text-[11px] text-gray-600">
                <em>2022/07/08 08:49:08</em>
              </p>
            </div>
          </div>
          <div className="mt-1 px-4">
            <p>Thầy gửi các em tài liệu chương 1 2</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-5 mb-2 px-4">
            <div className="p-3 pb-4 bg-slate-200 rounded-md">
              <div className="w-full h-[150px] bg-slate-100 rounded-md">
                <img src="" alt="" />
              </div>
              <div className="mt-2">
                <p>
                  <strong>Bài giảng LTCB chương 1</strong>
                </p>
                <p>
                  tạo bởi <strong>Phạm Thế Phi</strong>
                </p>
                <span className="mt-3 text-[10px] p-1 text-white text-center rounded-full bg-orange-500 font-medium ">
                  Tài liệu học tập
                </span>
              </div>
            </div>
            <div className="p-3 pb-4 bg-slate-200 rounded-md">
              <div className="w-full h-[150px] bg-slate-100 rounded-md">
                <img src="" alt="" />
              </div>
              <div className="mt-2">
                <p>
                  <strong>Bài giảng LTCB chương 2</strong>
                </p>
                <p>
                  tạo bởi <strong>Phạm Thế Phi</strong>
                </p>
                <span className="mt-3 text-[10px] p-1 text-white text-center rounded-full bg-orange-500 font-medium ">
                  Tài liệu học tập
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative px-2 w-[45%] bg-white rounded-md">
        <div className="border-b border-gray-200">
          <p className="my-2 text-center text-[20px] font-medium">Bình luận</p>
        </div>

        <div className="min-h-[200px]">
          {/* // everyone */}
          <div className="flex w-[90%] my-4 rounded-md">
            <div className="w-[10%]">
              <div className="w-[50px] h-[50px] rounded-full bg-slate-200"></div>
            </div>
            <div className="ml-2 p-2 w-[90%] bg-gray-100 rounded-md">
              <p className="font-medium">Nguyễn Văn A</p>
              <p className="text-[14px]">
                Tài liệu chương 1 bị lỗi font thầy ơi
              </p>
            </div>
          </div>
          {/* //you */}
          <div className="flex ml-auto mr-0 my-4 w-[90%]  rounded-md">
            <div className="w-[90%] mr-2 p-2 bg-gray-100 rounded-md border border-blue-200">
              <p className="text-[14px]">Ừa. Để thầy kiểm tra lại</p>
            </div>
            <div className="w-[10%]">
              <div className="w-[50px] h-[50px] rounded-full bg-slate-200"></div>
            </div>
          </div>
        </div>

        <div className="absolute w-[97%] bottom-12">
          <div className="relative mb-2">
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              className="comment py-2 pl-4 pr-12 w-full border border-[#2554A6] rounded-full outline-none"
            />

            {comment === "" ? (
              <>
                <div className="absolute right-[3px] top-[2px] pl-3 p-2 bg-slate-200 rounded-full opacity-60 cursor-not-allowed shadow-md active:bg-slate-300 duration-300">
                  <IoSend className="block" size={20} color="#2554A6" />
                </div>
              </>
            ) : (
              <>
                <div
                  onClick={() => submitComment()}
                  className="absolute right-[3px] top-[2px] pl-3 p-2 bg-slate-200 rounded-full cursor-pointer shadow-md active:bg-slate-300 duration-300"
                >
                  <IoSend className="block" size={20} color="#2554A6" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostsDetails;
