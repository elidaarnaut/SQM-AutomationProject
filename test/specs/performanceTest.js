describe('Performance Testing', () => {
    let browser;
  
    beforeAll(async () => {
      const { remote } = await import('webdriverio');
      browser = await remote({
        logLevel: 'error',
        path: '/',
        capabilities: {
          browserName: 'chrome'
        }
      });
    });
  
    afterAll(async () => {
      await browser.deleteSession();
    });
  
    it('should measure performance using Lighthouse', async () => {
      const url = 'https://example.com';
  
      // Dynamically import chrome-launcher and lighthouse
      const chromeLauncher = await import('chrome-launcher');
      const { default: lighthouse } = await import('lighthouse');
  
      const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
      const options = { logLevel: 'info', output: 'json', port: chrome.port };
  
      const runnerResult = await lighthouse(url, options);
  
      const performanceScore = runnerResult.lhr.categories.performance.score * 100;
      console.log('Performance score was: ', performanceScore);
  
      await chrome.kill();
  
      expect(performanceScore).toBeGreaterThan(80); // Example assertion
    });
  });
  