import Button from "../buttons/Button"

export default function HistoricoComprasButtons() {
    return (
        <div className="mt-2 mb-6 mx-2">
            <ul className="flex overflow-x-hidden">
                <li className="mx-2">
                    <Button
                        height="44px"
                        href='/'
                        ariaLabel="Todas as compras"
                        type="black"
                    >
                        Todas
                    </Button>
                </li>
                <li className="mx-2">
                    <Button
                        height="44px"
                        href='/'
                        ariaLabel="Compras entregues"
                        type="grey"
                    >
                        Entregues
                    </Button>
                </li>
                <li className="mx-2">
                    <Button
                        height="44px"
                        href='/'
                        ariaLabel="Compras pendentes"
                        type="grey"
                    >
                        Pendentes
                    </Button>
                </li>
                <li className="mx-2">
                    <Button
                        height="44px"
                        href='/'
                        ariaLabel="Compras canceladas"
                        type="grey"
                    >
                        Canceladas
                    </Button>
                </li>
            </ul>
        </div>
    )
}