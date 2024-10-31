import React from "react";
import { Autocomplete, TextField, AutocompleteProps, Paper, PaperProps, CircularProgress } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";

const StyledContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  fontFamily: theme.typography.fontFamily,
  marginTop: "24px"
}));

const StyledLabel = styled("label")(({ theme }) => ({
  fontSize: "12px",
  lineHeight: "20px",
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.grey[100],
  marginBottom: "5px",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  ".MuiOutlinedInput-root": {
    padding: 0,
    ".MuiAutocomplete-input": {
      padding: "10px 14px",
      color: theme.palette.grey[100],
      fontSize: "14px",
      fontFamily: theme.typography.fontFamily,
      textOverflow: "ellipsis",
      textTransform: 'capitalize',
      "&::placeholder": {
        color: theme.palette.grey[200],
        opacity: 1,
      },
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: `1px solid ${theme.palette.primary.main}`,
      boxShadow: `0 0 0 4px ${theme.palette.primary.light}`,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.grey[400],
      transition: "border 0.2s, box-shadow 0.2s",
    },
  },
  ".MuiFormHelperText-root": {
    fontFamily: theme.typography.fontFamily,
    fontSize: "12px",
    lineHeight: "20px",
    margin: "5px 0 0 2px",
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

const StyledOption = styled("li")(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  padding: "10px 14px !important",
  color: theme.palette.grey[100],
  cursor: "pointer",
  fontSize: "14px",
  textTransform: 'capitalize',
  backgroundColor: "transparent !important",
  "&:hover": {
    backgroundColor: `${theme.palette.primary.light} !important`,
  },
  '&[aria-selected="true"]': {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    backgroundColor: "transparent !important",
  },
}));

const CustomExpandLessIcon = styled(ExpandLessIcon)(({ theme }) => ({
  fontSize: "24px",
  color: theme.palette.grey[100],
}));

const CustomPaper = (props: PaperProps) => {
  return (
    <Paper
      {...props}
      style={{
        boxShadow: "0px 4px 10px 2px rgba(0, 0, 0, 0.1)",
      }}
    />
  );
};

interface CustomAutocompleteProps
  extends Omit<AutocompleteProps<string, false, false, false>, "renderInput"> {
  label: string;
  placeholder?: string;
  helperText?: string;
  loading?: boolean;
  error?: boolean;
}

export const CustomAutocomplete = ({
  label,
  placeholder = "Choose",
  helperText,
  loading = true,
  error = false,
  options,
  ...props
}: CustomAutocompleteProps) => {
  const theme = useTheme();

  return (
    <StyledContainer>
      <StyledLabel theme={theme}>{label}</StyledLabel>
      <Autocomplete
        {...props}
        options={options}
        PaperComponent={CustomPaper}
        popupIcon={
          loading ? (
            <CircularProgress size={24} sx={{ color: theme.palette.grey[100] }} />
          ) : (
            <CustomExpandLessIcon theme={theme} />
          )
        }
        clearIcon={null}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            variant="outlined"
            placeholder={placeholder}
            helperText={helperText}
            error={error}
            theme={theme}
          />
        )}
        renderOption={(props, option, { selected }) => (
          <StyledOption {...props} aria-selected={selected} theme={theme}>
            {option}
          </StyledOption>
        )}
      />
    </StyledContainer>
  );
};
