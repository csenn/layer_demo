import { Box } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TextFilter } from "./filters/TextFilter";
import { IFilterOptions, filterNotes } from "./filterNotes";
import { INote } from "../types";
import { debounce } from "lodash";
import { FilterWrapper } from "./FilterWrapper";
import { DropdownFilter } from "./filters/DropdownFilter";
import { NumberFilter } from "./filters/NumberFilter";
import { getMockDataLists } from "../mockData/getMockData";

type FilterPanelProps = {
  updateFilteredNotes: (notes: INote[]) => void;
  updateNoteFilter: (noteFilter: string | undefined) => void;
  resetPagination: () => void;
};

export function FilterPanel({
  updateFilteredNotes,
  updateNoteFilter,
  resetPagination,
}: FilterPanelProps) {
  const [filterOptions, setFilterOptions] = useState<IFilterOptions>({});

  // Debounce is a good idea for a potentially expensive operation, or if you are making a network call
  const debouncedSearch = useMemo(() => {
    return debounce((filters) => {
      const filteredNotes = filterNotes(filters);
      updateFilteredNotes(filteredNotes);
      updateNoteFilter(filters.note);
      resetPagination();
    }, 300);
  }, [updateFilteredNotes, updateNoteFilter, resetPagination]);

  // The unioned value does not ensure this function is used correctly.
  // It ensures the correct keys are being used, but not that the
  // key type matches the expected value type. Consider another approach.
  const handleFilterChange = useCallback(
    (filter: keyof IFilterOptions, value: string | number | undefined) => {
      const nextFilterOptions = {
        ...filterOptions,
        [filter]: value,
      };
      setFilterOptions(nextFilterOptions);
      debouncedSearch(nextFilterOptions);
    },
    [filterOptions, debouncedSearch],
  );

  // Run search notes with empty filters on page load
  useEffect(() => {
    debouncedSearch({});
  }, []);

  const { hospitalNames, providerNames, genders } = useMemo(
    () => getMockDataLists(),
    [],
  );

  return (
    <Box>
      <Box
        sx={{
          padding: "25px 5px",
          fontSize: "20px",
          borderBottom: "1px solid rgb(230,230,230)",
        }}
      >
        Note Search Demo
      </Box>
      <Box sx={{ padding: "5px" }}>
        <FilterWrapper label="Search Notes">
          <TextFilter
            value={filterOptions.note || ""}
            onChange={(value) => handleFilterChange("note", value)}
          />
        </FilterWrapper>
        <FilterWrapper label="Hospital Name">
          <DropdownFilter
            value={filterOptions.hospitalName || ""}
            onChange={(value) => handleFilterChange("hospitalName", value)}
            options={hospitalNames}
          />
        </FilterWrapper>
        {/* Would probably be better to do a search component here, but for now ok */}
        <FilterWrapper label="Provider Name">
          <DropdownFilter
            value={filterOptions.providerName || ""}
            onChange={(value) => handleFilterChange("providerName", value)}
            options={providerNames}
          />
        </FilterWrapper>
        <FilterWrapper label="Patient Gender">
          <DropdownFilter
            value={filterOptions.gender || ""}
            onChange={(value) => handleFilterChange("gender", value)}
            options={genders}
          />
        </FilterWrapper>
        <FilterWrapper label="Patient Max Age">
          <NumberFilter
            value={filterOptions.maxAge || undefined}
            onChange={(value) => handleFilterChange("maxAge", value)}
          />
        </FilterWrapper>
        <FilterWrapper label="Patient Min Age">
          <NumberFilter
            value={filterOptions.minAge || undefined}
            onChange={(value) => handleFilterChange("minAge", value)}
          />
        </FilterWrapper>
      </Box>
    </Box>
  );
}
