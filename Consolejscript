//Visit https://www.lotteryagent.kerala.gov.in/result/public/
//open console and paste the following code
//then a json file generates
async function scrapeAllPages() {
    let allData = new Map();
    const api = $('#example').DataTable();
    const totalPages = api.page.info().pages;

    console.log(`Starting scrape of ${totalPages} pages...`);

    for (let i = 0; i < totalPages; i++) {
        // Switch to the specific page
        api.page(i).draw('page');
        
        // Wait a moment for the DOM to update
        await new Promise(resolve => setTimeout(resolve, 500));

        // Grab rows from the current page
        $('#example tbody tr').each(function() {
            const $cells = $(this).find('td');
            const dateKey = $cells.eq(2).text().trim();
            
            if (dateKey && !allData.has(dateKey)) {
                allData.set(dateKey, {
                    date: dateKey,
                    lottery: $cells.eq(1).text().trim(),
                    itemId: $(this).find('.download-link').data('item-id')
                });
            }
        });
        console.log(`Finished page ${i + 1}`);
    }

    // Convert Map to Sorted Array and Download
    const finalResult = Array.from(allData.values()).sort((a, b) => {
        const dateA = new Date(a.date.split('-').reverse().join('-'));
        const dateB = new Date(b.date.split('-').reverse().join('-'));
        return dateB - dateA;
    });

    const blob = new Blob([JSON.stringify(finalResult, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "full_lottery_results.json";
    link.click();
}

scrapeAllPages();
