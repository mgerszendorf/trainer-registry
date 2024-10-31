import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

interface SelectedPokemonBoxProps {
    pokemon: string;
}

export const SelectedPokemonBox = ({ pokemon }: SelectedPokemonBoxProps) => {
    const theme = useTheme();

    return (
        <Box my={2} sx={{ textAlign: "center", mt: 3, mb: 0 }}>
            <Box
                sx={{
                    height: "254px",
                    border: `1px solid ${theme.palette.grey[400]}`,
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "12px",
                        lineHeight: "20px",
                        fontFamily: theme.typography.fontFamily,
                        color: theme.palette.grey[200],
                    }}
                >
                    {pokemon || "Your pokemon"}
                </Typography>
            </Box>
        </Box>
    );
};
