'use client'

import React from "react";
import { Box, Typography, useTheme, styled, CircularProgress } from "@mui/material";
import { DetailedPokemon, PokemonType } from "@/types/pokemon.types";

interface SelectedPokemonBoxProps {
    pokemon: DetailedPokemon | null;
    loading: boolean;
}

const StyledPokemonBox = styled(Box)(({ theme }) => ({
    height: 'auto',
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: '2px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    marginTop: '24px',
    backgroundColor: theme.palette.background.paper,
    minHeight: '250px'
}));

const TypeBadge = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.grey[100],
    padding: '4px 8px',
    borderRadius: '16px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: theme.typography.fontFamily,
    textTransform: 'capitalize',
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 400,
    marginLeft: '8px',
}));

export const SelectedPokemonBox = ({ pokemon, loading }: SelectedPokemonBoxProps) => {
    const theme = useTheme();

    const commonTextStyles = {
        fontSize: "14px",
        lineHeight: "20px",
        fontWeight: 400,
        fontFamily: theme.typography.fontFamily,
        marginBottom: '8px',
    };

    return (
        <StyledPokemonBox>
            {loading ? (
                <CircularProgress size={40} sx={{ color: theme.palette.primary.main }} />
            ) : !pokemon ? (
                <Typography
                    sx={{
                        ...commonTextStyles,
                        color: theme.palette.grey[200],
                    }}
                >
                    Your pokemon
                </Typography>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: { xs: 'column', sm: 'row' },
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            width: { xs: '100%', sm: '196px' },
                            maxWidth: '196px',
                            flexShrink: 0,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            src={pokemon.sprites.front_default}
                            alt={`${pokemon.name} sprite`}
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>
                    <Box ml={{ xs: 0, sm: 3 }} mt={{ xs: 2, sm: 0 }} textAlign={{ xs: 'center', sm: 'left' }}>
                        <Typography sx={{ commonTextStyles, textTransform: 'capitalize' }}>
                            Name: {pokemon.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' }, marginBottom: '8px' }}>
                            <Typography
                                sx={{
                                    ...commonTextStyles,
                                    marginBottom: 0,
                                }}
                            >
                                Type:
                            </Typography>
                            {pokemon.types.map((typeObj: PokemonType) => (
                                <TypeBadge key={typeObj.type.name}>
                                    {typeObj.type.name}
                                </TypeBadge>
                            ))}
                        </Box>
                        <Typography sx={commonTextStyles}>
                            Base experience: {pokemon.base_experience}
                        </Typography>
                        <Typography sx={commonTextStyles}>
                            Id: {pokemon.id}
                        </Typography>
                    </Box>
                </Box>
            )}
        </StyledPokemonBox>
    );
};
