def transform_csv(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    transformed_data = []
    
    # Process three lines at a time
    for i in range(0, len(lines), 3):
        if i + 2 < len(lines):  # Make sure we have all three lines
            city = lines[i].strip()
            airport = lines[i + 1].strip()
            code = lines[i + 2].strip()
            
            # Combine the three lines into one CSV row
            transformed_line = f"{city},{airport},{code}"
            transformed_data.append(transformed_line)

    # Write the transformed data to the output file
    with open(output_file, 'w', encoding='utf-8') as f:
        # Add header
        f.write("City,Airport,Code\n")
        # Write data
        f.write('\n'.join(transformed_data))

# Example usage
input_file = "european_airports - Sheet1.csv"
output_file = "european_airports_transformed.csv"
transform_csv(input_file, output_file)