# NYCHA Watchlist Notebooks

## Goal

In 2025 NYCHA started an open data of new violations and repair orders in their developments. The goal of this set of notebooks is to create a database of NYCHA violations that extend into the past before 2025 to create a more wholistic dataset of public housing violations in NYC.

## The data

You can find links to the NYC Open Datasets through this [doc](https://docs.google.com/document/d/1M9Gb-tul9vljsVt75ofMCP_PguvQpTC1A6WLNcmFKzM/edit?usp=sharing) which includes some further documenation on this project. The entire HPD data is quite large (over 5gb). `dl_city_vio_data.ipynb` goes into downloading it.

## Notebooks

`dl_city_vio_data.ipynb` downloads the HPD dataset via the NYC Open Data API and converts it to a parquet file for more efficient use.

`building_id_compare` and `nycha_bin_compare` were a preliminary attempts to see if there were common building IDs used accross both data sets. The results were not very promising so I moved on to fuzzy matching addresses.

`fuzzy_matching.ipynb` is the notebook for generating the fuzzy matched addresses. The result is a CSV of 217 uinique NYCHA addresses which match very closely to addresses found in the HPD dataset with the lowest match still scoring at ~97% similar.The last step is to add violations IDs from both datasets into respective columns for each matched address.

## Results

The resulting data can be a springboard for many different forms of visualization such as charts for statistic analysis and maps a more spatial exploration.

![Project Diagram](/flowchart.png)
