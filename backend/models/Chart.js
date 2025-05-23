/**
 * Chart model representing a manga chart
 * This is a placeholder model with no database integration
 */
class Chart {
  /**
   * Create a new Chart instance
   * @param {string} id - Unique identifier for the chart
   * @param {string} title - Title of the chart
   * @param {string} summary - Summary or description of the chart
   * @param {string} language - Language code for the chart content
   */
  constructor(id, title, summary, language) {
    this.id = id;
    this.title = title;
    this.summary = summary;
    this.language = language;
  }
}

module.exports = Chart;