'use client'

import React, { useState } from "react";
import styled from "@emotion/styled";
import { CurrentDate } from "@/components/common/CurrentDate/CurrentDate";
import { Box } from "@mui/material";
import { CustomInput } from "@/components/common/CustomInput/CustomInput";
import { CustomAutocomplete } from "@/components/common/AutocompleteDropdown/AutocompleteDropdown";
import { SelectedPokemonBox } from "./SelectedPokemonBox/SelectedPokemonBox";
import { CustomButton } from "@/components/common/CustomButton/CustomButton";
import { VariantType } from "@/components/common/CustomButton/variantTypes";

const StyledForm = styled("form")(({ theme }) => ({
    width: '100vw',
    maxWidth: '544px',
    margin: '0 auto',
    padding: '32px',
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: '2px',
    fontFamily: theme.typography.fontFamily,
}));

interface TrainerData {
    trainerName: string;
    trainerAge: string;
    pokemon: string;
}

export const TrainerRegistryForm = () => {
    const [formData, setFormData] = useState<TrainerData>({
        trainerName: "",
        trainerAge: "",
        pokemon: "",
    });

    const handleReset = () => {
        setFormData({ trainerName: "", trainerAge: "", pokemon: "" });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    const handleChange = (field: keyof TrainerData, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <CurrentDate />
            <Box sx={{
                display: 'flex',
                marginTop: '24px',
                gap: '24px',
            }}>
                <CustomInput label={"Trainer's name"} placeholder={"Trainer's name"} />
                <CustomInput label={"Trainer's age"} placeholder={"Trainer's age"} />
            </Box>
            <Box>
                <CustomAutocomplete
                    label={"Pokemon name"}
                    options={["Pikachu", "Charmander", "Bulbasaur"]}
                    value={formData.pokemon}
                    onChange={(e, newValue) => handleChange("pokemon", newValue || "")}
                />
            </Box>
            <SelectedPokemonBox pokemon={""} />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <CustomButton
                    variantType={VariantType.Soft}
                    onClick={handleReset}
                    sx={{ mr: 2 }}
                >
                    Reset
                </CustomButton>
                <CustomButton
                    variantType={VariantType.Primary}
                    type="submit"
                >
                    Submit
                </CustomButton>
            </Box>
        </StyledForm>
    );
};
