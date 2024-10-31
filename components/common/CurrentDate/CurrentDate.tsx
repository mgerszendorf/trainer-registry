import React from "react";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useCurrentTime } from "@/hooks/useCurrencyTime";

export const CurrentDate = () => {
    const theme = useTheme();
    const { currentTime, isLoading, error } = useCurrentTime();

    return (
        <Typography
            variant="h6"
            align="right"
            sx={{
                fontFamily: theme.typography.fontFamily,
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: "20px",
            }}
        >
            {isLoading ? "Loading..." : error ? "Error fetching time" : currentTime}
        </Typography>
    );
};
