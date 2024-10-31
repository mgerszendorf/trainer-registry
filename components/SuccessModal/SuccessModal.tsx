import React from "react";
import { Dialog, DialogContent, Typography } from "@mui/material";
import { CustomButton } from "../common/CustomButton/CustomButton";
import { VariantType } from "../common/CustomButton/variantTypes";

interface SuccessModalProps {
    open: boolean;
    onClose: () => void;
    onReset: () => void;
}

export const SuccessModal = ({ open, onClose, onReset }: SuccessModalProps) => {
    return (
        <Dialog open={open} onClose={onClose} slotProps={{
            backdrop: {
                sx: {
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                },
            },
        }}>
            <DialogContent sx={{ textAlign: 'center', padding: '32px 120px', }}>
                <Typography variant="h4" sx={{ fontFamily: 'var(--font-ibm-vga)', fontSize: '40px', lineHeight: '40px', mb: '32px' }}>
                    Success
                </Typography>
                <CustomButton
                    variantType={VariantType.Primary}
                    onClick={onReset}
                >
                    Reset form
                </CustomButton>
            </DialogContent>
        </Dialog>
    );
};
