import FilterPanel from "@/components/notes/FilterPanel";

export default function FilterPanelContainer({
  filters,
  onFilterChange,
  onClearFilters,
  universities,
  subjects,
  years,
}) {
  return (
    <FilterPanel
      filters={filters}
      onFilterChange={onFilterChange}
      onClearFilters={onClearFilters}
      universities={universities}
      subjects={subjects}
      years={years}
    />
  );
}
