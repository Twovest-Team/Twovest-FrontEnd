import BrandCard from "./BrandCard";
import Button from "../buttons/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export const BrandCards = ({ data, gender }) => {
  const brand = data;

  return (
    <div className="container">
      <h1 className="font-semibold mb-4 text-h6">Marcas</h1>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5 lg:grid-cols-4">
        {brand.map((item, index) => (
          <li
            key={item.id}
            className={`
              ${index >= 4 ? 'hidden' : 'block'}
              ${index >= 6 ? 'md:hidden' : 'md:block'}
              ${index >= 8 ? 'lg:hidden' : 'lg:block'}
            `}
          >
            <BrandCard brand={item} genderString={gender.string} />
          </li>
        ))}
      </ul>

      <div className="md:w-[18rem] ml-auto mt-10">
        <Button
          type="black-outlined"
          ariaLabel="Ir para a Galeria de Looks"
          width="100%"
          justify="space-between"
          href={`${gender.string}/brands`}
        >
          <span>Ver todas as marcas</span>
          <KeyboardArrowRightIcon
            className="translate-x-2"
            sx={{ fontSize: 28 }}
          />
        </Button>
      </div>
    </div>
  );
};
