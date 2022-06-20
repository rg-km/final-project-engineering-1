import React from "react";
import Comments from "../../Components/Comments/Comments";
import { ChatIcon, LikeIcon } from "../../Components/Icons";

type Props = {};

export default function Detail({}: Props) {
  return (
    <div className="space-y-4 divide-y">
      {/* Question */}
      <div className="space-y-2">
        {/* User Info */}
        <div className="flex flex-row items-center space-x-2">
          <img
            src="https://dummyimage.com/200.png"
            alt=""
            className="w-12 h-12 aspect-square rounded-full"
          />
          <div>
            <p className="font-bold">Liem cien</p>
            <p className="text-sm">10 Januari 2020</p>
          </div>
        </div>
        {/* Title */}
        <h1 className="text-lg font-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
          exercitationem, quasi totam illo, laboriosam expedita
        </h1>
        {/* Content Body */}
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
          reiciendis! Cum, ex consequatur reprehenderit dolore atque debitis.
          Voluptates molestias repellat corporis itaque dolorum pariatur. Vel
          asperiores itaque molestias accusantium dolorum.
        </p>
        {/* Tags */}
        <div className="flex flex-wrap">
          <div className="px-2 py-1 rounded-md bg-primary-light text-white mr-1 text-xs">
            Typescript
          </div>
        </div>
        {/* Like Dislike */}
        <div className="flex flex-row items-center space-x-2">
          <div className="flex flex-row space-x-2 items-center justify-end text-lg">
            <p className="h-6 w-6">{LikeIcon}</p>
            <p className='text-sm'>1</p>
          </div>
          <div className="flex flex-row space-x-2 items-center justify-end text-lg">
            <p className="h-6 w-6  rotate-180">{LikeIcon}</p>
            <p className='text-sm'>1</p>
          </div>
          <div className="flex flex-row space-x-2 items-center justify-end text-lg">
            <p className="h-6 w-6">{ChatIcon}</p>
            <p className='text-sm'>1</p>
          </div>
        </div>
      </div>
      {/* Comment Section */}
      <div className="pt-4">
        <Comments />
      </div>
    </div>
  );
}
