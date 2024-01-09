//Icone de upvote, com e sem preenchimento
import ForwardIcon from "@mui/icons-material/Forward";
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined";

export default function LookUpvoteButton() {
  return (
    <div className="absolute top-0 right-0 w-[70px] h-[45px] bg-black rounded-tr-[5px] rounded-bl-[5px] justify-center items-center inline-flex">
      <ForwardOutlinedIcon className="text-white -rotate-90" />
      <div className="text-center">
        <h6 className="font-semibold text-white">55</h6>
      </div>
    </div>
  );
}