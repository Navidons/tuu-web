interface IndexNowRequest {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

interface IndexNowResponse {
  status: number;
  message: string;
}

export class IndexNowService {
  private readonly apiKey = '40a3b80eaf2842f2b9ca2e2d4a941404';
  private readonly keyLocation = 'https://tuu.university/40a3b80eaf2842f2b9ca2e2d4a941404.txt';
  private readonly host: string;

  constructor(host: string) {
    this.host = host;
  }

  /**
   * Submit a single URL to IndexNow
   */
  async submitUrl(url: string): Promise<IndexNowResponse> {
    return this.submitUrls([url]);
  }

  /**
   * Submit multiple URLs to IndexNow
   */
  async submitUrls(urls: string[]): Promise<IndexNowResponse> {
    const requestBody: IndexNowRequest = {
      host: this.host,
      key: this.apiKey,
      keyLocation: this.keyLocation,
      urlList: urls
    };

    try {
      const response = await fetch('https://api.indexnow.org/IndexNow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(requestBody),
      });

      const status = response.status;
      let message = '';

      switch (status) {
        case 200:
          message = 'URLs submitted successfully';
          break;
        case 202:
          message = 'URLs accepted for processing';
          break;
        case 400:
          message = 'Bad request - Invalid format';
          break;
        case 403:
          message = 'Forbidden - Key not valid';
          break;
        case 422:
          message = 'Unprocessable Entity - URLs don\'t belong to host or key mismatch';
          break;
        case 429:
          message = 'Too Many Requests - Rate limited';
          break;
        default:
          message = `Unexpected response: ${status}`;
      }

      return { status, message };
    } catch (error) {
      return {
        status: 500,
        message: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Submit all main pages of your website
   */
  async submitMainPages(): Promise<IndexNowResponse> {
    const mainPages = [
      'https://tuu.university/',
      'https://tuu.university/about',
      'https://tuu.university/academics',
      'https://tuu.university/admissions',
      'https://tuu.university/student-life',
      'https://tuu.university/liberia',
      'https://tuu.university/somaliland',
      // Add more pages as needed
    ];

    return this.submitUrls(mainPages);
  }
}

// Example usage:
// const indexNow = new IndexNowService('your-domain.com');
// await indexNow.submitMainPages(); 