import PropTypes from "prop-types";
import { useContext } from "react";
import Select from "react-select";
import AppContext from "../state";

const BusinessSelect = (props) => {
  const { business, setBusiness } = useContext(AppContext);

  return (
    <div className="col-lg-5 col-sm-6 mb-15">
      <Select
        options={props.options}
        value={business}
        onChange={setBusiness}
        placeholder="Направление деятельности"
        isSearchable
      />
    </div>
  );
};

BusinessSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

BusinessSelect.defaultProps = {
  options: [],
};

export default BusinessSelect;
