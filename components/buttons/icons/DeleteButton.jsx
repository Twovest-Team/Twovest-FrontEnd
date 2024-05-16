import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "./IconButton";

export default function DeleteButton({ deleteFunction }) {
  return (
    <IconButton
      icon={<DeleteOutlineOutlinedIcon onClick={deleteFunction} />}
      className="text-[22px] text-secondary cursor-pointer"
      ariaLabel="Botão de apagar"
    />
  );
}
