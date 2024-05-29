import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import getStyles from "@/utils/db/getStyles";


export const StylesSubmitLook = ({ onDataFilled }) => {
    
    const [styles, setStyles] = useState([]);
    const [selectedStyles, setSelectedStyles] = useState([]);
  
    useEffect(() => {
      const Styles = async () => {
        const styleDB = await getStyles();
        setStyles(styleDB);
      };
      Styles();
    }, []);
  
    const toggleStyleSelection = (styleId) => {
      if (selectedStyles.includes(styleId)) {
        setSelectedStyles(selectedStyles.filter(id => id !== styleId));
      } else {
        if (selectedStyles.length < 2) {
          setSelectedStyles([...selectedStyles, styleId]);
        } else {
          console.log("Você pode selecionar no máximo 2 estilos.");
        }
      }
      onDataFilled(selectedStyles); // Corrigido para passar selectedStyles
    };
  
    return (
      <div className="mb-4">
        <Accordion className="shadow border rounded w-full py-2 px-3 text-secondary-700 appearance-none mb-6">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <h2>Estilos<span className="ml-2 text-green-500">({selectedStyles.length}/2)</span></h2>
          </AccordionSummary>
          <AccordionDetails>
            {styles.map(style => (
              <div key={style.id} className="flex items-center mb-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedStyles.includes(style.id)}
                    onChange={() => toggleStyleSelection(style.id)}
                    className="form-checkbox h-5 w-5 text-green-500"
                  />
                  <span className="ml-2">{style.name}</span>
                </label>
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      </div>
    );
  };
