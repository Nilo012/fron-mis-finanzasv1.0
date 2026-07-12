import logo from "./logo.png";
import fondo1 from "./fondo1.svg";
import { List } from "lucide-react";
import { Wallet } from "lucide-react";
import { Coins } from "lucide-react";
import { FunnelPlus } from "lucide-react";
import { ChartNoAxesCombined } from "lucide-react";

export const assets={
    logo, fondo1
}

export const SIDE_BAR_DATA=[
    {
        id: "01",
        label:"Dashboard",
        icon: ChartNoAxesCombined,
        path:"/dashboard",
        
    },
    {
        id: "02",
        label:"Categoria",
        icon: List,
        path:"/category",
    },
    {
        id: "03",
        label:"Ingresos",
        icon: Wallet,
        path:"/income",
    },
    {
        id: "04",
        label:"Gastos",
        icon: Coins,
        path:"/expense",
    },
    {
        id: "05",
        label:"Filtrar",
        icon: FunnelPlus,
        path:"/filter",
    },
]