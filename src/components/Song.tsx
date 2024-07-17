import { Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";

export function songNotFound(showModal: boolean, handleCloseModal: () => void) {
  return (
    <Modal open={showModal} onClose={handleCloseModal}>
      <ModalDialog>
        <ModalClose />
        <Typography level="h4" component="h2">
          Song Not Found
        </Typography>
        <p>The selected song file does not exist.</p>
      </ModalDialog>
    </Modal>
  );
}
