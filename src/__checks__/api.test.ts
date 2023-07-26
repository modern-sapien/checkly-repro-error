import * as path from 'path'
import { ApiCheck, AssertionBuilder, CheckGroup } from 'checkly/constructs'
import { groupA, groupB } from './group.check'

function createApiChecks(groupPassed: CheckGroup) {
  let apiChecks = [];
  
  for (let i = 1; i <= 8; i++) {
    let apiCheck = new ApiCheck(`homepage-api-check-${i}-${groupPassed.name.trim()}`, {
      name: `Fetch Book List ${i} ${groupPassed.name.trim()}`,
      group: groupPassed,
      tags: [groupPassed.name.trim()],
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

createApiChecks(groupA)
createApiChecks(groupB)