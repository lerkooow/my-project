/* eslint-disable react/prop-types */
import { Box, Fade, Modal, Typography } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalWarning = ({ open, handleClose }) => {
    return (
        <Modal
            data-testid="modal"
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        Incorrect input
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        Username and password are required
                    </Typography>
                </Box>
            </Fade>
        </Modal>
    );
};

export default ModalWarning;
