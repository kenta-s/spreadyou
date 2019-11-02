import React from 'react';
import { connect } from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import {
  postMyProduct,
} from "../actions/myProduct"

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  textField: {
    width: '100%',
  }
}));

const NewProductModal = ({open, setOpen, postMyProduct}) => {
  const classes = useStyles();
  const [summary, changeSummary] = React.useState('');
  const [description, changeDescription] = React.useState('');
  const [url, changeUrl] = React.useState('');
  // const [open, setOpen] = React.useState(defaultOpen);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    handleClose()
    postMyProduct(summary, description, url)
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2>プロダクトの情報を入力してください</h2>
            <form className={classes.container} noValidate autoComplete="off">
              <div>
                <TextField
                  label="summary"
                  className={classes.textField}
                  value={summary}
                  onChange={(e) => changeSummary(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  label="URL"
                  className={classes.textField}
                  margin="normal"
                  value={url}
                  onChange={(e) => changeUrl(e.target.value)}
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  rows={5}
                  label="詳細"
                  className={classes.textField}
                  value={description}
                  onChange={e => changeDescription(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
              </div>
            </form>
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              OK
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
    postMyProduct: (summary, description, url) => dispatch(postMyProduct(summary, description, url)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProductModal)
