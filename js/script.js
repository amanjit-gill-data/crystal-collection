// source: https://wickedev.com/javascript-to-parse-a-csv-file-and-convert-it-into-an-html-table/

fetch("data/crystals.tsv")
  .then(
    function(response) {
      return response.text();
    }
  )
  .then(
    function(data) {
      var table_element = document.getElementById("crystal-table");
      tsv_string_to_table(data, table_element);
    }
  );

function tsv_string_to_table(tsv_string, table_element) {
  
  // Regex to split into rows
  var rows = tsv_string.trim().split(/\r?\n|\r/); 
  
  var table = '';
  var table_rows = '';
  var table_header = '';

  // create markup string for each row; add it to table markup 
  rows.forEach(function(row, row_index) {
    
    var table_columns = '';
    var image_file = "";
    var image_markup = "";
    
    // split row into columns
    var columns = row.split("\t"); 
   
    // create markup string for each column; add it to row markup
    columns.forEach(function(column, column_index) {
      table_columns += row_index == 0 ? '<th>' + column + '</th>' : '<td>' + column + '</td>';
      
      if (column_index == 0 && row_index != 0) {
        image_file = "images/" + column.toLowerCase().trim() + ".jpg"
        image_markup = "<td>" + "<img src=\"" + image_file + "\" width=\"150\">" + "</td>";  
      }
    });
    
    if (row_index == 0) {
      table_header += '<tr>' + table_columns + "<th>Image</th>" + '</tr>';
    } else {
      table_rows += '<tr>' + table_columns + image_markup + '</tr>';
    }
  });

  table += '<table>';
    table += '<thead>';
      table += table_header;
    table += '</thead>';
    table += '<tbody>';
      table += table_rows;
    table += '</tbody>';
  table += '</table>';

  table_element.innerHTML += table;
}


