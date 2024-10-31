import React from "react";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const CurrentDate = () => {
    const theme = useTheme();

    return (
        <Typography
            variant="h6"
            align="right"
            sx={{ fontFamily: theme.typography.fontFamily, fontSize: "12px", fontWeight: 400, lineHeight: "20px" }}
        >
            {new Date().toLocaleDateString("en-GB", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            })}
        </Typography>
    )
};
