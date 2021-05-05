import "../styles/popUpSpinner.css";

function PopUpSpinner(props) {
  return (
    <div className="PopUp hide">
      <div class="loader">Loading...</div>
      <div>{props.text}</div>
    </div>
  );
}

export default PopUpSpinner;
