import PropTypes from "prop-types";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./Company.css";
import arrow_up from "../../img/new/icon_arrow_up_red.svg";
import arrow_down from "../../img/new/icon_arrow_down.svg";

const RenderArrayOrSingle = ({ element, prefix = "", ...props }) => {
  if (typeof element !== "string")
    return element.map((el, index) => (
      <li key={index}>
        {prefix}
        {el}
      </li>
    ));

  return (
    <li>
      {prefix}
      {element}
    </li>
  );
};

const Company = ({ address, contacts, site, companyName }) => {
  const [isShown, setIsShown] = useState(true);

  const handleClick = () => setIsShown((isShown) => !isShown);

  return (
    <div className="company-info--wrapper">
      <AnimatePresence>
        <div onClick={handleClick} className="company-info">
          {isShown ? (
            <img className="company--icon" src={arrow_up} alt="collapse" />
          ) : (
            <img className="company--icon" src={arrow_down} alt="expand" />
          )}
          {companyName}
        </div>
        {isShown && (
          <div className="company-info--content">
            <table>
              <tr>
                <td>Адрес:</td>
                <td>{address}</td>
              </tr>
              <tr>
                <td>Контакты:</td>
                <td>
                  <ul>
                    {contacts.phone && <RenderArrayOrSingle element={contacts.phone} />}
                    {contacts.email && <RenderArrayOrSingle element={contacts.email} prefix={"email: "} />}
                  </ul>
                </td>
              </tr>
              {site && (
                <tr>
                  <td>Сайт:</td>
                  <td>
                    <a href={site}>{site}</a>
                  </td>
                </tr>
              )}
            </table>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Company;

Company.propTypes = {
  dataBusiness: PropTypes.oneOf(PropTypes.string, PropTypes.number).isRequired,
  dataRegions: PropTypes.oneOf(PropTypes.string, PropTypes.number).isRequired,
  address: PropTypes.string.isRequired,
  contacts: PropTypes.shape({
    phone: PropTypes.oneOf(PropTypes.string, PropTypes.arrayOf(PropTypes.string)),
    email: PropTypes.oneOf(PropTypes.string, PropTypes.arrayOf(PropTypes.string)),
  }).isRequired,
  site: PropTypes.string,
  companyName: PropTypes.string,
};

/*

  When selection changes (businesses / regions):
  - filter all companies by set businesses / regions
  - map by town and for each town
    - display businesses
*/
