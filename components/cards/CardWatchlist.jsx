import Image from "next/image";
import Botas from "@/public/static/images/teste_card_watchlist/docm1.png";
import ShareButton from "../buttons/icons/ShareButton";
import DeleteButton from "../buttons/icons/DeleteButton";

export default function CardWatchlist() {
  return (
    <div className="w-full max-w-[460px] flex flex-row items-center">
      <div className="w-1/3 rounded border-grey border aspect-square relative flex justify-center items-center">
        <Image
          src={Botas}
          alt="Botas da Doc Martens"
          className="object-cover scale-75"
          fill={true}
        />
      </div>
      <div className="pl-4 flex flex-col gap-4">
        <div>
          <p className="font-semibold line-clamp-1">Nome da lista 123 gggg</p>
          <p className="caption text-secondary">666 Looks</p>
        </div>
      </div>
      <div className="ml-auto flex flex-row gap-2 pb-5">
        <ShareButton type="normal" />
        <DeleteButton />
      </div>
    </div>
  );
}
