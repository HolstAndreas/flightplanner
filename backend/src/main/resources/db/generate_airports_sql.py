import csv

def generate_sql_from_csv():
    # Open the output SQL file
    with open('data.sql', 'w', encoding='utf-8') as sql_file:
        # Write the initial comment
        sql_file.write('-- Airport Data\n\n')
        
        # Write the delete statement to clean up existing data
        sql_file.write('DELETE FROM flights;\n')
        sql_file.write('DELETE FROM airport;\n\n')
        
        # Read the CSV file and generate INSERT statements
        with open('eu_airports.csv', 'r', encoding='utf-8') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            
            for row in csv_reader:
                # Skip if required fields are empty
                if not all([row['City'], row['Airport'], row['Code'], 
                          row['Country'], row['longitude'], row['latitude'], row['timezone']]):
                    continue
                
                # Escape single quotes in text fields
                city = row['City'].replace("'", "''")
                airport = row['Airport'].replace("'", "''")
                country = row['Country'].replace("'", "''")
                
                # Create the INSERT statement using triple quotes
                sql = f'''INSERT INTO airport (city, airport, iataCode, country, longitude, latitude, timezone) 
VALUES ('{city}', '{airport}', '{row['Code']}', '{country}', {row['longitude'] or 'NULL'}, {row['latitude'] or 'NULL'}, {row['timezone']});
'''
                
                sql_file.write(sql)

if __name__ == "__main__":
    generate_sql_from_csv()
    print("data.sql has been generated successfully!")