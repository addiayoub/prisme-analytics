import { Article, Balance, Newspaper } from "@mui/icons-material";
import {
  BackwardItem,
  Chart,
  Document,
  User,
  Wallet,
  Wallet1,
  WalletMinus,
  WalletMoney,
} from "iconsax-react";
import {
  Activity,
  Dribbble,
  Layers,
  Box,
  BarChart2,
  Folder,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Compass,
  Globe,
  Pocket,
  DollarSign,
  BarChart,
  List,
} from "react-feather";
import { ChartScatterIcon } from "../../../icons/Icons";

export const sidebarData = [
  {
    title: "News",
    icon: Article,
    link: "",
    isPrivate: false,
  },
  {
    icon: BackwardItem,
    title: "Tableau de bord",
    isPrivate: false,
    link: null,
    isPrivate: false,
    iconClosed: ChevronDown,
    iconOpened: ChevronUp,
    subMenu: [
      {
        title: "Actions",
        link: "dashboard-actions",
        icon: Layers,
      },
      {
        title: "Obligataire",
        icon: DollarSign,
        link: "dashboard-taux",
      },
    ],
  },
  {
    icon: User,
    title: "Utilisateurs",
    link: "users",
    isPrivate: true,
  },
  {
    icon: BarChart,
    title: "Statistiques",
    link: "statistiques",
    isPrivate: true,
  },
  {
    icon: Activity,
    title: "Analyse Bourse",
    link: null,
    isPrivate: false,
    iconClosed: ChevronDown,
    iconOpened: ChevronUp,
    subMenu: [
      {
        title: "Profil technique",
        title: "Analyse Sectorielle",
        link: "analyse-sectorielle",
        icon: Layers,
      },
      {
        title: "Titre côté",
        link: "profil-financier",
        iconClosed: ChevronDown,
        iconOpened: ChevronUp,
        icon: Box,
        nestedMenu: [
          {
            title: "Profil technique",
            link: "analyse-chartiste",
            icon: BarChart2,
          },
          {
            title: "Profil financier",
            link: "profil-financier",
            icon: BarChart2,
          },
        ],
      },
    ],
  },
  {
    title: "Création de portefeuille",
    icon: Layers,
    isPrivate: false,
    link: null,
    iconClosed: ChevronDown,
    iconOpened: ChevronUp,
    subMenu: [
      {
        title: "Actions BVC",
        link: "markowitz",
        iconClosed: ChevronDown,
        iconOpened: ChevronUp,
        icon: Dribbble,
        nestedMenu: [
          {
            title: "Markowitz",
            link: "markowitz",
            icon: Dribbble,
          },
          {
            title: "Black Litterman",
            link: "black-litterman",
            icon: Briefcase,
          },
        ],
      },
      // {
      //   title: "Black Litterman",
      //   link: "black-litterman",
      //   icon: Briefcase,
      // },
      {
        title: "Fonds de fonds",
        link: null,
        icon: Box,
        iconClosed: ChevronDown,
        iconOpened: ChevronUp,
        icon: Dribbble,
        nestedMenu: [
          {
            title: "Fonds de fonds",
            link: "opcvm",
            icon: Box,
            icon: Dribbble,
          },
          {
            title: "Black Litterman",
            link: "black-litterman-opc",
            icon: Briefcase,
          },
        ],
      },
    ],
  },

  // {
  //   icon: Dribbble,
  //   title: "Markowitz",
  //   link: "markowitz",
  //   isPrivate: false,
  // },
  // {
  //   icon: Activity,
  //   title: "Analyses",
  //   link: "analyses",
  //   isPrivate: false,
  // },
  // {
  //   icon: Box,
  //   title: "OPCVM",
  //   link: "opcvm",
  //   isPrivate: false,
  // },
  // {
  //   icon: BarChart2,
  //   title: "Backtest",
  //   link: "backtest",
  //   isPrivate: false,
  // },
  // {
  //   icon: Folder,
  //   title: "Consultation",
  //   link: "portefeuilles",
  //   isPrivate: false,
  // },
  {
    title: "Simulation",
    icon: Folder,
    link: null,
    isPrivate: false,
    iconClosed: ChevronDown,
    iconOpened: ChevronUp,
    subMenu: [
      {
        title: "Consultation",
        link: "consultation",
        icon: List,
      },
      {
        title: "Tradebot",
        link: "backtest",
        icon: BarChart2,
      },
      {
        title: "Backtest",
        link: "portefeuilles",
        icon: Pocket,
      },
    ],
  },
  {
    title: "Analyse OPCVM",
    // icon: Briefcase,
    icon: Wallet,
    link: null,
    isPrivate: false,
    iconClosed: ChevronDown,
    iconOpened: ChevronUp,
    subMenu: [
      {
        title: "Analyse quantitative",
        link: "analyse-quantitative",
        icon: Globe,
      },
      {
        title: "Tracking des fonds",
        link: "tracking",
        icon: Compass,
      },
      {
        title: "Composition OPCVM",
        link: "composition-opcvm",
        icon: Compass,
      },
    ],
  },
  {
    title: "Analyse MBI",
    link: "analyse-mbi",
    icon: Activity,
  },
];
