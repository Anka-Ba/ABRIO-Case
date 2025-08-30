import type { FilterName, FilterOptions } from "../../types/types";
import { useFilterDispatch } from "./FilterReducer";

type CheckboxFilterProps = {
  filterName: FilterName;
  labels: Array<FilterOptions>;
};

const CheckboxFilter = ({ filterName, labels }: CheckboxFilterProps) => {
  const dispatch = useFilterDispatch();

  /**
   * Adds or removes a filter option
   * @param label Filter option to add or remove
   * @param checked If true, the filter option is added, otherwise it is removed
   */
  const onCheckboxChange = (label: FilterOptions, checked: boolean) => {
    if (checked) {
      dispatch({
        type: "ADD_FILTER_OPTION",
        payload: { type: filterName, data: label },
      });
    } else {
      dispatch({
        type: "REMOVE_FILTER_OPTION",
        payload: { type: filterName, data: label },
      });
    }
  };
  return (
    <>
      <h3>{filterName}</h3>
      {/* Display one checkbox for each filter option */}
      {labels.map((label) => (
        <span key={label}>
          <label htmlFor={label}>{label}</label>
          <input
            type="checkbox"
            name={label}
            id={label}
            onChange={(e) => onCheckboxChange(label, e.target.checked)}
          />
        </span>
      ))}
    </>
  );
};

export const Filter = () => {
  return (
    <div>
      <CheckboxFilter filterName="Kategorie" labels={["A", "B", "C"]} />
      <CheckboxFilter filterName="Farbe" labels={["Rot", "Grün", "Blau"]} />
    </div>
  );
};
