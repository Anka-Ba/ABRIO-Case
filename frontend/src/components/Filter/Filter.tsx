type CheckboxFilterProps = {
  filterName: string;
  labels: Array<string>;
};

const CheckboxFilter = ({ filterName, labels }: CheckboxFilterProps) => {
  return (
    <>
      <h3>{filterName}</h3>
      {/* Display one checkbox for each filter option */}
      {labels.map((label) => (
        <span key={label}>
          <label htmlFor={label}>{label}</label>
          <input type="checkbox" name={label} id={label} />
        </span>
      ))}
    </>
  );
};

export const Filter = () => {
  return (
    <div>
      <CheckboxFilter filterName="Kategorie" labels={["A", "B", "C"]} />
      <CheckboxFilter filterName="Farbe" labels={["R", "G", "B"]} />
    </div>
  );
};
