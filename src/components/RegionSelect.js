import PropTypes from "prop-types";
import { useContext } from "react";
import Select from "react-select";
import AppContext from "../state";

const customStyles = {
  menuList: (provided, state) => ({
    ...provided,
    "&>*:last-child": {
      paddingTop: ".5rem",
      borderTop: "2px solid #000",
    },
  }),
};
const RegionSelect = (props) => {
  const { region, setRegion } = useContext(AppContext);

  return (
    <div>
      <Select styles={customStyles} options={props.options} value={region} onChange={setRegion} placeholder="Регион деятельности" isSearchable />
    </div>
  );
};

RegionSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      label: PropTypes.number.isRequired,
    })
  ).isRequired,
};

RegionSelect.defaultProps = {
  options: [],
};

export default RegionSelect;
