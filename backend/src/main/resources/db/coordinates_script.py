import csv

def update_coordinates():
    # Load airport codes and their coordinates from airport-lookup.csv
    airport_coords = {}
    with open('airport-lookup.csv', 'r', encoding='utf-8') as lookup_file:
        lookup_reader = csv.DictReader(lookup_file)
        for row in lookup_reader:
            code = row['iata_code']
            # Remove quotes and split coordinates into longitude and latitude
            if row['coordinates']:  # Check if coordinates exist
                coords = row['coordinates'].strip('"').split(',')
                if len(coords) == 2:
                    airport_coords[code] = {
                        'longitude': coords[0].strip(),
                        'latitude': coords[1].strip()
                    }

    # Read eu_a.csv and create a new list with updated data
    updated_rows = []
    with open('eu_a.csv', 'r', encoding='utf-8') as eu_file:
        eu_reader = csv.DictReader(eu_file)
        headers = eu_reader.fieldnames
        
        for row in eu_reader:
            code = row['Code']
            if code in airport_coords:
                row['longitude'] = airport_coords[code]['longitude']
                row['latitude'] = airport_coords[code]['latitude']
            updated_rows.append(row)

    # Write the updated data to a new file
    output_file = 'european_airports_with_coordinates.csv'
    with open(output_file, 'w', encoding='utf-8', newline='') as out_file:
        writer = csv.DictWriter(out_file, fieldnames=headers)
        writer.writeheader()
        writer.writerows(updated_rows)
        print(f"Updated data written to {output_file}")

if __name__ == "__main__":
    update_coordinates()