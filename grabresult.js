//another version of script
// 1. Access the DataTables API
const api = $('#example').DataTable();

// 2. Extract and Deduplicate (Date as Key)
const dataMap = new Map();

api.rows().nodes().to$().each(function() {
    const $row = $(this);
    const $cells = $row.find('td');
    
    // Extract the date string (Primary Key)
    const dateKey = $cells.eq(2).text().trim();
    
    // If the date is already present, this will skip it to maintain uniqueness
    if (!dataMap.has(dateKey) && dateKey !== "") {
        dataMap.set(dateKey, {
            date: dateKey,
            lottery: $cells.eq(1).text().trim(),
            itemId: $row.find('.download-link').data('item-id')
        });
    }
});

// 3. Convert to Array and Sort by Date (Newest First)
const sortedData = Array.from(dataMap.values()).sort((a, b) => {
    // Convert DD-MM-YYYY to YYYY-MM-DD for accurate chronological sorting
    const dateA = new Date(a.date.split('-').reverse().join('-'));
    const dateB = new Date(b.date.split('-').reverse().join('-'));
    return dateB - dateA; 
});

// 4. Create and Download JSON
const jsonString = JSON.stringify(sortedData, null, 2);
const blob = new Blob([jsonString], { type: "application/json" });
const url = URL.createObjectURL(blob);

const link = document.createElement("a");
link.href = url;
link.download = `lottery_data_${new Date().toISOString().split('T')[0]}.json`;
document.body.appendChild(link);
link.click();
document.body.removeChild(link);

// Final verification in console
console.log("JSON generated without Serial Numbers.");
console.table(sortedData);
