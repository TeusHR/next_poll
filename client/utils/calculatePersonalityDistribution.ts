import {Calc} from "@/components/Poll";
import tableMapping from "@/utils/TableMapping";

export const calculatePersonalityDistribution = (answers: Calc[]): number[] => {
    const typeScores = Array(12).fill(0);
    for (let q = 0; q < answers.length; q++) {
        const answer = answers[q];
        for (let t = 0; t < 12; t++) {
            const key = tableMapping[q]?.[t];
            if (key) typeScores[t] += answer[key] ?? 0;
        }
    }
    return typeScores;
};
