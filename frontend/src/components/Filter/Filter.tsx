import type { FilterName, FilterOptions } from "../../types/types";
import { useFilterDispatch } from "./FilterReducer";
import styles from "./Filter.module.css";

type CheckboxFilterProps = {
  filterName: FilterName;
  labels: Array<FilterOptions>;
  checkBoxColors?: Array<string>;
};

const CheckboxFilter = ({
  filterName,
  labels,
  checkBoxColors,
}: CheckboxFilterProps) => {
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
    <div className={styles.checkboxAndTitle}>
      <h3>{filterName}</h3>
      <div className={styles.checkboxContainer}>
        {/* Display one checkbox for each filter option */}
        {labels.map((label, index) => (
          <span key={label}>
            <div className={styles.checkboxAndLabel}>
              <div>
                <label htmlFor={label}>{label}</label>
              </div>
              <div>
                <input
                  className={
                    checkBoxColors ? styles.colorInput : styles.filterInput
                  }
                  // Optionally, the colors for the checkboxes can be passed as a prop
                  style={
                    {
                      "--color": checkBoxColors?.[index],
                    } as React.CSSProperties
                  }
                  type="checkbox"
                  name={label}
                  id={label}
                  onChange={(e) => onCheckboxChange(label, e.target.checked)}
                />
              </div>
            </div>
          </span>
        ))}
      </div>
    </div>
  );
};

export const Filter = () => {
  return (
    <div className={styles.filterContainer}>
      {/*  Filter for category */}
      <CheckboxFilter filterName="Kategorie" labels={["A", "B", "C"]} />
      {/* Filter for color */}
      <CheckboxFilter
        filterName="Farbe"
        labels={["Rot", "Grün", "Blau"]}
        checkBoxColors={["red", "green", "blue"]}
      />
    </div>
  );
};
