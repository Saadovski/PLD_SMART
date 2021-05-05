import "../styles/popUpSpinner.css";

function PopUpSpinner(props) {
  const { id } = props;
  return (
    <div id={id} className="PopUp hide">
      <div class="loader">Loading...</div>
      <div>{props.text}</div>
    </div>
  );
}

export default PopUpSpinner;
