/**
 * Page model representing a page within a manga chart
 * This is a placeholder model with no database integration
 */
class Page {
  /**
   * Create a new Page instance
   * @param {string} id - Unique identifier for the page
   * @param {string} chartId - ID of the chart this page belongs to
   * @param {string} text - Text content of the page
   * @param {string} language - Language code for the page content
   * @param {string} imageUrl - URL to the page's image
   */
  constructor(id, chartId, text, language, imageUrl) {
    this.id = id;
    this.chartId = chartId;
    this.text = text;
    this.language = language;
    this.imageUrl = imageUrl;
  }
}

module.exports = Page;