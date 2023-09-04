import { useContext } from "react";
import { GrafContext } from "../contexts/GrafContext";
import { RiAccountCircleFill } from "react-icons/ri";

import FetchData from "./FetchData";
import SelectData from "./SelectData";

const Main = () => {
  const { selectedPref } = useContext(GrafContext);

  return (
    <>
      <section className="mt-10 border-b border-blue-400">
        <div className="flex items-center">
          <RiAccountCircleFill className="mr-2" size={60} color={"blue"} />
          <h1 className="text-5xl font-bold text-gray-700">
            都道府県別人口推移
          </h1>
        </div>
        <p className="mt-4 mb-2">
          この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。
        </p>
      </section>
      <section className="mt-10">
        <h1>選択された都道府県: {selectedPref.prefName}</h1>
        <SelectData />
        <FetchData />
      </section>
    </>
  );
};

export default Main;
