import React from "react";
import { ChatIcon, LikeIcon } from "../Icons";

type Props = {};

export default function Comment({}: Props) {
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
            <p className="font-bold">Liem cien</p>
            <p className="text-sm">10 Januari 2020</p>
          </div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam
            ipsam maxime molestias eaque asperiores accusantium. Expedita, optio
            velit delectus voluptas facere quo et voluptatibus, cumque dolores
            accusantium repellendus quasi temporibus.
          </p>
          {/* Like Dislike */}
          <div className="flex flex-row items-center space-x-2 py-2">
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
          </div>
        </div>
      </div>
    </div>
  );
}
