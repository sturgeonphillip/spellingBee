/**
 * create dates:
 *  dates is a massive object --> k:v = { month: ["url"]}
 *  month: { jan-01-2023: {}, jan-02-2023: {}, ... }
 *    january01: { file: '...', dateAsString: "", url: "https://...", beeData: {...} }
 *
 *  use createData file function to get each month's object of crawled dates
 *    // crawl a link and gathers the data from the site
 *    -> import beeCrawler
 *
 *    // iterates each day/month, manipulating data
 *    // builds formatted objects that include url, filename, crawled data
 *    -> import createMonthly(monthAsWord, year, monthAsNumber, daysPerMonth, beeCrawler)
 *
 *    // stores object from createMonthly to a file
 *    -> import buildFile
 *
 *
 */

// 1. create links to crawl
// object? array?
// ex: april = [ https://...2023/04/13/, https://...2023/04/14, etc ]

// 2. run a crawler on each of these links
// scrape the appropriate data and store it to an object
// use the dataset.push method to store in local memory
// use fs to write to file

//
