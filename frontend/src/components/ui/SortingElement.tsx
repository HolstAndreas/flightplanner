

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
        <option value="departureTime_ASC">Closest dates</option>
        <option value="departureTime_DESC">Latest dates</option>
        <option value="startingPrice_ASC">Lowest price</option>
        <option value="startingPrice_DESC">Highest price</option>
        <option value="duration_ASC">Shortest flight</option>
        <option value="duration_DESC">Longest flight</option>
      </select>
    </div>
  )
}

export default SortingElement