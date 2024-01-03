
import  {Buttons}  from "../components/Buttons";

export default function Home() {

  return (
    <main>

    <div className="flex gap-4">
      <Buttons btnState="defaultMain" text="Sustentável" icon="navigateNext" btnSize="menuSize" />
      <Buttons btnState="defaultMain" text="Promoções" icon="offer" btnSize="menuSize" />
  
  </div>
  
        <Buttons aria-label="Next" btnState="defaultMain" text="Proximo" icon="navigateNext" btnSize="mediumSize"/>
        <Buttons btnState="secondaryMain" text="Registar Conta" btnSize="mediumSize"/>
        <Buttons btnState="secondaryMain" text="Continuar com Google" btnSize="mediumSizeSocials" icon="google"/>
        <Buttons btnState="secondaryMain" text="Continuar com Facebook" btnSize="mediumSizeSocials" icon="facebook"/>
        <Buttons btnState="secondaryMain" text="Continuar com Maça" btnSize="mediumSizeSocials" icon="apple"/>
        <Buttons btnState="secondaryMain" text="Redefinir" btnSize="mediumSizeSocials" icon="redifine"/>
        <Buttons btnState="defaultMain" text="Voltar a loja" btnSize="mediumSize"/>
      </main>
    
   
  );
  
}

