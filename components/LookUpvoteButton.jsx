//Icone de upvote, com e sem preenchimento
import ForwardIcon from "@mui/icons-material/Forward";
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined";

export default function LookUpvoteButton() {
  return (
    <div className="absolute top-0 right-0 w-24 h-14 bg-black rounded-tr-[5px] rounded-bl-[5px] justify-center items-center gap-1 inline-flex">
      <ForwardOutlinedIcon className="text-white w-[30px] h-[45px] -rotate-90" />
      <div className="w-[30px] text-center">
        <h6 className="font-semibold text-white">55</h6>
      </div>
    </div>
  );
}
