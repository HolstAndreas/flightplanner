interface SortingElementProps {
  onSortChange: (sortBy: string) => void;
  currentSort: string;
}

const SortingElement = ({ onSortChange, currentSort }: SortingElementProps) => {
  return (
    <div>
      <label htmlFor="sort">Sort by:</label>
      <select 
        name="sort"
        id="sort"
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="ml-2 p-1 border rounded"
      >
        <option value="date_asc">Closest dates</option>
        <option value="date_desc">Latest dates</option>
        <option value="price_asc">Lowest price</option>
        <option value="price_desc">Highest price</option>
        <option value="duration_asc">Shortest flight</option>
        <option value="duration_desc">Longest flight</option>
      </select>
    </div>
  )
}

export default SortingElement