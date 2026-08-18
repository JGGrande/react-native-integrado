import { Evento } from "@/types/evento";

// Dados mock. Em um app real, viriam de uma API.
export const EVENTS: Evento[] = [
  {
    id: "1",
    title: "Workshop de React Native",
    date: "10/09/2025",
    time: "19h00",
    location: "Auditório Central - Campo Mourão",
    price: 0,
    category: "Tecnologia",
    description:
      "Workshop prático sobre desenvolvimento mobile com React Native e Expo. " +
      "Vamos construir um app do zero, explorando componentes, navegação e " +
      "consumo de APIs. Traga seu notebook com o ambiente configurado.",
  },
  {
    id: "2",
    title: "Palestra: Arquitetura de Software",
    date: "15/09/2025",
    time: "20h00",
    location: "Sala 12 - Bloco B",
    price: 0,
    category: "Tecnologia",
    description:
      "Discussão sobre padrões arquiteturais, SOLID e boas práticas para " +
      "sistemas escaláveis. Voltada para quem já programa e quer evoluir a " +
      "organização dos seus projetos.",
  },
  {
    id: "3",
    title: "Show da Banda Local",
    date: "20/09/2025",
    time: "21h00",
    location: "Praça da Música",
    price: 40,
    category: "Música",
    description:
      "Apresentação da banda local com repertório autoral e covers. " +
      "Ingressos limitados. Área externa com food trucks.",
  },
  {
    id: "4",
    title: "Feira de Empreendedorismo",
    date: "25/09/2025",
    time: "09h00",
    location: "Centro de Eventos",
    price: 0,
    category: "Negócios",
    description:
      "Feira reunindo startups e empreendedores da região. Rodadas de " +
      "networking, mentorias rápidas e apresentação de projetos.",
  },
  {
    id: "5",
    title: "Curso Intensivo de Python",
    date: "01/10/2025",
    time: "18h30",
    location: "Laboratório de Informática",
    price: 120,
    category: "Tecnologia",
    description:
      "Curso intensivo de fim de semana cobrindo fundamentos de Python, " +
      "estruturas de dados e uma introdução a automação de tarefas.",
  },
];
