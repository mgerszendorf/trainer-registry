import React from "react";
import { Button, ButtonProps } from "@mui/material";
import styled from "@emotion/styled";
import { VariantType } from "./variantTypes";

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "variantType",
})<{ variantType?: VariantType.Primary | VariantType.Soft }>(({ theme, variantType }) => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: "bold",
  textTransform: "none",
  padding: "10px 24px",
  borderRadius: "2px",
  border: "none",
  fontSize: "14px",
  color: variantType === VariantType.Primary ? theme.palette.primary.contrastText : theme.palette.grey[100],
  backgroundColor: variantType === VariantType.Primary ? theme.palette.primary.main : theme.palette.grey[400],
  "&:hover": {
    backgroundColor: variantType === VariantType.Primary ? theme.palette.primary.dark : theme.palette.grey[300],
  },
  "&:focus": {
    outline: `4px solid ${variantType === VariantType.Primary ? theme.palette.primary.light : theme.palette.primary.light}`,
  },
}));

export const CustomButton = ({
  variantType = VariantType.Primary,
  ...props
}: ButtonProps & { variantType?: VariantType.Primary | VariantType.Soft }) => {
  return <StyledButton variantType={variantType} {...props} />;
};
