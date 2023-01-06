import {
  ChatBubbleOutlineOutlined,
  Reply,
  ThumbUpOutlined,
} from "@mui/icons-material";
import React from "react";
import Comment from "./Comment";

export default function Like({ like, comments }) {
  // const likes = Object.entries(like);
  // console.log(likes.length);
  return (
    <div>
      <div className="flex justify-between px-4 bg-slate-100 text-xs py-1">
        <p>{like} likes</p>
        <p>{} share</p>
      </div>

      <div className="flex justify-between px-4 py-2  border-t border-black text-[5px]">
        <ThumbUpOutlined fontSize="small" />
        <ChatBubbleOutlineOutlined fontSize="small" />
        <p className="-scale-x-100">
          <Reply fontSize="small" />
        </p>
      </div>
      <div className="pl-3">
        <Comment />
      </div>
    </div>
  );
}
