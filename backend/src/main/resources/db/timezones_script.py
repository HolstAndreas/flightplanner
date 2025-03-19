import csv

# First, create a dictionary of country-timezone mappings
timezone_dict = {}
with open('timezones.csv', 'r') as timezone_file:
    timezone_reader = csv.DictReader(timezone_file)
    for row in timezone_reader:
        timezone_dict[row['Country']] = row['timezone']

# Process the airports file and create a new file with timezone information
with open('eu_airports.csv', 'r') as airports_file, \
     open('eu_airports_with_timezone.csv', 'w', newline='') as output_file:
    
    # Read the airports file
    airports_reader = csv.DictReader(airports_file)
    
    # Create a new CSV writer with the additional timezone field
    fieldnames = airports_reader.fieldnames + ['timezone']
    writer = csv.DictWriter(output_file, fieldnames=fieldnames)
    
    # Write the header
    writer.writeheader()
    
    # Process each airport row
    for row in airports_reader:
        country = row['Country']
        if country in timezone_dict:
            row['timezone'] = timezone_dict[country]
        else:
            row['timezone'] = ''  # Handle cases where country is not found in timezone data
        writer.writerow(row)

print("Processing complete. New file created: eu_airports_with_timezone.csv")