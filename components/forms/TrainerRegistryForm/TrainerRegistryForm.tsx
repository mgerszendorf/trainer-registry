'use client'

import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import styled from "@emotion/styled";
import { CurrentDate } from "@/components/common/CurrentDate/CurrentDate";
import { Box } from "@mui/material";
import { CustomInput } from "@/components/common/CustomInput/CustomInput";
import { CustomAutocomplete } from "@/components/common/AutocompleteDropdown/AutocompleteDropdown";
import { SelectedPokemonBox } from "./SelectedPokemonBox/SelectedPokemonBox";
import { CustomButton } from "@/components/common/CustomButton/CustomButton";
import { VariantType } from "@/components/common/CustomButton/variantTypes";
import { usePokemonSearch } from "@/hooks/usePokemonSearch";
import { TrainerInfo } from "@/types/trainer.types";
import { BasicPokemon } from "@/types/pokemon.types";
import { SuccessModal } from "@/components/SuccessModal/SuccessModal";
import { validateTrainerForm } from "@/utils/validation";

const StyledForm = styled("form")(({ theme }) => ({
    width: '100vw',
    maxWidth: '544px',
    margin: '0 auto',
    padding: '32px',
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: '2px',
    fontFamily: theme.typography.fontFamily,
}));

export const TrainerRegistryForm = () => {
    const [formData, setFormData] = useState<TrainerInfo>({
        name: "",
        age: "",
        pokemon: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        age: "",
        pokemon: ""
    });
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const debouncedSetQuery = debounce((value: string) => setQuery(value), 300);
    const { searchResults, isLoading, error, setQuery, setSelectedPokemon, pokemonDetails, isLoadingDetails } = usePokemonSearch();

    useEffect(() => {
        if (isSuccessModalOpen && document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    }, [isSuccessModalOpen]);


    const handleReset = () => {
        setFormData({ name: "", age: "", pokemon: "" });
        setSelectedPokemon(null);
        setIsSuccessModalOpen(false);
        setErrors({ name: "", age: "", pokemon: "" });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { errors, isValid } = validateTrainerForm(formData);
        setErrors(errors);
        if (isValid) {
            setIsSuccessModalOpen(true);
        }
    };


    const handleChange = (field: keyof TrainerInfo, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    return (
        <>
            <StyledForm onSubmit={handleSubmit}>
                <CurrentDate />
                <Box sx={{
                    display: 'flex',
                    marginTop: '24px',
                    gap: '24px',
                }}>
                    <CustomInput
                        label={"Trainer's name"}
                        placeholder={"Trainer's name"}
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <CustomInput
                        label={"Trainer's age"}
                        placeholder={"Trainer's age"}
                        value={formData.age}
                        type="number"
                        onChange={(e) => handleChange("age", e.target.value)}
                        error={!!errors.age}
                        helperText={errors.age}
                    />
                </Box>
                <Box sx={{ marginTop: '24px' }}>
                    <CustomAutocomplete
                        label={"Pokemon name"}
                        options={searchResults.map((result: BasicPokemon) => result.name)}
                        loading={isLoading}
                        error={Boolean(error) || !!errors.pokemon}
                        helperText={errors.pokemon}
                        value={formData.pokemon}
                        onInputChange={(e, value) => debouncedSetQuery(value)}
                        onChange={(e, newValue) => {
                            handleChange("pokemon", newValue || "");
                            setSelectedPokemon(newValue);
                        }}
                    />
                </Box>
                <SelectedPokemonBox pokemon={pokemonDetails} loading={isLoadingDetails} />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: { xs: "center", sm: "flex-end" },
                        mt: 3,
                    }}
                >
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

            <SuccessModal
                open={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                onReset={handleReset}
            />
        </>
    );
};
