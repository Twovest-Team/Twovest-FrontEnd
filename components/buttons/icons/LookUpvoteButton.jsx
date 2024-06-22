//Icone de upvote, com e sem preenchimento
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined";
import formatCompactNumbers from "@/utils/formatCompactNumbers";

export default function LookUpvoteButton({ upvotes }) {

  
  return (
    <div className="absolute top-3 right-3 hover:shadow-2xl text-white px-4 h-[40px] bg-black bg-opacity-70 hover:bg-opacity-100 transition-all duration-150 rounded-full justify-center items-center inline-flex gap-0.5">
      <ForwardOutlinedIcon
        className="-rotate-90"
        ariaLabel="Botão de upvote"
        sx={{ fontSize: 24 }}
      />
      {upvotes > 0 &&
        <div className="text-center">
          <h1 className="font-medium text-[16px]">
            {formatCompactNumbers(upvotes)}
          </h1>
        </div>
      }

    </div>
  );
}
