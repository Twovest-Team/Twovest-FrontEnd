export default function formatCompactNumbers (number)
{
    const formatador = Intl.NumberFormat("en", { notation: "compact" });
    return formatador.format(number);
}