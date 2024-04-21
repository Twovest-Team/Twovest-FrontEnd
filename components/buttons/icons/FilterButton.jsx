import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import IconButton from "./IconButton";

const FilterButton = () => {
  return (
    <IconButton
      icon={<FilterListOutlinedIcon sx={{ fontSize: 28 }} />}
      className="ml-auto translate-x-1"
      ariaLabel="Botão de filtrar"
    />
  );
};

export default FilterButton;
