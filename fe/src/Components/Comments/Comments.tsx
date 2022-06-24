import React from "react";
import useStore, { Answer } from "../../store/store";
import Button from "../Button";
import Input from "../Input";
import TextArea from "../TextArea";
import Comment from "./Comment";

type Props = {
  data?: Answer[];
};

export default function Comments({ data }: Props) {
  const { user } = useStore();
  return (
    <div className="space-y-4">
      {/* Loop Comment */}
      <div className="divide-y">
        {data &&
          data.map((answer) => <Comment key={answer.id} data={answer} />)}
      </div>
      {/* Answer */}
      <div className="bg-gray-100 p-2 space-y-2">
        <div className="flex flex-row items-center space-x-2">
          <img
            src="https://dummyimage.com/200.png"
            alt=""
            className="w-12 h-12 aspect-square rounded-full"
          />
          <div className="flex flex-row space-x-2 items-center">
            <p className="font-bold">{user?.username}</p>
            {/* <p className="text-sm">10 Januari 2020</p> */}
          </div>
        </div>
        <div>
          <TextArea classContainer="w-full" />
        </div>
        <div className="flex justify-end">
          <Button label="Kirim" primary />
        </div>
      </div>
    </div>
  );
}
