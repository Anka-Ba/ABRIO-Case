type SortProps = {
  sortOrder: "asc" | "desc" | null;
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc" | null>>;
};

export const Sort = ({ sortOrder, setSortOrder }: SortProps) => {
  /**
   * Updates the sort order state
   * If the selected order is unselected, the state is set to null
   * @param newOrder
   */
  const handleSortChange = (newOrder: "asc" | "desc") => {
    if (newOrder !== sortOrder) {
      setSortOrder(newOrder);
    } else {
      setSortOrder(null);
    }
  };

  return (
    <>
      <h3>Sortieren</h3>
      {/* Sort by ascending price */}
      <label htmlFor="orderAsc">Preis aufsteigend</label>
      <input
        type="checkbox"
        id="orderAsc"
        name="sortOrder"
        value="asc"
        checked={sortOrder === "asc"}
        onChange={() => handleSortChange("asc")}
      />
      {/* Sort by descending price */}
      <label htmlFor="orderDesc">Preis absteigend</label>
      <input
        type="checkbox"
        id="orderDesc"
        name="sortOrder"
        value="desc"
        checked={sortOrder === "desc"}
        onChange={() => handleSortChange("desc")}
      />
    </>
  );
};
