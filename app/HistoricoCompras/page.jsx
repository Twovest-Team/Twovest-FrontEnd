import NavigationTitle from "@/components/providers/NavigationTitle";
import Button from "@/components/buttons/Button";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HistoricoComprasButtons from "@/components/sections/HistoricoComprasButtons";
import HistoricoComprasDados from "@/components/sections/HistoricoComprasDados";
import HistoricoComprasArtigos from "@/components/sections/HistoricoComprasArtigos";

const HistoricoCompras = () => {
  return (
    <div className="h-full">
      <>
        <NavigationTitle titleText={"Histórico de Compras"} />
      </>

      <HistoricoComprasButtons />

      <div className="mx-2 my-6">
        {/* caso queira tornar um aberto por default, inserir no Accordion - defaultExpanded */}
        <Accordion className="my-4 border-2 border-grey rounded">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="py-0.5"
          >
            <div>
              <p>01/12/2023</p>
              <p className="text_caption text-secondary">Encomenda nº 305862</p>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <HistoricoComprasDados />

            <HistoricoComprasArtigos />
          </AccordionDetails>
          <AccordionActions className="text-center justify-center w-full">
            <Button className="w-full" type="black">
              Descarregar Fatura
            </Button>
          </AccordionActions>
        </Accordion>

        <Accordion className="my-4 border-2 border-grey rounded">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="py-0.5"
          >
            <div>
              <p>01/12/2023</p>
              <p className="text_caption text-secondary">Encomenda nº 305862</p>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <HistoricoComprasDados />

            <HistoricoComprasArtigos />
          </AccordionDetails>
          <AccordionActions className="text-center justify-center w-full">
            <Button className="w-full" type="black">
              Descarregar Fatura
            </Button>
          </AccordionActions>
        </Accordion>
      </div>
    </div>
  );
};

export default HistoricoCompras;
