import * as path from 'path'
import { ApiCheck, AssertionBuilder, CheckGroup } from 'checkly/constructs'
import { websiteGroup } from './website-group.check'

function createApiChecks(websiteGroup: CheckGroup) {
  let apiChecks = [];
  
  for (let i = 1; i <= 8; i++) {
    let apiCheck = new ApiCheck(`homepage-api-check-${i}`, {
      name: `Fetch Book List ${i}`,
      group: websiteGroup,
      degradedResponseTime: 10000,
      maxResponseTime: 20000,
      setupScript: {
        entrypoint: path.join(__dirname, './utils/setup.ts')
      },
      request: {
        url: `https://danube-web.shop/api/books/${i}`,
        method: 'GET',
        followRedirects: true,
        skipSSL: false,
        assertions: [
          AssertionBuilder.statusCode().equals(200),
          AssertionBuilder.jsonBody('$[0].id').isNotNull(),
        ],
      }
    });

    apiChecks.push(apiCheck);
  }
  
  return apiChecks;
}

createApiChecks(websiteGroup)