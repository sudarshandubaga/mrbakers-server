import { Product } from "../types";

export const generateProductDescription = async (
    productName: string,
    category: string
): Promise<{ description: string; ingredients: string[] }> => {
    const staticDescriptions: Record<
        string,
        { description: string; ingredients: string[] }
    > = {
        croissant: {
            description:
                "Buttery, flaky pastry with a delicate, golden exterior.",
            ingredients: ["Flour", "Butter", "Yeast", "Milk", "Salt"],
        },
        sourdough: {
            description:
                "Tangy, crusty artisan bread with a soft, chewy interior.",
            ingredients: [
                "Flour",
                "Water",
                "Salt",
                "Sourdough Starter",
                "Time",
            ],
        },
        "chocolate-cake": {
            description:
                "Rich, decadent chocolate cake with layers of pure indulgence.",
            ingredients: ["Flour", "Cocoa", "Sugar", "Eggs", "Butter"],
        },
    };

    const key = productName.toLowerCase();
    return (
        staticDescriptions[key] || {
            description: "A delicious treat made with love from our bakery.",
            ingredients: ["Flour", "Sugar", "Love"],
        }
    );
};

export const generateDashboardInsights = async (
    salesData: any[],
    pendingOrdersCount: number
): Promise<string> => {
    return "Keep up the great work! Sales are looking steady.";
};
