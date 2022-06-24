import React from "react";
import { Answer } from "../../store/store";
import { ChatIcon, LikeIcon } from "../Icons";

type Props = {
  data: Answer;
};

export default function Comment({ data }: Props) {
  return (
    <div>
      {/* User Info */}
      <div className="flex flex-row space-x-2 items-start px-2">
        <img
          src="https://dummyimage.com/200.png"
          alt=""
          className="w-12 h-12 aspect-square rounded-full"
        />
        <div className="">
          <div className="flex flex-row space-x-2 items-center">
            <p className="font-bold">{data.author}</p>
            <p className="text-sm">{data.created_at}</p>
          </div>
          <p>{data.content}</p>
          {/* Like Dislike */}
          {/* <div className="flex flex-row items-center space-x-2 py-2">
            <div className="flex flex-row space-x-2 items-center justify-end text-lg">
              <p className="h-6 w-6">{LikeIcon}</p>
              <p className="text-sm">1</p>
            </div>
            <div className="flex flex-row space-x-2 items-center justify-end text-lg">
              <p className="h-6 w-6  rotate-180">{LikeIcon}</p>
              <p className="text-sm">1</p>
            </div>
            <div className="flex flex-row space-x-2 items-center justify-end text-lg">
              <p className="h-6 w-6">{ChatIcon}</p>
              <p className="text-sm">1</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
