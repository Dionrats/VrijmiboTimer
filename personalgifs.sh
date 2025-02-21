#!/bin/bash

gifsDirectory="src/assets/personalgifs"
outputFilePath="src/assets/personalgifs.json"

# Check if the directory exists
if [ ! -d "$gifsDirectory" ]; then
  echo "Directory $gifsDirectory does not exist."
  exit 1
fi

# Find all .gif files in the directory
gifFiles=$(find "$gifsDirectory" -type f -name "*.gif" -exec basename {} \;)
echo $gifFiles

# Create a JSON object
jsonObject="\"gifs\":["
for gif in $gifFiles; do
  jsonObject="$jsonObject\"$gif\","
done

# Remove the trailing comma and close the JSON array
jsonObject="{${jsonObject%,}]}"

# Write the JSON object to the output file
echo "$jsonObject" > "$outputFilePath"

# Format the JSON file
jq . "$outputFilePath" > "${outputFilePath}.tmp" && mv "${outputFilePath}.tmp" "$outputFilePath"

echo "Personal GIFs JSON file created at $outputFilePath"
