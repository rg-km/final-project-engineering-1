import moment from "moment";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Axios } from "../../api";
import { Question } from "../../Model";
import useStore from "../../store/store";
import Button from "../Button";
import { ChatIcon, LikeIcon, TrashIcon } from "../Icons";

type Props = {
  data: Question;
  getData: () => void;
};

export default function CardQuestion({ data, getData }: Props) {
  const { categories, user, setIsLoading } = useStore();
  const labelCategory = (id_category?: number) => {
    if (id_category) {
      const category = categories.find((item) => item.id === id_category);
      if (category) {
        return (
          <div className="px-2 py-1 rounded-md bg-primary-light text-white mr-1 text-xs">
            {category.name}
          </div>
        );
      }
    }
  };

  const deleteContent = (e: any, id: number) => {
    e.preventDefault();
    Swal.fire({
      title: "Anda yakin?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        Axios.delete(`/contents/${id}`)
          .then(() => {
            Swal.fire("Berhasil!", "Data berhasil dihapus.", "success").then(
              () => getData()
            );
          })
          .catch((err) => {
            console.log(err.response);
            Swal.fire({
              title: "Gagal menghapus data",
              text: "Data gagal dihapus",
              icon: "error",
            });
          })
          .finally(() => setIsLoading(false));
      }
    });
  };

  return (
    <Link to={`/question/${data.id}`} className="block">
      <div className="border shadow rounded-md p-4">
        <div className="flex flex-row w-full">
          {/* Stats */}
          {/* <div className="w-1/12">
            <div className="flex flex-row space-x-2 items-center justify-end text-lg">
              <p>1</p>
              <p className="h-6 w-6">{LikeIcon}</p>
            </div>
            <div className="flex flex-row space-x-2 items-center justify-end text-lg">
              <p>1</p>
              <p className="h-6 w-6">{ChatIcon}</p>
            </div>
          </div> */}
          <div className="w-full space-y-4">
            <div className="flex flex-row justify-between items-center">
              <h1 className="font-bold text-lg">{data.title}</h1>
              {/* {user && user.role === "admin" && (
                <Button
                  icon={TrashIcon}
                  iconClass="h-4 w-4 text-white"
                  danger
                  onClick={(e: any) => deleteContent(e, data.id)}
                />
              )} */}
            </div>
            <p>{data.deksripsi}</p>
            <div className="flex flex-row justify-between">
              <div className="flex flex-wrap">
                {labelCategory(data?.id_category)}
              </div>
              <div className="space-x-2 text-xs">
                <span className="text-primary">{data?.username}</span>
                <span className="text-gray-400">
                  {moment(data.last_modified).fromNow()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
