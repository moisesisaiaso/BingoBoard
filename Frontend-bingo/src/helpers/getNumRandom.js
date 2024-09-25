const numbersBoard = Array.from({ length: 75 }, (_, i) => i + 1);

const letters = ["B", "I", "N", "G", "O"];

export const getNumRandom = (markedNumbers) => {
    const unMarked = numbersBoard.filter((number) => !markedNumbers.includes(number));

    const randomIndex = Math.floor(Math.random() * unMarked.length);

    const number = unMarked[randomIndex];
    const letterIndex = Math.floor((number - 1) / 15);
    const letter = letters[letterIndex];

    return [letter, number];
};
