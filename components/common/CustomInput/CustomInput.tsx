import React from "react";
import { TextField, TextFieldProps as MuiTextFieldProps } from "@mui/material";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";

const StyledContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  fontFamily: theme.typography.fontFamily,
  width: "100%",
  gap: "2px",
}));

const StyledLabel = styled.label(({ theme }) => ({
  fontSize: "12px",
  lineHeight: "20px",
  marginBottom: "5px",
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.grey[100],
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  ".MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${theme.palette.grey[400]}`,
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  },
  ".MuiInputBase-root": {
    fontFamily: theme.typography.fontFamily,
    borderRadius: "2px",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",

    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: `1px solid ${theme.palette.primary.main}`,
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: `1px solid ${theme.palette.primary.main}`,
      boxShadow: `0 0 0 4px ${theme.palette.primary.light}`,
    },
  },
  ".MuiInputBase-input": {
    padding: "10px 14px",
    color: theme.palette.grey[100],
    fontSize: '14px',
    textOverflow: "ellipsis",

    "&::placeholder": {
      color: theme.palette.grey[200],
      opacity: 1,
    },
  },
  ".MuiFormHelperText-root": {
    fontFamily: theme.typography.fontFamily,
    fontSize: "12px",
    lineHeight: "20px",
    margin: "5px 0 0 1px",
    color: theme.palette.grey[100],
  },
  "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${theme.palette.grey[400]}`,
  },
  "& .MuiOutlinedInput-root.Mui-error:hover .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  "& .MuiOutlinedInput-root.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: `0 0 0 4px ${theme.palette.primary.light}`,
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: theme.palette.error.main,
  },
}));


interface CustomInputProps extends Omit<MuiTextFieldProps, 'variant'> {
  label: string;
  placeholder?: string;
  helperText?: string;
}

export const CustomInput = ({
  label,
  placeholder = "Enter text...",
  helperText = "",
  ...props
}: CustomInputProps) => {
  const theme = useTheme();

  return (
    <StyledContainer theme={theme}>
      <StyledLabel theme={theme}>{label}</StyledLabel>
      <StyledTextField
        variant="outlined"
        fullWidth
        placeholder={placeholder}
        helperText={helperText}
        theme={theme}
        {...props}
      />
    </StyledContainer>
  );
};
