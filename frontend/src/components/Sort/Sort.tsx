import styles from "./Sort.module.css";

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
      <div className={styles.sortContainer}>
        <h3>Sortieren</h3>
        <div>
          {/* Sort by ascending price */}
          <input
            className={styles.sortInput}
            type="checkbox"
            id="orderAsc"
            name="sortOrder"
            value="asc"
            checked={sortOrder === "asc"}
            onChange={() => handleSortChange("asc")}
          />
          <label
            className={`${styles.sortLabel} ${styles.sortAscending}`}
            htmlFor="orderAsc"
          >
            Preis aufsteigend
          </label>

          {/* Sort by descending price */}
          <input
            className={styles.sortInput}
            type="checkbox"
            id="orderDesc"
            name="sortOrder"
            value="desc"
            checked={sortOrder === "desc"}
            onChange={() => handleSortChange("desc")}
          />
          <label
            className={`${styles.sortLabel} ${styles.sortDescending}`}
            htmlFor="orderDesc"
          >
            Preis absteigend
          </label>
        </div>
      </div>
    </>
  );
};
