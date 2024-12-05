import PropTypes from "prop-types";
import { CaretUp, CaretDown } from "react-bootstrap-icons";

const FilterOrderArrows = ({ order }) => {
  return (
    <>
      <span className="text-sm inline-block">
        {order === "asc" ? <CaretDown /> : <CaretUp />}
      </span>
    </>
  );
};

FilterOrderArrows.propTypes = {
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
};

export { FilterOrderArrows };
