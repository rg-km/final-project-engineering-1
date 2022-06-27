import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Axios } from "../../api";
import { Answer } from "../../Model";
import useStore from "../../store/store";
import Button from "../Button";
import Input from "../Input";
import TextArea from "../TextArea";
import Comment from "./Comment";

type Props = {
  id?: any;
  data?: Answer[];
  getData: () => void;
};

export default function Comments({ id, data, getData }: Props) {
  const { user } = useStore();
  const { handleSubmit, register } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    if (user) {
      Axios.post("/respon", {
        ...data,
        id_content: Number(id),
        id_user: user.id,
      })
        .then((res) => {
          Swal.fire({
            title: "Sukses mengirim komentar",
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => getData());
        })
        .catch((err) => {
          console.log(err.response);
          Swal.fire({
            title: "Gagal mengirim komentar",
            text: "Silahkan coba lagi",
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    }
  };

  return (
    <div className="space-y-4">
      {/* Loop Comment */}
      <div className="divide-y">
        {data &&
          data.map((answer) => <Comment key={answer.id} data={answer} />)}
      </div>
      {/* Answer */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-100 p-2 space-y-2"
      >
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
          <TextArea classContainer="w-full" {...register("answer")} />
        </div>
        <div className="flex justify-end">
          <Button label="Kirim" primary />
        </div>
      </form>
    </div>
  );
}
