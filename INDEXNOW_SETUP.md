# IndexNow Setup Guide

This guide will help you set up IndexNow for your website to improve search engine indexing.

## What is IndexNow?

IndexNow is a protocol that allows websites to instantly inform search engines about newly created, updated, or deleted content. This helps search engines discover and index your content faster.

## Current Setup Status

✅ **API Key Generated**: `40a3b80eaf2842f2b9ca2e2d4a941404`  
✅ **Key File Created**: `40a3b80eaf2842f2b9ca2e2d4a941404.txt`  
✅ **Utility Scripts Created**: `lib/indexnow.ts` and `scripts/submit-to-indexnow.ts`

## Setup Instructions

### 1. Update Domain Configuration

Before using the IndexNow service, you need to update the domain in the configuration files:

1. **Update `lib/indexnow.ts`**: ✅ **COMPLETED**
   - Domain updated to `tuu.university`
   - Key location updated to `https://tuu.university/40a3b80eaf2842f2b9ca2e2d4a941404.txt`

2. **Update `scripts/submit-to-indexnow.ts`**: ✅ **COMPLETED**
   - Domain updated to `tuu.university`

### 2. Deploy the Key File

Make sure the key file `40a3b80eaf2842f2b9ca2e2d4a941404.txt` is accessible at:
```
https://tuu.university/40a3b80eaf2842f2b9ca2e2d4a941404.txt
```

### 3. Install Dependencies

```bash
npm install
# or
pnpm install
```

## Usage

### Submit Main Pages

To submit all main pages of your website:

```bash
npm run indexnow
# or
pnpm indexnow
```

### Submit Custom URLs

You can also use the utility functions in your code:

```typescript
import { IndexNowService } from './lib/indexnow';

const indexNow = new IndexNowService('tuu.university');

// Submit a single URL
await indexNow.submitUrl('https://tuu.university/new-page');

// Submit multiple URLs
await indexNow.submitUrls([
  'https://tuu.university/page1',
  'https://tuu.university/page2',
  'https://tuu.university/page3'
]);
```

### Manual API Call

You can also make manual API calls using curl:

```bash
curl -X POST https://api.indexnow.org/IndexNow \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "host": "tuu.university",
    "key": "40a3b80eaf2842f2b9ca2e2d4a941404",
    "keyLocation": "https://tuu.university/40a3b80eaf2842f2b9ca2e2d4a941404.txt",
    "urlList": [
      "https://tuu.university/url1",
      "https://tuu.university/url2"
    ]
  }'
```

## Response Codes

- **200**: URLs submitted successfully
- **400**: Bad request - Invalid format
- **403**: Forbidden - Key not valid
- **422**: Unprocessable Entity - URLs don't belong to host or key mismatch
- **429**: Too Many Requests - Rate limited

## Best Practices

1. **Submit URLs when content changes**: Use IndexNow when you publish new content or update existing pages
2. **Don't spam**: Only submit URLs that have actually changed
3. **Monitor responses**: Check the response codes to ensure successful submission
4. **Use in production**: Integrate IndexNow calls into your content management workflow

## Integration Examples

### After Content Updates

```typescript
// After publishing a new blog post
async function publishPost(postUrl: string) {
  // ... your publishing logic ...
  
  // Submit to IndexNow
  const indexNow = new IndexNowService('tuu.university');
  await indexNow.submitUrl(postUrl);
}
```

### Batch Updates

```typescript
// After updating multiple pages
async function updateMultiplePages(updatedUrls: string[]) {
  // ... your update logic ...
  
  // Submit all updated URLs
  const indexNow = new IndexNowService('tuu.university');
  await indexNow.submitUrls(updatedUrls);
}
```

## Verification

After submitting URLs, you can verify they were received by:

1. **Bing Webmaster Tools**: Check if URLs appear in your submitted URLs list
2. **Search Console**: Monitor indexing status
3. **Direct Search**: Search for your URLs on Bing and other IndexNow partners

## Troubleshooting

### Common Issues

1. **403 Forbidden**: 
   - Check that your key file is accessible at the specified URL
   - Verify the key in the file matches your API key

2. **422 Unprocessable Entity**:
   - Ensure URLs belong to the host specified in the request
   - Check that the key matches the schema

3. **429 Too Many Requests**:
   - Wait before submitting more URLs
   - Implement rate limiting in your application

### Testing

Test your setup with a single URL first:

```typescript
const indexNow = new IndexNowService('tuu.university');
const result = await indexNow.submitUrl('https://tuu.university/test-page');
console.log(result);
```

## Support

For more information about IndexNow, visit:
- [IndexNow Documentation](https://www.indexnow.org/documentation)
- [IndexNow Protocol](https://www.indexnow.org/protocol)
- [Bing Webmaster Tools](https://www.bing.com/webmasters) 