import { createContext, useContext, useReducer, type Reducer } from "react";
import type {
  ActiveFilterOptions,
  Category,
  Color,
  FilterAction,
} from "../../types/types";
import type { ReactNode } from "react";

/**
 * Updates the currently selected filter options based on the type of action desired and the optional payload
 * @param filterOptions
 * @param action
 * @returns the updated selected filter options
 */
export const filterReducer: Reducer<ActiveFilterOptions, FilterAction> = (
  filterOptions,
  action,
) => {
  switch (action.type) {
    // Add a filter option (color or category) to the current active filter options
    case "ADD_FILTER_OPTION":
      let newFilterOptions = { ...filterOptions };
      switch (action.payload?.type) {
        // Add a color to the colors array
        case "Farbe":
          newFilterOptions = {
            ...filterOptions,
            colors: [...filterOptions.colors, action.payload.data as Color],
          };
          return newFilterOptions;

        // Add a category to the categories array
        case "Kategorie":
          newFilterOptions = {
            ...filterOptions,
            categories: [
              ...filterOptions.categories,
              action.payload.data as Category,
            ],
          };
          return newFilterOptions;

        default:
          return newFilterOptions;
      }

    // Remove a filter option (color or category) from the current active filter options
    case "REMOVE_FILTER_OPTION":
      let updatedFilterOptions = { ...filterOptions };
      switch (action.payload?.type) {
        // Remove a color from the colors array
        case "Farbe":
          updatedFilterOptions = {
            ...filterOptions,
            colors: filterOptions.colors.filter(
              (color) => color !== action.payload!.data,
            ),
          };
          return updatedFilterOptions;

        // Remove a category from the categories array
        case "Kategorie":
          updatedFilterOptions = {
            ...filterOptions,
            categories: filterOptions.categories.filter(
              (category) => category !== action.payload!.data,
            ),
          };
          return updatedFilterOptions;

        default:
          return updatedFilterOptions;
      }

    case "CLEAR_ALL":
      return { colors: [], categories: [] };
    default:
      return filterOptions;
  }
};

// Context for filter options
export const FilterContext = createContext<ActiveFilterOptions>({
  colors: [],
  categories: [],
});

// Context for dispatch function
export const FilterDispatchContext = createContext<
  React.Dispatch<FilterAction>
>(() => {});

/**
 * Provides the filter context to its child components
 * React docs page: https://react.dev/learn/scaling-up-with-reducer-and-context
 * @param children Can access the current filter options and dispatch actions to update them
 *
 */
export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filterOptions, dispatch] = useReducer(filterReducer, {
    colors: [],
    categories: [],
  });

  return (
    <FilterContext.Provider value={filterOptions}>
      <FilterDispatchContext.Provider value={dispatch}>
        {children}
      </FilterDispatchContext.Provider>
    </FilterContext.Provider>
  );
};

// Custom hook for accessing the currently selected filter options
export const useFilterOptions = () => {
  return useContext(FilterContext);
};

// Custom hook for accessing the dispatch function to update the filter options
export const useFilterDispatch = () => {
  return useContext(FilterDispatchContext);
};
