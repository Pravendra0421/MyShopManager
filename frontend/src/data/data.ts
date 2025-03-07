import Avocado from "../assets/Avacado.jpg";
import Apple from "../assets/apple.jpg";
import orange from "../assets/orange.jpg";
import Banana from "../assets/banana.jpg";
import papaya from "../assets/papaya.jpg";
import guava from "../assets/guava.jpg";
import palmgranets from "../assets/palmgranate.jpg";
import pineapple from "../assets/pineapple.jpg";
import grapes from "../assets/Grapes.jpg";
import peaches from "../assets/peaches.jpg";
import pears from "../assets/pears.jpg";
import strawberries from "../assets/strawberries.jpg";
import broccoli from "../assets/broccoli.jpg";
import cabbage from "../assets/cabbage.jpeg";
import capsicum from "../assets/capsicum.jpg";
import carrot from "../assets/carrot.jpg";
import corn from "../assets/corn.jpg";
import cucumber from "../assets/cucumber.jpg";
import garlic from "../assets/garlic.jpg";
import onion from "../assets/onion.jpeg";
import pea from "../assets/pea.jpg";
import potato from "../assets/potato.png";
import pumpkin from "../assets/pumpkin.jpg";
import radish from "../assets/radish.png";
import spinach from "../assets/spinach.jpg";
import tomato from "../assets/tomato.jpg";

export type ItemType = "fruits" | "vegetables";
export const predefineItems: Record<ItemType, { name: string; image: string }[]> = {
    fruits: [
        { name: "Avocados", image: Avocado },
        { name: "Apple", image: Apple },
        { name: "Orange", image: orange },
        { name: "Papaya", image: papaya },
        { name: "Banana", image: Banana },
        { name: "Guava", image: guava },
        { name: "Pomegranate", image: palmgranets },
        { name: "Pineapple", image: pineapple },
        { name: "Grapes", image: grapes },
        { name: "Peaches", image: peaches },
        { name: "Pears", image: pears },
        { name: "Strawberries", image: strawberries },
    ],
    vegetables: [
        { name: "Broccoli", image: broccoli },
        { name: "Cabbage", image: cabbage },
        { name: "Capsicum", image: capsicum },
        { name: "Carrot", image: carrot },
        { name: "Corn", image: corn },
        { name: "Cucumber", image: cucumber },
        { name: "Garlic", image: garlic },
        { name: "Onion", image: onion },
        { name: "Pea", image: pea },
        { name: "Potato", image: potato },
        { name: "Pumpkin", image: pumpkin },
        { name: "Radish", image: radish },
        { name: "Spinach", image: spinach },
        { name: "Tomato", image: tomato },
    ],
};
