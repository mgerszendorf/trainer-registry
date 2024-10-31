import { TrainerInfo } from "@/types/trainer.types";

export const validateTrainerForm = (formData: TrainerInfo) => {
    const errors = { name: "", age: "", pokemon: "" };
    let isValid = true;

    if (!formData.name || formData.name.length < 2 || formData.name.length > 20) {
        errors.name = "Required from 2 to 20 symbols";
        isValid = false;
    }

    if (!formData.age || isNaN(Number(formData.age)) || Number(formData.age) < 16 || Number(formData.age) > 99) {
        errors.age = "Required range from 16-99";
        isValid = false;
    }

    if (!formData.pokemon) {
        errors.pokemon = "Choose something";
        isValid = false;
    }

    return { errors, isValid };
};
