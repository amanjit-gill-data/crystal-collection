fetch("../data/crystals.csv")
  .then(
    function(response) {
      return response.text();
    }
  )
  .then(
    function(data) {
      var table_element = document.getElementById("crystal-table");
      csv_string_to_table(data, table_element);
    }
  );

function csv_string_to_table(csv_string, table_element) {
  
  // Regex to split into rows
  var rows = csv_string.trim().split(/\r?\n|\r/); 
  
  var table = '';
  var table_rows = '';
  var table_header = '';

  rows.forEach(function(row, row_index) {
    
    var table_columns = '';
    
    // split row into columns
    var columns = row.split(','); 
    
    columns.forEach(function(column, column_index) {
        table_columns += row_index == 0 ? '<th>' + column + '</th>' : '<td>' + column + '</td>';
    });
    
    if (row_index == 0) {
        table_header += '<tr>' + table_columns + '</tr>';
    } else {
        table_rows += '<tr>' + table_columns + '</tr>';
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


