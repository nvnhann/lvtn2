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
      <div className="w-[60%] bg-white rounded-md">
        <div className="flex justify-center align-middle py-4 bg-[#2554A6] rounded-t-md">
          <p className="text-white text-[30px]">CTXXX - TÊN KHOA HỌC</p>
        </div>
        <div>
          <div className="flex items-center gap-3 p-4">
            <div className="w-[50px] h-[50px] bg-slate-400 rounded-full"></div>
            <p className="font-medium">Đào Minh Khoa</p>
          </div>
          <div className="mt-2 px-4">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>

      <div className="relative px-2 w-[40%] bg-white rounded-md">
        <div className="border-b border-gray-200">
          <p className="my-2 text-center text-[20px] font-medium">Bình luận</p>
        </div>

        <div className="min-h-[200px]">
          <div className="flex gap-3 p-2 my-2 bg-gray-100 rounded-md">
            <div className="w-[10%]">
              <div className="w-[50px] h-[50px] rounded-full bg-slate-200"></div>
            </div>
            <div className="w-[90%]">
              <p className="font-medium">Đào Minh Khoa</p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>
        </div>

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
  );
}

export default PostsDetails;
