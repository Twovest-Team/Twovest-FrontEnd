
import  {Buttons}  from "../components/Buttons";

export default function Home() {

  return (

    <main>

  <div className="flex gap-4">
    <Buttons btnState="defaultMain" text="Sustentável" icon="navigateNext" btnSize="menuSize" />
    <Buttons btnState="defaultMain" text="Promoções" icon="navigateNext" btnSize="menuSize" />
    
</div>

      <Buttons btnState="defaultMain" text="Proximo" icon="navigateNext" btnSize="mediumSize"/>
      <Buttons btnState="secondaryMain" text="Registar Conta" btnSize="mediumSize"/>
      <Buttons btnState="secondaryMain" text="Continuar com Google" btnSize="mediumSizeSocials" icon="google"/>
      <Buttons btnState="secondaryMain" text="Continuar com Facebook" btnSize="mediumSizeSocials" icon="facebook"/>
      <Buttons btnState="secondaryMain" text="Continuar com Maça" btnSize="mediumSizeSocials" icon="apple"/>
    </main>
    
   
  );
  
}

